/**
 * useStateCreatorCounts.js
 * 
 * Hook that computes a { [stateName]: count } map from all creators.
 * Used by IndiaMap3D to show real creator counts per state on click.
 */

import { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';

export function useStateCreatorCounts() {
  const [stateCounts, setStateCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    apiCall('/stats/summary')
      .then(data => {
        if (cancelled) return;
        setStateCounts(data.stateCounts || {});
      })
      .catch(() => {
        if (!cancelled) setStateCounts({});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { stateCounts, loading };
}
