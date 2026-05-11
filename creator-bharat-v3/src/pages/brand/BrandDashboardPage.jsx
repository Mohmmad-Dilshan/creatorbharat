import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { LS, fmt } from '../../utils/helpers';
import { Btn, Card, Bdg, Empty, Bar, Logo } from '@/components/common/Primitives';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Star, 
  ExternalLink, 
  TrendingUp,
  Users,
  Target,
  PieChart,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';
import AuthGatekeeper from '@/components/auth/AuthGatekeeper';

const StatCard = ({ label, value, color, icon: Icon, trend, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="db-stat-card"
  >
    <div className="db-stat-trend">
       <ArrowUpRight size={14} /> {trend}
    </div>
    <div className="db-stat-icon-box" style={{ background: color + '15', color: color }}>
       <Icon size={24} />
    </div>
    <div className="db-stat-value">{value}</div>
    <div className="db-stat-label">{label}</div>
  </motion.div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  trend: PropTypes.string,
  delay: PropTypes.number
};

const CampaignRow = ({ camp: c, onAction, delay = 0 }) => {
  const fillPct = Math.round(((c.filled || 0) / (c.slots || 10)) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="activity-item"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
         <div className="tx-icon-wrap" style={{ background: '#f8fafc', color: '#10B981' }}>
            <Target size={24} />
         </div>
         <div style={{ flex: 1 }}>
            <h4 className="item-title" style={{ fontSize: 18 }}>{c.title}</h4>
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
           className="btn-primary-pill"
           style={{ padding: '10px 20px', fontSize: 13 }}
         >
           Review Apps
         </button>
      </div>
    </motion.div>
  );
};

CampaignRow.propTypes = {
  camp: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    filled: PropTypes.number,
    slots: PropTypes.number,
    budgetMin: PropTypes.number
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  delay: PropTypes.number
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

  // Auth Gatekeeper
  if (!st.user || st.role !== 'brand') {
    return <AuthGatekeeper mob={mob} role="brand" />;
  }

  const myCamps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
  const shortlisted = LS.get('cb_creators', []).filter(c => (st.brand?.shortlisted || []).includes(c.id));

  return (
    <div className="dashboard-page-container">
      
      {/* Strategic Header */}
      <div className="db-page-header">
        <div className="header-content" style={{ alignItems: 'flex-end' }}>
           <div>
              <div className="badge-saffron" style={{ color: '#10B981' }}>
                 <Rocket size={14} fill="#10B981" /> Brand Command
              </div>
              <h1 className="page-title">
                 {st.user.companyName || 'Corporate Command'}
              </h1>
              <p className="db-sub-text">Scale your influencer ecosystem with precision data.</p>
           </div>
           <div className="header-actions">
              <button onClick={() => navigate('/creators')} className="btn-secondary-pill">
                 Scout Talent
              </button>
              <button onClick={() => navigate('/campaign-builder')} className="btn-primary-pill" style={{ background: '#0F172A' }}>
                 Launch Mission +
              </button>
           </div>
        </div>
      </div>

      <div className="db-page-content">
         
         {/* Stats Grid */}
         <div className="db-stat-grid" style={{ gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)' }}>
            <StatCard label="Active Missions" value={myCamps.length} color="#10B981" icon={Target} trend="+2.4%" delay={0.1} />
            <StatCard label="Talent Bench" value={shortlisted.length} color="#7C3AED" icon={Star} trend="SCALED" delay={0.2} />
            <StatCard label="Total Reach" value="1.8M" color="#3B82F6" icon={Users} trend="+12%" delay={0.3} />
            <StatCard label="Est. ROI" value="4.2x" color="#FF9431" icon={TrendingUp} trend="HIGH" delay={0.4} />
         </div>

         <div className="db-main-grid">
            
            {/* Left Panel: Campaigns */}
            <div className="db-col-right" style={{ order: mob ? 2 : 1 }}>
               <div className="section-header">
                  <h3 className="db-section-title">Live Mission Oversight</h3>
                  <button onClick={() => navigate('/campaigns')} className="btn-text-saffron">View All →</button>
               </div>

               {myCamps.length === 0 ? (
                 <div style={{ padding: '60px 0' }}>
                    <Empty icon="🚀" title="No Missions Live" sub="You haven't launched any campaigns yet. Start scaling now!" onCta={() => navigate('/campaign-builder')} />
                 </div>
               ) : (
                 <div className="transaction-list">
                    {myCamps.map((c, i) => (
                      <CampaignRow key={c.id} camp={c} delay={i * 0.1} onAction={() => { dsp({ t: 'GO', p: 'applications' }); navigate('/applications'); }} />
                    ))}
                 </div>
               )}

               {/* AI Talent Teaser */}
               <div className="brand-ai-card">
                  <div className="ai-glow" />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                     <div className="promo-header" style={{ marginBottom: 20 }}>
                        <div className="icon-wrap" style={{ background: 'rgba(255,255,255,0.1)' }}>
                           <Sparkles size={20} color="#3B82F6" />
                        </div>
                        <h4 style={{ fontSize: '20px', fontWeight: 900 }}>AI Talent Scout</h4>
                     </div>
                     <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 400 }}>
                        Our intelligence engine is analyzing 500+ new creators in your niche. Get a curated shortlist delivered instantly.
                     </p>
                     <button className="btn-secondary-pill" style={{ background: '#FFF', color: '#0F172A', border: 'none' }}>GENERATE SHORTLIST</button>
                  </div>
               </div>
            </div>

            {/* Right Panel: Shortlist & Intel */}
            <div className="db-col-left" style={{ order: mob ? 1 : 2 }}>
               
               {/* Talent Bench */}
               <Card className="talent-bench-card">
                  <h3 className="card-title-sm" style={{ marginBottom: 24 }}>Talent Bench</h3>
                  {shortlisted.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                       <Empty icon="⭐" title="Empty Bench" sub="Shortlist creators to build your curated team." onCta={() => navigate('/creators')} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       {shortlisted.slice(0, 5).map(c => (
                         <div key={c.id} className="bench-item">
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
                       <button onClick={() => navigate('/creators')} className="btn-secondary-pill" style={{ width: '100%', justifyContent: 'center' }}>
                          SCOUT MORE TALENT
                       </button>
                    </div>
                  )}
               </Card>

               {/* Market Intel */}
               <Card className="market-intel-card" style={{ marginTop: 24 }}>
                  <div className="promo-header" style={{ marginBottom: 16 }}>
                     <PieChart size={20} color="#fff" />
                     <h4 style={{ fontSize: '16px', fontWeight: 900 }}>Growth Insights</h4>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 24 }}>
                    Brand mentions in <strong>Tier 2 Maharashtra</strong> increased by 18% this week. Trending Niche: <strong>TECH REVIEWS</strong>
                  </p>
                  <button className="intel-btn">
                     EXPLORE MARKET TRENDS
                  </button>
               </Card>

            </div>

         </div>
      </div>
    </div>
  );
}
