import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CreatorCard } from '@/components/common/Cards';
import { SkeletonCard, Empty, Bdg } from '@/components/common/Primitives';
import { fmt } from '../../utils/helpers';
import { TrendingUp, Activity, Star } from 'lucide-react';

const SearchInsights = ({ avgReach, avgER, count }) => (
  <div style={{ 
    display: 'flex', gap: 24, padding: '20px 32px', 
    background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0,0,0,0.05)', borderRadius: 24,
    alignItems: 'center'
  }}>
    <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Search Results Summary</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.03)' }}>
      <TrendingUp size={16} color="#3B82F6" />
      <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>{fmt.num(avgReach)} <span style={{ color: '#64748b', fontWeight: 600 }}>Avg Reach</span></span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.03)' }}>
      <Activity size={16} color="#10B981" />
      <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>{avgER}% <span style={{ color: '#64748b', fontWeight: 600 }}>Avg Engagement</span></span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.03)' }}>
      <Star size={16} color="#FF9431" />
      <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>{count} <span style={{ color: '#64748b', fontWeight: 600 }}>Creators Found</span></span>
    </div>
  </div>
);

SearchInsights.propTypes = {
  avgReach: PropTypes.number.isRequired,
  avgER: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

const CreatorListItem = ({ c, i, mob, onCardView }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: (i % 15) * 0.02 }}
    onClick={() => onCardView(c)}
    style={{
      padding: mob ? '16px' : '16px 24px', background: '#fff', borderRadius: 24,
      border: '1px solid rgba(0,0,0,0.04)',
      display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s',
      boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
    }}
    onMouseEnter={e => { if (!mob) { e.currentTarget.style.borderColor = '#FF9431'; e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.05)'; } }}
    onMouseLeave={e => { if (!mob) { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; } }}
  >
    <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: 16 }}>
      <img 
        src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} 
        alt={`${c.name} profile`}
        style={{ width: mob ? 48 : 60, height: mob ? 48 : 60, borderRadius: 16, objectFit: 'cover', background: '#f1f5f9' }} 
      />
      <div>
        <p style={{ fontSize: mob ? 15 : 18, fontWeight: 800, color: '#111' }}>{c.name} {c.verified && '✅'}</p>
        <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>@{c.handle || 'creator'}</p>
      </div>
    </div>
    {!mob && (
      <>
        <span style={{ flex: 1, fontSize: 14, color: '#475569', fontWeight: 600 }}>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</span>
        <span style={{ flex: 1, fontSize: 14, color: '#475569', fontWeight: 600 }}>{(Array.isArray(c.niche) ? c.niche : [c.niche]).slice(0, 1).join('')}</span>
        <span style={{ flex: 1, fontSize: 14, color: '#1e293b', fontWeight: 800 }}>{fmt.num(c.followers || 0)}</span>
        <div style={{ width: 100, textAlign: 'right' }}>
          <Bdg color="saffron">{c.score || fmt.score(c)}</Bdg>
        </div>
      </>
    )}
    {mob && (
      <div style={{ textAlign: 'right', flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 950, color: '#111' }}>{fmt.num(c.followers)}</div>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', marginBottom: 4 }}>FOLLOWERS</div>
        <Bdg color="orange" sm>{c.score || fmt.score(c)}</Bdg>
      </div>
    )}
  </motion.div>
);

CreatorListItem.propTypes = {
  c: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  mob: PropTypes.bool,
  onCardView: PropTypes.func.isRequired
};

const GatedGridFooter = ({ title, description, onUnlock }) => (
  <div style={{
    marginTop: '40px',
    padding: '60px 40px',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.95) 100%)',
    backdropFilter: 'blur(16px)',
    borderRadius: '32px',
    border: '1.5px solid rgba(255, 148, 49, 0.2)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(255, 148, 49, 0.05)'
  }}>
    <div style={{
      position: 'absolute',
      top: '-50%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120%',
      height: '150%',
      background: 'radial-gradient(ellipse at top, rgba(255, 148, 49, 0.1) 0%, transparent 60%)',
      pointerEvents: 'none'
    }} />
    
    <div style={{
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FF9431',
        boxShadow: '0 10px 25px rgba(255, 148, 49, 0.15)',
        border: '1.5px solid rgba(255, 148, 49, 0.1)'
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '28px', 
          fontWeight: 950, 
          background: 'linear-gradient(90deg, #FF9431, #EA580C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px', 
          letterSpacing: '-0.03em' 
        }}>
          {title}
        </h3>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, fontWeight: 600, margin: 0 }}>
          {description}
        </p>
      </div>

      <button
        onClick={onUnlock}
        style={{
          background: '#0f172a',
          color: '#fff',
          border: 'none',
          padding: '16px 40px',
          borderRadius: '100px',
          fontSize: '15px',
          fontWeight: 850,
          cursor: 'pointer',
          boxShadow: '0 12px 28px rgba(15, 23, 42, 0.15)',
          transition: 'transform 0.2s',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px'
        }}
      >
        Unlock Full Talent Pool
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  </div>
);

GatedGridFooter.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUnlock: PropTypes.func.isRequired
};

export default function CreatorGrid({ loading, filtered, visible, view, mob, onCardView, limit, setLimit, clearFilters, isGated = false, onUnlock }) {
  if (loading) {
    let gridCols = '1fr';
    if (mob) gridCols = 'repeat(2, 1fr)';
    else if (view === 'grid') gridCols = 'repeat(auto-fill, minmax(340px, 1fr))';

    return (
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: mob ? 12 : 32 }}>
        {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={`elite-sk-${Math.sqrt(i + 1).toFixed(4)}`} mob={mob} />)}
      </div>
    );
  }

  if (filtered.length === 0) return (
    <div style={{ padding: '80px 0' }}>
      <Empty icon="🔍" title="No matching creators found" sub="Try adjusting your filters or search query to explore more elite talent." ctaLabel="Clear all filters" onCta={clearFilters} />
    </div>
  );

  const avgReach = filtered.length > 0 ? Math.round(filtered.reduce((sum, c) => sum + (Number(c.followers) || 0), 0) / filtered.length) : 0;
  const avgER = filtered.length > 0 ? (filtered.reduce((sum, c) => sum + (Number.parseFloat(c.er) || 0), 0) / filtered.length).toFixed(1) : 0;

  const getGridColumns = () => {
    if (mob) return 'repeat(2, 1fr)';
    return 'repeat(auto-fill, minmax(340px, 1fr))';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 24 : 32 }}>
      {/* Search Insights Panel */}
      {!mob && <SearchInsights avgReach={avgReach} avgER={avgER} count={filtered.length} />}

      {view === 'grid' ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: getGridColumns(), 
          gap: mob ? 10 : 32 
        }}>
          {visible.map((c, i) => (
            <motion.div
              key={c.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <CreatorCard creator={c} onView={() => onCardView(c)} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!mob && (
            <div style={{ display: 'flex', padding: '0 24px 12px', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span style={{ flex: 1.5 }}>Creator Profile</span>
              <span style={{ flex: 1 }}>Location</span>
              <span style={{ flex: 1 }}>Category</span>
              <span style={{ flex: 1 }}>Reach</span>
              <span style={{ width: 100, textAlign: 'right' }}>Elite Score</span>
            </div>
          )}
          {visible.map((c, i) => (
            <CreatorListItem key={c.id || i} c={c} i={i} mob={mob} onCardView={onCardView} />
          ))}
        </div>
      )}

      {isGated ? (
        <GatedGridFooter 
          title={`Unlock ${filtered.length} Verified Creators`}
          description="Sign in as a verified Brand to search, filter, and view our complete database of elite digital creators across India."
          onUnlock={onUnlock}
        />
      ) : visible.length < filtered.length && (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button
            onClick={() => setLimit(prev => prev + 12)}
            style={{
              padding: '18px 48px', borderRadius: 100, background: '#111', color: '#fff',
              fontSize: 15, fontWeight: 900, border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: '0.3s'
            }}
          >
            Explore More Creators
          </button>
          <p style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: '#94a3b8' }}>
            Showing {visible.length} of {filtered.length} elite creators
          </p>
        </div>
      )}
    </div>
  );
}

CreatorGrid.propTypes = {
  loading: PropTypes.bool,
  filtered: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired,
  mob: PropTypes.bool,
  onCardView: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  isGated: PropTypes.bool,
  onUnlock: PropTypes.func
};
