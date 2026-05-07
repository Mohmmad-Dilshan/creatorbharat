/**
 * useStateCreatorCounts.js
 * 
 * Hook that computes a { [stateName]: count } map from all creators.
 * Used by IndiaMap3D to show real creator counts per state on click.
 */

import { useState, useEffect } from 'react';
import { fetchCreators } from '../utils/platformService';

export function useStateCreatorCounts() {
  const [stateCounts, setStateCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchCreators({ limit: 500 })
      .then(creators => {
        if (cancelled) return;

        // Build { "Rajasthan": 42, "Maharashtra": 87, ... }
        const counts = {};
        creators.forEach(c => {
          const state = c.state;
          if (!state) return;
          counts[state] = (counts[state] || 0) + 1;
        });

        setStateCounts(counts);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { stateCounts, loading };
}
