import React from 'react';
import { Search, MapPin, Grid, List, Map as MapIcon, Settings, RefreshCw } from 'lucide-react';
import { W, ALL_STATES, INDIA_STATES } from '../../utils/helpers';
import { T } from '../../theme';

export default function SearchToolbar({ mob, f, dsp, setView, view, setShowMap, showMap, setShowFilters, niches }) {
  const clearFilters = () => dsp({ t: 'CF', v: { q: '', niche: [], state: '', district: '', platform: [], verified: false, minFollowers: '', sort: 'score', gender: '', language: '', minER: '' } });
  const hasFilters = Object.values(f).some(v => Array.isArray(v) ? v.length > 0 : (v && v !== 'score' && v !== '' && v !== false));

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      padding: mob ? '10px 0 12px' : '16px 0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px', display: 'flex', flexDirection: 'column', gap: mob ? 14 : 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Main Search Area */}
          <div style={{ 
            display: 'flex', flex: 1, background: '#f8fafc', borderRadius: 100, 
            border: '1.5px solid rgba(0,0,0,0.04)', overflow: 'hidden', height: mob ? 44 : 54,
            alignItems: 'center'
          }}>
            {!mob && (
              <select
                value=""
                onChange={e => {
                  const val = e.target.value;
                  if (val && !f.niche.includes(val)) dsp({ t: 'CF', v: { niche: [...f.niche, val] } });
                }}
                style={{
                  padding: '0 20px', border: 'none', borderRight: '1.5px solid rgba(0,0,0,0.08)',
                  background: 'transparent', fontSize: 13, fontWeight: 700,
                  color: '#111', outline: 'none', cursor: 'pointer', minWidth: 160,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <option value="">Categories</option>
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            )}
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 18 }} />
              <input
                value={f.q}
                onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })}
                placeholder={mob ? "Search talent..." : "Search elite talent by niche, name or city..."}
                style={{ 
                  width: '100%', height: '100%', padding: '0 24px 0 48px', border: 'none', 
                  background: 'transparent', fontSize: 14, fontWeight: 600, color: '#111', outline: 'none' 
                }}
              />
            </div>
          </div>

          {!mob && (
            <>
              {/* Location Selectors */}
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#f8fafc', padding: '0 16px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.04)', height: 54 }}>
                  <MapPin size={16} color="#FF9431" />
                  <select
                    value={f.state}
                    onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })}
                    style={{
                      background: 'transparent', border: 'none', fontSize: 13, fontWeight: 700,
                      color: f.state ? '#FF9431' : '#475569', outline: 'none', cursor: 'pointer'
                    }}
                  >
                    <option value="">All States</option>
                    {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* View Switcher */}
              <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 100, height: 54, alignItems: 'center' }}>
                <button onClick={() => setView('grid')} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: view === 'grid' ? '#fff' : 'transparent', color: view === 'grid' ? '#111' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: view === 'grid' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none' }}>
                  <Grid size={18} />
                </button>
                <button onClick={() => setView('list')} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: view === 'list' ? '#fff' : 'transparent', color: view === 'list' ? '#111' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: view === 'list' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none' }}>
                  <List size={18} />
                </button>
              </div>
            </>
          )}

          {/* Map & Advanced Toggles */}
          <button
            onClick={() => setShowMap(!showMap)}
            style={{
              height: mob ? 44 : 54, width: mob ? 44 : 'auto', padding: mob ? 0 : '0 20px', borderRadius: 100,
              background: showMap ? '#111' : '#f8fafc',
              color: showMap ? '#fff' : '#475569',
              border: '1.5px solid ' + (showMap ? '#111' : 'rgba(0,0,0,0.04)'),
              fontWeight: 800, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: '0.2s'
            }}
          >
            <MapIcon size={18} />
            {!mob && (showMap ? 'Hide Map' : 'Map View')}
          </button>

          <button
            onClick={() => setShowFilters(true)}
            style={{
              height: mob ? 44 : 54, padding: mob ? '0 16px' : '0 24px', borderRadius: 100,
              background: hasFilters ? '#FF9431' : '#111', color: '#fff', border: 'none',
              fontWeight: 900, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10, transition: '0.2s',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <Settings size={18} />
            {!mob && 'Advanced Filters'}
            {hasFilters && (
              <span style={{ 
                background: '#fff', color: '#FF9431', fontSize: 10, padding: '2px 6px', 
                borderRadius: 100, fontWeight: 900, marginLeft: 4 
              }}>
                {Object.values(f).filter(v => Array.isArray(v) ? v.length > 0 : (v && v !== 'score' && v !== '' && v !== false)).length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Quick Chips */}
        {mob && (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {hasFilters && (
              <button onClick={clearFilters} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 100, background: '#FEF2F2', color: '#EF4444', border: '1.5px solid rgba(239,68,68,0.1)', fontSize: 12, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }}>
                <RefreshCw size={14} /> Reset
              </button>
            )}
            <button onClick={() => setShowFilters(true)} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.06)', background: '#fff', color: '#111', fontSize: 12, fontWeight: 800 }}>
              📍 {f.district || f.state || 'All India'}
            </button>
            {niches.slice(0, 5).map(n => {
               const isSel = f.niche.includes(n);
               return (
                 <button key={n} onClick={() => dsp({ t: 'CF', v: { niche: isSel ? f.niche.filter(x => x !== n) : [...f.niche, n] } })} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 100, border: '1.5px solid ' + (isSel ? '#FF9431' : 'rgba(0,0,0,0.06)'), background: isSel ? '#FF9431' : '#fff', color: isSel ? '#fff' : '#64748b', fontSize: 12, fontWeight: 800 }}>
                   {n}
                 </button>
               );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
