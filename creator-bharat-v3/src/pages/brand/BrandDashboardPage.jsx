import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { LS, fmt, W } from '../../utils/helpers';
import { Btn, Card, Bdg, Empty, Bar } from '../../components/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
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
  Users,
  Target,
  PieChart,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const StatCard = ({ label, value, color, icon: Icon, trend, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    style={{ 
      padding: '32px', 
      background: '#fff', 
      borderRadius: '32px', 
      border: '1px solid #f1f5f9',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 900 }}>
       <ArrowUpRight size={14} /> {trend}
    </div>
    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
       <Icon size={24} />
    </div>
    <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
  </motion.div>
);

const CampaignRow = ({ camp: c, onAction, delay = 0 }) => {
  const fillPct = Math.round(((c.filled || 0) / (c.slots || 10)) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '24px', 
        background: '#fff', 
        borderRadius: '24px', 
        border: '1px solid #f1f5f9',
        marginBottom: '16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
         <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
            <Target size={24} />
         </div>
         <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>{c.title}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', fontWeight: 700 }}>
                  <Users size={14} /> {c.filled || 0} / {c.slots || 10} creators
               </div>
               <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
               <div style={{ fontSize: '13px', color: '#10B981', fontWeight: 800 }}>{fmt.inr(c.budgetMin)} Base</div>
            </div>
            <div style={{ marginTop: '12px', width: '200px' }}>
               <Bar value={fillPct} color="#10B981" height={4} />
            </div>
         </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
         <Bdg sm color="green">LIVE MISSION</Bdg>
         <button 
           onClick={() => onAction(c)}
           style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, cursor: 'pointer' }}
         >
           Review Apps
         </button>
      </div>
    </motion.div>
  );
};

export default function BrandDashboardPage() {
  const { st, dsp } = useApp();
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

  const myCamps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
  const myApps = LS.get('cb_applications', []).filter(a => myCamps.some(c => c.id === a.campaignId));
  const shortlisted = LS.get('cb_creators', []).filter(c => (st.brand?.shortlisted || []).includes(c.id));

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: mob ? '100px 20px 100px' : '120px 40px 100px' }}>
      
      {/* Strategic Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                 <Rocket size={14} fill="#10B981" /> Brand Command
              </div>
              <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>
                 {st.user.companyName || 'Corporate Command'}
              </h1>
              <p style={{ fontSize: '16px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>Scale your influencer ecosystem with precision data.</p>
           </div>
           <div style={{ display: 'flex', gap: '16px' }}>
              <Btn variant="outline" onClick={() => navigate('/creators')} style={{ borderRadius: '100px', padding: '14px 32px', fontSize: '14px', fontWeight: 800 }}>
                 Scout Talent
              </Btn>
              <Btn onClick={() => navigate('/campaign-builder')} style={{ borderRadius: '100px', padding: '14px 32px', fontSize: '14px', fontWeight: 900, background: '#0f172a', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                 Launch Mission +
              </Btn>
        </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
         
         {/* Stats Grid */}
         <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
            <StatCard label="Active Missions" value={myCamps.length} color="#10B981" icon={Target} trend="+2.4%" delay={0.1} />
            <StatCard label="Talent Bench" value={shortlisted.length} color="#7C3AED" icon={Star} trend="SCALED" delay={0.2} />
            <StatCard label="Total Reach" value="1.8M" color="#3B82F6" icon={Users} trend="+12%" delay={0.3} />
            <StatCard label="Est. ROI" value="4.2x" color="#FF9431" icon={TrendingUp} trend="HIGH" delay={0.4} />
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: '48px' }}>
            
            {/* Left Panel: Campaigns */}
            <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#0f172a' }}>Live Mission Oversight</h3>
                  <button onClick={() => navigate('/campaigns')} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>View All →</button>
               </div>

               {myCamps.length === 0 ? (
                 <div style={{ padding: '60px 0' }}>
                    <Empty icon="🚀" title="No Missions Live" sub="You haven't launched any campaigns yet. Start scaling now!" onCta={() => navigate('/campaign-builder')} />
                 </div>
               ) : (
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {myCamps.map((c, i) => (
                      <CampaignRow key={c.id} camp={c} delay={i * 0.1} onAction={() => { dsp({ t: 'GO', p: 'applications' }); navigate('/applications'); }} />
                    ))}
                 </div>
               )}

               {/* AI Talent Teaser */}
               <Card style={{ marginTop: '32px', padding: '40px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#fff', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, left: -30, width: '150px', height: '150px', background: '#3B82F6', borderRadius: '50%', opacity: 0.15, filter: 'blur(40px)' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <Sparkles size={20} color="#3B82F6" />
                        </div>
                        <h4 style={{ fontSize: '20px', fontWeight: 900 }}>AI Talent Scout</h4>
                     </div>
                     <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '400px' }}>
                        Our intelligence engine is analyzing 500+ new creators in your niche. Get a curated shortlist delivered instantly.
                     </p>
                     <Btn style={{ borderRadius: '100px', padding: '14px 32px', background: '#fff', color: '#0f172a', fontWeight: 950 }}>GENERATE SHORTLIST</Btn>
                  </div>
               </Card>
            </div>

            {/* Right Panel: Shortlist & Intel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               
               {/* Talent Bench */}
               <Card style={{ padding: '32px', borderRadius: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 950, marginBottom: '24px', color: '#0f172a' }}>Talent Bench</h3>
                  {shortlisted.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                       <Empty icon="⭐" title="Empty Bench" sub="Shortlist creators to build your curated team." onCta={() => navigate('/creators')} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       {shortlisted.slice(0, 5).map(c => (
                         <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                            <img src={c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} style={{ width: '48px', height: '48px', borderRadius: '14px', objectFit: 'cover' }} alt="" />
                            <div style={{ flex: 1 }}>
                               <p style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{c.name}</p>
                               <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{fmt.num(c.followers)} REACH</p>
                            </div>
                            <button onClick={() => navigate(`/creator/${c.handle || c.id}`)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                               <ExternalLink size={16} />
                            </button>
                         </div>
                       ))}
                       <button onClick={() => navigate('/creators')} style={{ width: '100%', padding: '14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px', color: '#64748b', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}>
                          SCOUT MORE TALENT
                       </button>
                    </div>
                  )}
               </Card>

               {/* Market Intel */}
               <Card style={{ padding: '32px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', borderRadius: '32px', border: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                     <PieChart size={20} color="#fff" />
                     <h4 style={{ fontSize: '16px', fontWeight: 900 }}>Growth Insights</h4>
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, fontWeight: 500, marginBottom: '24px' }}>
                    Brand mentions in <strong>Tier 2 Maharashtra</strong> increased by 18% this week. Trending Niche: <strong>TECH REVIEWS</strong>
                  </p>
                  <button style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                     EXPLORE MARKET TRENDS
                  </button>
               </Card>

            </div>

         </div>
      </div>
    </div>
  );
}
