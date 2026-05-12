import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { 
  Target, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Award,
  ChevronRight,
  TrendingUp,
  Heart,
  Command,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';

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

const TimelineStep = ({ year, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{ position: 'relative', paddingLeft: '48px', marginBottom: '64px' }}
  >
    <div style={{ position: 'absolute', left: '0', top: '0', width: '18px', height: '18px', borderRadius: '50%', background: '#FF9431', border: '4px solid #fff', boxShadow: '0 0 0 8px rgba(255, 148, 49, 0.1)', zIndex: 2 }} />
    <div style={{ fontSize: '14px', fontWeight: 900, color: '#FF9431', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{year}</div>
    <h4 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>{title}</h4>
    <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.75, maxWidth: '540px' }}>{desc}</p>
  </motion.div>
);

TimelineStep.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number
};

export default function AboutPage() {
  const navigate = useNavigate();

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

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* CINEMATIC HERO SECTION */}
      <section style={{ 
        background: '#0a0a0a', 
        padding: '240px 24px 160px', 
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

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'end' }}>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ 
                  fontSize: 'clamp(56px, 9vw, 110px)', 
                  fontWeight: 950, 
                  color: '#fff', 
                  lineHeight: 0.82, 
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
              <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.5, fontWeight: 500 }}>
                Metros are saturated. Influence is migrating. We are the infrastructure for India's regional rising stars.
              </p>
            </motion.div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '80px 0' }} />

          {/* Stats Snapshot */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
            <StatBlock value="150+" label="Districts Covered" delay={0.2} />
            <StatBlock value="4.9/5" label="Creator Rating" delay={0.3} />
            <StatBlock value="10M+" label="Aggregate Reach" delay={0.4} />
            <StatBlock value="0%" label="Broker Fees" delay={0.5} />
          </div>
        </div>
      </section>

      {/* REGIONAL POWER SECTION - NEW */}
      <section style={{ padding: '160px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <div style={{ 
                width: '100%', 
                aspectRatio: '4/5', 
                background: '#f8fafc', 
                borderRadius: '60px', 
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={120} color="#FF9431" strokeWidth={1} style={{ marginBottom: '32px', opacity: 0.2 }} />
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Current Focus</div>
                  <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginTop: '12px' }}>Tier 2 & 3 Bharat</div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', background: '#FF9431', color: '#fff', padding: '32px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(255,148,49,0.3)' }}>
                <div style={{ fontSize: '48px', fontWeight: 950, lineHeight: 1 }}>85%</div>
                <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Regional Audience</div>
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
      <section style={{ padding: '140px 24px', background: '#f8fafc', borderRadius: '100px 100px 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <h2 style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>Our Evolution</h2>
            <p style={{ fontSize: '18px', color: '#64748b', marginTop: '16px' }}>The journey from a local idea to a national movement.</p>
          </div>
          
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '8px', top: '0', bottom: '64px', width: '2px', background: 'linear-gradient(to bottom, #FF9431, transparent)' }} />
            <TimelineStep year="2024: THE SPARK" title="The Bhilwara Prototype" desc="Identifying the gap between regional talent and national brand opportunities. The first version of CreatorBharat was tested." />
            <TimelineStep year="2025: THE INFRASTRUCTURE" title="The Identity Layer" desc="Launched the Creator Score and Digital Pehchan tools to standardize trust in the creator economy." delay={0.1} />
            <TimelineStep year="2026: THE REVOLUTION" title="National Empowerment" desc="Scaling to 28 states and 10,000+ districts, making CreatorBharat the default operating system for regional talent." delay={0.2} />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY GRID */}
      <section style={{ padding: '160px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Identity', desc: 'Giving every creator a verified, data-backed professional portfolio that brands can trust.', icon: Award, color: '#FF9431' },
              { title: 'Access', desc: 'Removing gatekeepers. Creators in small towns now apply directly to the biggest national brands.', icon: Globe, color: '#10B981' },
              { title: 'Growth', desc: 'Providing the financial tools and analytics to scale from a local star to a national icon.', icon: TrendingUp, color: '#3B82F6' }
            ].map((v) => (
              <div key={v.title} style={{ padding: '60px 40px', borderRadius: '48px', border: '1px solid #f1f5f9', background: '#fcfcfc' }}>
                 <div style={{ width: '64px', height: '64px', borderRadius: '24px', background: `${v.color}15`, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
                    <v.icon size={32} />
                 </div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' }}>{v.title}</h3>
                 <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.8, fontWeight: 500 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL VISION CTA */}
      <section style={{ padding: '0 24px 160px' }}>
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
