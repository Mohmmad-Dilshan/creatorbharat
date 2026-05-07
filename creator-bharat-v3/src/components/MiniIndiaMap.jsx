/**
 * MiniIndiaMap.jsx
 *
 * A compact, self-contained D3 India map for embedding inside sections.
 * Same GeoJSON as IndiaMap3D but renders at a small fixed size.
 * No section wrapper, no scroll animations — pure map SVG.
 *
 * Props:
 *   width   {Number} — SVG render width  (default 160)
 *   height  {Number} — SVG render height (default 190)
 */

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const GEOJSON_URL = '/india_states.json';

export default function MiniIndiaMap({ width = 160, height = 190 }) {
  const svgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      try {
        const [d3Module, res] = await Promise.all([
          import('d3'),
          fetch(GEOJSON_URL),
        ]);
        if (cancelled) return;

        const d3 = d3Module.default || d3Module;
        const geojson = await res.json();
        const features = geojson.features || (Array.isArray(geojson) ? geojson : []);
        if (!features.length || !svgRef.current) return;

        const projection = d3.geoMercator()
          .center([82.5, 22.5])
          .scale(300)
          .translate([width / 2, height / 2]);

        const pathGen = d3.geoPath().projection(projection);
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Gradient def
        const defs = svg.append('defs');
        const grad = defs.append('linearGradient')
          .attr('id', 'miniMapGrad')
          .attr('x1', '0%').attr('y1', '0%')
          .attr('x2', '100%').attr('y2', '100%');
        grad.append('stop').attr('offset', '0%').attr('stop-color', '#FF9431').attr('stop-opacity', 0.85);
        grad.append('stop').attr('offset', '100%').attr('stop-color', '#10B981').attr('stop-opacity', 0.75);

        // Drop shadow filter
        const filter = defs.append('filter').attr('id', 'miniGlow');
        filter.append('feGaussianBlur').attr('stdDeviation', '2').attr('result', 'blur');
        filter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur');

        svg.append('g')
          .selectAll('path')
          .data(features)
          .join('path')
          .attr('d', pathGen)
          .attr('fill', 'url(#miniMapGrad)')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.6)
          .attr('stroke-opacity', 0.8)
          .style('cursor', 'default')
          .on('mouseover', function (_, d) {
            d3.select(this).attr('fill', '#FF9431').attr('fill-opacity', 1);
            setHoveredState(d.properties?.name || '');
          })
          .on('mouseout', function () {
            d3.select(this).attr('fill', 'url(#miniMapGrad)').attr('fill-opacity', 1);
            setHoveredState(null);
          });

        setLoaded(true);
      } catch (e) {
        console.warn('MiniIndiaMap: failed to load', e);
      }
    }

    draw();
    return () => { cancelled = true; };
  }, [width, height]);

  return (
    <div style={{ position: 'relative', width, height, flexShrink: 0 }}>
      {/* Glow backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(255,148,49,0.12) 0%, transparent 70%)', borderRadius: 16, zIndex: 0 }} />

      {/* Loading shimmer */}
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid rgba(255,148,49,0.2)', borderTopColor: '#FF9431', animation: 'miniSpin 0.9s linear infinite' }} />
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 6px 20px rgba(255,148,49,0.25))' }}
      />

      {/* Hover tooltip */}
      {hoveredState && (
        <div style={{ position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap', zIndex: 10 }}>
          {hoveredState}
        </div>
      )}

      <style>{`
        @keyframes miniSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

MiniIndiaMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};
