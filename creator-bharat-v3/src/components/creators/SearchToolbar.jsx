import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Search, MapPin, Grid, List, Map as MapIcon, Settings, RefreshCw } from 'lucide-react';
import { W, ALL_STATES, INDIA_STATES } from '../../utils/helpers';

const CategorySelect = ({ niches, f, dsp }) => (
  <select
    id="toolbar-category-select"
    name="category_filter"
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
);

CategorySelect.propTypes = {
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired
};

const ViewSwitcher = ({ view, setView, isSticky, mob }) => {
  const btnSize = mob ? (isSticky ? 28 : 34) : (isSticky ? 38 : 44);
  const containerHeight = mob ? (isSticky ? 36 : 42) : (isSticky ? 48 : 54);
  const iconSize = mob ? (isSticky ? 13 : 15) : (isSticky ? 16 : 18);

  return (
    <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 100, height: containerHeight, alignItems: 'center' }}>
      <button aria-label="Grid view" onClick={() => setView('grid')} style={{ width: btnSize, height: btnSize, borderRadius: '50%', border: 'none', background: view === 'grid' ? '#fff' : 'transparent', color: view === 'grid' ? '#111' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: view === 'grid' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none' }}>
        <Grid size={iconSize} />
      </button>
      <button aria-label="List view" onClick={() => setView('list')} style={{ width: btnSize, height: btnSize, borderRadius: '50%', border: 'none', background: view === 'list' ? '#fff' : 'transparent', color: view === 'list' ? '#111' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: view === 'list' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none' }}>
        <List size={iconSize} />
      </button>
    </div>
  );
};

ViewSwitcher.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  isSticky: PropTypes.bool,
  mob: PropTypes.bool
};

const MobileQuickChips = ({ f, dsp, niches, clearFilters, hasFilters, setShowFilters }) => (
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
);

MobileQuickChips.propTypes = {
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired,
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
  clearFilters: PropTypes.func.isRequired,
  hasFilters: PropTypes.bool.isRequired,
  setShowFilters: PropTypes.func.isRequired
};

const LocationSelect = ({ f, dsp, isSticky }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#f8fafc', padding: '0 16px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.04)', height: isSticky ? 48 : 54 }}>
    <MapPin size={16} color="#FF9431" />
    <select
      id="toolbar-location-select"
      name="state_filter"
      value={f.state}
      onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })}
      style={{
        background: 'transparent', border: 'none', fontSize: isSticky ? 12 : 13, fontWeight: 700,
        color: f.state ? '#FF9431' : '#475569', outline: 'none', cursor: 'pointer'
      }}
    >
      <option value="">All States</option>
      {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  </div>
);

LocationSelect.propTypes = {
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired,
  isSticky: PropTypes.bool
};

const DistrictSelect = ({ f, dsp, isSticky }) => {
  const districts = f.state ? (INDIA_STATES[f.state] || []) : [];
  
  return (
    <div style={{ 
      display: 'flex', gap: 8, alignItems: 'center', background: '#f8fafc', 
      padding: '0 16px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.04)', 
      height: isSticky ? 48 : 54,
      opacity: f.state ? 1 : 0.6,
      pointerEvents: f.state ? 'auto' : 'none'
    }}>
      <MapPin size={16} color="#3B82F6" />
      <select
        id="toolbar-district-select"
        name="district_filter"
        value={f.district}
        onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })}
        disabled={!f.state}
        style={{
          background: 'transparent', border: 'none', fontSize: isSticky ? 12 : 13, fontWeight: 700,
          color: f.district ? '#3B82F6' : '#475569', outline: 'none', cursor: f.state ? 'pointer' : 'not-allowed'
        }}
      >
        <option value="">{f.state ? `All in ${f.state}` : 'Select State'}</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
    </div>
  );
};

DistrictSelect.propTypes = {
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired,
  isSticky: PropTypes.bool
};

const SearchInput = ({ mob, f, dsp, isSticky }) => (
  <div style={{ 
    display: 'flex', flex: mob ? 1 : '0 1 380px', minWidth: 0, background: '#fff', borderRadius: '24px', 
    border: '1.5px solid rgba(0,0,0,0.06)', overflow: 'hidden', height: mob ? (isSticky ? 44 : 54) : (isSticky ? 48 : 64),
    alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  }}
  onFocusCapture={e => e.currentTarget.style.borderColor = '#FF9431'}
  onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'}
  >
    <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
      <Search size={isSticky ? 18 : 22} color="#FF9431" style={{ position: 'absolute', left: isSticky ? 16 : 24 }} />
      <input
        id="toolbar-search-input"
        name="creator_search"
        value={f.q}
        onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })}
        placeholder={mob ? "Search talent..." : "Search elite talent by niche, name or city..."}
        style={{ 
          width: '100%', height: '100%', padding: isSticky ? '0 16px 0 46px' : '0 24px 0 64px', border: 'none', 
          background: 'transparent', fontSize: isSticky ? '14px' : '16px', fontWeight: 600, color: '#0f172a', outline: 'none' 
        }}
      />
    </div>
  </div>
);

SearchInput.propTypes = {
  mob: PropTypes.bool,
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired,
  isSticky: PropTypes.bool
};

const ToolbarButtons = ({ mob, showMap, setShowMap, setShowFilters, hasFilters, filterCount, isSticky }) => (
  <>
    <button
      onClick={() => setShowMap(!showMap)}
      style={{
        height: mob ? (isSticky ? 44 : 44) : (isSticky ? 48 : 54), width: mob ? 44 : 'auto', padding: mob ? 0 : '0 20px', borderRadius: 100,
        background: showMap ? '#111' : '#f8fafc',
        color: showMap ? '#fff' : '#475569',
        border: '1.5px solid ' + (showMap ? '#111' : 'rgba(0,0,0,0.04)'),
        fontWeight: 800, fontSize: isSticky ? 12 : 13, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: '0.2s'
      }}
    >
      <MapIcon size={18} />
      {!mob && (showMap ? 'Hide Map' : 'Map View')}
    </button>

    <button
      onClick={() => setShowFilters(true)}
      style={{
        height: mob ? (isSticky ? 44 : 44) : (isSticky ? 48 : 54), padding: mob ? '0 16px' : '0 24px', borderRadius: 100,
        background: hasFilters ? '#FF9431' : '#111', color: '#fff', border: 'none',
        fontWeight: 900, fontSize: isSticky ? 12 : 13, cursor: 'pointer',
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
          {filterCount}
        </span>
      )}
    </button>
  </>
);

ToolbarButtons.propTypes = {
  mob: PropTypes.bool,
  showMap: PropTypes.bool.isRequired,
  setShowMap: PropTypes.func.isRequired,
  setShowFilters: PropTypes.func.isRequired,
  hasFilters: PropTypes.bool.isRequired,
  filterCount: PropTypes.number.isRequired,
  isSticky: PropTypes.bool
};

const PLATFORM_ICONS = {
  'Instagram': '📸',
  'YouTube': '▶️',
  'Twitter': '🐦',
  'LinkedIn': '💼',
  'Snapchat': '👻',
  'Facebook': '📘',
};

const CategoryChips = ({ niches, platforms, f, dsp, mob, isSticky }) => {
  const selectedNiches = f?.niche || [];
  const selectedPlatforms = Array.isArray(f?.platform) ? f.platform : (f?.platform ? [f.platform] : []);
  const allClear = selectedNiches.length === 0 && selectedPlatforms.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isSticky ? 6 : 10, padding: isSticky ? '4px 0 0' : '16px 0 4px' }}>

      {/* ── Category chips ── */}
      <div
        style={{
          display: 'flex', gap: isSticky ? 6 : 8, overflowX: 'auto',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)'
        }}
        className="no-scrollbar"
      >
        {/* All Categories reset chip */}
        <button
          onClick={() => dsp?.({ t: 'CF', v: { niche: [] } })}
          style={{
            flexShrink: 0, padding: mob ? '7px 14px' : (isSticky ? '5px 12px' : '8px 18px'), borderRadius: 100,
            border: '1.5px solid ' + (selectedNiches.length === 0 ? '#0f172a' : 'rgba(0,0,0,0.06)'),
            background: selectedNiches.length === 0 ? '#0f172a' : '#fff',
            color: selectedNiches.length === 0 ? '#fff' : '#64748b',
            fontSize: mob ? 12 : (isSticky ? 11 : 13), fontWeight: 900, cursor: 'pointer',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
        >
          All Categories
        </button>
        {niches.map(n => {
          const isSel = selectedNiches.includes(n);
          return (
            <button
              key={n}
              onClick={() => dsp?.({ t: 'CF', v: { niche: isSel ? selectedNiches.filter(x => x !== n) : [...selectedNiches, n] } })}
              style={{
                flexShrink: 0, padding: mob ? '7px 14px' : (isSticky ? '5px 12px' : '8px 18px'), borderRadius: 100,
                border: '1.5px solid ' + (isSel ? '#FF9431' : 'rgba(0,0,0,0.06)'),
                background: isSel ? '#FF9431' : '#fff',
                color: isSel ? '#fff' : '#475569',
                fontSize: mob ? 12 : (isSticky ? 11 : 13), fontWeight: 800, cursor: 'pointer',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
                boxShadow: isSel ? '0 8px 16px rgba(255,148,49,0.2)' : 'none'
              }}
            >
              {n}
            </button>
          );
        })}
      </div>

      {/* ── Platform chips ── */}
      {platforms && platforms.length > 0 && (
        <div
          style={{
            display: 'flex', gap: isSticky ? 6 : 8, overflowX: 'auto',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
            maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)'
          }}
          className="no-scrollbar"
        >
          {/* All Social Media reset chip */}
          <button
            onClick={() => dsp?.({ t: 'CF', v: { platform: [] } })}
            style={{
              flexShrink: 0, padding: mob ? '7px 14px' : (isSticky ? '5px 12px' : '8px 18px'), borderRadius: 100,
              border: '1.5px solid ' + (selectedPlatforms.length === 0 ? '#0f172a' : 'rgba(0,0,0,0.06)'),
              background: selectedPlatforms.length === 0 ? '#0f172a' : '#fff',
              color: selectedPlatforms.length === 0 ? '#fff' : '#64748b',
              fontSize: mob ? 12 : (isSticky ? 11 : 13), fontWeight: 900, cursor: 'pointer',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            All Platforms
          </button>
          {platforms.map(p => {
            const isSel = selectedPlatforms.includes(p);
            return (
              <button
                key={p}
                onClick={() => dsp?.({ t: 'CF', v: { platform: isSel ? selectedPlatforms.filter(x => x !== p) : [...selectedPlatforms, p] } })}
                style={{
                  flexShrink: 0, padding: mob ? '7px 14px' : (isSticky ? '5px 12px' : '8px 18px'), borderRadius: 100,
                  border: '1.5px solid ' + (isSel ? '#3B82F6' : 'rgba(0,0,0,0.06)'),
                  background: isSel ? '#3B82F6' : '#fff',
                  color: isSel ? '#fff' : '#475569',
                  fontSize: mob ? 12 : (isSticky ? 11 : 13), fontWeight: 800, cursor: 'pointer',
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                  boxShadow: isSel ? '0 8px 16px rgba(59,130,246,0.2)' : 'none',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{ fontSize: 14 }}>{PLATFORM_ICONS[p] || '📱'}</span>
                {p}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

CategoryChips.propTypes = {
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
  platforms: PropTypes.arrayOf(PropTypes.string),
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  isSticky: PropTypes.bool
};

export default function SearchToolbar({ mob, f, dsp, setView, view, setShowMap, showMap, setShowFilters, niches, platforms }) {
  const filterCount = Object.values(f).filter(v =>
    Array.isArray(v) ? v.length > 0 : (v && v !== 'score' && v !== '' && v !== false)
  ).length;

  const hasFilters = filterCount > 0;

  const wrapperRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navVisibleRef = useRef(true);

  useEffect(() => {
    navVisibleRef.current = navVisible;
  }, [navVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const curY = window.scrollY;
      const diff = curY - lastScrollY.current;

      let nextNavVisible = navVisibleRef.current;
      const heroEl = document.querySelector('section');
      const heroHeight = heroEl ? heroEl.offsetHeight : 600;
      const threshold = heroHeight * 0.8;

      if (curY < threshold) {
        if (curY < 50) {
          nextNavVisible = true;
        } else if (diff > 10) {
          nextNavVisible = false;
        } else if (diff < -10) {
          nextNavVisible = true;
        }
      } else {
        nextNavVisible = false;
      }

      if (nextNavVisible !== navVisibleRef.current) {
        setNavVisible(nextNavVisible);
      }
      lastScrollY.current = curY;

      const triggerOffset = mob ? (nextNavVisible ? 60 : 0) : (nextNavVisible ? 72 : 0);

      if (rect.top <= triggerOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      const footer = document.querySelector('footer');
      if (footer && rect.top <= triggerOffset) {
        const footerRect = footer.getBoundingClientRect();
        const toolbarHeight = mob ? 194 : 158;
        if (footerRect.top <= toolbarHeight + 50) {
          setHideForFooter(true);
        } else {
          setHideForFooter(false);
        }
      } else {
        setHideForFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mob]);

  return (
    <div ref={wrapperRef} style={{ minHeight: isSticky ? (mob ? '72px' : '110px') : 'auto', width: '100%' }}>
      <div style={{
        position: isSticky ? 'fixed' : 'relative',
        top: isSticky ? (mob ? (navVisible ? '60px' : '0px') : (navVisible ? '72px' : '0px')) : 'auto',
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        padding: isSticky ? '10px 0' : '20px 0',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: (isSticky && hideForFooter) ? 'translateY(-120%)' : 'translateY(0)',
        opacity: (isSticky && hideForFooter) ? 0 : 1,
        pointerEvents: (isSticky && hideForFooter) ? 'none' : 'auto',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: isSticky ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px', display: 'flex', flexDirection: 'column', gap: isSticky ? '10px' : '16px', width: '100%' }}>
          <div style={{ display: 'flex', gap: mob ? '8px' : '16px', alignItems: 'center' }}>
            <SearchInput mob={mob} f={f} dsp={dsp} isSticky={isSticky} />

            {!mob && (
              <>
                <LocationSelect f={f} dsp={dsp} isSticky={isSticky} />
                <DistrictSelect f={f} dsp={dsp} isSticky={isSticky} />
              </>
            )}
            <ViewSwitcher view={view} setView={setView} isSticky={isSticky} mob={mob} />

            <div style={{ display: 'flex', gap: mob ? '8px' : '12px', flexShrink: 0, marginLeft: mob ? '0' : 'auto' }}>
              <ToolbarButtons
                mob={mob}
                showMap={showMap}
                setShowMap={setShowMap}
                setShowFilters={setShowFilters}
                hasFilters={hasFilters}
                filterCount={filterCount}
                isSticky={isSticky}
              />
            </div>
          </div>

          {!isSticky && (
            <CategoryChips niches={niches} platforms={platforms} f={f} dsp={dsp} mob={mob} isSticky={isSticky} />
          )}
        </div>
      </div>
    </div>
  );
}

SearchToolbar.propTypes = {
  mob: PropTypes.bool,
  f: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  setShowMap: PropTypes.func.isRequired,
  showMap: PropTypes.bool.isRequired,
  setShowFilters: PropTypes.func.isRequired,
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
  platforms: PropTypes.arrayOf(PropTypes.string),
};
