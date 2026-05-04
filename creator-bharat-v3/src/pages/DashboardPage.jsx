import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, fmt } from '../utils/helpers';
import { Btn, Card, Bdg, Bar, Empty, Ring } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

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
    return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
      <Empty icon="🔒" title="Creator Access Required" sub="Dashboard dekhne ke liye creator account se login kerna zaroori hai." ctaLabel="Sign In Now" onCta={() => dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } })} />
    </div>;
  }

  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const score = c ? (c.score || fmt.score(c)) : 0;
  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Elite Dashboard Header */}
      <EliteHeader 
        eyebrow="Pro Creator"
        title={`Welcome, ${c?.name?.split(' ')[0] || st.user.name.split(' ')[0]}!`}
        sub="Manage your deals, improve your score, and grow your brand."
        gradient="saffron"
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <Btn lg variant="white" onClick={() => { if (c) go('creator-profile', { creator: c }) }}>👁 View Public Profile</Btn>
          <Btn lg variant="primary" onClick={() => go('campaigns')}>🔥 Find Campaigns</Btn>
        </div>
      </EliteHeader>

      <div style={{ marginTop: -40 }}>
        <div style={W()}>
          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
             {[
               { l: 'Active Deals', v: myApps.filter(a => a.status === 'selected').length, c: '#10B981', i: '🤝' },
               { l: 'Shortlisted', v: myApps.filter(a => a.status === 'shortlisted').length, c: '#7C3AED', i: '⭐' },
               { l: 'Total Applications', v: myApps.length, c: '#3B82F6', i: '📄' },
               { l: 'Profile Score', v: score, c: '#FF9431', i: '🏆' }
             ].map((st, i) => (
               <Card key={i} className="au" style={{ padding: '24px', background: '#fff', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{st.i}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: st.c, lineHeight: 1 }}>{st.v}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.t3, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{st.l}</div>
               </Card>
             ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.8fr', gap: 24 }}>
            {/* Left Column: Profile Strength */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px', background: '#111', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: T.gd, borderRadius: '50%', filter: 'blur(50px)', opacity: 0.4 }} />
                  <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, fontFamily: "'Fraunces', serif" }}>Profile Performance</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                     <Ring score={score} size={140} />
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '20px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>Profile Strength</span>
                        <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>{comp.pct}%</span>
                     </div>
                     <Bar value={comp.pct} color={T.gd} height={8} />
                     {comp.missing.length > 0 && (
                       <div style={{ marginTop: 16 }}>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>NEXT STEPS:</p>
                          <ul style={{ paddingLeft: 16, fontSize: 13, color: '#fff' }}>
                             {comp.missing.map(m => <li key={m} style={{ marginBottom: 4 }}>{m}</li>)}
                          </ul>
                       </div>
                     )}
                  </div>
                  <Btn full style={{ marginTop: 24, background: '#fff', color: '#111' }} onClick={() => go('settings')}>Complete Profile</Btn>
               </Card>

               <Card style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Quick Resources</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                     {[
                       { l: 'Check Leaderboard', p: 'leaderboard', i: '🎖️' },
                       { l: 'Rate Calculator', p: 'rate-calc', i: '🧮' },
                       { l: 'Monetization Guide', p: 'monetize', i: '💸' },
                       { l: 'Help & Support', p: 'contact', i: '💬' }
                     ].map(r => (
                       <button key={r.p} onClick={() => go(r.p)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: T.bg2, border: '1px solid rgba(0,0,0,0.04)', borderRadius: 12, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#fff'} onMouseLeave={e => e.currentTarget.style.background = T.bg2}>
                          <span style={{ fontSize: 18 }}>{r.i}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{r.l}</span>
                       </button>
                     ))}
                  </div>
               </Card>
            </div>

            {/* Right Column: Applications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                     <h3 style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Fraunces', serif" }}>Recent Applications</h3>
                     <Btn sm variant="ghost" onClick={() => go('applications')}>View All</Btn>
                  </div>
                  
                  {myApps.length === 0 ? (
                    <Empty icon="📄" title="No applications yet" sub="Browse campaigns and start applying to brands." ctaLabel="Find Campaigns" onCta={() => go('campaigns')} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {myApps.slice(0, 5).map(a => (
                        <div key={a.id} style={{ padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <p style={{ fontSize: 16, fontWeight: 800, color: '#111' }}>{a.campaignTitle}</p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                 <span style={{ fontSize: 13, color: T.t3 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</span>
                                 <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.bd2 }} />
                                 <span style={{ fontSize: 12, color: T.t4 }}>{fmt.date(a.date)}</span>
                              </div>
                           </div>
                           <Bdg color={a.status === 'selected' ? 'green' : a.status === 'shortlisted' ? 'purple' : a.status === 'rejected' ? 'red' : 'blue'}>
                              {a.status?.toUpperCase() || 'APPLIED'}
                           </Bdg>
                        </div>
                      ))}
                    </div>
                  )}
               </Card>

               {/* Profile Share Link Card */}
               <Card style={{ padding: '32px', background: 'linear-gradient(135deg, #FF9431, #FF6B00)', color: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                     <div>
                        <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Your Public Profile</h3>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Share this link in your Instagram bio to attract brands.</p>
                        <p style={{ fontSize: 15, fontWeight: 700, marginTop: 12, fontFamily: 'monospace' }}>creatorbharat.in/c/{c?.handle || 'username'}</p>
                     </div>
                     <Btn variant="white" onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.in/c/${c?.handle}`); toast('Link copied to clipboard!', 'success'); }}>Copy Your Link</Btn>
                  </div>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
