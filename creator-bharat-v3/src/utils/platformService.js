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

// ─── Creators ───────────────────────────────────────────────
export async function fetchCreators({ limit = 250 } = {}) {
  try {
    const res = await apiCall(`/creators?limit=${limit}`);
    const remote = res.creators || (Array.isArray(res) ? res : []);

    // Merge with locally registered creators (offline-first support)
    const local = LS.get('cb_creators', []);
    const merged = [...remote];
    local.forEach(lc => {
      if (!merged.some(c => c.id === lc.id || c.email === lc.email)) {
        merged.push(lc);
      }
    });

    return merged;
  } catch {
    // API unavailable — fall back to localStorage
    return LS.get('cb_creators', []);
  }
}

// ─── Campaigns ──────────────────────────────────────────────
export async function fetchCampaigns({ limit = 100 } = {}) {
  try {
    const res = await apiCall(`/campaigns?limit=${limit}`);
    return res.campaigns || (Array.isArray(res) ? res : []);
  } catch {
    return LS.get('cb_campaigns', []);
  }
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
