/**
 * useFeaturedCreators.js
 * 
 * Custom hook — fetches the top 10 creators for the homepage.
 * HomePage stays clean, zero fetch logic inside it.
 */

import { useState, useEffect } from 'react';
import { fetchCreators } from '../utils/platformService';

export function useFeaturedCreators(limit = 10) {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchCreators({ limit })
      .then(list => {
        if (cancelled) return;
        setCreators(list.slice(0, limit));
      })
      .catch(() => {
        // fetchCreators handles its own fallbacks, but we'll be safe
        if (!cancelled) setCreators([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [limit]);

  return { creators, loading };
}
