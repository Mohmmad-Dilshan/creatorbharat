import React, { useState, useEffect, useMemo } from 'react';
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

// Extracted Feature Components
import LiveAnalyticsPulse from '@/components/features/about/LiveAnalyticsPulse';
import CampaignPipelineVisualizer from '@/components/features/about/CampaignPipelineVisualizer';
import TimelineStep from '@/components/features/about/TimelineStep';

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

export default function AboutPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2);
  const [selectedCity, setSelectedCity] = useState('bhilwara');

  const [creators, setCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
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

  const liveStats = useMemo(() => {
    const derived = derivePlatformAnalytics(creators, campaigns);
    const reachInM = (derived.totalReach / 1000000).toFixed(1);
    return {
      districts: derived.cityCount > 0 ? `${derived.cityCount}+` : "150+",
      reach: derived.totalReach > 0 ? `${reachInM}M+` : "10M+",
      creatorsCount: derived.totalCreators > 0 ? `${derived.totalCreators}+` : "1,200+"
    };
  }, [creators, campaigns]);

  const cityCreatorCounts = useMemo(() => {
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
    "url": "https://creatorbharat.com",
    "logo": "https://creatorbharat.com/logo.png",
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
        jsonLd={jsonLd}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
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

      {/* REGIONAL POWER SECTION */}
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
