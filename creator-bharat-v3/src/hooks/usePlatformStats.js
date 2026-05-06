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
import { fetchCreators, fetchCampaigns, derivePlatformAnalytics } from '../utils/platformService';

export function usePlatformStats() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [creators, campaigns] = await Promise.all([
        fetchCreators(),
        fetchCampaigns(),
      ]);
      setAnalytics(derivePlatformAnalytics(creators, campaigns));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { analytics, loading, error, lastUpdated, refresh };
}
