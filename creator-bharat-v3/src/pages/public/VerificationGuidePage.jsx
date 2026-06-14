import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck2, CreditCard, BadgeCheck, CheckCircle2, ArrowRight, Users, Star } from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

const CREATOR_STEPS = [
  { n: '01', icon: FileCheck2, title: 'Create Your Profile', desc: 'Sign up and fill all 5 profile tabs: Identity, Social handles, Story milestones, Packages & rates, Local Hub.', color: '#FF9431' },
  { n: '02', icon: CreditCard, title: 'Pay Verification Fee', desc: 'Pay ₹199 one-time listing fee (waived for first 100 creators). This covers our manual audit process.', color: '#3B82F6' },
  { n: '03', icon: ShieldCheck, title: 'Admin Review', desc: 'Our team verifies your social stats, content quality, and brand safety. Takes 2-24 hours.', color: '#7C3AED' },
  { n: '04', icon: BadgeCheck, title: 'Get Verified Badge', desc: 'Receive your Elite Blue Badge. Profile goes live on /creators marketplace. Campaigns unlocked.', color: '#10B981' },
];

const BRAND_STEPS = [
  { n: '01', icon: Users, title: 'Register Company', desc: 'Create brand profile with company name, industry, GSTIN, and work email verification.', color: '#10B981' },
  { n: '02', icon: FileCheck2, title: 'Verify Domain', desc: 'Confirm your work email domain (e.g. @nykaa.com). This proves brand authenticity.', color: '#FF9431' },
  { n: '03', icon: CreditCard, title: 'Choose Plan', desc: 'Start free (browse only) or upgrade to Enterprise (₹199/mo) for unlimited campaigns and direct pitching.', color: '#3B82F6' },
  { n: '04', icon: Star, title: 'Dashboard Active', desc: 'Access Brand Command Center. Scout creators, launch campaigns, review applications.', color: '#7C3AED' },
];

export default function VerificationGuidePage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo title="Verification Guide" description="Step-by-step guide to get verified on CreatorBharat as a creator or brand." />

      <style>{`
        .verification-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .verification-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: mob ? '90px 20px 60px' : '130px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Full-bleed background workspace image (low opacity) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/verify_guide_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.04), transparent 70%)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #e2e8f0, #10B981)', zIndex: 3 }} />
        
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="verification-landing-grid">
            {/* Left Column (55% width) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start', width: '100%' }}>
              <Bdg color="saffron" sm style={{ marginBottom: '24px' }}>VERIFICATION GUIDE</Bdg>
              <h1 style={{ fontSize: mob ? '36px' : '64px', fontWeight: 950, color: '#0f172a', margin: '0 0 24px 0', letterSpacing: '-0.04em', lineHeight: 1.05, textAlign: mob ? 'center' : 'left', fontFamily: "'Outfit', sans-serif" }}>
                How to Get <br /><span style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Verified.</span>
              </h1>
              <p style={{ fontSize: mob ? '14px' : '17px', color: '#475569', maxWidth: '540px', margin: '0 0 32px 0', fontWeight: 600, lineHeight: 1.6, textAlign: mob ? 'center' : 'left', fontFamily: "'Outfit', sans-serif" }}>
                Step-by-step guide for Indian creators and premium brands to verify their credentials, activate their trust metrics, and unlock full marketplace capabilities.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start' }}>
                <Btn primary onClick={() => {
                  const el = document.getElementById('creator-steps');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  For Creators <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </Btn>
                <Btn secondary onClick={() => {
                  const el = document.getElementById('brand-steps');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  For Brands
                </Btn>
              </div>
            </div>

            {/* Right Column (45% width) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 24,
                padding: 12,
                boxShadow: '0 20px 40px rgba(255, 148, 49, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%'
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255, 148, 49, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '75%', // 4:3 Aspect Ratio
                background: '#f8fafc'
              }}>
                <img
                  src="/verification_guide_hero.png"
                  alt="Verification Shield and Badge Graphic"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 12, padding: '0 8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff9431' }} className="animate-pulse" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trust Engine Active</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>2-Step Consensus</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creator Steps */}
      <section id="creator-steps" style={{ padding: '80px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Bdg color="saffron" sm>FOR CREATORS</Bdg>
            <h2 style={{ fontSize: 40, fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.03em' }}>Creator Verification</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {CREATOR_STEPS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 32, background: '#fff', borderRadius: 32, border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 60, fontWeight: 950, color: 'rgba(0,0,0,0.03)', lineHeight: 1 }}>{step.n}</div>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: step.color + '12', color: step.color, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <step.icon size={24} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Btn lg onClick={() => navigate('/apply')} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, padding: '18px 48px', fontWeight: 950 }}>
              Start Creator Verification <ArrowRight size={18} />
            </Btn>
          </div>
        </div>
      </section>

      {/* Brand Steps */}
      <section id="brand-steps" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Bdg color="green" sm>FOR BRANDS</Bdg>
            <h2 style={{ fontSize: 40, fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.03em' }}>Brand Verification</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {BRAND_STEPS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 32, background: '#f8fafc', borderRadius: 32, border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 60, fontWeight: 950, color: 'rgba(0,0,0,0.03)', lineHeight: 1 }}>{step.n}</div>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: step.color + '12', color: step.color, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <step.icon size={24} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Btn lg onClick={() => navigate('/brand-register')} style={{ background: '#10B981', color: '#fff', borderRadius: 100, padding: '18px 48px', fontWeight: 950 }}>
              Register Your Brand <ArrowRight size={18} />
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
