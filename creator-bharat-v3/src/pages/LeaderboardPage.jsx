import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt } from '../theme';
import { SH, Card, Empty } from '../components/Primitives';

export default function LeaderboardPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [niche, setNiche] = useState('');
  const [period, setPeriod] = useState('all');
  const [allC, setAllC] = useState([]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    apiCall('/creators?limit=100').then(d => setAllC(d.creators || [])).catch(console.error);
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
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '60px 20px' : '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 120%, rgba(255,148,49,0.1) 0%, transparent 60%)' }} />
        <div style={W()}>
          <SH eyebrow="Elite" title="Creator Leaderboard" sub="Celebrating the most influential voices across Bharat." light center mb={40} />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {['all', 'weekly', 'monthly'].map(p => <button key={p} onClick={() => setPeriod(p)} style={{ padding: '10px 24px', borderRadius: 30, border: `1.5px solid ${period === p ? T.gd : 'rgba(255,255,255,0.1)'}`, background: period === p ? T.gd : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', textTransform: 'capitalize' }}>{p === 'all' ? 'All Time' : p}</button>)}
          </div>
          <select value={niche} onChange={e => setNiche(e.target.value)} style={{ padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', fontSize: 14, background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}>
            <option value="" style={{ background: T.n8 }}>All Niches</option>
            {niches.map(n => <option key={n} value={n} style={{ background: T.n8 }}>{n}</option>)}
          </select>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: T.bg2 }}>
        <div style={W()}>
          {top3.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 24, marginBottom: 64, alignItems: 'end' }}>
              {[1, 0, 2].map(idx => {
                const c = top3[idx]; if (!c) return null;
                const score = c.score || fmt.score(c);
                const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
                return (
                  <div key={c.id} onClick={() => go('creator-profile', { creator: c })} style={{ textAlign: 'center', padding: '40px 24px', borderRadius: 32, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,.05)', border: `2px solid ${medalColors[idx]}40`, cursor: 'pointer', position: 'relative', order: mob ? idx : undefined }}>
                    <div style={{ fontSize: 48, position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)' }}>{medals[idx]}</div>
                    <img src={img} style={{ width: idx === 0 ? 120 : 100, height: idx === 0 ? 120 : 100, borderRadius: idx === 0 ? 40 : 32, objectFit: 'cover', border: `4px solid ${medalColors[idx]}`, margin: '0 auto 20px' }} alt={c.name} />
                    <h3 style={{ fontSize: idx === 0 ? 24 : 20, color: T.t1, marginBottom: 4, fontWeight: 900 }}>{c.name}</h3>
                    <p style={{ fontSize: 14, color: T.t3, marginBottom: 20, fontWeight: 600 }}>{c.city}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: T.bg2, borderRadius: 12, border: `1px solid ${T.bd}` }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: T.gd }}>{score}</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: T.t4, textTransform: 'uppercase' }}>CS Score</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rest.map((c, i) => {
              const score = c.score || fmt.score(c);
              const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
              return (
                <Card key={c.id} onClick={() => go('creator-profile', { creator: c })} style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 24, border: `1px solid ${T.bd}`, cursor: 'pointer' }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: T.t4, minWidth: 40 }}>#{i + 4}</span>
                  <img src={img} style={{ width: 56, height: 56, borderRadius: 16, objectFit: 'cover' }} alt={c.name} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800, color: T.t1, fontSize: 16 }}>{c.name}</p>
                    <p style={{ fontSize: 13, color: T.t3, marginTop: 2 }}>{c.city} • {(Array.isArray(c.niche) ? c.niche : [c.niche]).filter(Boolean).slice(0, 2).join(', ')}</p>
                  </div>
                  <div style={{ textAlign: 'right', marginRight: 24 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: T.gd }}>{score}</div>
                    <div style={{ fontSize: 10, color: T.t4, fontWeight: 800, textTransform: 'uppercase' }}>Points</div>
                  </div>
                  {c.verified && <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>✓</div>}
                </Card>
              );
            })}
            {filtered.length === 0 && <Empty icon="🏆" title="No creators yet" sub="Be the first on the leaderboard!" ctaLabel="Get Listed" onCta={() => go('apply')} />}
          </div>
        </div>
      </div>
    </div>
  );
}
