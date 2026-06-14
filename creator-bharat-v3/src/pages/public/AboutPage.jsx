import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { MapPin, Sparkles } from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import { fetchCreators, fetchCampaigns, derivePlatformAnalytics } from '@/utils/platformService';
import { TwitterIcon, LinkedinIcon, GithubIcon } from '@/components/icons/SocialIcons';

// Extracted Feature Components
import LiveAnalyticsPulse from '@/components/features/about/LiveAnalyticsPulse';
import CampaignPipelineVisualizer from '@/components/features/about/CampaignPipelineVisualizer';
import TimelineStep from '@/components/features/about/TimelineStep';
import CreatorNetworkCanvas from '@/components/features/about/CreatorNetworkCanvas';

// Import Externalized Data
import { 
  BLUEPRINT_CARDS, 
  TIMELINE_DATA, 
  PHILOSOPHY_PILLARS 
} from '@/data/aboutData';

const StatBlock = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{ textAlign: 'left' }}
  >
    <div style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.04em', fontFamily: "'Outfit', sans-serif" }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>{label}</div>
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
      {BLUEPRINT_CARDS.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.6 }}
          whileHover={{ y: -6, borderColor: 'rgba(255, 148, 49, 0.25)', boxShadow: '0 15px 35px rgba(0,0,0,0.02)' }}
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
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
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '90px', fontWeight: 950, color: 'rgba(15,23,42,0.02)', userSelect: 'none', lineHeight: 1 }}>{card.num}</div>
          
          <div>
            <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 900, color: card.accent, background: `${card.accent}15`, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
              {card.sub}
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{card.title}</h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function AboutPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [activeStep, setActiveStep] = useState(2);
  const [selectedCity, setSelectedCity] = useState('bhilwara');

  const [creators, setCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          .influence-heading {
            font-size: 42px !important;
            line-height: 1.05 !important;
            margin-bottom: 24px !important;
          }
          .section-heading {
            font-size: 38px !important;
            letter-spacing: -0.03em !important;
            margin-top: 12px !important;
          }
          .cta-heading {
            font-size: 40px !important;
            line-height: 1.05 !important;
            margin-bottom: 20px !important;
          }
          .founder-card {
            padding: 40px 24px !important;
            border-radius: 32px !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .founder-card-verified {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            margin-bottom: 12px !important;
            display: inline-flex !important;
          }
          .founder-info {
            text-align: center !important;
            width: 100% !important;
          }
          .founder-skills {
            justify-content: center !important;
          }
          .founder-socials {
            justify-content: center !important;
            border-top: 1px solid #f1f5f9 !important;
            padding-top: 20px !important;
            width: 100% !important;
          }
          .analytics-tabs {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            margin-right: -20px !important;
            margin-left: -20px !important;
            padding-right: 20px !important;
            padding-left: 20px !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .analytics-tabs::-webkit-scrollbar {
            display: none !important;
          }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* CINEMATIC HERO SECTION */}
      <section style={{ 
        background: '#ffffff', 
        padding: '140px 24px 100px', 
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {/* Advanced Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: 'rgba(255, 148, 49, 0.08)', 
              padding: '8px 20px', 
              borderRadius: '100px',
              marginBottom: '48px',
              border: '1px solid rgba(255, 148, 49, 0.15)'
            }}
          >
            <Sparkles size={14} color="#FF9431" fill="#FF9431" />
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.2em' }}>The Bharat Chapter</span>
          </motion.div>

          <div className="about-hero-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.1fr 0.9fr', 
            gap: '50px', 
            alignItems: 'center'
          }}>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ 
                  fontSize: 'clamp(40px, 6.5vw, 75px)', 
                  fontWeight: 950, 
                  color: '#0f172a', 
                  lineHeight: 1.0, 
                  letterSpacing: '-0.05em',
                  marginBottom: '24px',
                  fontFamily: "'Outfit', sans-serif"
                }}
              >
                Building for the <br />
                <span style={{ color: '#FF9431' }}>Next Billion.</span>
              </motion.h1>
              
              <p className="about-hero-paragraph" style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, fontWeight: 500, marginBottom: '40px', maxWidth: '560px' }}>
                Metros are saturated. Influence is migrating. We are the infrastructure for India's regional rising stars, connecting brands directly to local voices.
              </p>

              {/* Stats Snapshot */}
              <div className="about-hero-stats" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '32px',
                marginBottom: '40px'
              }}>
                <StatBlock value={liveStats.districts} label="Districts Covered" delay={0.2} />
                <StatBlock value="4.9/5" label="Creator Rating" delay={0.3} />
                <StatBlock value={liveStats.reach} label="Aggregate Reach" delay={0.4} />
                <StatBlock value="0%" label="Broker Fees" delay={0.5} />
              </div>
            </div>

            {/* Interactive HTML5 Canvas Creator Network */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ width: '100%' }}
            >
              <CreatorNetworkCanvas mob={mob} />
            </motion.div>
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
              <h2 className="influence-heading" style={{ fontSize: '64px', fontWeight: 950, color: '#0f172a', lineHeight: 0.95, margin: '24px 0 40px', letterSpacing: '-0.04em' }}>
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
            <h2 className="section-heading" style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>Our Evolution</h2>
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
            <h2 className="section-heading" style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', marginTop: '16px' }}>The Three Pillars of Bharat</h2>
            <p style={{ fontSize: '18px', color: '#64748b', marginTop: '12px' }}>Hover or click any pillar to see how we are transforming local talent into national brands.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {PHILOSOPHY_PILLARS.map((v) => (
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

      {/* FOUNDER & LEADERSHIP SECTION */}
      <section style={{ padding: '90px 24px', background: '#f8fafc', borderRadius: '80px 80px 0 0' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
               <Bdg color="orange" sm>FOUNDER & VISION</Bdg>
               <h2 className="section-heading" style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', marginTop: '16px' }}>Meet the Founder</h2>
               <p style={{ fontSize: '18px', color: '#64748b', marginTop: '12px' }}>Empowering regional voices and leading the decentralized shift in the creator economy.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <motion.div
                 whileHover={{ y: -6 }}
                 className="founder-card"
                 style={{
                   background: '#fff',
                   border: '1.5px solid #e2e8f0',
                   borderRadius: '40px',
                   padding: '48px 32px',
                   maxWidth: '850px',
                   width: '100%',
                   boxShadow: '0 20px 45px rgba(0,0,0,0.03)',
                   display: 'flex',
                   flexDirection: 'row',
                   flexWrap: 'wrap',
                   gap: '40px',
                   alignItems: 'center',
                   position: 'relative',
                   textAlign: 'left'
                 }}
               >
                  {/* Glowing orange accent dot */}
                  <div className="founder-card-verified" style={{ position: 'absolute', top: '24px', right: '24px', background: '#FF943115', color: '#FF9431', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF9431' }} /> VERIFIED FOUNDER
                  </div>

                  {/* Avatar Frame */}
                  <div style={{ position: 'relative', flexShrink: 0, margin: '0 auto' }}>
                     <div style={{
                       width: '160px',
                       height: '160px',
                       borderRadius: '32px',
                       overflow: 'hidden',
                       border: '3px solid #fff',
                       boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                     }}>
                        <img 
                           src="https://ui-avatars.com/api/?name=Mohmmad+Dilshan&background=FF9431&color=fff&size=256" 
                           alt="Mohmmad Dilshan" 
                           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                     </div>
                     <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: '#0f172a', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, border: '1px solid rgba(255,255,255,0.1)' }}>
                        🇮🇳 Bhilwara
                     </div>
                  </div>

                  {/* Profile Details */}
                  <div className="founder-info" style={{ flex: '1 1 300px' }}>
                     <div style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>LEADERSHIP</div>
                     <h3 style={{ fontSize: '30px', fontWeight: 950, color: '#0f172a', margin: '4px 0 8px 0', letterSpacing: '-0.02em' }}>Mohmmad Dilshan</h3>
                     <div style={{ fontSize: '14px', fontWeight: 700, color: '#475569', marginBottom: '16px' }}>Founder & Chief Architect</div>
                     
                     <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, fontWeight: 550, margin: '0 0 24px 0' }}>
                        Democratizing the digital economy for the next billion users through decentralized intelligence, modular architecture, and zero-brokerage campaigns.
                     </p>

                     {/* Skill Tag Clusters */}
                     <div className="founder-skills" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                        {['System Architecture', 'Product Strategy', 'Decentralized Networks', 'Escrow Ledgers'].map(skill => (
                          <span key={skill} style={{ fontSize: '12px', fontWeight: 650, color: '#475569', background: '#f1f5f9', padding: '5px 12px', borderRadius: '8px' }}>
                            {skill}
                          </span>
                        ))}
                     </div>

                     {/* Social Links Row */}
                     <div className="founder-socials" style={{ display: 'flex', gap: '16px', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                        <a href="https://linkedin.com/in/mohmmad-dilshan" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#0f172a', fontSize: '13px', fontWeight: 800 }}>
                           <LinkedinIcon size={16} /> LinkedIn
                        </a>
                        <a href="https://github.com/mohmmad-dilshan" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#0f172a', fontSize: '13px', fontWeight: 800 }}>
                           <GithubIcon size={16} /> GitHub
                        </a>
                        <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto', fontWeight: 650, fontFamily: 'monospace' }}>CONSENSUS_NODE_001</span>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Distributed Network Notice */}
            <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b', fontSize: '13.5px', fontWeight: 550 }}>
               🌍 Supported by a distributed network of regional core contributors and ambassadors across India.
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
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
            borderRadius: '80px', 
            padding: '120px 40px', 
            color: '#0f172a',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.02)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, transparent, #10B981)' }} />
            <h2 className="cta-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 950, marginBottom: '32px', letterSpacing: '-0.05em', lineHeight: 0.9 }}>Be part of the <br /> <span style={{ color: '#FF9431' }}>New Indian Dream.</span></h2>
            <p style={{ fontSize: '22px', color: '#475569', marginBottom: '64px', maxWidth: '640px', margin: '0 auto 64px', fontWeight: 500 }}>
              The future of influence isn't in English or in Metros. It's in the real voices of Bharat.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn lg onClick={() => navigate('/join')} style={{ padding: '24px 64px', borderRadius: '100px', background: '#FF9431', color: '#fff', fontSize: '18px', fontWeight: 950 }}>
                Join as Creator
              </Btn>
              <Btn lg onClick={() => navigate('/creators')} variant="outline" style={{ padding: '24px 64px', borderRadius: '100px', borderColor: '#0f172a', color: '#0f172a', fontSize: '18px', fontWeight: 950 }}>
                Partner as Brand
              </Btn>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
