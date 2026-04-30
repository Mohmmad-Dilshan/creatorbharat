import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS, fmt } from '../theme';
import { Btn, Card, Bdg, Bar, Empty } from '../components/Primitives';

export default function DashboardPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const c = st.creatorProfile;

  if (!st.user || st.role !== 'creator') {
    return <div style={{ ...W(), padding: '80px 20px' }}><Empty icon="🔒" title="Creator login required" ctaLabel="Login" onCta={() => dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } })} /></div>;
  }

  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const score = c ? (c.score || fmt.score(c)) : 0;
  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 4, textTransform: 'uppercase' }}>Creator Dashboard</p>
              <h1 style={{ fontSize: mob ? 22 : 28, color: '#fff' }}>Welcome, {c?.name || st.user.name}</h1>
            </div>
            <Btn variant="ghost" style={{ color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.2)' }} onClick={() => { if (c) go('creator-profile', { creator: c }) }}>View Public Profile</Btn>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '24px 20px' : '36px 20px' }}>
        <div style={W()}>
          {c?.handle && (
            <div style={{ background: 'linear-gradient(135deg,' + T.gd + ',#B91C1C)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.7)', marginBottom: 4 }}>YOUR CREATOR LINK</p>
                <p style={{ fontSize: 16, fontFamily: 'monospace', color: '#fff', fontWeight: 700 }}>creatorbharat.in/c/{c.handle}</p>
              </div>
              <Btn sm variant="white" onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.in/c/${c.handle}`); toast('Link copied!', 'success'); }}>Copy Link</Btn>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
            {[[myApps.length, 'Applications', '#2563EB'], [myApps.filter(a => a.status === 'shortlisted').length, 'Shortlisted', '#7C3AED'], [score, 'CS Score', T.gd], [comp.pct + '%', 'Complete', '#10B981']].map(([v, l, col]) => (
              <div key={l} style={{ textAlign: 'center', padding: '18px', background: '#fff', borderRadius: 14, border: `1px solid ${T.bd}` }}>
                <div style={{ fontSize: mob ? 22 : 28, fontWeight: 900, color: col }}>{v}</div>
                <div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
            <Card style={{ padding: '20px' }}>
              <h3 style={{ fontWeight: 700, color: T.n8, fontSize: 15, marginBottom: 16 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Browse Campaigns', 'campaigns'], ['Edit Profile', 'settings'], ['View Leaderboard', 'leaderboard'], ['Rate Calculator', 'rate-calc']].map(([l, p]) => <Btn key={p} variant="ghost" onClick={() => go(p)}>{l}</Btn>)}
              </div>
            </Card>

            <Card style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontWeight: 700, color: T.n8, fontSize: 15 }}>Recent Applications</h3>
                <Btn sm variant="text" onClick={() => go('applications')}>View All</Btn>
              </div>
              {myApps.length === 0 ? <p style={{ fontSize: 13, color: T.t3 }}>No applications yet.</p> :
                myApps.slice(0, 3).map(a => (
                  <div key={a.id} style={{ padding: '10px 0', borderBottom: `1px solid ${T.bg3}` }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: T.n8 }}>{a.campaignTitle}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <p style={{ fontSize: 11, color: T.t3 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</p>
                      <Bdg sm color={a.status === 'selected' ? 'green' : a.status === 'shortlisted' ? 'purple' : 'blue'}>{a.status || 'applied'}</Bdg>
                    </div>
                  </div>
                ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
