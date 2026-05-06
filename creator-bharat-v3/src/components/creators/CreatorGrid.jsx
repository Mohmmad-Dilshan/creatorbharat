import React from 'react';
import { motion } from 'framer-motion';
import { CreatorCard } from '../Cards';
import { SkeletonCard, Empty, Bdg } from '../Primitives';
import { fmt } from '../../utils/helpers';
import { TrendingUp, Activity, Star } from 'lucide-react';

export default function CreatorGrid({ loading, filtered, visible, view, mob, onCardView, limit, setLimit, clearFilters }) {
  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : (view === 'grid' ? 'repeat(auto-fill, minmax(340px, 1fr))' : '1fr'), gap: mob ? 12 : 32 }}>
      {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
    </div>
  );

  if (filtered.length === 0) return (
    <div style={{ padding: '80px 0' }}>
      <Empty icon="🔍" title="No matching creators found" sub="Try adjusting your filters or search query to explore more elite talent." ctaLabel="Clear all filters" onCta={clearFilters} />
    </div>
  );

  const avgReach = filtered.length > 0 ? Math.round(filtered.reduce((sum, c) => sum + (Number(c.followers) || 0), 0) / filtered.length) : 0;
  const avgER = filtered.length > 0 ? (filtered.reduce((sum, c) => sum + (parseFloat(c.er) || 0), 0) / filtered.length).toFixed(1) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Search Insights Panel */}
      {!mob && (
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
            <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>{filtered.length} <span style={{ color: '#64748b', fontWeight: 600 }}>Creators Found</span></span>
          </div>
        </div>
      )}

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: mob ? 12 : 32 }}>
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
            <motion.div
              key={c.id || i}
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
                <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} style={{ width: mob ? 48 : 60, height: mob ? 48 : 60, borderRadius: 16, objectFit: 'cover', background: '#f1f5f9' }} />
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
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#111' }}>{fmt.num(c.followers)}</div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8' }}>REACH</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {visible.length < filtered.length && (
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
