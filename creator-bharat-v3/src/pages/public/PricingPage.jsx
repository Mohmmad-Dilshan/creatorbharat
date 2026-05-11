import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Target,
  Sparkles,
  BarChart3,
  Globe,
  Wallet
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';

const PricingCard = ({ plan, delay = 0 }) => {
  const isPro = plan.id === 'pro' || plan.id === 'brand_pro';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: isPro ? '#fff' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '40px',
        padding: '56px 40px',
        border: `1.5px solid ${isPro ? '#FF9431' : 'rgba(0,0,0,0.04)'}`,
        boxShadow: isPro ? '0 40px 80px rgba(255, 148, 49, 0.12)' : '0 20px 40px rgba(0,0,0,0.02)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        zIndex: isPro ? 2 : 1
      }}
    >
      {isPro && (
        <div style={{ 
          position: 'absolute', 
          top: '-20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, #FF9431, #EA580C)', 
          color: '#fff', 
          padding: '8px 20px', 
          borderRadius: '100px', 
          fontSize: '12px', 
          fontWeight: 950,
          letterSpacing: '0.1em',
          boxShadow: '0 10px 20px rgba(255, 148, 49, 0.3)'
        }}>
          ELITE SELECTION
        </div>
      )}

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>{plan.name}</h3>
        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>{plan.desc}</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '64px', fontWeight: 950, color: isPro ? '#FF9431' : '#0f172a', letterSpacing: '-0.05em' }}>{plan.price}</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#94a3b8' }}>/{plan.period}</span>
        </div>
      </div>

      <div style={{ flex: 1, marginBottom: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {plan.features.map((feature) => (
          <div key={feature} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              background: isPro ? '#FF943115' : '#10B98115', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px'
            }}>
              <Check size={14} color={isPro ? '#FF9431' : '#10B981'} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '15px', color: '#475569', fontWeight: 600, lineHeight: '1.5' }}>{feature}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => {
          const target = plan.id.startsWith('brand') ? '/brand-register' : '/apply';
          globalThis.location.href = target;
        }}
        style={{
          width: '100%',
          padding: '20px',
          borderRadius: '100px',
          background: isPro ? '#0f172a' : '#fff',
          color: isPro ? '#fff' : '#0f172a',
          border: isPro ? 'none' : '1.5px solid #f1f5f9',
          fontSize: '16px',
          fontWeight: 950,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isPro ? '0 15px 30px rgba(15, 23, 42, 0.2)' : 'none'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          if (isPro) e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 23, 42, 0.3)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          if (isPro) e.currentTarget.style.boxShadow = '0 15px 30px rgba(15, 23, 42, 0.2)';
        }}
      >
        {plan.cta} <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

PricingCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    cta: PropTypes.string.isRequired
  }).isRequired,
  delay: PropTypes.number
};

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: '16px 32px',
      borderRadius: '100px',
      border: 'none',
      background: active ? '#fff' : 'transparent',
      color: active ? '#0f172a' : '#94a3b8',
      fontSize: '15px',
      fontWeight: 900,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: active ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
    }}
  >
    <Icon size={18} color={active ? '#FF9431' : '#94a3b8'} strokeWidth={2.5} />
    {label}
  </button>
);

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function PricingPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('creator');

  const creatorPlans = [
    { 
      id: 'free', 
      name: 'Starter', 
      price: 'Free', 
      period: 'lifetime', 
      desc: 'Perfect for creators just beginning their influence journey.', 
      features: ['Standard smart portfolio', 'Regional discovery grid', 'Apply to 3 missions/mo', 'Basic profile insights', 'Public handle URL'], 
      cta: 'Start Free'
    },
    {
      id: 'pro', 
      name: 'Creator Pro', 
      price: '₹49', 
      period: 'one-time', 
      desc: 'The gold standard for Bharat\'s high-impact creators.', 
      features: [
        'Premium elite portfolio', 
        'Top-tier search priority', 
        'Unlimited deal applications', 
        'AI SEO-Optimized Article', 
        'Elite Blue Verified Badge', 
        'Direct Brand Access'
      ], 
      cta: 'Claim Pro Access'
    }
  ];

  const brandPlans = [
    { 
      id: 'brand_free', 
      name: 'Launchpad', 
      price: 'Free', 
      period: 'forever', 
      desc: 'Discover talent and explore the Bharat marketplace.', 
      features: ['Search 10k+ Creators', 'Basic Campaign Listing', 'Up to 5 Applicants', 'Community Support', 'Bhilwara Local Reach'], 
      cta: 'Start Scouting'
    },
    {
      id: 'brand_pro', 
      name: 'Enterprise', 
      price: '₹999', 
      period: 'month', 
      desc: 'Agency-grade tools for serious brand scaling.', 
      features: [
        'Unlimited Active Missions', 
        'Featured Campaign Spot', 
        'AI Talent Recommendations', 
        'Campaign Performance Data', 
        'Verified Brand Badge', 
        'Priority Talent Support'
      ], 
      cta: 'Scale Your Brand'
    }
  ];

  const activePlans = tab === 'creator' ? creatorPlans : brandPlans;

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo 
        title="Pricing & Plans"
        description="Choose the perfect plan for your brand or creator journey. Elite tools for elite growth."
        keywords="pricing, brand plans, creator monetization"
      />
      
      {/* Cinematic Hero */}
      <section style={{ 
        background: '#050505', 
        padding: '180px 24px 140px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract Background Elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: '#FF9431', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: '#10B981', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '10px 20px', 
              borderRadius: '100px',
              marginBottom: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Sparkles size={16} color="#FF9431" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Value-Driven Ecosystem</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(48px, 8vw, 84px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.05em', lineHeight: 0.95 }}
          >
            Invest in Your <br />
            <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Future.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '650px', margin: '0 auto 56px', lineHeight: 1.6, fontWeight: 500 }}
          >
            Join Bharat's most transparent influencer ecosystem. Zero commission on deals. Affordable tools for everyone.
          </motion.p>

          {/* Perspective Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ 
              maxWidth: '480px', 
              margin: '0 auto', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '8px', 
              borderRadius: '100px', 
              display: 'flex',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)'
            }}
          >
             <TabButton active={tab === 'creator'} label="For Creators" icon={Zap} onClick={() => setTab('creator')} />
             <TabButton active={tab === 'brand'} label="For Brands" icon={Target} onClick={() => setTab('brand')} />
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section style={{ padding: '0 24px 120px', marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: activePlans.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))', 
                gap: '32px', 
                justifyContent: 'center',
                alignItems: 'stretch' 
              }}
            >
               {activePlans.map((plan, i) => (
                 <PricingCard key={plan.id} plan={plan} delay={0.1 * i} />
               ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Value Comparison */}
      <section style={{ padding: '80px 24px', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
               <Bdg color="orange" sm>THE ELITE EDGE</Bdg>
               <h2 style={{ fontSize: '42px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.03em' }}>Why Choose CreatorBharat?</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
               {[
                 { title: 'Zero Commission', desc: 'Keep 100% of your earnings. We take zero cuts from your brand deals.', icon: Wallet },
                 { title: 'Verified Trust', desc: 'Our Elite Blue badge builds instant credibility with top national brands.', icon: ShieldCheck },
                 { title: 'Global Discovery', desc: 'Your profile is optimized for SEO and reachable by brands worldwide.', icon: Globe },
                 { title: 'Data Analytics', desc: 'Get professional insights into your reach, engagement, and growth.', icon: BarChart3 }
               ].map((item) => (
                 <div key={item.title} style={{ padding: '32px', borderRadius: '32px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#FF9431', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                       <item.icon size={24} />
                    </div>
                    <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{item.title}</h4>
                    <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '120px 24px', textAlign: 'center' }}>
         <motion.div 
           whileHover={{ y: -8 }}
           style={{ 
            maxWidth: '1100px', 
            margin: '0 auto', 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
            borderRadius: '56px', 
            padding: '100px 40px', 
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")', opacity: 0.05 }} />
            <h2 style={{ fontSize: '56px', fontWeight: 950, marginBottom: '24px', letterSpacing: '-0.05em', position: 'relative' }}>Ready to Scale?</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 56px', fontWeight: 500 }}>
              Join the elite circle of creators and brands building the future of commerce in Bharat.
            </p>
            <Btn lg onClick={() => navigate('/apply')} style={{ padding: '24px 64px', borderRadius: '100px', background: '#fff', color: '#0f172a', fontSize: '18px', fontWeight: 950 }}>
              Get Started Now <ArrowRight size={22} />
            </Btn>
         </motion.div>
      </section>
    </div>
  );
}
