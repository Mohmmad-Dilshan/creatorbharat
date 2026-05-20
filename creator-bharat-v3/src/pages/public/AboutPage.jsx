import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { 
  Globe, 
  Award,
  TrendingUp,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import { fetchCreators, fetchCampaigns, derivePlatformAnalytics } from '@/utils/platformService';

const StatBlock = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{ textAlign: 'left' }}
  >
    <div style={{ fontSize: '56px', fontWeight: 950, color: '#fff', marginBottom: '8px', letterSpacing: '-0.04em', fontFamily: "'Outfit', sans-serif" }}>{value}</div>
    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>{label}</div>
  </motion.div>
);

StatBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  delay: PropTypes.number
};

const LiveAnalyticsPulse = () => {
  const [activeTab, setActiveTab] = React.useState('reach');
  const [brokerageVal, setBrokerageVal] = React.useState(150000); // 1.5 Lakh Campaign Value

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '32px',
      padding: '32px',
      backdropFilter: 'blur(30px)',
      marginTop: '60px',
      boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'reach', label: '⚡ Regional Coverage' },
          { id: 'savings', label: '💰 Brokerage Calculator' },
          { id: 'campaigns', label: '🎯 Live Engagements' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: activeTab === t.id ? '1px solid rgba(255,148,49,0.3)' : '1px solid rgba(255,255,255,0.06)',
              background: activeTab === t.id ? 'rgba(255,148,49,0.1)' : 'transparent',
              color: activeTab === t.id ? '#FF9431' : 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'reach' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { zone: 'Tier-2 Hubs', percentage: '45%', cities: 'Bhilwara, Jaipur, Indore' },
                { zone: 'Tier-3 Towns', percentage: '40%', cities: 'Udaipur, Kota, Dewas' },
                { zone: 'Metros Coverage', percentage: '15%', cities: 'Mumbai, Delhi, Bangalore' }
              ].map(item => (
                <div key={item.zone} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.zone}</div>
                  <div style={{ fontSize: '32px', fontWeight: 950, color: '#fff', margin: '8px 0', fontFamily: "'Outfit', sans-serif" }}>{item.percentage}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item.cities}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'savings' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>CAMPAIGN BUDGET:</span>
                  <span style={{ fontWeight: 950, color: '#FF9431', fontFamily: "'Outfit', sans-serif" }}>₹{brokerageVal.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={brokerageVal}
                  onChange={(e) => setBrokerageVal(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.1)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', fontWeight: 900 }}>
                  <span>₹20,000</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '24px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Net Brokerage Saved</div>
                <div style={{ fontSize: '40px', fontWeight: 950, color: '#10B981', margin: '8px 0', fontFamily: "'Outfit', sans-serif" }}>₹{(brokerageVal * 0.18).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Saved via our 0% Broker Fee Infrastructure vs typical agencies charging 18%</div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { client: 'Agri-Tech Brand', town: 'Jaipur Rural', reach: '500K+', status: 'Completed' },
                { client: 'Regional E-Commerce', town: 'Bhilwara Town', reach: '200K+', status: 'Active' },
                { client: 'D2C Retailer', town: 'Indore Suburban', reach: '1.2M+', status: 'Escrow Secured' }
              ].map((c, index) => (
                <div key={c.client} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>{c.client}</span>
                      <span style={{ fontSize: '9px', fontWeight: 900, color: c.status === 'Active' ? '#FF9431' : '#10B981', background: c.status === 'Active' ? 'rgba(255,148,49,0.1)' : 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '100px', textTransform: 'uppercase' }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>{c.town}</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 950, color: '#fff', marginTop: '16px', fontFamily: "'Outfit', sans-serif" }}>{c.reach} <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Target Reach</span></div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const HeroBlueprint = () => {
  return (
    <div style={{
      marginTop: '60px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px'
    }}>
      {[
        {
          num: "01",
          title: "Verify Identity",
          sub: "Digital Pehchan",
          desc: "We verify the analytics, location, and brand-safety of regional creators so brands can bypass fake followers and hire authentic talent.",
          accent: "#FF9431"
        },
        {
          num: "02",
          title: "Bypass Middlemen",
          sub: "Direct Pitch SaaS",
          desc: "Brands pitch directly to creators in Tier 2 & 3 cities through our open marketplace. No agency gatekeepers or massive markups.",
          accent: "#10B981"
        },
        {
          num: "03",
          title: "Zero Broker Fees",
          sub: "Safe Escrow Ledgers",
          desc: "Payouts are secured in safe escrow ledgers and released immediately upon project completion. Best part? We charge 0% commission.",
          accent: "#3B82F6"
        }
      ].map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.6 }}
          whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.2)' }}
          style={{
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '28px',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '90px', fontWeight: 950, color: 'rgba(255,255,255,0.02)', userSelect: 'none', lineHeight: 1 }}>{card.num}</div>
          
          <div>
            <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 900, color: card.accent, background: `${card.accent}15`, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
              {card.sub}
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{card.title}</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.48)', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CampaignPipelineVisualizer = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      title: "1. Verified Pehchan",
      tag: "Verification Layer",
      desc: "Creators link their official analytics. Our algorithm audits their active engagement, niche consistency, and assigns verified trust badges (Verified, Elite, Enterprise).",
      metric: "99.2% Fraud Detection Accuracy",
      icon: Award,
      color: "#FF9431"
    },
    {
      title: "2. Precision Discovery",
      tag: "SaaS Search Engine",
      desc: "Brands utilize advanced filters targeting Tier 2 & 3 districts, specific language demographics, and audience metrics to instantly discover matching local storytellers.",
      metric: "Filter across 150+ Districts",
      icon: Globe,
      color: "#10B981"
    },
    {
      title: "3. Escrow Security",
      tag: "Zero-Brokerage Escrow",
      desc: "Contracts are established immediately on-platform. Brands secure campaign funds inside our automated escrow ledger. Absolutely 0% agency fees are cut.",
      metric: "100% Secure Milestone Release",
      icon: TrendingUp,
      color: "#3B82F6"
    },
    {
      title: "4. Direct Campaign ROI",
      tag: "Real-Time Tracking",
      desc: "Campaign execution goes live. Deliverables and performance analytics are captured by the platform dashboard, and funds are automatically disbursed upon completion.",
      metric: "Real-Time Tracking & Post Audits",
      icon: Sparkles,
      color: "#a855f7"
    }
  ];

  return (
    <div className="pipeline-container" style={{
      background: '#0a0a0a',
      borderRadius: '60px',
      padding: '80px 60px',
      color: '#fff',
      margin: '0 auto 90px',
      maxWidth: '1200px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow decorative */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', background: 'rgba(255,148,49,0.1)', padding: '6px 16px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Ecosystem Workflow</span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 950, letterSpacing: '-0.04em', margin: '16px 0 12px', color: '#fff' }}>The Creator-Brand Pipeline</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '600px', margin: '0 auto' }}>How CreatorBharat powers seamless campaigns with absolute transparency. Click any step to inspect the infrastructure.</p>
      </div>

      <div className="pipeline-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        {/* Step list selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(idx)}
                style={{
                  textAlign: 'left',
                  background: isCurrent ? 'rgba(255,255,255,0.03)' : 'transparent',
                  border: isCurrent ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid transparent',
                  borderRadius: '24px',
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none',
                  width: '100%'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: isCurrent ? step.color : 'rgba(255,255,255,0.02)',
                  color: isCurrent ? '#fff' : 'rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: isCurrent ? step.color : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{step.tag}</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: isCurrent ? '#fff' : 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{step.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed state view */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pipeline-detail-card"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '36px',
              padding: '48px',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: steps[activeStep].color, background: `${steps[activeStep].color}15`, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {steps[activeStep].tag}
              </span>
              <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginTop: '24px', marginBottom: '16px', letterSpacing: '-0.02em' }}>{steps[activeStep].title}</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{steps[activeStep].desc}</p>
            </div>

            <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>System Metric:</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: steps[activeStep].color, marginTop: '4px' }}>{steps[activeStep].metric}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 800 }}>
                <span>Interactive Tooltip</span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const TIMELINE_DATA = [
  {
    year: "2024: THE SPARK",
    title: "The Bhilwara Prototype",
    desc: "Identifying the massive gap between regional talent in Tier 2 & 3 cities and national brand opportunities. We tested our first directory manually mapping 150 local creators in Rajasthan.",
    stats: [
      { label: "Creators Mapped", value: "150+" },
      { label: "Target City", value: "Bhilwara" }
    ]
  },
  {
    year: "2025: THE INFRASTRUCTURE",
    title: "The Trust & Identity Layer",
    desc: "Launched our proprietary Creator Score algorithm and verified Digital Pehchan. This allowed upcoming creators to present data-validated analytics without expensive agencies.",
    stats: [
      { label: "Active Profiles", value: "1,200+" },
      { label: "System Trust Metric", value: "Blue Badges" }
    ]
  },
  {
    year: "2026: THE REVOLUTION",
    title: "Elite National Marketplace",
    desc: "Scaled CreatorBharat into an elite SaaS platform with zero broker fee policies, automated ROI calculators, interactive podium leaderboards, and safe escrow ledger systems.",
    stats: [
      { label: "Active Users", value: "2,400+" },
      { label: "Broker Fees Charged", value: "0%" }
    ]
  }
];

const TimelineStep = ({ year, title, desc, stats, isActive, onSelect, idx, total }) => (
  <motion.div
    onClick={onSelect}
    style={{ 
      position: 'relative', 
      paddingLeft: '48px', 
      marginBottom: '32px', 
      cursor: 'pointer',
      zIndex: 2
    }}
  >
    {/* Circle Indicator */}
    <div style={{ 
      position: 'absolute', 
      left: '3px', 
      top: '6px', 
      width: '12px', 
      height: '12px', 
      borderRadius: '50%', 
      background: isActive ? '#FF9431' : '#fff', 
      border: isActive ? '3.5px solid #fff' : '2px solid #cbd5e1', 
      boxShadow: isActive ? '0 0 0 8px rgba(255, 148, 49, 0.2)' : 'none', 
      zIndex: 3,
      transition: 'all 0.3s ease'
    }} />
    
    {/* Content Card */}
    <div style={{
      background: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
      border: isActive ? '1.5px solid rgba(0,0,0,0.05)' : '1.5px solid transparent',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.03)' : 'none',
      transition: 'all 0.3s ease',
      transform: isActive ? 'scale(1.01)' : 'scale(1)'
    }}>
      <div style={{ fontSize: '11px', fontWeight: 900, color: isActive ? '#FF9431' : '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'all 0.3s ease' }}>{year}</div>
      <h4 style={{ fontSize: isActive ? '24px' : '20px', fontWeight: 900, color: isActive ? '#0f172a' : '#64748b', marginBottom: '12px', transition: 'all 0.3s ease' }}>{title}</h4>
      
      {/* Collapsible Details */}
      <div style={{ 
        maxHeight: isActive ? '500px' : '0px', 
        opacity: isActive ? 1 : 0, 
        overflow: 'hidden', 
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, margin: '0 0 20px 0', maxWidth: '540px' }}>{desc}</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#f8fafc', padding: '12px 20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

TimelineStep.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  stats: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default function AboutPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(2);
  const [selectedCity, setSelectedCity] = React.useState('bhilwara');

  const [creators, setCreators] = React.useState([]);
  const [campaigns, setCampaigns] = React.useState([]);

  React.useEffect(() => {
    let active = true;
    Promise.all([fetchCreators(), fetchCampaigns()])
      .then(([creatorsList, campaignsList]) => {
        if (!active) return;
        setCreators(creatorsList || []);
        setCampaigns(campaignsList || []);
      })
      .catch(err => {
        if (import.meta.env.DEV && (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('fetch'))) {
          console.warn("AboutPage fetch warning (API sleeping/offline, using seed fallback):", err.message);
        } else {
          console.error("AboutPage fetch error:", err);
        }
      });
    return () => { active = false; };
  }, []);

  const liveStats = React.useMemo(() => {
    const derived = derivePlatformAnalytics(creators, campaigns);
    const reachInM = (derived.totalReach / 1000000).toFixed(1);
    return {
      districts: derived.cityCount > 0 ? `${derived.cityCount}+` : "150+",
      reach: derived.totalReach > 0 ? `${reachInM}M+` : "10M+",
      creatorsCount: derived.totalCreators > 0 ? `${derived.totalCreators}+` : "1,200+"
    };
  }, [creators, campaigns]);

  const cityCreatorCounts = React.useMemo(() => {
    const counts = { bhilwara: 0, jaipur: 0, indore: 0 };
    creators.forEach(c => {
      const city = c.city?.toLowerCase();
      if (city?.includes('bhilwara')) counts.bhilwara += 1;
      else if (city?.includes('jaipur')) counts.jaipur += 1;
      else if (city?.includes('indore')) counts.indore += 1;
    });
    return {
      bhilwara: counts.bhilwara > 0 ? `${counts.bhilwara}+` : "450+",
      jaipur: counts.jaipur > 0 ? `${counts.jaipur}+` : "1,200+",
      indore: counts.indore > 0 ? `${counts.indore}+` : "800+"
    };
  }, [creators]);

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CreatorBharat",
    "url": "https://creatorbharat.in",
    "logo": "https://creatorbharat.in/logo.png",
    "description": "The infrastructure of trust for India's regional creator economy.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhilwara",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    }
  };

  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>
      <Seo 
        title="Our Mission & DNA"
        description="We are building the trust layer for Bharat's regional creator economy. Discover the story of CreatorBharat."
        keywords="about us, bharat creator economy, bhilwara startup, regional creators"
      />

      <style>{`
        @media (max-width: 1024px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .regional-power-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .pipeline-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 768px) {
          .about-hero-paragraph {
            font-size: 17px !important;
          }
          .about-hero-divider {
            margin: 40px 0 !important;
          }
          .about-hero-stats {
            gap: 32px !important;
          }
          .regional-power-section {
            padding: 50px 20px !important;
          }
          .pipeline-container {
            padding: 40px 20px !important;
            border-radius: 40px !important;
          }
          .pipeline-detail-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* CINEMATIC HERO SECTION */}
      <section style={{ 
        background: '#0a0a0a', 
        padding: '140px 24px 100px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Advanced Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '8px 20px', 
              borderRadius: '100px',
              marginBottom: '48px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <Sparkles size={14} color="#FF9431" fill="#FF9431" />
            <span style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>The Bharat Chapter</span>
          </motion.div>

          <div className="about-hero-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 0.8fr', 
            gap: '80px', 
            alignItems: 'end' 
          }}>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ 
                  fontSize: 'clamp(44px, 10vw, 110px)', 
                  fontWeight: 950, 
                  color: '#fff', 
                  lineHeight: 0.85, 
                  letterSpacing: '-0.06em',
                  marginBottom: '0'
                }}
              >
                Building for the <br />
                <span style={{ color: '#FF9431' }}>Next Billion.</span>
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ paddingBottom: '20px' }}
            >
              <p className="about-hero-paragraph" style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.5, fontWeight: 500 }}>
                Metros are saturated. Influence is migrating. We are the infrastructure for India's regional rising stars.
              </p>
            </motion.div>
          </div>

          <div className="about-hero-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '80px 0' }} />

          {/* Stats Snapshot */}
          <div className="about-hero-stats" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '60px' 
          }}>
            <StatBlock value={liveStats.districts} label="Districts Covered" delay={0.2} />
            <StatBlock value="4.9/5" label="Creator Rating" delay={0.3} />
            <StatBlock value={liveStats.reach} label="Aggregate Reach" delay={0.4} />
            <StatBlock value="0%" label="Broker Fees" delay={0.5} />
          </div>

          <HeroBlueprint />

          <LiveAnalyticsPulse />
        </div>
      </section>

      {/* REGIONAL POWER SECTION - NEW */}
      <section className="regional-power-section" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="regional-power-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '80px', 
            alignItems: 'center' 
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ position: 'relative', width: '100%' }}
            >
              <div style={{ 
                width: '100%', 
                aspectRatio: '4/5', 
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                borderRadius: '60px', 
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px'
              }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'bhilwara', label: '📍 Bhilwara (HQ)' },
                    { id: 'jaipur', label: '🏰 Jaipur Hub' },
                    { id: 'indore', label: '🔥 Indore Town' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCity(c.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '100px',
                        border: selectedCity === c.id ? '1px solid rgba(255,148,49,0.3)' : '1px solid #cbd5e1',
                        background: selectedCity === c.id ? 'rgba(255,148,49,0.1)' : '#fff',
                        color: selectedCity === c.id ? '#FF9431' : '#64748b',
                        fontSize: '11px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCity}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    style={{ textAlign: 'center', margin: '40px 0' }}
                  >
                    <MapPin size={80} color="#FF9431" strokeWidth={1.5} style={{ marginBottom: '20px', filter: 'drop-shadow(0 8px 16px rgba(255,148,49,0.25))' }} />
                    <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Origin & Impact</div>
                    <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.02em' }}>
                      {selectedCity === 'bhilwara' && 'Bhilwara Town'}
                      {selectedCity === 'jaipur' && 'Jaipur Startup Hub'}
                      {selectedCity === 'indore' && 'Indore Expansion'}
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '12px', lineHeight: 1.6, maxWidth: '280px', margin: '12px auto 0' }}>
                      {selectedCity === 'bhilwara' && 'Founded here manually mapping 150 regional micro-influencers. The textile capital of Rajasthan is our home.'}
                      {selectedCity === 'jaipur' && 'Bridging the royal cultural storytelling with modern D2C fashion, jewelry and lifestyle giants.'}
                      {selectedCity === 'indore' && 'Unleashing Madhya Pradesh’s FMCG review stars and local food narrative specialists.'}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                  Click tabs to explore our roots
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#FF9431', color: '#fff', padding: '24px 32px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(255,148,49,0.3)', zIndex: 5 }}>
                <div style={{ fontSize: '36px', fontWeight: 950, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>
                  {selectedCity === 'bhilwara' && cityCreatorCounts.bhilwara}
                  {selectedCity === 'jaipur' && cityCreatorCounts.jaipur}
                  {selectedCity === 'indore' && cityCreatorCounts.indore}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>Regional Talents Mapped</div>
              </div>
            </motion.div>

            <div>
              <Bdg color="orange" sm>THE REGIONAL SHIFT</Bdg>
              <h2 style={{ fontSize: '64px', fontWeight: 950, color: '#0f172a', lineHeight: 0.95, margin: '24px 0 40px', letterSpacing: '-0.04em' }}>
                Influence is no longer <br /> <span style={{ color: '#FF9431' }}>Metro-Limited.</span>
              </h2>
              <p style={{ fontSize: '19px', color: '#475569', lineHeight: 1.8, marginBottom: '24px', fontWeight: 500 }}>
                Metro cities represent the elite few. Bharat represents the massive many. We believe a creator in Bhilwara has more authentic influence over their community than a celebrity in Mumbai.
              </p>
              <p style={{ fontSize: '19px', color: '#475569', lineHeight: 1.8, marginBottom: '48px', fontWeight: 500 }}>
                Our mission is to give these regional superstars a professional identity, direct brand access, and a global standard toolkit.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                   <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>Direct Impact</div>
                   <div style={{ fontSize: '15px', color: '#64748b' }}>Cutting out the middleman and elite agencies.</div>
                </div>
                <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                   <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>Global Tech</div>
                   <div style={{ fontSize: '15px', color: '#64748b' }}>World-class analytics for local campaigns.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN TIMELINE */}
      <section style={{ padding: '90px 24px', background: '#f8fafc', borderRadius: '80px 80px 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <h2 style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>Our Evolution</h2>
            <p style={{ fontSize: '18px', color: '#64748b', marginTop: '16px' }}>The journey from a local idea to a national movement. Click any year to explore milestones.</p>
          </div>
          
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '8px', top: '24px', bottom: '24px', width: '2px', background: '#e2e8f0', zIndex: 1 }} />
            <div style={{ position: 'absolute', left: '8px', top: '24px', height: `${(activeStep / (TIMELINE_DATA.length - 1)) * 90}%`, width: '2px', background: 'linear-gradient(to bottom, #FF9431, #10B981)', zIndex: 1, transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            
            {TIMELINE_DATA.map((step, idx) => (
              <TimelineStep 
                key={step.year}
                year={step.year}
                title={step.title}
                desc={step.desc}
                stats={step.stats}
                isActive={activeStep === idx}
                onSelect={() => setActiveStep(idx)}
                idx={idx}
                total={TIMELINE_DATA.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW PIPELINE ACCORDION */}
      <section style={{ padding: '90px 24px 0', background: '#fff' }}>
        <CampaignPipelineVisualizer />
      </section>

      {/* PHILOSOPHY GRID */}
      <section style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Bdg color="orange" sm>OUR CORE DNA</Bdg>
            <h2 style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', marginTop: '16px' }}>The Three Pillars of Bharat</h2>
            <p style={{ fontSize: '18px', color: '#64748b', marginTop: '12px' }}>Hover or click any pillar to see how we are transforming local talent into national brands.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              {
                title: 'Identity',
                desc: 'Giving every creator a verified, data-backed professional portfolio that brands can trust.',
                features: ['Digital Pehchan Profile', 'Real-Time Engagement APIs', 'Anti-Fraud Score Metrics'],
                icon: Award,
                color: '#FF9431',
                badge: 'Infrastructure'
              },
              {
                title: 'Access',
                desc: 'Removing gatekeepers. Creators in small towns now apply directly to the biggest national brands.',
                features: ['Zero-Brokerage Escrow', 'Open Pitch Marketplace', 'Local Language Support'],
                icon: Globe,
                color: '#10B981',
                badge: 'Opportunity'
              },
              {
                title: 'Growth',
                desc: 'Providing the financial tools and analytics to scale from a local star to a national icon.',
                features: ['ROI Valuation Gauges', 'SaaS Media Kits', 'Fast Invoice Financing'],
                icon: TrendingUp,
                color: '#3B82F6',
                badge: 'Scale'
              }
            ].map((v) => (
              <motion.div
                key={v.title}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  padding: '60px 40px',
                  borderRadius: '48px',
                  border: '1px solid #f1f5f9',
                  background: '#fcfcfc',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.01)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '24px', background: `${v.color}15`, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <v.icon size={32} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: v.color, background: `${v.color}10`, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>{v.badge}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' }}>{v.title}</h3>
                  <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.8, fontWeight: 500, marginBottom: '32px' }}>{v.desc}</p>
                </div>

                <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '28px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Enabled Tools:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {v.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#334155', fontWeight: 600 }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: v.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL VISION CTA */}
      <section style={{ padding: '0 24px 100px' }}>
         <motion.div 
           whileHover={{ scale: 0.99 }}
           style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            background: '#0a0a0a', 
            borderRadius: '80px', 
            padding: '120px 40px', 
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.15)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, transparent, #10B981)' }} />
            <h2 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 950, marginBottom: '32px', letterSpacing: '-0.05em', lineHeight: 0.9 }}>Be part of the <br /> <span style={{ color: '#FF9431' }}>New Indian Dream.</span></h2>
            <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.5)', marginBottom: '64px', maxWidth: '640px', margin: '0 auto 64px', fontWeight: 500 }}>
              The future of influence isn't in English or in Metros. It's in the real voices of Bharat.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn lg onClick={() => navigate('/join')} style={{ padding: '24px 64px', borderRadius: '100px', background: '#FF9431', color: '#fff', fontSize: '18px', fontWeight: 950 }}>
                Join as Creator
              </Btn>
              <Btn lg onClick={() => navigate('/creators')} variant="outline" style={{ padding: '24px 64px', borderRadius: '100px', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '18px', fontWeight: 950 }}>
                Partner as Brand
              </Btn>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
