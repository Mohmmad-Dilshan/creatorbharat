import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { SH, Card, Empty, Bdg } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

export default function LeaderboardPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [niche, setNiche] = useState('');
  const [period, setPeriod] = useState('all');
  const [allC, setAllC] = useState([]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    apiCall('/creators?limit=100').then(d => setAllC(d.creators || d || [])).catch(() => {
       setAllC(LS.get('cb_creators', []));
    });
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const niches = [...new Set(allC.flatMap(c => Array.isArray(c.niche) ? c.niche : [c.niche]).filter(Boolean))].sort();
  const filtered = (niche ? allC.filter(c => { const cn = Array.isArray(c.niche) ? c.niche : [c.niche]; return cn.includes(niche); }) : allC).sort((a, b) => (b.score || fmt.score(b)) - (a.score || fmt.score(a)));
  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Elite Leaderboard Header */}
      <EliteHeader 
        eyebrow="Ecosystem Elite"
        title="Creator Leaderboard"
        sub="Celebrating the voices that shape Bharat's digital future."
        gradient="gold"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: mob ? 'center' : 'flex-start' }}>
          <div className="au d2" style={{ display: 'flex', gap: 12, justifyContent: mob ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
            {['all', 'weekly', 'monthly'].map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)} 
                style={{ padding: '12px 32px', borderRadius: 100, border: `1.5px solid ${period === p ? '#FF9431' : 'rgba(255,255,255,0.1)'}`, background: period === p ? '#FF9431' : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {p === 'all' ? 'All Time' : p.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="au d3" style={{ display: 'flex', justifyContent: mob ? 'center' : 'flex-start' }}>
            <select value={niche} onChange={e => setNiche(e.target.value)} style={{ padding: '14px 28px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', fontSize: 15, background: 'rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontWeight: 700, cursor: 'pointer' }}>
              <option value="" style={{ background: '#111' }}>All Influence Niches</option>
              {niches.map(n => <option key={n} value={n} style={{ background: '#111' }}>{n}</option>)}
            </select>
          </div>
        </div>
      </EliteHeader>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          {/* Podium for Top 3 */}
          {top3.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr 1fr', gap: 24, marginBottom: 80, alignItems: 'flex-end' }}>
              {[1, 0, 2].map(idx => {
                const c = top3[idx]; if (!c) return null;
                const score = c.score || fmt.score(c);
                const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
                const isWinner = idx === 0;
                
                return (
                  <div 
                    key={c.id} 
                    className="au"
                    onClick={() => go('creator-profile', { creator: c })} 
                    style={{ textAlign: 'center', padding: isWinner ? '60px 32px' : '40px 24px', borderRadius: 40, background: '#fff', boxShadow: isWinner ? '0 30px 60px rgba(255,148,49,0.15)' : '0 10px 30px rgba(0,0,0,.03)', border: `2px solid ${isWinner ? '#FF9431' : 'rgba(0,0,0,0.04)'}`, cursor: 'pointer', position: 'relative', order: mob ? idx : undefined, transform: isWinner && !mob ? 'scale(1.05)' : 'none', zIndex: isWinner ? 10 : 1 }}
                  >
                    <div style={{ fontSize: isWinner ? 64 : 48, position: 'absolute', top: isWinner ? -40 : -24, left: '50%', transform: 'translateX(-50%)' }}>{medals[idx]}</div>
                    <div style={{ width: isWinner ? 140 : 100, height: isWinner ? 140 : 100, borderRadius: '50%', padding: 4, background: `linear-gradient(135deg, ${medalColors[idx]}, #fff)`, margin: '0 auto 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                       <img src={img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff' }} alt={c.name} />
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: isWinner ? 28 : 22, color: '#111', marginBottom: 6, fontWeight: 900 }}>{c.name}</h3>
                    <p style={{ fontSize: 14, color: T.t3, marginBottom: 24, fontWeight: 700 }}><span>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}{c.state ? ', ' + c.state : ''}</span></p>
                    
                    <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '12px 32px', background: isWinner ? '#FF9431' : T.bg2, borderRadius: 100, color: isWinner ? '#fff' : '#111' }}>
                       <span style={{ fontSize: 24, fontWeight: 900 }}>{score}</span>
                       <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>CS Points</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table Header */}
          <div style={{ display: 'flex', padding: '0 32px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: 16 }}>
             <span style={{ width: 60, fontSize: 12, fontWeight: 800, color: T.t4 }}>RANK</span>
             <span style={{ flex: 1, fontSize: 12, fontWeight: 800, color: T.t4 }}>CREATOR</span>
             <span style={{ width: 100, textAlign: 'right', fontSize: 12, fontWeight: 800, color: T.t4 }}>INFLUENCE</span>
          </div>

          {/* List for the rest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rest.map((c, i) => {
              const score = c.score || fmt.score(c);
              const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
              return (
                <div 
                   key={c.id} 
                   className={`au d${(i % 5) + 1}`}
                   onClick={() => go('creator-profile', { creator: c })} 
                   style={{ padding: '16px 32px', background: '#fff', borderRadius: 24, border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 24, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
                   onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <span style={{ width: 60, fontSize: 18, fontWeight: 900, color: T.t4 }}>#{i + 4}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                     <img src={img} style={{ width: 52, height: 52, borderRadius: 16, objectFit: 'cover' }} alt={c.name} />
                     <div>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 2 }}>{c.name}</h4>
                        <p style={{ fontSize: 13, color: T.t3, fontWeight: 600 }}>{typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}{c.state ? ', ' + c.state : ''} • {(Array.isArray(c.niche) ? c.niche : [c.niche]).filter(Boolean).slice(0, 1).join(', ')}</p>
                     </div>
                  </div>
                  <div style={{ textAlign: 'right', width: 100 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#FF9431' }}>{score}</div>
                    <div style={{ fontSize: 10, color: T.t4, fontWeight: 800 }}>POINTS</div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && <Empty icon="🏆" title="No creators yet" sub="Be the first on the leaderboard!" ctaLabel="Get Listed Now" onCta={() => go('apply')} />}
          </div>
        </div>
      </div>
    </div>
  );
}
