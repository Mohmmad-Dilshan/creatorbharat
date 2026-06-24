import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS, fmt } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { fetchCampaigns } from '../../utils/platformService';
import { Card, Bdg, Empty, Bar } from '../../components/common/Primitives';
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
  Sparkles
} from 'lucide-react';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';

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
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="transaction-item"
      style={{ padding: '20px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FF943110', display: 'grid', placeItems: 'center', color: '#FF9431', flexShrink: 0 }}>
           <Target size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
           <h5 className="tx-title" style={{ fontSize: '15px', fontWeight: 900, marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</h5>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '120px' }}>
                 <Bar value={fillPct} color="#FF9431" height={5} />
              </div>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
                 {c.filled || 0}/{c.slots || 10} Slots Filled
              </span>
           </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '16px' }}>
         <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '15px', fontWeight: 950, color: '#10B981' }}>{fmt.inr(c.budgetMin || c.budget || 0)}</div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>BUDGET</span>
         </div>
         <button onClick={onAction} className="btn-secondary-pill" style={{ padding: '8px 16px', fontSize: '12px' }}>
            Oversight
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
  const [campaigns, setCampaigns] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [loading, setLoading] = useState(true);

  const [gigs, setGigs] = useState([]);
  const [loadingGigs, setLoadingGigs] = useState(false);

  const loadGigs = async () => {
    setLoadingGigs(true);
    try {
      const res = await apiCall('/gigs/me');
      setGigs(res || []);
    } catch (err) {
      console.error('Failed to load gigs:', err);
    } finally {
      setLoadingGigs(false);
    }
  };

  const handleApproveMilestone = async (gigId, milestoneId) => {
    if (!confirm('Are you sure you want to approve this milestone? This will release the escrow funds to the creator\'s wallet.')) return;

    try {
      await apiCall(`/gigs/${gigId}/milestones/${milestoneId}/approve`, {
        method: 'POST'
      });
      alert('Milestone approved! Escrow payment released successfully. 💰');
      loadGigs();
    } catch (err) {
      alert(err.message || 'Failed to approve milestone');
    }
  };

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    let active = true;
    async function loadData() {
      if (!st.user) return;
      try {
        const [campsData, appsData] = await Promise.all([
          apiCall('/campaigns/me'),
          apiCall('/applications/me')
        ]);

        if (!active) return;

        let camps = campsData;
        if (!camps || camps.length === 0) {
          camps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
        }
        setCampaigns(camps);

        let shortlistedCreators = [];
        if (appsData && appsData.length > 0) {
          shortlistedCreators = appsData
            .filter(app => app.status?.toLowerCase() === 'shortlisted')
            .map(app => app.creator)
            .filter(Boolean);
        }
        if (shortlistedCreators.length === 0) {
          shortlistedCreators = LS.get('cb_creators', []).filter(c => (st.brand?.shortlisted || []).includes(c.id));
        }
        setShortlisted(shortlistedCreators);
      } catch (err) {
        console.error('Failed to load brand dashboard data:', err);
        if (active) {
          setCampaigns(LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user?.email));
          setShortlisted(LS.get('cb_creators', []).filter(c => (st.brand?.shortlisted || []).includes(c.id)));
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    loadGigs();
    return () => { active = false; };
  }, [st.user?.email, st.brand?.shortlisted]);

  // Auth Gatekeeper
  if (!st.user || st.role !== 'brand') {
    return <AuthGatekeeper mob={mob} role="brand" />;
  }

  const myCamps = campaigns;

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
                      <CampaignRow key={c.id} camp={c} delay={i * 0.1} onAction={() => { navigate('/brand-applications'); }} />
                    ))}
                 </div>
               )}

               {/* Active Escrow Contracts Section */}
               <div className="section-header" style={{ marginTop: '40px' }}>
                  <h3 className="db-section-title">Active Escrow Contracts</h3>
                  {gigs.length > 0 && <Bdg color="green">{gigs.length} Active</Bdg>}
               </div>

               {loadingGigs ? (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: '#94a3b8' }}>
                     <p style={{ fontSize: 13, fontWeight: 700 }}>Loading active contracts...</p>
                  </div>
               ) : gigs.length === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #e2e8f0', marginTop: '16px', marginBottom: '24px' }}>
                     <p style={{ fontSize: 13, color: '#64748b', fontWeight: 650, margin: 0 }}>No active milestone contracts yet.</p>
                     <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0' }}>Accept applications to initialize a contract with secure escrow payments.</p>
                  </div>
               ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px', marginBottom: '24px' }}>
                     {gigs.map(gig => (
                        <Card key={gig.id} style={{ padding: '20px' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
                              <div>
                                 <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{gig.campaign?.title}</h4>
                                 <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0', fontWeight: 600 }}>Creator Partner: <strong style={{ color: '#FF9431' }}>{gig.creator?.name}</strong></p>
                              </div>
                              <Bdg color={gig.status === 'COMPLETED' ? 'green' : 'blue'}>{gig.status}</Bdg>
                           </div>

                           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {gig.milestones.map((ms, idx) => (
                                 <div key={ms.id} style={{
                                    background: ms.status === 'APPROVED' ? '#f0fdf4' : ms.status === 'SUBMITTED' ? '#eff6ff' : '#f8fafc',
                                    padding: '12px 16px', borderRadius: '12px', border: '1px solid',
                                    borderColor: ms.status === 'APPROVED' ? '#10b98120' : ms.status === 'SUBMITTED' ? '#3b82f620' : '#e2e8f0',
                                    display: 'flex', flexDirection: 'column', gap: '8px'
                                 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                       <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{idx + 1}. {ms.title}</span>
                                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <span style={{ fontSize: '12px', fontWeight: 800 }}>₹{ms.amount?.toLocaleString()}</span>
                                          <Bdg sm color={ms.status === 'APPROVED' ? 'green' : ms.status === 'SUBMITTED' ? 'blue' : 'slate'}>
                                             {ms.status === 'APPROVED' ? 'Released' : ms.status === 'SUBMITTED' ? 'Needs Review' : 'Pending'}
                                          </Bdg>
                                       </div>
                                    </div>

                                    {ms.status === 'SUBMITTED' && (
                                       <div style={{ padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #3b82f615', fontSize: '12px', marginTop: '4px' }}>
                                          <div style={{ color: '#64748b', marginBottom: '8px' }}>
                                             <strong style={{ color: '#3b82f6' }}>Proof Submitted:</strong> "{ms.proofText || 'No text note provided.'}"
                                          </div>
                                          {ms.proofUrl && (
                                             <a href={ms.proofUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FF9431', fontWeight: 800, textDecoration: 'underline', display: 'block', marginBottom: '8px' }}>
                                                View Live Output ↗
                                             </a>
                                          )}
                                          <button
                                             onClick={() => handleApproveMilestone(gig.id, ms.id)}
                                             style={{
                                                background: '#10B981', color: '#fff', border: 'none',
                                                borderRadius: '8px', padding: '6px 12px', fontSize: '11px',
                                                fontWeight: 800, cursor: 'pointer'
                                             }}
                                          >
                                             Approve and Release Funds 💰
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              ))}
                           </div>
                        </Card>
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
