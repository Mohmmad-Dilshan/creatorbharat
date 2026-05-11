import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall } from '../theme';
import { Btn, Bdg, Skeleton } from '../components/Primitives';
import { CreatorCard, CampCard } from '../components/Cards';

function Typewriter({ words, interval = 2000 }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!del && sub === word) {
        setTimeout(() => setDel(true), interval);
      } else if (del && sub === '') {
        setDel(false);
        setIdx(i => i + 1);
      } else {
        setSub(del ? word.substring(0, sub.length - 1) : word.substring(0, sub.length + 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [sub, del, idx, words, interval]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(90deg, #FF9431, #DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sub}</span>
      <span style={{ width: 2, height: '80%', background: '#FF9431', position: 'absolute', right: -4, top: '10%', animation: 'blink 0.8s infinite' }} />
    </span>
  );
}

export default function HomePage() {
  const { st, dsp } = useApp();
  const [creators, setCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiCall('/creators?limit=6'),
      apiCall('/campaigns?limit=3')
    ]).then(([crData, cpData]) => {
      setCreators(crData.creators || []);
      setCampaigns(cpData.campaigns || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero Section */}
      <section style={{ background: '#FAFAFA', minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 180, paddingBottom: 120, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '70vh', background: 'radial-gradient(ellipse at top, rgba(255, 148, 49, 0.12), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div style={{ ...W(), position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 100, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', marginBottom: 32, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#10B981', color: '#fff', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900 }}>✓</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Trusted by 50,000+ Creators</span>
          </div>

          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, color: '#111', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.04em' }}>
            Your Digital <Typewriter words={['Identity', 'Portfolio', 'Brand', 'Growth']} /> <br />
            Built in Minutes.
          </h1>

          <p style={{ fontSize: 22, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: 48, fontWeight: 500, maxWidth: 720, margin: '0 auto 48px' }}>
            Launch your verified creator portfolio, showcase your social reach, and attract top brand deals directly. The all-in-one link for Indian creators.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 100 }}>
            <Btn lg onClick={() => go('creators')} style={{ padding: '20px 40px', fontSize: 17, background: '#111', color: '#fff', borderRadius: 100 }}>Claim Your Link</Btn>
            <Btn lg variant="outline" style={{ padding: '20px 40px', fontSize: 17, background: '#fff', color: '#111', borderRadius: 100 }}>View Demo</Btn>
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <Bdg color="gold">Discover</Bdg>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 900, marginTop: 12 }}>Featured Creators</h2>
            </div>
            <Btn variant="outline" onClick={() => go('creators')}>View All</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {loading ? [1, 2, 3].map(i => <Skeleton key={i} height={400} />) : creators.map(c => (
              <CreatorCard key={c.id} creator={c} onView={(cr) => go('creator-profile', { creator: cr })} />
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section style={{ padding: '100px 20px', background: T.bg2 }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <Bdg color="purple">Live Now</Bdg>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 900, marginTop: 12 }}>Active Campaigns</h2>
            </div>
            <Btn variant="outline" onClick={() => go('campaigns')}>All Campaigns</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
            {loading ? [1, 2, 3].map(i => <Skeleton key={i} height={300} />) : campaigns.map(c => (
              <CampCard key={c.id} campaign={c} onApply={() => dsp({ t: 'UI', v: { authModal: true } })} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
