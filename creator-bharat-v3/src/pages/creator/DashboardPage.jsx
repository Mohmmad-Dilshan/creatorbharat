import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { W, LS, fmt } from '../../utils/helpers';
import { Btn, Card, Bdg, Bar, Empty, Ring } from '../../components/Primitives';
import { motion } from 'framer-motion';
import { LayoutDashboard, Megaphone, Trophy, ShieldCheck, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const c = st.creatorProfile;

  if (!st.user || st.role !== 'creator') {
    return (
      <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
        <Empty 
          icon="🔒" 
          title="Creator Access Required" 
          sub="Dashboard dekhne ke liye creator account se login kerna zaroori hai." 
          ctaLabel="Sign In Now" 
          onCta={() => navigate('/login')} 
        />
      </div>
    );
  }

  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const score = c ? (c.score || fmt.score(c)) : 0;
  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };

  const stats = [
    { l: 'Active Deals', v: myApps.filter(a => a.status === 'selected').length, c: '#10B981', i: Megaphone, trend: '+2' },
    { l: 'Shortlisted', v: myApps.filter(a => a.status === 'shortlisted').length, c: '#7C3AED', i: Trophy, trend: 'New' },
    { l: 'Total Applied', v: myApps.length, c: '#3B82F6', i: LayoutDashboard, trend: '+5' },
    { l: 'Elite Score', v: score, c: '#FF9431', i: ShieldCheck, trend: 'Top 5%' }
  ];

  const getStatusColor = (status) => {
    if (status === 'selected') return 'green';
    if (status === 'shortlisted') return 'purple';
    if (status === 'rejected') return 'red';
    return 'blue';
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Dashboard Top Section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Mission Control</p>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              Namaste, {c?.name?.split(' ')[0] || st.user.name.split(' ')[0]}!
            </h1>
            <p style={{ fontSize: 15, color: '#64748b', marginTop: 4, fontWeight: 500 }}>Your digital empire at a glance. Manage deals and scale your identity.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn 
              variant="outline" 
              onClick={() => navigate(`/creator/${c?.handle || 'me'}`)}
              style={{ borderRadius: 12, background: '#fff', padding: '12px 20px', fontSize: 13, fontWeight: 700 }}
            >
              <ExternalLink size={14} style={{ marginRight: 8 }} /> View Public Profile
            </Btn>
            <Btn 
              onClick={() => navigate('/campaigns')}
              style={{ borderRadius: 12, background: '#111', color: '#fff', padding: '12px 24px', fontSize: 13, fontWeight: 800 }}
            >
              🔥 Find Campaigns
            </Btn>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div>
          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, marginBottom: 32, padding: mob ? '0 16px' : 0 }}>
             {stats.map((s, i) => {
                const Icon = s.i;
                return (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ 
                      padding: '24px', background: '#fff', borderRadius: 24, 
                      border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                      position: 'relative', overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'absolute', top: 12, right: 12, background: s.c + '15', color: s.c, fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 100 }}>
                      {s.trend}
                    </div>
                    <div style={{ color: s.c, marginBottom: 16 }}><Icon size={22} /></div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#111', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.l}</div>
                  </motion.div>
                );
             })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.6fr', gap: 24, padding: mob ? '0 16px' : 0 }}>
            {/* Left Column: Profile Strength */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px', borderRadius: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>Identity Strength</h3>
                    <Bdg color="saffron">Elite Level</Bdg>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                     <Ring score={score} size={140} strokeWidth={12} />
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 20, padding: '20px', border: '1px solid rgba(0,0,0,0.02)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#475569' }}>Profile Sync</span>
                        <span style={{ fontSize: 15, fontWeight: 900, color: '#FF9431' }}>{comp.pct}%</span>
                     </div>
                     <Bar value={comp.pct} color="#FF9431" height={8} />
                     {comp.missing.length > 0 && (
                       <div style={{ marginTop: 20 }}>
                          <p style={{ fontSize: 10, color: '#94a3b8', marginBottom: 10, fontWeight: 900, textTransform: 'uppercase' }}>Next Steps:</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                             {comp.missing.slice(0, 3).map(m => (
                               <div key={m} style={{ fontSize: 13, color: '#1e293b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                                 <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431' }} />
                                 {m}
                               </div>
                             ))}
                          </div>
                       </div>
                     )}
                  </div>
                  <Btn full lg style={{ marginTop: 24, borderRadius: 100, background: '#111', color: '#fff', fontSize: 14 }} onClick={() => navigate('/settings')}>
                    Complete My Identity
                  </Btn>
               </Card>

               <Card style={{ padding: '24px', borderRadius: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 20, fontFamily: "'Outfit', sans-serif" }}>Ecosystem Shortcuts</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                     {[
                       { l: 'Earning Calculator', p: '/rate-calc', i: '🧮' },
                       { l: 'Leaderboard', p: '/leaderboard', i: '🎖️' },
                       { l: 'Support Hub', p: '/contact', i: '💬' }
                     ].map(r => (
                        <button key={r.p} onClick={() => navigate(r.p)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#f8fafc', border: '1px solid rgba(0,0,0,0.02)', borderRadius: 16, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                           <span style={{ fontSize: 20 }}>{r.i}</span>
                           <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{r.l}</span>
                        </button>
                     ))}
                  </div>
               </Card>
            </div>

            {/* Right Column: Applications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px', borderRadius: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                     <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>Recent Activities</h3>
                     <Btn sm variant="ghost" onClick={() => navigate('/applications')} style={{ fontSize: 12, fontWeight: 800 }}>View All</Btn>
                  </div>
                  
                  {myApps.length === 0 ? (
                    <Empty 
                      icon="📄" 
                      title="No Applications" 
                      sub="Apply to national brands to start earning." 
                      ctaLabel="Browse Campaigns" 
                      onCta={() => navigate('/campaigns')} 
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {myApps.slice(0, 4).map(a => (
                        <div key={a.id} style={{ padding: '20px', background: '#f8fafc', borderRadius: 20, border: '1px solid rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <p style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 4 }}>{a.campaignTitle}</p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                 <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</span>
                                 <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#cbd5e1' }} />
                                 <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>{fmt.date(a.date)}</span>
                              </div>
                           </div>
                           <Bdg sm color={getStatusColor(a.status)}>
                              {a.status?.toUpperCase() || 'APPLIED'}
                           </Bdg>
                        </div>
                      ))}
                    </div>
                  )}
               </Card>

               {/* Profile Share Link Card */}
               <Card style={{ padding: '32px', background: '#111', borderRadius: 28, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, background: '#FF9431', borderRadius: '50%', opacity: 0.1, filter: 'blur(40px)' }} />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Your Brand Identity</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500, lineHeight: 1.5 }}>Share this link to attract brands directly.</p>
                    
                    <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                         cb.in/creator/{c?.handle || 'user'}
                      </div>
                      <button 
                        style={{ padding: '0 16px', borderRadius: 12, background: '#FF9431', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 12 }}
                        onClick={() => { 
                          navigator.clipboard.writeText(`https://creatorbharat.in/creator/${c?.handle}`); 
                          toast('Copied to clipboard!', 'success'); 
                        }}
                      >
                        COPY
                      </button>
                    </div>
                  </div>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
