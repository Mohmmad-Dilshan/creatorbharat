import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, fmt } from '../utils/helpers';
import { Btn, Card, Bdg, Bar, Empty, Ring } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';
import { motion } from 'framer-motion';

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
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
      <EliteHeader 
        eyebrow="Pro Dashboard"
        title={`Welcome, ${c?.name?.split(' ')[0] || st.user.name.split(' ')[0]}!`}
        sub="Manage your deals, improve your score, and grow your brand identity across Bharat."
        gradient="saffron"
        light={true}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => { if (c) go('creator-profile', { creator: c }) }}
            style={{ padding: '14px 28px', borderRadius: 100, border: '1.5px solid #111', background: '#fff', color: '#111', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          >
            👁 View Public Profile
          </button>
          <button 
            onClick={() => go('campaigns')}
            style={{ padding: '14px 28px', borderRadius: 100, border: 'none', background: '#111', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            🔥 Find Campaigns
          </button>
        </div>
      </EliteHeader>

      <div style={{ marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div style={W(1140)}>
          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 20, marginBottom: 40, padding: mob ? '0 16px' : 0 }}>
             {[
               { l: 'Active Deals', v: myApps.filter(a => a.status === 'selected').length, c: '#10B981', i: '🤝' },
               { l: 'Shortlisted', v: myApps.filter(a => a.status === 'shortlisted').length, c: '#7C3AED', i: '⭐' },
               { l: 'Total Applied', v: myApps.length, c: '#3B82F6', i: '📄' },
               { l: 'Elite Score', v: score, c: '#FF9431', i: '🏆' }
             ].map((st, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ padding: '32px 24px', background: '#fff', borderRadius: 32, textAlign: 'center', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{st.i}</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#111', lineHeight: 1 }}>{st.v}</div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', marginTop: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>{st.l}</div>
                </motion.div>
             ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.8fr', gap: 32, padding: mob ? '0 16px' : 0 }}>
            {/* Left Column: Profile Strength */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               <div style={{ padding: '40px 32px', background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 20px 50px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: '#FF9431', borderRadius: '50%', filter: 'blur(70px)', opacity: 0.08 }} />
                  <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 32, fontFamily: "'Fraunces', serif" }}>Profile Strength</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                     <Ring score={score} size={160} />
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 24, padding: '24px', border: '1px solid rgba(0,0,0,0.02)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#1e293b' }}>Completeness</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#FF9431' }}>{comp.pct}%</span>
                     </div>
                     <Bar value={comp.pct} color="#FF9431" height={10} />
                     {comp.missing.length > 0 && (
                       <div style={{ marginTop: 24 }}>
                          <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>NEXT STEPS:</p>
                          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                             {comp.missing.map(m => (
                               <li key={m} style={{ fontSize: 14, color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                                 <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431' }} />
                                 {m}
                               </li>
                             ))}
                          </ul>
                       </div>
                     )}
                  </div>
                  <button 
                    style={{ width: '100%', marginTop: 32, padding: '16px', borderRadius: 100, border: 'none', background: '#111', color: '#fff', fontSize: 14, fontWeight: 900, cursor: 'pointer' }}
                    onClick={() => go('settings')}
                  >
                    Complete Profile
                  </button>
               </div>

               <div style={{ padding: '32px', background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 20px 50px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, fontFamily: "'Fraunces', serif" }}>Quick Resources</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                     {[
                       { l: 'Leaderboard', p: 'leaderboard', i: '🎖️' },
                       { l: 'Earnings Calc', p: 'rate-calc', i: '🧮' },
                       { l: 'Monetize Guide', p: 'monetize', i: '💸' },
                       { l: 'Help & Support', p: 'contact', i: '💬' }
                     ].map(r => (
                        <button key={r.p} onClick={() => go(r.p)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: '#f8fafc', border: '1px solid rgba(0,0,0,0.02)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                           <span style={{ fontSize: 24 }}>{r.i}</span>
                           <span style={{ fontSize: 15, fontWeight: 800, color: '#1e293b' }}>{r.l}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Column: Applications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               <div style={{ padding: '40px 32px', background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 20px 50px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                     <h3 style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Fraunces', serif" }}>Recent Applications</h3>
                     <button onClick={() => go('applications')} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 900, fontSize: 14, cursor: 'pointer' }}>View All</button>
                  </div>
                  
                  {myApps.length === 0 ? (
                    <Empty icon="📄" title="No applications yet" sub="Browse campaigns and start applying to brands." ctaLabel="Find Campaigns" onCta={() => go('campaigns')} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {myApps.slice(0, 5).map(a => (
                        <div key={a.id} style={{ padding: '24px', background: '#f8fafc', borderRadius: 24, border: '1px solid rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <p style={{ fontSize: 17, fontWeight: 800, color: '#111', marginBottom: 6 }}>{a.campaignTitle}</p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                 <span style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</span>
                                 <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                                 <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 700 }}>{fmt.date(a.date)}</span>
                              </div>
                           </div>
                           <Bdg color={a.status === 'selected' ? 'green' : a.status === 'shortlisted' ? 'purple' : a.status === 'rejected' ? 'red' : 'blue'}>
                              {a.status?.toUpperCase() || 'APPLIED'}
                           </Bdg>
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* Profile Share Link Card */}
               <div style={{ padding: '40px', background: 'linear-gradient(135deg, #FF9431, #FF6B00)', borderRadius: 32, color: '#fff', boxShadow: '0 25px 60px rgba(255,148,49,0.25)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, left: -30, width: 150, height: 150, background: '#fff', borderRadius: '50%', opacity: 0.1, filter: 'blur(40px)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, position: 'relative', zIndex: 2 }}>
                     <div style={{ flex: 1, minWidth: 280 }}>
                        <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, fontFamily: "'Fraunces', serif" }}>Your Public Profile</h3>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.5 }}>Share this link in your Instagram bio to attract high-quality brands directly.</p>
                        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: 16, marginTop: 24, fontSize: 16, fontWeight: 700, fontFamily: 'monospace', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                           creatorbharat.in/c/{c?.handle || 'username'}
                        </div>
                     </div>
                     <button 
                       style={{ padding: '18px 36px', borderRadius: 100, border: 'none', background: '#fff', color: '#FF9431', fontWeight: 900, fontSize: 15, cursor: 'pointer', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                       onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.in/c/${c?.handle}`); toast('Link copied to clipboard!', 'success'); }}
                    >
                      Copy Profile Link
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
