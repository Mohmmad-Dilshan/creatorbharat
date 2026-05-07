/**
 * FeaturedCreators.jsx
 *
 * Displays an Instagram-style horizontal scroll of suggested creators.
 */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { W, fmt } from '../../utils/helpers';
import { ChevronLeft, ChevronRight, UserPlus, Check } from 'lucide-react';

// Smart tag from real data
function getTag(c) {
  const f = Number(c.followers || 0);
  const er = Number(c.er || 0);
  if (f >= 500000) return { label: 'Mega', color: '#8B5CF6' };
  if (er >= 8)     return { label: 'Top ER', color: '#EF4444' };
  if (f >= 100000) return { label: 'Macro', color: '#3B82F6' };
  if (f >= 50000)  return { label: 'Rising', color: '#10B981' };
  return           { label: 'Creator', color: '#FF9431' };
}

const FALLBACK = [
  { id: 'f1', name: 'Rahul Sharma',  city: 'Bhilwara', niche: 'Fashion',  followers: 84000,  er: 5.2, profile_pic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { id: 'f2', name: 'Priya Mehta',   city: 'Indore',   niche: 'Lifestyle',followers: 210000, er: 4.8, profile_pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { id: 'f3', name: 'Amit Gupta',    city: 'Lucknow',  niche: 'Tech',     followers: 56000,  er: 9.1, profile_pic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { id: 'f4', name: 'Neha Singh',    city: 'Surat',    niche: 'Food',     followers: 132000, er: 6.3, profile_pic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' },
  { id: 'f5', name: 'Vikram Rajput', city: 'Bhopal',   niche: 'Travel',   followers: 47000,  er: 7.8, profile_pic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
  { id: 'f6', name: 'Anjali Verma',  city: 'Nashik',   niche: 'Fitness',  followers: 91000,  er: 5.5, profile_pic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80' },
  { id: 'f7', name: 'Rohan Joshi',   city: 'Nagpur',   niche: 'Gaming',   followers: 320000, er: 3.9, profile_pic: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80' },
  { id: 'f8', name: 'Sneha Patil',   city: 'Kolhapur', niche: 'Beauty',   followers: 68000,  er: 8.4, profile_pic: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80' },
];

function AvatarWithGradient({ c, go, mob }) {
  return (
    <button
      aria-label={`View ${c.name}'s profile`}
      onClick={() => go('creator-profile', { creator: c })}
      style={{
        padding: 3,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        cursor: 'pointer',
        flexShrink: 0,
        border: 'none'
      }}
    >
      <div style={{ padding: 2, background: '#fff', borderRadius: '50%' }}>
        <div style={{ width: mob ? 68 : 80, height: mob ? 68 : 80, borderRadius: '50%', overflow: 'hidden', background: '#F1F5F9' }}>
          <img
            src={c.profile_pic || c.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name || 'CB')}&backgroundColor=FF9431&textColor=ffffff`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt={c.name}
            onError={e => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name || 'CB')}&backgroundColor=0f172a&textColor=ffffff`; }}
          />
        </div>
      </div>
    </button>
  );
}

AvatarWithGradient.propTypes = {
  c: PropTypes.object.isRequired,
  go: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

function CreatorCard({ c, go, mob }) {
  const [connected, setConnected] = useState(false);
  const tag = getTag(c);
  const niche = Array.isArray(c.niche) ? c.niche[0] : (c.niche || 'Creator');
  const handle = '@' + (c.name || 'creator')
    .toLowerCase()
    .replaceAll(/\s+/g, '_')
    .replaceAll(/[^a-z0-9_]/g, '');

  function handleConnect() {
    setConnected(prev => !prev);
    if (!connected) go('creator-profile', { creator: c });
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      border: '1px solid #EFEFEF',
      padding: mob ? '20px 16px' : '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      width: mob ? 148 : 176,
      flexShrink: 0,
      transition: 'all 0.25s',
      cursor: 'default',
      position: 'relative',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    }}
    className="suggest-card"
    >
      <div style={{ position: 'absolute', top: 12, right: 12, background: tag.color, color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 100, zIndex: 2 }}>
        {tag.label}
      </div>

      <AvatarWithGradient c={c} go={go} mob={mob} />

      <div style={{ textAlign: 'center', width: '100%' }}>
        <button
          aria-label={`View ${c.name}'s profile`}
          onClick={() => go('creator-profile', { creator: c })}
          style={{ 
            fontSize: mob ? 13 : 14, fontWeight: 800, color: '#0f172a', 
            cursor: 'pointer', marginBottom: 2, whiteSpace: 'nowrap', 
            overflow: 'hidden', textOverflow: 'ellipsis', display: 'block',
            width: '100%', border: 'none', background: 'none', padding: 0
          }}
        >
          {c.name || 'Creator'}
        </button>
        <div style={{ fontSize: 11, color: '#8e8e8e', fontWeight: 400, marginBottom: 4 }}>
          {handle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8' }}>{c.city || 'India'}</span>
          {c.followers > 0 && (
            <>
              <span style={{ color: '#e2e8f0', fontSize: 10 }}>·</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#FF9431' }}>{fmt.num(c.followers)}</span>
            </>
          )}
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{niche}</div>
      </div>

      <button
        onClick={handleConnect}
        style={{
          width: '100%',
          padding: '9px 0',
          borderRadius: 10,
          border: connected ? '1px solid #DBDBDB' : 'none',
          background: connected ? '#fff' : 'linear-gradient(135deg, #FF9431, #FF6B00)',
          color: connected ? '#0f172a' : '#fff',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: 'all 0.2s',
        }}
      >
        {connected
          ? <><Check size={13} strokeWidth={2.5} /> Connected</>
          : <><UserPlus size={13} strokeWidth={2.5} /> Connect</>
        }
      </button>
    </div>
  );
}

CreatorCard.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    niche: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    followers: PropTypes.number,
    er: PropTypes.number,
    profile_pic: PropTypes.string,
    avatarUrl: PropTypes.string
  }).isRequired,
  go: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

function SectionHeader({ loading, isFallback, listCount, mob, go, displayList, scroll }) {
  const getEyebrowText = () => {
    if (loading) return 'Loading...';
    if (isFallback) return 'Sample · Join to get listed';
    return `${listCount} Creators · Live`;
  };

  return (
    <div style={{ marginBottom: mob ? 20 : 32, padding: mob ? '0 4px' : 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: 100, marginBottom: 14 }}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: loading ? '#F59E0B' : '#10B981', display: 'block', zIndex: 1 }} />
              {!loading && <span style={{ position: 'absolute', inset: -1, borderRadius: '50%', background: 'rgba(16,185,129,0.4)', animation: 'ping 2s ease-out infinite' }} />}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              {getEyebrowText()}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 26 : 40, fontWeight: 900, color: '#0f172a', margin: '0 0 10px 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            {mob ? (
              <>Creators You'll <br /><span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #EF4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Love to Work With</span></>
            ) : (
              <>Creators You'll <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #EF4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Love to Work With</span></>
            )}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {displayList.slice(0, 4).map((c, i) => (
                <div key={`mini-${c.id || i}`} style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', marginLeft: i === 0 ? 0 : -8, background: '#F1F5F9', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
                  <img
                    src={c.profile_pic || c.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name || 'C')}&backgroundColor=FF9431&textColor=ffffff`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt=""
                    onError={e => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${i}&backgroundColor=0f172a&textColor=ffffff`; }}
                  />
                </div>
              ))}
              {displayList.length > 4 && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0f172a', border: '2px solid #fff', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>
                  +{displayList.length - 4}
                </div>
              )}
            </div>
            <p style={{ fontSize: mob ? 12 : 13, color: '#64748b', margin: 0, fontWeight: 400 }}>
              Verified creators from Tier 2 & 3 cities across Bharat
            </p>
          </div>
        </div>

        {!mob && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
            <button aria-label="Scroll left" onClick={() => scroll(-1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} className="scroll-btn">
              <ChevronLeft size={18} color="#0f172a" />
            </button>
            <button aria-label="Scroll right" onClick={() => scroll(1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} className="scroll-btn">
              <ChevronRight size={18} color="#0f172a" />
            </button>
            <button onClick={() => go('creators')} style={{ fontSize: 13, fontWeight: 700, color: '#FF9431', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 4, whiteSpace: 'nowrap' }}>
              See all →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

SectionHeader.propTypes = {
  loading: PropTypes.bool,
  isFallback: PropTypes.bool,
  listCount: PropTypes.number,
  mob: PropTypes.bool,
  go: PropTypes.func.isRequired,
  displayList: PropTypes.array.isRequired,
  scroll: PropTypes.func.isRequired
};

export default function FeaturedCreators({ mob, creators, go, loading }) {
  const scrollRef = useRef(null);
  const displayList = (creators && creators.length > 0) ? creators : FALLBACK;
  const isFallback = !creators || creators.length === 0;

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * (mob ? 160 : 200), behavior: 'smooth' });
  };

  return (
    <section style={{ padding: mob ? '16px 0 24px 0' : '0 0 64px 0', background: '#fff' }}>
      <div style={{ ...W(), maxWidth: 1200, boxSizing: 'border-box' }}>
        <SectionHeader 
          loading={loading}
          isFallback={isFallback}
          listCount={displayList.length}
          mob={mob}
          go={go}
          displayList={loading ? FALLBACK : displayList}
          scroll={scroll}
        />

        <div style={{ position: 'relative' }}>
          {!mob && <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg, transparent, #fff)', zIndex: 5, pointerEvents: 'none' }} />}

          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: mob ? 12 : 16,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 8,
              paddingRight: mob ? 16 : 80,
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
            className="suggest-scroll"
          >
            {loading
              ? [0,1,2,3,4].map(i => (
                  <div key={`skel-${i}`} style={{ width: mob ? 148 : 176, flexShrink: 0, background: '#fff', borderRadius: 20, border: '1px solid #EFEFEF', padding: mob ? '20px 16px' : '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: mob ? 74 : 86, height: mob ? 74 : 86, borderRadius: '50%', background: '#F1F5F9', animation: 'shimmer 1.5s infinite' }} />
                    <div style={{ width: '70%', height: 12, borderRadius: 6, background: '#F1F5F9', animation: 'shimmer 1.5s infinite' }} />
                    <div style={{ width: '50%', height: 10, borderRadius: 6, background: '#F1F5F9', animation: 'shimmer 1.5s infinite' }} />
                    <div style={{ width: '100%', height: 36, borderRadius: 10, background: '#F1F5F9', animation: 'shimmer 1.5s infinite' }} />
                  </div>
                ))
              : displayList.map((c, i) => (
                  <div key={c.id || `cre-${i}`} style={{ scrollSnapAlign: 'start' }}>
                    <CreatorCard c={c} go={go} mob={mob} />
                  </div>
                ))
            }
          </div>
        </div>

        {mob && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button onClick={() => go('creators')} style={{ fontSize: 13, fontWeight: 700, color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer' }}>
              See all creators →
            </button>
          </div>
        )}
      </div>

      <style>{`
        .suggest-scroll::-webkit-scrollbar { display: none; }
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ping { 75%,100%{transform:scale(2.5);opacity:0} }
        .suggest-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08) !important;
          border-color: #DBDBDB !important;
        }
        .scroll-btn:hover {
          background: #F8FAFC !important;
          border-color: #CBD5E1 !important;
        }
      `}</style>
    </section>
  );
}

FeaturedCreators.propTypes = {
  mob: PropTypes.bool,
  creators: PropTypes.array,
  go: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
