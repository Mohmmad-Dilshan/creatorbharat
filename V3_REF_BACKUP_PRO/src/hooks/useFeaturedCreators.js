/**
 * useFeaturedCreators.js
 * 
 * Custom hook — fetches the top 10 creators for the homepage.
 * HomePage stays clean, zero fetch logic inside it.
 */

import { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';
import { LS } from '../utils/helpers';

export function useFeaturedCreators(limit = 10) {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    apiCall(`/creators?limit=${limit}`)
      .then(d => {
        if (cancelled) return;
        const remote = Array.isArray(d) ? d : (d.creators || []);
        const list = remote.length > 0 ? remote : LS.get('cb_creators', []).slice(0, limit);
        setCreators(list);
      })
      .catch(() => {
        if (!cancelled) setCreators(LS.get('cb_creators', []).slice(0, limit));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [limit]);

  return { creators, loading };
}
