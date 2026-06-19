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

  const hasValue = (val) => {
    if (val === undefined || val === null) return false;
    if (Array.isArray(val) && val.length === 0) return false;
    if (typeof val === 'object' && Object.keys(val).length === 0) return false;
    if (typeof val === 'string' && val.trim() === '') return false;
    return true;
  };

  // 1. Story mapping
  const story = hasValue(remote.fullStory) ? remote.fullStory : (hasValue(remote.full_story) ? remote.full_story : seed.full_story);
  merged.fullStory = story;
  merged.full_story = story;

  // 2. Viral Content mapping
  const viral = hasValue(remote.viralContent) ? remote.viralContent : (hasValue(remote.viral_content) ? remote.viral_content : seed.viral_content);
  merged.viralContent = viral;
  merged.viral_content = viral;

  // 3. Case Studies mapping
  const caseStudies = hasValue(remote.caseStudies) ? remote.caseStudies : (hasValue(remote.case_studies) ? remote.case_studies : seed.case_studies);
  merged.caseStudies = caseStudies;
  merged.case_studies = caseStudies;

  // 4. Sponsored Posts mapping
  const sponsored = hasValue(remote.sponsoredPosts) ? remote.sponsoredPosts : (hasValue(remote.sponsored_posts) ? remote.sponsored_posts : seed.sponsored_posts);
  merged.sponsoredPosts = sponsored;
  merged.sponsored_posts = sponsored;

  // 5. Social Links mapping
  const social = hasValue(remote.socialLinks) ? remote.socialLinks : (hasValue(remote.social_links) ? remote.social_links : seed.social_links);
  merged.socialLinks = social;
  merged.social_links = social;

  // 6. Local Impact Hubs / Audience Hubs mapping
  const hubs = hasValue(remote.localHubs) ? remote.localHubs : (hasValue(remote.local_impact_hubs) ? remote.local_impact_hubs : (hasValue(remote.audience_hubs) ? remote.audience_hubs : seed.local_impact_hubs || seed.audience_hubs));
  merged.localHubs = hubs;
  merged.local_impact_hubs = hubs;
  merged.local_hubs = hubs;
  merged.audience_hubs = hubs;

  // 7. AI Intel mapping
  const hasRemoteAi = hasValue(remote.ai_intel) || hasValue(remote.aiMatch) || hasValue(remote.aiSummary) || hasValue(remote.aiSafety) || hasValue(remote.aiRetention) || hasValue(remote.aiRoi);
  if (hasRemoteAi) {
    const remoteIntel = remote.ai_intel || {};
    merged.ai_intel = {
      match: remote.aiMatch || remoteIntel.match || seed.ai_intel?.match || '90%',
      summary: remote.aiSummary || remoteIntel.summary || seed.ai_intel?.summary || 'Elite Storyteller',
      stats: [
        { l: 'Safety', v: remote.aiSafety || remoteIntel.stats?.[0]?.v || seed.ai_intel?.stats?.[0]?.v || '99%' },
        { l: 'Retention', v: remote.aiRetention || remoteIntel.stats?.[1]?.v || seed.ai_intel?.stats?.[1]?.v || 'High' },
        { l: 'ROI Potential', v: remote.aiRoi || remoteIntel.stats?.[2]?.v || seed.ai_intel?.stats?.[2]?.v || '4.0x' }
      ]
    };
  } else {
    merged.ai_intel = seed.ai_intel;
  }
  if (merged.ai_intel) {
    merged.aiMatch = merged.ai_intel.match;
    merged.aiSummary = merged.ai_intel.summary;
    merged.aiSafety = merged.ai_intel.stats?.[0]?.v;
    merged.aiRetention = merged.ai_intel.stats?.[1]?.v;
    merged.aiRoi = merged.ai_intel.stats?.[2]?.v;
  }

  // 8. Local Voice mapping
  const localVoice = hasValue(remote.localVoice) ? remote.localVoice : (hasValue(remote.local_voice) ? remote.local_voice : seed.local_voice);
  merged.localVoice = localVoice;
  merged.local_voice = localVoice;

  // 9. Local Penetration mapping
  const localPenetration = hasValue(remote.localPenetration) ? remote.localPenetration : (hasValue(remote.local_penetration) ? remote.local_penetration : seed.local_penetration);
  merged.localPenetration = localPenetration;
  merged.local_penetration = localPenetration;

  // 10. Regional Dialects mapping
  const regionalDialects = hasValue(remote.regionalDialects) ? remote.regionalDialects : (hasValue(remote.regional_dialects) ? remote.regional_dialects : seed.regional_dialects);
  merged.regionalDialects = regionalDialects;
  merged.regional_dialects = regionalDialects;

  // 11. Local Collab enable flag
  merged.local_collab = remote.local_collab || seed.local_collab || !!(hubs?.length || regionalDialects || localVoice);

  // 12. Titles mapping
  const philosophyTitle = hasValue(remote.philosophyTitle) ? remote.philosophyTitle : (hasValue(remote.philosophy_title) ? remote.philosophy_title : seed.philosophy_title);
  merged.philosophyTitle = philosophyTitle;
  merged.philosophy_title = philosophyTitle;

  const dominanceTitle = hasValue(remote.dominanceTitle) ? remote.dominanceTitle : (hasValue(remote.dominance_title) ? remote.dominance_title : seed.dominance_title);
  merged.dominanceTitle = dominanceTitle;
  merged.dominance_title = dominanceTitle;

  const localTitle = hasValue(remote.localTitle) ? remote.localTitle : (hasValue(remote.local_title) ? remote.local_title : seed.local_title);
  merged.localTitle = localTitle;
  merged.local_title = localTitle;

  const localHubsTitle = hasValue(remote.localHubsTitle) ? remote.localHubsTitle : (hasValue(remote.local_hubs_title) ? remote.local_hubs_title : seed.local_hubs_title);
  merged.localHubsTitle = localHubsTitle;
  merged.local_hubs_title = localHubsTitle;

  merged.instagram_followers = remote.instagram_followers ?? remote.instagramFollowers ?? seed.instagram_followers ?? 0;
  merged.youtube_followers = remote.youtube_followers ?? remote.youtubeFollowers ?? seed.youtube_followers ?? 0;
  merged.linkedin_followers = remote.linkedin_followers ?? remote.linkedinFollowers ?? seed.linkedin_followers ?? 0;
  merged.twitter_followers = remote.twitter_followers ?? remote.twitterFollowers ?? seed.twitter_followers ?? 0;
  merged.facebook_followers = remote.facebook_followers ?? remote.facebookFollowers ?? seed.facebook_followers ?? 0;

  // Other standard fallbacks
  const arrayFields = ['niche', 'platform', 'services', 'languages', 'portfolio', 'gallery', 'packages', 'reviews', 'stories'];
  arrayFields.forEach(field => {
    if (!hasValue(remote[field])) {
      merged[field] = seed[field];
    }
  });

  const objectFields = ['expertise'];
  objectFields.forEach(field => {
    if (!hasValue(remote[field])) {
      merged[field] = seed[field];
    }
  });

  const textFields = ['bio', 'tagline', 'philosophy', 'audience_desc'];
  textFields.forEach(field => {
    if (!hasValue(remote[field])) {
      merged[field] = seed[field];
    }
  });

  const imageFields = ['photo', 'image', 'avatarUrl', 'profile_pic', 'coverUrl'];
  imageFields.forEach(field => {
    if (!hasValue(remote[field])) {
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
      let merged = remote.map(c => {
        const localCopy = local.find(lc => lc.id === c.id || lc.email === c.email);
        const base = getEnrichedCreator(c);
        return localCopy ? { ...base, ...localCopy } : base;
      });

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
      if (err.status !== 429) {
        if (import.meta.env.DEV && (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('fetch'))) {
          console.warn('fetchCreators: API host offline/sleeping. Using local/seed creators.');
        } else {
          console.error('fetchCreators failed:', err.message);
        }
      }
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
    const remoteCreator = res.creator || res;
    const local = LS.get('cb_creators', []);
    const localCopy = local.find(lc => lc.id === remoteCreator.id || lc.email === remoteCreator.email);
    const base = getEnrichedCreator(remoteCreator);
    return localCopy ? { ...base, ...localCopy } : base;
  } catch (err) {
    if (err.status !== 429) {
      if (import.meta.env.DEV && (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('fetch'))) {
        console.warn(`fetchCreatorById [${id}]: API host offline/sleeping. Using seed fallback.`);
      } else {
        console.error('fetchCreatorById failed:', err.message);
      }
    }
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
      if (err.status !== 429) {
        if (import.meta.env.DEV && (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('fetch'))) {
          console.warn('fetchCampaigns: API host offline/sleeping. Using local/seed campaigns.');
        } else {
          console.error('fetchCampaigns failed:', err.message);
        }
      }
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

  const brandSet = new Set(campaigns.filter(c => c.brand).map(c => c.brand));
  const brandCount = brandSet.size;
  const totalCampaigns = campaigns.length;

  return {
    totalCreators,
    totalReach,
    cityCount,
    dealValue,
    topNiches,
    topCities,
    totalCampaigns,
    brandCount,
  };
}

export async function updateCreatorProfile(profileData) {
  try {
    const body = {
      name: profileData.name,
      bio: profileData.bio,
      city: profileData.city,
      state: profileData.state,
      district: profileData.district,
      niche: profileData.niche,
      platform: profileData.platform,
      followers: parseInt(profileData.followers) || 0,
      engagementRate: parseFloat(profileData.engagementRate) || 0,
      instagram: profileData.instagram,
      youtube: profileData.youtube,
      twitter: profileData.twitter,
      rateMin: parseInt(profileData.rateMin) || 0,
      rateMax: parseInt(profileData.rateMax) || 0,
      services: profileData.services,
      languages: profileData.languages,
      address: profileData.address,
      tagline: profileData.tagline,
      connections: profileData.connections,
      facebook: profileData.facebook,
      linkedin: profileData.linkedin,
      twitter: profileData.twitter,
      responseTime: profileData.responseTime,
      photo: profileData.photo,
      coverPhoto: profileData.coverPhoto,
      portfolio: profileData.portfolio,
      fullStory: profileData.fullStory || profileData.full_story,
      awards: profileData.awards,
      collabs: profileData.collabs,
      milestones: profileData.milestones,
      viralContent: profileData.viralContent || profileData.viral_content,
      caseStudies: profileData.caseStudies || profileData.case_studies,
      sponsoredPosts: profileData.sponsoredPosts || profileData.sponsored_posts,
      socialLinks: profileData.socialLinks || profileData.social_links,
      stories: profileData.stories || [],
      philosophyTitle: profileData.philosophyTitle || profileData.philosophy_title,
      dominanceTitle: profileData.dominanceTitle || profileData.dominance_title,
      localTitle: profileData.localTitle || profileData.local_title,
      localHubsTitle: profileData.localHubsTitle || profileData.local_hubs_title,
      instagram_followers: parseInt(profileData.instagram_followers || profileData.instagramFollowers) || 0,
      youtube_followers: parseInt(profileData.youtube_followers || profileData.youtubeFollowers) || 0,
      linkedin_followers: parseInt(profileData.linkedin_followers || profileData.linkedinFollowers) || 0,
      twitter_followers: parseInt(profileData.twitter_followers || profileData.twitterFollowers) || 0,
      facebook_followers: parseInt(profileData.facebook_followers || profileData.facebookFollowers) || 0
    };

    const res = await apiCall('/creators/me', {
      method: 'PUT',
      body
    });

    if (_cache.creators) {
      const idx = _cache.creators.findIndex(x => x.email === res.email || x.id === res.id);
      if (idx !== -1) {
        _cache.creators[idx] = getEnrichedCreator(res);
      } else {
        _cache.creators.push(getEnrichedCreator(res));
      }
    }
    const local = LS.get('cb_creators', []);
    const lIdx = local.findIndex(x => x.email === res.email || x.id === res.id);
    if (lIdx !== -1) {
      local[lIdx] = res;
    } else {
      local.push(res);
    }
    LS.set('cb_creators', local);

    return getEnrichedCreator(res);
  } catch (err) {
    const isNetworkError =
      err.name === 'TypeError' ||
      err.message?.includes('Failed to fetch') ||
      err.message?.includes('fetch') ||
      err.status === 404 ||
      err.status === 500 ||
      !navigator.onLine;

    if (isNetworkError) {
      console.warn('updateCreatorProfile: API offline/sleeping. Using local storage fallback.');
      
      const fallbackRes = {
        ...profileData,
        id: profileData.id || 'c-local-1',
        email: profileData.email || 'local-creator@creatorbharat.com'
      };

      if (_cache.creators) {
        const idx = _cache.creators.findIndex(x => x.email === fallbackRes.email || x.id === fallbackRes.id);
        if (idx !== -1) {
          _cache.creators[idx] = getEnrichedCreator(fallbackRes);
        } else {
          _cache.creators.push(getEnrichedCreator(fallbackRes));
        }
      }
      const local = LS.get('cb_creators', []);
      const lIdx = local.findIndex(x => x.email === fallbackRes.email || x.id === fallbackRes.id);
      if (lIdx !== -1) {
        local[lIdx] = fallbackRes;
      } else {
        local.push(fallbackRes);
      }
      LS.set('cb_creators', local);

      return getEnrichedCreator(fallbackRes);
    }
    console.error('updateCreatorProfile failed:', err.message);
    throw err;
  }
}

