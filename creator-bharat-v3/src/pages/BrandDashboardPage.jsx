import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { LS, fmt } from '../utils/helpers';
import { Btn, Card, Bdg, Empty } from '../components/Primitives';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  FileText, 
  Star, 
  Eye, 
  Search, 
  Plus, 
  ExternalLink, 
  Zap,
  TrendingUp,
  BarChart2,
  Users
} from 'lucide-react';

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
    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
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
    { l: 'Active Missions', v: myCamps.length, c: '#10B981', i: Rocket, trend: 'LIVE' },
    { l: 'New Responses', v: myApps.length, c: '#3B82F6', i: FileText, trend: '+12' },
    { l: 'Talent Bench', v: shortlisted.length, c: '#7C3AED', i: Star, trend: 'SCALED' },
    { l: 'Market Reach', v: '1.2M', c: '#FF9431', i: Eye, trend: '+4.2%' }
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Enterprise Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Enterprise Management</p>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              {myBrand.companyName || 'Corporate Command'}
            </h1>
            <p style={{ fontSize: 15, color: '#64748b', marginTop: 4, fontWeight: 500 }}>Scale your influencer ecosystem with data-driven mission control.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn 
              variant="outline" 
              onClick={() => navigate('/creators')}
              style={{ borderRadius: 12, background: '#fff', border: '1.5px solid #e2e8f0', padding: '12px 24px', fontSize: 13, fontWeight: 800 }}
            >
              <Search size={14} style={{ marginRight: 8 }} /> Scout Talent
            </Btn>
            <Btn 
              onClick={() => navigate('/campaign-builder')}
              style={{ borderRadius: 12, background: '#111', color: '#fff', padding: '12px 28px', fontSize: 13, fontWeight: 900, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <Plus size={14} style={{ marginRight: 8 }} /> Launch Mission
            </Btn>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 20 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ 
                padding: '24px', background: '#fff', borderRadius: 28, 
                border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 12, right: 12, background: s.c + '15', color: s.c, fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 100 }}>
                {s.trend}
              </div>
              <div style={{ color: s.c, marginBottom: 20 }}><s.i size={24} strokeWidth={2.5} /></div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#111', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', marginTop: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1.2fr', gap: 32 }}>
          {/* Main Panel: Active Campaigns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Card style={{ padding: '40px', borderRadius: 32, background: '#fff', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111' }}>Mission Oversight</h3>
                  <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, marginTop: 4 }}>Live tracking of active brand campaigns.</p>
                </div>
                <Btn sm variant="ghost" onClick={() => navigate('/campaigns')} style={{ fontSize: 12, fontWeight: 800 }}>Explore Global Bench</Btn>
              </div>
              
              {myCamps.length === 0 ? (
                <Empty icon="🚀" title="No Missions Live" sub="Launch your first campaign to start scaling." onCta={() => navigate('/campaign-builder')} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {myCamps.slice(0, 5).map(c => (
                    <div key={c.id} style={{ padding: '24px', background: '#f8fafc', borderRadius: 24, border: '1px solid rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', border: '1px solid #e2e8f0' }}>
                          <BarChart2 size={20} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 4 }}>{c.title}</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{c.filled || 0} Hired</span>
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 800 }}>{fmt.inr(c.budgetMin)} Base</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <Bdg sm color="green">ACTIVE</Bdg>
                        <button onClick={() => navigate('/applications')} style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}>REVIEW APPS</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Talent Discovery Teaser */}
            <Card style={{ padding: '40px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#fff', borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, background: '#3B82F6', borderRadius: '50%', opacity: 0.1, filter: 'blur(50px)' }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
                  <h3 style={{ fontSize: 18, fontWeight: 900 }}>AI Talent Scout</h3>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32, maxWidth: 400 }}>Our proprietary intelligence is analyzing 500+ new creators in your niche. Get a curated shortlist delivered instantly.</p>
                <button style={{ padding: '14px 28px', background: '#fff', color: '#111', border: 'none', borderRadius: 14, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>GENERATE SHORTLIST</button>
              </div>
            </Card>
          </div>

          {/* Side Panel: Shortlist & Resources */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Card style={{ padding: '32px', borderRadius: 32, background: '#fff', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 900, color: '#111' }}>Talent Bench</h3>
                <TrendingUp size={18} color="#FF9431" />
              </div>
              
              {shortlisted.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <Empty icon="⭐" title="Empty Bench" sub="Shortlist creators to build your curated mission team." onCta={() => navigate('/creators')} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {shortlisted.slice(0, 5).map(c => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#FAFAFA', borderRadius: 20, border: '1px solid rgba(0,0,0,0.02)' }}>
                      <img src={c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} style={{ width: 44, height: 44, borderRadius: 14, objectFit: 'cover' }} alt="" />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{c.name}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>{fmt.num(c.followers)} REACH</p>
                      </div>
                      <button onClick={() => navigate(`/creator/${c.handle}`)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  ))}
                  <Btn full variant="ghost" onClick={() => navigate('/creators')} style={{ marginTop: 12, fontSize: 12, fontWeight: 800 }}>SCOUT MORE TALENT</Btn>
                </div>
              )}
            </Card>

            <Card style={{ padding: '32px', background: '#FF9431', color: '#fff', borderRadius: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Growth Insights</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 24 }}>Brand mentions in Bhilwara region increased by 18% this week. Trending Niche: <strong>FASHION</strong></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 800 }}>
                <Zap size={16} /> VIEW MARKET TRENDS
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
