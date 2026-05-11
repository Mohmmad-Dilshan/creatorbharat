import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { LS, fmt } from '../../utils/helpers';
import { Btn, Card, Bdg, Bar, Empty, Ring, Logo } from '@/components/common/Primitives';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Zap, 
  Briefcase, 
  ChevronRight,
  Wallet,
  Star
} from 'lucide-react';
import AuthGatekeeper from '@/components/auth/AuthGatekeeper';

const StatCard = ({ label, value, trend, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="db-stat-card"
  >
    <div className="db-stat-trend">
       {trend} <TrendingUp size={12} />
    </div>
    <div className="db-stat-icon-box" style={{ background: color + '10', color: color }}>
       <Icon size={20} />
    </div>
    <div className="db-stat-value">{value}</div>
    <div className="db-stat-label">{label}</div>
  </motion.div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number
};

const MatchingCampaign = ({ title, brand, budget, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="db-campaign-card"
    whileHover={{ y: -5, borderColor: '#FF9431' }}
  >
    <div className="tag-saffron-sm">NEW MATCH</div>
    <h4 className="title-sm">{title}</h4>
    <p className="sub-sm">by {brand}</p>
    <div className="card-footer-flex">
       <div className="budget-text">₹{budget}</div>
       <Btn sm variant="ghost">Apply Now</Btn>
    </div>
  </motion.div>
);

MatchingCampaign.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  delay: PropTypes.number
};

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
  
  // Guard Clause for Auth
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} />;
  }

  const c = st.creatorProfile;
  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const score = c ? (c.score || fmt.score(c)) : 0;
  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };

  return (
    <div className="dashboard-page-container">
      
      {/* Top Header Section */}
      <div className="db-page-header">
        <div className="header-content">
           <div className="title-stack">
              <div className="badge-saffron">
                 <Zap size={14} fill="#FF9431" /> CREATOR HUB
              </div>
              <h1 className="page-title">
                Namaste, {c?.name?.split(' ')[0] || st.user.name.split(' ')[0]}!
              </h1>
           </div>
           <div className="header-actions">
              <button onClick={() => navigate(`/creator/${c?.handle || 'me'}`)} className="btn-secondary-pill">
                <ExternalLink size={16} /> Public Profile
              </button>
              <button onClick={() => navigate('/campaigns')} className="btn-primary-pill">
                Explore Deals
              </button>
           </div>
        </div>
      </div>

      <div className="db-page-content">
         {/* Stats Grid */}
         <div className="db-stat-grid">
            <StatCard label="Active Deals" value={myApps.filter(a => a.status === 'selected').length} trend="+12%" icon={Briefcase} color="#10B981" delay={0.1} />
            <StatCard label="Followers" value={fmt.num(c?.followers || 0)} trend="+5.4%" icon={Users} color="#7C3AED" delay={0.2} />
            <StatCard label="Elite Score" value={score} trend="Top 2%" icon={ShieldCheck} color="#FF9431" delay={0.3} />
            <StatCard label="Wallet" value="₹2,450" trend="+₹850" icon={Wallet} color="#3B82F6" delay={0.4} />
         </div>

         {/* Matching Campaigns */}
         <div className="db-section">
            <div className="section-header">
               <h3 className="db-section-title">Matching Campaigns</h3>
               <button className="btn-text-saffron" onClick={() => navigate('/campaigns')}>
                  See all <ChevronRight size={16} />
               </button>
            </div>
            <div className="db-horizontal-scroll">
               <MatchingCampaign title="Tech Review Series" brand="Boat Audio" budget="15,000" delay={0.5} />
               <MatchingCampaign title="Regional Lifestyle" brand="Myntra" budget="8,000" delay={0.6} />
               <MatchingCampaign title="Gaming Shorts" brand="Redbull" budget="12,500" delay={0.7} />
               <MatchingCampaign title="Financial Literacy" brand="Groww" budget="20,000" delay={0.8} />
            </div>
         </div>

         <div className="db-main-grid">
            {/* Left Column: Profile Strength */}
            <div className="db-col-left">
               <Card className="profile-strength-card">
                  <div className="card-header-center">
                     <h3 className="card-title">Digital Pehchan Score</h3>
                     <div className="ring-container">
                        <Ring score={score} size={160} strokeWidth={14} color="#FF9431" />
                     </div>
                     <Bdg color="saffron" lg>Elite Creator</Bdg>
                  </div>
                  
                  <div className="progress-box">
                     <div className="progress-labels">
                        <span className="label">Profile Completeness</span>
                        <span className="value">{comp.pct}%</span>
                     </div>
                     <Bar value={comp.pct} color="#FF9431" height={8} />
                  </div>

                  {comp.missing.length > 0 && (
                     <div className="tasks-box">
                        <p className="tasks-title">Priority Tasks</p>
                        {comp.missing.slice(0, 2).map((m) => (
                           <div key={m} className="task-item">
                              <span>{m}</span>
                              <ChevronRight size={16} />
                           </div>
                        ))}
                     </div>
                  )}
               </Card>

               <Card className="shortcuts-card">
                  <h4 className="card-title-sm">Elite Tools</h4>
                  <div className="shortcuts-list">
                     <button onClick={() => navigate('/rate-calc')} className="shortcut-btn">
                        <div className="icon-box">🧮</div>
                        <span>Rate Calculator</span>
                     </button>
                     <button onClick={() => navigate('/leaderboard')} className="shortcut-btn">
                        <div className="icon-box">🏆</div>
                        <span>Leaderboard</span>
                     </button>
                  </div>
               </Card>
            </div>

            {/* Right Column: Activity & Media Kit */}
            <div className="db-col-right">
               <Card className="activity-card">
                  <div className="card-header-flex">
                     <h3 className="card-title">Application Pulse</h3>
                     <Btn sm variant="ghost" onClick={() => navigate('/applications')}>View Pulse</Btn>
                  </div>
                  
                  {myApps.length === 0 ? (
                    <Empty 
                      icon="📊" 
                      title="No Pulse Yet" 
                      sub="Once you apply to campaigns, you will see real-time status updates here." 
                      ctaLabel="Find Campaigns" 
                      onCta={() => navigate('/campaigns')} 
                    />
                  ) : (
                    <div className="activity-list">
                       {myApps.slice(0, 5).map(a => (
                         <div key={a.id} className="activity-item">
                            <div className="item-left">
                               <div className="icon-wrap">
                                  <Briefcase size={20} color="#64748b" />
                               </div>
                               <div className="item-info">
                                  <h5 className="item-title">{a.campaignTitle}</h5>
                                  <p className="item-sub">{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</p>
                               </div>
                            </div>
                            <div className="item-right">
                               <Bdg color={a.status === 'selected' ? 'green' : (a.status === 'shortlisted' ? 'purple' : 'blue')}>
                                  {a.status?.toUpperCase() || 'SENT'}
                                </Bdg>
                               <p className="date-text">{fmt.date(a.date)}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </Card>

               {/* Share Identity Card */}
               <motion.div
                 whileHover={{ y: -5 }}
                 className="media-kit-promo-card"
               >
                  <div className="promo-glow" />
                  <div className="promo-content">
                     <div className="promo-header">
                        <Star size={24} fill="#FF9431" color="#FF9431" />
                        <h3>Elite Media Kit</h3>
                     </div>
                     <p>
                        Your professional portfolio is ready. Share this cinematic link with brands to showcase your worth.
                     </p>
                     <div className="copy-link-wrap">
                        <div className="link-text">
                           creatorbharat.in/c/{c?.handle || 'user'}
                        </div>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.in/c/${c?.handle}`); toast('Link Copied!', 'success'); }}
                          className="copy-btn"
                        >
                           COPY
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
    </div>
  );
}
