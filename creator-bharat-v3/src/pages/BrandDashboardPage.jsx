import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, fmt } from '../utils/helpers';
import { Btn, Card, Bdg, Empty } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';
import { motion } from 'framer-motion';
import { Rocket, FileText, Star, Eye, Search, Plus, ExternalLink, Zap } from 'lucide-react';

export default function BrandDashboardPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
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
    { l: 'Live Campaigns', v: myCamps.length, c: '#10B981', i: Rocket },
    { l: 'Total Applications', v: myApps.length, c: '#3B82F6', i: FileText },
    { l: 'Shortlisted', v: shortlisted.length, c: '#7C3AED', i: Star },
    { l: 'Total Reach', v: '1.2M', c: '#FF9431', i: Eye }
  ];

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Elite Brand Header */}
      <EliteHeader 
        eyebrow="Enterprise Console"
        title={myBrand.companyName || myBrand.name || 'Brand Console'}
        sub="Manage your marketing campaigns, track performance, and hire elite Bharat talent."
        gradient="green"
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Btn 
            lg 
            variant="outline" 
            onClick={() => navigate('/creators')}
            style={{ borderRadius: 100, background: '#fff' }}
          >
            <Search size={18} style={{ marginRight: 8 }} /> Discover Talent
          </Btn>
          <Btn 
            lg 
            onClick={() => navigate('/campaign-builder')}
            style={{ borderRadius: 100, background: '#111', color: '#fff' }}
          >
            <Plus size={18} style={{ marginRight: 8 }} /> Post New Campaign
          </Btn>
        </div>
      </EliteHeader>

      <div style={{ marginTop: -40 }}>
        <div style={W()}>
          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 20, marginBottom: 32 }}>
             {stats.map((s, i) => {
               const Icon = s.i;
               return (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   style={{ padding: '28px 24px', background: '#fff', borderRadius: 24, textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
                 >
                    <div style={{ color: s.c, marginBottom: 12, display: 'flex', justifyContent: 'center' }}><Icon size={24} /></div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#111', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.l}</div>
                 </motion.div>
               );
             })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: 32 }}>
            {/* Campaigns List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px', borderRadius: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                     <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: '#111' }}>Active Campaigns</h3>
                     <Btn sm variant="ghost" onClick={() => navigate('/campaigns')}>History</Btn>
                  </div>
                  
                  {myCamps.length === 0 ? (
                    <Empty 
                      icon="🚀" 
                      title="No active campaigns" 
                      sub="Pahla campaign launch karein aur creators se connect karein." 
                      ctaLabel="Start Your First Campaign" 
                      onCta={() => navigate('/campaign-builder')} 
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                       {myCamps.map(c => (
                         <div key={c.id} style={{ padding: '24px', background: 'rgba(0,0,0,0.02)', borderRadius: 24, border: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                            <div>
                               <h4 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 4 }}>{c.title}</h4>
                               <p style={{ fontSize: 14, color: T.t3, fontWeight: 600 }}>{c.filled || 0} / {c.slots || 10} creators hired • {fmt.inr(c.budgetMin)} Budget</p>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                               <Bdg color="green">LIVE</Bdg>
                               <Btn sm variant="outline" onClick={() => navigate('/applications')}>Applications</Btn>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </Card>
            </div>

            {/* Sidebar Resources */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               <Card style={{ padding: '32px', borderRadius: 32 }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 24 }}>Shortlisted Talent</h3>
                  {shortlisted.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <p style={{ fontSize: 14, color: T.t3, lineHeight: 1.6, marginBottom: 20 }}>Aapne abhi tak kisi creator ko shortlist nahi kiya hai.</p>
                      <Btn full variant="outline" onClick={() => navigate('/creators')}>Discover Talent</Btn>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                       {shortlisted.slice(0, 5).map(c => (
                         <div key={c.id} onClick={() => navigate(`/creator/${c.handle}`)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '10px', borderRadius: 12, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <img src={c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }} alt="" />
                            <div style={{ flex: 1 }}>
                               <p style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{c.name}</p>
                               <p style={{ fontSize: 12, color: T.t3 }}>{fmt.num(c.followers)} Followers</p>
                            </div>
                            <ExternalLink size={14} color="#ccc" />
                         </div>
                       ))}
                       <Btn full variant="ghost" style={{ marginTop: 12 }} onClick={() => navigate('/creators')}>View More</Btn>
                    </div>
                  )}
               </Card>

               <Card style={{ padding: '32px', background: '#111', color: '#fff', borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}><Zap size={100} color="#fff" /></div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, marginBottom: 12, position: 'relative', zIndex: 2 }}>Bharat AI Assistant</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.6, position: 'relative', zIndex: 2 }}>Need help finding the right creator for your specific niche? Let our AI suggest the best match.</p>
                  <Btn full variant="white" style={{ position: 'relative', zIndex: 2 }}>Launch AI Scout</Btn>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
