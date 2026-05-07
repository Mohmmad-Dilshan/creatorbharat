import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { W, LS, fmt } from '../utils/helpers';
import { Btn, Card, Bdg, Empty } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';
import { motion } from 'framer-motion';
import { Rocket, FileText, Star, Eye, Search, Plus, ExternalLink, Zap } from 'lucide-react';

export default function BrandDashboardPage() {
  const { st } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  if (!st.user || st.role !== 'brand') return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
       <Empty 
         icon="🔒" 
         title="Brand Console Access Only" 
         sub="Please log in with your brand credentials to access the management console." 
         ctaLabel="Join as Brand" 
         onCta={() => navigate('/brand-register')} 
       />
    </div>
  );

  const myBrand = st.user;
  const myCamps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
  const myApps = LS.get('cb_applications', []).filter(a => myCamps.some(c => c.id === a.campaignId));
  const shortlisted = LS.get('cb_creators', []).filter(c => (st.brand?.shortlisted || []).includes(c.id));

  const stats = [
    { l: 'Live Campaigns', v: myCamps.length, c: '#10B981', i: Rocket, trend: 'Active' },
    { l: 'Total Applications', v: myApps.length, c: '#3B82F6', i: FileText, trend: '+12' },
    { l: 'Shortlisted', v: shortlisted.length, c: '#7C3AED', i: Star, trend: 'Talent' },
    { l: 'Total Reach', v: '1.2M', c: '#FF9431', i: Eye, trend: '+4.2%' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
      <EliteHeader 
        eyebrow="Enterprise Console"
        title={myBrand.companyName || myBrand.name || 'Brand Console'}
        sub="Monitor your market impact and scale your creator ecosystem."
        gradient="green"
        light={true}
        compact
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
          <Btn 
            variant="outline" 
            onClick={() => navigate('/creators')}
            style={{ borderRadius: 100, background: 'rgba(255,255,255,0.8)', padding: '10px 20px', fontSize: 13, fontWeight: 700 }}
          >
            <Search size={14} style={{ marginRight: 6 }} /> Find Talent
          </Btn>
          <Btn 
            onClick={() => navigate('/campaign-builder')}
            style={{ borderRadius: 100, background: '#111', color: '#fff', padding: '10px 24px', fontSize: 13, fontWeight: 800 }}
          >
            <Plus size={14} style={{ marginRight: 6 }} /> New Campaign
          </Btn>
        </div>
      </EliteHeader>

      <div style={{ marginTop: -40, position: 'relative', zIndex: 10 }}>
        <div style={W(1180)}>
          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginBottom: 32, padding: mob ? '0 16px' : 0 }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.6fr 1fr', gap: 24, padding: mob ? '0 16px' : 0 }}>
            {/* Campaigns List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px', borderRadius: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                     <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 900, color: '#111' }}>Campaign Oversight</h3>
                     <Btn sm variant="ghost" onClick={() => navigate('/campaigns')} style={{ fontSize: 12, fontWeight: 800 }}>View All</Btn>
                  </div>
                  
                  {myCamps.length === 0 ? (
                    <Empty 
                      icon="🚀" 
                      title="No Live Campaigns" 
                      sub="Launch your first campaign to start receiving applications." 
                      ctaLabel="Create Campaign" 
                      onCta={() => navigate('/campaign-builder')} 
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       {myCamps.slice(0, 5).map(c => (
                         <div key={c.id} style={{ padding: '20px', background: '#f8fafc', borderRadius: 20, border: '1px solid rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div>
                               <h4 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 4 }}>{c.title}</h4>
                               <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{c.filled || 0} / {c.slots || 10} creators hired • {fmt.inr(c.budgetMin)} Budget</p>
                            </div>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                               <Bdg sm color="green">LIVE</Bdg>
                               <button 
                                 onClick={() => navigate('/applications')}
                                 style={{ background: '#111', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                               >
                                 DEALS
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </Card>
            </div>

            {/* Sidebar Resources */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '24px', borderRadius: 28 }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 900, color: '#111', marginBottom: 20 }}>Top Talent Bench</h3>
                  {shortlisted.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>Build your curated list of elite creators here.</p>
                      <Btn full sm variant="outline" onClick={() => navigate('/creators')}>Discover Talent</Btn>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       {shortlisted.slice(0, 4).map(c => (
                         <button key={c.id} onClick={() => navigate(`/creator/${c.handle}`)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '8px', borderRadius: 14, transition: 'all 0.2s', background: 'transparent', border: 'none', width: '100%', textAlign: 'left', outline: 'none' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <img src={c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }} alt="" />
                            <div style={{ flex: 1 }}>
                               <p style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>{c.name}</p>
                               <p style={{ fontSize: 11, color: '#94a3b8' }}>{fmt.num(c.followers)} Followers</p>
                            </div>
                            <ExternalLink size={12} color="#cbd5e1" />
                         </button>
                       ))}
                       <button onClick={() => navigate('/creators')} style={{ marginTop: 8, background: 'none', border: 'none', color: '#3B82F6', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>Manage Bench →</button>
                    </div>
                  )}
               </Card>

               <Card style={{ padding: '24px', background: '#111', color: '#fff', borderRadius: 28, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}><Zap size={80} color="#fff" /></div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 900, marginBottom: 10, position: 'relative', zIndex: 2 }}>Bharat Intelligence</h3>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.5, position: 'relative', zIndex: 2 }}>Let AI scout the best niche creators for your goals.</p>
                  <button style={{ width: '100%', padding: '12px', background: '#fff', color: '#111', border: 'none', borderRadius: 12, fontWeight: 900, fontSize: 11, cursor: 'pointer' }}>LAUNCH AI SCOUT</button>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
