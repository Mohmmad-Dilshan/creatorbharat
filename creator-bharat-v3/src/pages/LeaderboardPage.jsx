import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { SH, Card, Empty, Bdg } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';
import { motion } from 'framer-motion';

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
      <EliteHeader 
        eyebrow="Ecosystem Elite"
        title="Creator Leaderboard"
        sub="Celebrating the voices that shape Bharat's digital future through high-impact content."
        gradient="gold"
        light={true}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['all', 'weekly', 'monthly'].map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)} 
                style={{ 
                  padding: '12px 28px', borderRadius: 100, border: `1.5px solid ${period === p ? '#FF9431' : 'rgba(0,0,0,0.06)'}`, 
                  background: period === p ? '#FF9431' : '#fff', color: period === p ? '#fff' : '#64748b', 
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: period === p ? '0 10px 20px rgba(255,148,49,0.2)' : 'none'
                }}
              >
                {p === 'all' ? 'All Time' : p.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <select value={niche} onChange={e => setNiche(e.target.value)} style={{ padding: '14px 28px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.06)', fontSize: 14, background: '#fff', color: '#1e293b', outline: 'none', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <option value="">All Influence Niches</option>
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </EliteHeader>

      <div style={{ padding: mob ? '40px 16px' : '80px 20px', background: '#fdfdfd' }}>
        <div style={W(1100)}>
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
                    style={{ 
                      textAlign: 'center', padding: isWinner ? '60px 32px' : '40px 24px', borderRadius: 40, background: '#fff', 
                      boxShadow: isWinner ? '0 40px 80px rgba(255,148,49,0.12)' : '0 10px 40px rgba(0,0,0,0.03)', 
                      border: `1.5px solid ${isWinner ? '#FF9431' : 'rgba(0,0,0,0.05)'}`, 
                      cursor: 'pointer', position: 'relative', order: mob ? idx : undefined, 
                      transform: isWinner && !mob ? 'scale(1.05)' : 'none', zIndex: isWinner ? 10 : 1 
                    }}
                  >
                    <div style={{ fontSize: isWinner ? 72 : 48, position: 'absolute', top: isWinner ? -45 : -24, left: '50%', transform: 'translateX(-50%)' }}>{medals[idx]}</div>
                    <div style={{ width: isWinner ? 160 : 120, height: isWinner ? 160 : 120, borderRadius: '50%', padding: 4, background: `linear-gradient(135deg, ${medalColors[idx]}, #fff)`, margin: '0 auto 24px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
                       <img src={img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '5px solid #fff' }} alt={c.name} />
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: isWinner ? 32 : 24, color: '#111', marginBottom: 8, fontWeight: 900 }}>{c.name}</h3>
                    <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, fontWeight: 700 }}><span>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}{c.state ? ', ' + c.state : ''}</span></p>
                    
                    <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '14px 40px', background: isWinner ? '#FF9431' : '#f1f5f9', borderRadius: 100, color: isWinner ? '#fff' : '#1e293b' }}>
                       <span style={{ fontSize: 28, fontWeight: 900 }}>{score}</span>
                       <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>CS Score</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table Header */}
          <div style={{ display: 'flex', padding: '0 32px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 20 }}>
             <span style={{ width: 60, fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>RANK</span>
             <span style={{ flex: 1, fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>CREATOR PROFILE</span>
             <span style={{ width: 120, textAlign: 'right', fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>INFLUENCE</span>
          </div>

          {/* List for the rest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {rest.map((c, i) => {
              const score = c.score || fmt.score(c);
              const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
              return (
                <div 
                   key={c.id} 
                   className={`au d${(i % 5) + 1}`}
                   onClick={() => go('creator-profile', { creator: c })} 
                   style={{ 
                     padding: '20px 32px', background: '#fff', borderRadius: 28, border: '1.5px solid rgba(0,0,0,0.04)', 
                     display: 'flex', alignItems: 'center', gap: 24, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                     boxShadow: '0 10px 30px rgba(0,0,0,0.02)' 
                   }}
                   onMouseEnter={e => {
                     e.currentTarget.style.transform = 'translateY(-4px)';
                     e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.06)';
                     e.currentTarget.style.borderColor = '#FF9431';
                   }}
                   onMouseLeave={e => {
                     e.currentTarget.style.transform = 'none';
                     e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)';
                     e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)';
                   }}
                >
                  <span style={{ width: 60, fontSize: 20, fontWeight: 900, color: '#94a3b8' }}>#{i + 4}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
                     <img src={img} style={{ width: 60, height: 60, borderRadius: 18, objectFit: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }} alt={c.name} />
                     <div>
                        <h4 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 4 }}>{c.name}</h4>
                        <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>{typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')} • {(Array.isArray(c.niche) ? c.niche : [c.niche]).filter(Boolean).slice(0, 1).join(', ')}</p>
                     </div>
                  </div>
                  <div style={{ textAlign: 'right', width: 120 }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#111' }}>{score}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 900 }}>SCORE</div>
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
