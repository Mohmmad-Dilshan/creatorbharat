import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { 
  Check, 
  ArrowRight,
  Target,
  Sparkles,
  BarChart3,
  Globe,
  Wallet,
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import { useApp } from '@/core/context';

// Import Modular Components & External Data
import PricingCard from '@/components/pricing/PricingCard';
import TabButton from '@/components/pricing/TabButton';
import PricingFAQAccordion from '@/components/pricing/PricingFAQAccordion';
import { 
  getCreatorPlans, 
  getBrandPlans, 
  PRICING_FAQS, 
  CREATOR_PRICING, 
  BRAND_PRICING 
} from '@/data/pricingData';

export default function PricingPage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [tab, setTab] = useState('creator');
  const [duration, setDuration] = useState('1m'); // '1m', '6m', '1y'
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(false);
      dsp({ t: 'SET_PRO' });
      dsp({ t: 'TOAST', d: { type: 'success', msg: '🎉 Payment Successful! Pro Access Activated.' } });
      navigate(st.role === 'brand' ? '/brand-dashboard' : '/creator/dashboard');
    }, 2000);
  };

  const getCreatorPrice = () => {
    return CREATOR_PRICING[duration] || CREATOR_PRICING['1m'];
  };

  const getBrandPrice = () => {
    return BRAND_PRICING[duration] || BRAND_PRICING['1m'];
  };

  const creatorPlans = getCreatorPlans(duration);
  const brandPlans = getBrandPlans(duration);
  const activePlans = tab === 'creator' ? creatorPlans : brandPlans;

  const renderCellContent = (value, color) => {
    if (typeof value === 'boolean') {
      return value ? <Check size={18} color={color} style={{ margin: '0 auto' }} /> : '-';
    }
    return (
      <span style={{ 
        fontSize: '14px', 
        fontWeight: color === '#FF9431' ? 900 : 700, 
        color: color === '#FF9431' ? '#FF9431' : '#94a3b8' 
      }}>
        {value}
      </span>
    );
  };

  const pricingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "CreatorBharat Premium Subscriptions",
    "description": "Choose the perfect plan for your brand or creator journey on CreatorBharat.",
    "brand": {
      "@type": "Brand",
      "name": "CreatorBharat"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "499",
      "highPrice": "44999",
      "offerCount": "4",
      "offers": [
        {
          "@type": "Offer",
          "name": "Creator Pro (Monthly)",
          "price": "499",
          "priceCurrency": "INR",
          "category": "Creator Subscription"
        },
        {
          "@type": "Offer",
          "name": "Creator Pro (Annual)",
          "price": "4499",
          "priceCurrency": "INR",
          "category": "Creator Subscription"
        },
        {
          "@type": "Offer",
          "name": "Enterprise Brand (Monthly)",
          "price": "4999",
          "priceCurrency": "INR",
          "category": "Brand Subscription"
        },
        {
          "@type": "Offer",
          "name": "Enterprise Brand (Annual)",
          "price": "44999",
          "priceCurrency": "INR",
          "category": "Brand Subscription"
        }
      ]
    }
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo 
        title="Pricing & Plans"
        description="Choose the perfect plan for your brand or creator journey. Elite tools for elite growth."
        keywords="pricing, brand plans, creator monetization"
        jsonLd={pricingJsonLd}
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

          {/* Duration Selector Switch */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '6px', 
              borderRadius: '100px', 
              marginTop: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              gap: '4px'
            }}
          >
            {[
              { id: '1m', label: '1 Month' },
              { id: '6m', label: '6 Months', save: tab === 'creator' ? 'Save ~15%' : 'Save ~33%' },
              { id: '1y', label: '1 Year', save: tab === 'creator' ? 'Save ~15%' : 'Save ~45%' }
            ].map(d => {
              const active = duration === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '100px',
                    border: 'none',
                    background: active ? '#FF9431' : 'transparent',
                    color: active ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {d.label}
                  {d.save && (
                    <span style={{ 
                      fontSize: '9px', 
                      background: active ? '#fff' : 'rgba(16, 185, 129, 0.2)', 
                      color: active ? '#FF9431' : '#10B981', 
                      padding: '2px 6px', 
                      borderRadius: '100px',
                      fontWeight: 950
                    }}>
                      {d.save}
                    </span>
                  )}
                </button>
              );
            })}
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
                 <PricingCard 
                   key={plan.id} 
                   plan={plan} 
                   delay={0.1 * i} 
                   navigate={navigate}
                   onProActivate={() => {
                     if (st.user) {
                       setShowModal(true);
                     } else {
                       navigate('/join');
                     }
                   }}
                 />
               ))}
            </motion.div>
          </AnimatePresence>

          {/* Payment Modal Overlay */}
          <AnimatePresence>
            {showModal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)',
                  zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }}
              >
                <motion.div 
                   initial={{ scale: 0.9, y: 20 }}
                   animate={{ scale: 1, y: 0 }}
                   exit={{ scale: 0.9, y: 20 }}
                   style={{
                     background: '#fff', borderRadius: '32px', padding: '40px',
                     width: '100%', maxWidth: '440px', position: 'relative',
                     boxShadow: '0 40px 80px rgba(0,0,0,0.2)'
                   }}
                >
                  <button 
                    onClick={() => setShowModal(false)}
                    style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                  >
                    <X size={24} />
                  </button>
                  
                  <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF943115', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <CreditCard size={32} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>Complete Payment</h2>
                    <p style={{ color: '#64748b', fontWeight: 500 }}>You are upgrading to Elite Access.</p>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#475569' }}>Total Amount</span>
                    <span style={{ fontSize: '24px', fontWeight: 950, color: '#FF9431' }}>
                      {tab === 'creator' ? getCreatorPrice().price : getBrandPrice().price}
                    </span>
                  </div>

                  <Btn 
                    full lg 
                    disabled={isProcessing}
                    onClick={handleProPayment}
                    style={{ background: '#FF9431', color: '#fff', borderRadius: '100px', fontSize: '16px' }}
                  >
                    {isProcessing ? 'Processing Securely...' : `Pay ${tab === 'creator' ? getCreatorPrice().price : getBrandPrice().price}`}
                  </Btn>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px', color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>
                    <Lock size={14} /> Secured by Escrow Vault
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* DETAILED COMPARISON TABLE */}
      <section style={{ padding: '80px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em' }}>Compare Features</h2>
            <p style={{ color: '#64748b', fontWeight: 500 }}>Select the perfect plan for your professional journey.</p>
          </div>

          <div style={{ 
            background: '#fff', 
            borderRadius: '32px', 
            border: '1px solid #f1f5f9', 
            overflowX: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
            WebkitOverflowScrolling: 'touch'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '24px 32px', fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Feature</th>
                  <th style={{ padding: '24px 32px', fontSize: '14px', fontWeight: 900, color: '#64748b', textAlign: 'center' }}>{tab === 'creator' ? 'Starter' : 'Launchpad'}</th>
                  <th style={{ padding: '24px 32px', fontSize: '14px', fontWeight: 900, color: '#FF9431', textAlign: 'center' }}>{tab === 'creator' ? 'Creator Pro' : 'Enterprise'}</th>
                </tr>
              </thead>
              <tbody>
                {(tab === 'creator' ? [
                  { f: 'Smart Digital Portfolio', s: 'Basic', p: 'Cinematic' },
                  { f: 'Search Priority', s: 'Standard', p: 'Top 1% Spot' },
                  { f: 'Deal Applications', s: 'Basic Dashboard', p: 'Unlimited Applications' },
                  { f: 'Verified Badge', s: false, p: 'Elite Blue Badge' },
                  { f: 'Brand Direct Chat', s: false, p: true },
                  { f: 'Dynamic A4 PDF Resume', s: false, p: true },
                  { f: 'AI Profile SEO', s: false, p: true }
                ] : [
                  { f: 'Smart Brand Dashboard', s: 'Basic', p: 'Cinematic' },
                  { f: 'Explore Creator Catalog', s: 'Standard', p: 'AI Smart Filters' },
                  { f: 'Active Campaign Listings', s: 'Basic', p: 'Unlimited Campaigns' },
                  { f: 'Verified Gold Badge', s: false, p: 'Enterprise Gold' },
                  { f: 'Direct Creator Pitching', s: false, p: true },
                  { f: 'Dynamic A4 Resumes Access', s: false, p: true },
                  { f: 'Dedicated Support', s: false, p: '24/7 Priority' }
                ]).map((row) => (
                  <tr key={row.f} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '20px 32px', fontSize: '15px', fontWeight: 600, color: '#475569' }}>{row.f}</td>
                    <td style={{ padding: '20px 32px', textAlign: 'center' }}>
                      {renderCellContent(row.s, '#10B981')}
                    </td>
                    <td style={{ padding: '20px 32px', textAlign: 'center', background: 'rgba(255, 148, 49, 0.02)' }}>
                      {renderCellContent(row.p, '#FF9431')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* Pricing Accordion FAQs */}
      <section style={{ padding: '80px 24px', background: '#fcfcfc', borderTop: '1px solid #f1f5f9' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
               <Bdg color="orange" sm>FAQ</Bdg>
               <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.02em' }}>Pricing Questions?</h2>
               <p style={{ color: '#64748b', fontWeight: 500 }}>Everything you need to know about our subscriptions and billing cycles.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               {PRICING_FAQS.map((faq, i) => (
                 <PricingFAQAccordion key={faq.q} q={faq.q} a={faq.a} i={i} />
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
            <Btn lg onClick={() => navigate('/join')} style={{ padding: '24px 64px', borderRadius: '100px', background: '#fff', color: '#0f172a', fontSize: '18px', fontWeight: 950 }}>
              Get Started Now <ArrowRight size={22} />
            </Btn>
         </motion.div>
      </section>
    </div>
  );
}
