import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS, Auth, fmt } from '../theme';
import { Btn, Card, Bdg, Empty } from '../components/Primitives';

export default function BrandDashboardPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  if (!st.user || st.role !== 'brand') return <div style={{ ...W(), padding: '80px 20px' }}><Empty icon="🔒" title="Brand login required" ctaLabel="Register" onCta={() => go('brand-register')} /></div>;

  const myBrand = Auth.getBrand(st.user.email);
  const myCamps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
  const myApps = LS.get('cb_applications', []).filter(a => myCamps.some(c => c.id === a.campaignId));
  const shortlisted = LS.get('cb_creators', []).filter(c => st.brand.shortlisted.includes(c.id));

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div><p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 4, textTransform: 'uppercase' }}>Brand Dashboard</p><h1 style={{ fontSize: mob ? 22 : 28, color: '#fff' }}>{myBrand?.companyName || st.user.name}</h1></div>
            <Btn onClick={() => go('campaign-builder')}>+ Post Campaign</Btn>
          </div>
        </div>
      </div>
      <div style={{ padding: mob ? '24px 20px' : '36px 20px', background: T.bg2 }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
            {[[myCamps.length, 'Campaigns', T.gd], [myApps.length, 'Applications', '#2563EB'], [shortlisted.length, 'Shortlisted', '#7C3AED']].map(([v, l, col]) => (
              <div key={l} style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: 14, border: `1px solid ${T.bd}` }}><div style={{ fontSize: 28, fontWeight: 900, color: col }}>{v}</div><div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>{l}</div></div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
            <Card style={{ padding: '20px' }}>
              <h3 style={{ fontWeight: 700, color: T.n8, fontSize: 15, marginBottom: 16 }}>My Campaigns</h3>
              {myCamps.length === 0 ? <p style={{ fontSize: 13, color: T.t3 }}>No campaigns yet.</p> :
                myCamps.slice(0, 4).map(c => (
                  <div key={c.id} style={{ padding: '10px 0', borderBottom: `1px solid ${T.bg3}` }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: T.n8 }}>{c.title}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: T.t3 }}>{c.filled || 0}/{c.slots} filled</span>
                      <Bdg sm color="green">Live</Bdg>
                    </div>
                  </div>
                ))}
            </Card>
            <Card style={{ padding: '20px' }}>
              <h3 style={{ fontWeight: 700, color: T.n8, fontSize: 15, marginBottom: 16 }}>Shortlisted Creators</h3>
              {shortlisted.length === 0 ? <p style={{ fontSize: 13, color: T.t3 }}>Browse creators and shortlist them.</p> :
                shortlisted.slice(0, 4).map(c => (
                  <div key={c.id} onClick={() => go('creator-profile', { creator: c })} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${T.bg3}`, cursor: 'pointer' }}>
                    <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                    <div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 600, color: T.n8 }}>{c.name}</p><p style={{ fontSize: 11, color: T.t3 }}>{c.city} • {fmt.num(c.followers)} followers</p></div>
                  </div>
                ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
