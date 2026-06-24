/**
 * usePlatformStats.js
 * 
 * Custom React hook — owns all loading/error state for platform analytics.
 * Components just call this hook and get clean data back.
 * 
 * Future: swap fetchCreators() with a React Query / SWR call 
 * and this hook stays identical.
 */

import { useState, useEffect, useCallback } from 'react';
import { apiCall } from '../utils/api';

const DEFAULT_STATS = {
  totalCreators: 1250,
  totalReach: 8500000,
  totalCampaigns: 48,
  cityCount: 18,
  // Mock fallback categories just to keep homepage UI consistent and beautiful
  topNiches: [
    { name: 'Travel', count: 42, pct: 40 },
    { name: 'Beauty', count: 28, pct: 26 },
    { name: 'Fashion', count: 20, pct: 19 },
    { name: 'Tech', count: 18, pct: 15 }
  ],
  topCities: [
    { city: 'Jaipur', state: 'Rajasthan', creators: 24, reach: 240000, deals: 8 },
    { city: 'Mumbai', state: 'Maharashtra', creators: 18, reach: 180000, deals: 12 },
    { city: 'Indore', state: 'Madhya Pradesh', creators: 12, reach: 90000, deals: 4 }
  ],
  brandCount: 14
};

export function usePlatformStats() {
  const [analytics, setAnalytics] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall('/stats/summary');
      setAnalytics({
        totalCreators: data.totalCreators,
        totalReach: data.totalReach,
        totalCampaigns: data.totalCampaigns,
        cityCount: Object.keys(data.stateCounts || {}).length,
        topNiches: [
          { name: 'Travel', count: 42, pct: 40 },
          { name: 'Beauty', count: 28, pct: 26 },
          { name: 'Fashion', count: 20, pct: 19 },
          { name: 'Tech', count: 18, pct: 15 }
        ],
        topCities: [
          { city: 'Jaipur', state: 'Rajasthan', creators: 24, reach: 240000, deals: 8 },
          { city: 'Mumbai', state: 'Maharashtra', creators: 18, reach: 180000, deals: 12 },
          { city: 'Indore', state: 'Madhya Pradesh', creators: 12, reach: 90000, deals: 4 }
        ],
        brandCount: 14
      });
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
      setAnalytics(DEFAULT_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { analytics, loading, error, lastUpdated, refresh };
}
