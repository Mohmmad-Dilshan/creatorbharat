/**
 * platformService.js
 * 
 * All platform-wide data fetching lives here.
 * Components never call apiCall() directly — they use these service functions.
 * 
 * When you connect a real database (MongoDB, Supabase, etc.),
 * you only change THIS file — zero component changes needed.
 */

import { apiCall } from './api';
import { LS } from './helpers';
import { SEED_CREATORS, SEED_CAMPAIGNS } from '../data/seedData';

let _creatorsPromise = null;
let _campaignsPromise = null;
let _cache = { creators: null, campaigns: null, expiry: 0, lastFailure: 0 };

const CACHE_DURATION = 60000; // 1 minute
const FAILURE_COOLDOWN = 30000; // 30 seconds cooldown after a failure

/**
 * Robustly merges a live database/localStorage creator record with the rich seed profile data.
 * Overwrites mock seed data with live values (e.g. state, followers, name) from the database,
 * while falling back to rich seed data for fields missing or empty in the database (e.g. packages, case studies, reviews).
 */
function mergeCreator(seed, remote) {
  if (!seed) return remote;
  if (!remote) return seed;

  const merged = { ...seed, ...remote };

  // If a key array/object is empty or null in remote, fall back to seed details
  const arrayFields = ['niche', 'platform', 'services', 'languages', 'portfolio', 'gallery', 'viral_content', 'case_studies', 'packages', 'reviews'];
  arrayFields.forEach(field => {
    if (!remote[field] || (Array.isArray(remote[field]) && remote[field].length === 0)) {
      merged[field] = seed[field];
    }
  });

  const objectFields = ['ai_intel', 'audience_hubs', 'expertise', 'full_story'];
  objectFields.forEach(field => {
    if (!remote[field] || (typeof remote[field] === 'object' && Object.keys(remote[field]).length === 0)) {
      merged[field] = seed[field];
    }
  });

  // Verify text fields as well
  const textFields = ['bio', 'tagline', 'philosophy', 'audience_desc', 'local_voice', 'local_penetration'];
  textFields.forEach(field => {
    if (!remote[field]) {
      merged[field] = seed[field];
    }
  });

  return merged;
}

/**
 * Finds a matching creator inside SEED_CREATORS using standard identifier fields.
 */
function findSeedCreator(id, handle, slug) {
  return SEED_CREATORS.find(s => 
    String(s.id) === String(id) || 
    s.handle === handle || 
    s.slug === slug || 
    (handle && s.handle === handle)
  );
}

/**
 * Enrichment wrapper to find and merge seed metadata into a creator object.
 */
function getEnrichedCreator(creator) {
  if (!creator) return creator;
  const seed = findSeedCreator(creator.id, creator.handle, creator.slug);
  return seed ? mergeCreator(seed, creator) : creator;
}

// ─── Creators ───────────────────────────────────────────────
export async function fetchCreators({ limit = 250, force = false } = {}) {
  // Return cache if valid
  if (!force && _cache.creators && Date.now() < _cache.expiry) {
    return _cache.creators;
  }

  // Return fallback if in failure cooldown
  if (!force && Date.now() < _cache.lastFailure + FAILURE_COOLDOWN) {
    const local = LS.get('cb_creators', []);
    return local.length > 0 ? local : SEED_CREATORS;
  }

  // Deduplicate inflight requests
  if (_creatorsPromise && !force) return _creatorsPromise;

  _creatorsPromise = (async () => {
    try {
      // Use a larger limit by default for shared calls to satisfy all hooks
      const fetchLimit = Math.max(limit, 500); 
      const res = await apiCall(`/creators?limit=${fetchLimit}`);
      const remote = res.creators || (Array.isArray(res) ? res : []);

      const local = LS.get('cb_creators', []);
      const enrichedRemote = remote.map(c => getEnrichedCreator(c));

      let merged = [...enrichedRemote];
      local.forEach(lc => {
        if (!merged.some(c => c.id === lc.id || c.email === lc.email)) {
          merged.push(getEnrichedCreator(lc));
        }
      });

      if (merged.length === 0) {
        merged = SEED_CREATORS;
      }

      _cache.creators = merged;
      _cache.expiry = Date.now() + CACHE_DURATION;
      return merged;
    } catch (err) {
      if (err.status !== 429) console.error('fetchCreators failed:', err.message);
      _cache.lastFailure = Date.now();
      const local = LS.get('cb_creators', []);
      return local.length > 0 ? local : SEED_CREATORS;
    } finally {
      _creatorsPromise = null;
    }
  })();

  return _creatorsPromise;
}

export async function fetchCreatorById(id) {
  if (!id) return null;

  // 1. Check Cache
  if (_cache.creators) {
    const found = _cache.creators.find(x => String(x.id) === String(id) || x.handle === id || x.slug === id);
    if (found) return getEnrichedCreator(found);
  }

  // 2. Check LocalStorage
  const local = LS.get('cb_creators', []);
  const localFound = local.find(x => String(x.id) === String(id) || x.handle === id || x.slug === id);
  if (localFound) return getEnrichedCreator(localFound);

  // 3. API Call
  try {
    const res = await apiCall(`/creators/${id}`);
    return getEnrichedCreator(res.creator || res);
  } catch (err) {
    if (err.status !== 429) console.error('fetchCreatorById failed:', err.message);
    // 4. Seed Fallback
    return SEED_CREATORS.find(x => String(x.id) === String(id) || x.handle === id || x.slug === id) || null;
  }
}

// ─── Campaigns ──────────────────────────────────────────────
export async function fetchCampaigns({ limit = 100, force = false } = {}) {
  if (!force && _cache.campaigns && Date.now() < _cache.expiry) {
    return _cache.campaigns;
  }

  if (!force && Date.now() < _cache.lastFailure + FAILURE_COOLDOWN) {
    const local = LS.get('cb_campaigns', []);
    return local.length > 0 ? local : SEED_CAMPAIGNS;
  }

  if (_campaignsPromise && !force) return _campaignsPromise;

  _campaignsPromise = (async () => {
    try {
      const res = await apiCall(`/campaigns?limit=${limit}`);
      let list = res.campaigns || (Array.isArray(res) ? res : []);
      if (list.length === 0) {
        list = SEED_CAMPAIGNS;
      }
      _cache.campaigns = list;
      _cache.expiry = Date.now() + CACHE_DURATION;
      return list;
    } catch (err) {
      if (err.status !== 429) console.error('fetchCampaigns failed:', err.message);
      _cache.lastFailure = Date.now();
      const local = LS.get('cb_campaigns', []);
      return local.length > 0 ? local : SEED_CAMPAIGNS;
    } finally {
      _campaignsPromise = null;
    }
  })();

  return _campaignsPromise;
}

// ─── Platform Analytics (derived) ───────────────────────────
/**
 * Derives platform-wide analytics from raw creator + campaign arrays.
 * Pure function — easy to unit test.
 * 
 * @param {Array} creators
 * @param {Array} campaigns
 * @returns {Object} analytics
 */
export function derivePlatformAnalytics(creators = [], campaigns = []) {
  const totalCreators = creators.length;

  const totalReach = creators.reduce((sum, c) => sum + Number(c.followers || 0), 0);

  const citySet = new Set(creators.filter(c => c.city).map(c => c.city));
  const cityCount = citySet.size;

  const dealValue = campaigns.reduce(
    (sum, c) => sum + Number(c.budget || c.rate || 0),
    0
  );

  // Niche breakdown
  const nicheMap = {};
  creators.forEach(c => {
    const niches = Array.isArray(c.niche) ? c.niche : [c.niche].filter(Boolean);
    niches.forEach(n => { nicheMap[n] = (nicheMap[n] || 0) + 1; });
  });
  const topNiches = Object.entries(nicheMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      pct: totalCreators > 0 ? Math.round((count / totalCreators) * 100) : 0,
    }));

  // City breakdown
  const cityMap = {};
  creators.forEach(c => {
    if (!c.city) return;
    if (!cityMap[c.city]) {
      cityMap[c.city] = { city: c.city, state: c.state || '', creators: 0, reach: 0, deals: 0 };
    }
    cityMap[c.city].creators += 1;
    cityMap[c.city].reach += Number(c.followers || 0);
  });
  campaigns.forEach(c => {
    const city = c.targetCity || c.city;
    if (city && cityMap[city]) cityMap[city].deals += 1;
  });
  const topCities = Object.values(cityMap)
    .sort((a, b) => b.creators - a.creators)
    .slice(0, 5);

  return {
    totalCreators,
    totalReach,
    cityCount,
    dealValue,
    topNiches,
    topCities,
  };
}
