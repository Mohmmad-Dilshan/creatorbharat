import React from 'react';
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

  return (
    <div style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo title="Verification Guide" description="Step-by-step guide to get verified on CreatorBharat as a creator or brand." />

      {/* Hero */}
      <section style={{ background: '#050505', padding: '160px 24px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Bdg color="saffron" sm>VERIFICATION GUIDE</Bdg>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 950, color: '#fff', marginTop: 20, marginBottom: 24, letterSpacing: '-0.05em', lineHeight: 0.95 }}>
            How to Get <br /><span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Verified.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Step-by-step guide for creators and brands to get verified on CreatorBharat.
          </p>
        </div>
      </section>

      {/* Creator Steps */}
      <section style={{ padding: '80px 24px', background: '#fcfcfc' }}>
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
      <section style={{ padding: '80px 24px', background: '#fff' }}>
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
