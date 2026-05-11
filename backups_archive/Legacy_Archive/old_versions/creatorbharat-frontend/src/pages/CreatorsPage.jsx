import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall } from '../theme';
import { Btn, Bdg, Skeleton, Fld } from '../components/Primitives';
import { CreatorCard } from '../components/Cards';

export default function CreatorsPage() {
  const { st, dsp } = useApp();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cf } = st;

  useEffect(() => {
    setLoading(true);
    apiCall('/creators?limit=100').then(d => {
      setAll(d.creators || []);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const filtered = all.filter(c => {
    const q = (cf.q || '').toLowerCase();
    const name = (c.name || '').toLowerCase();
    if (q && !name.includes(q)) return false;
    if (cf.niche && !c.niche?.includes(cf.niche)) return false;
    return true;
  });

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ background: T.n9, padding: '100px 20px 60px', color: '#fff', textAlign: 'center' }}>
        <div style={W()}>
          <Bdg color="gold">Ecosystem</Bdg>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 48, fontWeight: 900, marginTop: 16 }}>Bharat Ke Top Creators</h1>
          <p style={{ opacity: 0.7, marginTop: 12, fontSize: 18 }}>Discover and collaborate with Jaipur's finest influence.</p>
          
          <div style={{ maxWidth: 600, margin: '40px auto 0', position: 'relative' }}>
            <Fld 
              placeholder="Search by name, niche or city..." 
              value={cf.q} 
              onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })}
              style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      </div>

      <div style={{ ...W(), padding: '60px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {loading ? [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} height={400} />) : filtered.map(c => (
          <CreatorCard key={c.id} creator={c} onView={(cr) => go('creator-profile', { creator: cr })} />
        ))}
      </div>
    </div>
  );
}
