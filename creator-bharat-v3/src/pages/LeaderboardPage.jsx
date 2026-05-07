import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { W, scrollToTop, fmt, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Empty } from '../components/Primitives';

/* eslint-disable react/prop-types */
const PodiumItem = ({ c, idx, isWinner, mob, onClick, medals, medalColors }) => {
  const score = c.score || fmt.score(c);
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
  
  return (
    <button 
      onClick={onClick}
      style={{ 
        textAlign: 'center', padding: isWinner ? '48px 32px' : '32px 24px', borderRadius: 32, background: '#fff', 
        boxShadow: isWinner ? '0 30px 70px rgba(255,148,49,0.15)' : '0 10px 30px rgba(0,0,0,0.03)', 
        border: `2px solid ${isWinner ? '#FF9431' : 'rgba(0,0,0,0.02)'}`, 
        cursor: 'pointer', position: 'relative', order: mob ? idx : undefined, 
        transform: isWinner && !mob ? 'translateY(-20px)' : 'none', zIndex: isWinner ? 10 : 1,
        width: '100%',
        display: 'block',
        outline: 'none',
        fontFamily: 'inherit'
      }}
    >
      <div style={{ fontSize: isWinner ? 48 : 32, position: 'absolute', top: isWinner ? -30 : -20, left: '50%', transform: 'translateX(-50%)' }}>{medals[idx]}</div>
      <div style={{ width: isWinner ? 120 : 90, height: isWinner ? 120 : 90, borderRadius: 28, padding: 3, background: `linear-gradient(135deg, ${medalColors[idx]}, #fff)`, margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <img src={img} style={{ width: '100%', height: '100%', borderRadius: 25, objectFit: 'cover', border: '4px solid #fff' }} alt={c.name} />
      </div>
      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: isWinner ? 24 : 18, color: '#111', marginBottom: 4, fontWeight: 900 }}>{c.name}</h3>
      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 20, fontWeight: 800 }}>{typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</p>
      
      <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '10px 32px', background: isWinner ? '#FF9431' : '#f8fafc', borderRadius: 100, color: isWinner ? '#fff' : '#111' }}>
          <span style={{ fontSize: 20, fontWeight: 900 }}>{score}</span>
      </div>
    </button>
  );
};

export default function LeaderboardPage() {
  const { dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [period, setPeriod] = useState('all');
  const [allC, setAllC] = useState([]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    apiCall('/creators?limit=100').then(d => setAllC(d.creators || d || [])).catch(() => {
       setAllC(LS.get('cb_creators', []));
    });
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const filtered = allC.sort((a, b) => (b.score || fmt.score(b)) - (a.score || fmt.score(a)));
  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Rankings Top Section */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '60px 0 80px', marginBottom: 40 }}>
        <div style={W(1100)}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#FFD700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>Influence Rankings</p>
            <h1 style={{ fontSize: mob ? 40 : 56, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              The <span style={{ background: 'linear-gradient(90deg, #FF9431 20%, #475569 50%, #138808 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Elite</span> 100
            </h1>
            <p style={{ fontSize: 18, color: '#64748b', marginTop: 16, fontWeight: 500, maxWidth: 600, margin: '16px auto 32px' }}>The definitive ranking of Bharat's most impactful creators, verified by engagement data.</p>
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['weekly', 'monthly', 'all'].map(p => (
                <button 
                  key={p} 
                  onClick={() => setPeriod(p)} 
                  style={{ 
                    padding: '12px 32px', borderRadius: 100, border: period === p ? 'none' : '1px solid rgba(0,0,0,0.1)', 
                    background: period === p ? '#111' : '#fff', 
                    color: period === p ? '#fff' : '#64748b', fontSize: 12, fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s',
                    textTransform: 'uppercase', letterSpacing: '1px'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: -80, position: 'relative', zIndex: 10 }}>
        <div style={W(1100)}>
          {/* Podium for Top 3 */}
          {top3.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.1fr 1fr', gap: 20, marginBottom: 60, alignItems: 'flex-end', padding: mob ? '0 16px' : 0 }}>
              {[1, 0, 2].map(idx => {
                const c = top3[idx]; if (!c) return null;
                return (
                  <PodiumItem 
                    key={c.id}
                    c={c}
                    idx={idx}
                    isWinner={idx === 0}
                    mob={mob}
                    onClick={() => go('creator-profile', { creator: c })}
                    medals={medals}
                    medalColors={medalColors}
                  />
                );
              })}
            </div>
          )}

          {/* List for the rest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: mob ? '0 16px' : 0 }}>
            {rest.map((c, i) => {
              const score = c.score || fmt.score(c);
              const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
              return (
                <button 
                   key={c.id} 
                   onClick={() => go('creator-profile', { creator: c })} 
                   style={{ 
                     width: '100%',
                     padding: '16px 24px', background: '#fff', borderRadius: 24, border: '1px solid rgba(0,0,0,0.04)', 
                     display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer', transition: 'all 0.2s', 
                     boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                     outline: 'none',
                     fontFamily: 'inherit'
                   }}
                >
                  <span style={{ width: 40, fontSize: 14, fontWeight: 900, color: '#cbd5e1' }}>#{i + 4}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                     <img src={img} style={{ width: 50, height: 50, borderRadius: 14, objectFit: 'cover' }} alt={c.name} />
                     <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#111' }}>{c.name}</h4>
                        <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')} • {((Array.isArray(c.niche) ? c.niche : [c.niche]).find(Boolean))}</p>
                     </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#111' }}>{score}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 900 }}>SCORE</div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && <Empty icon="🏆" title="No rankings found" sub="Get started to see the leaderboard." ctaLabel="Join Now" onCta={() => go('creators')} />}
          </div>
        </div>
      </div>
    </div>
  );
}
