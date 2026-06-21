import React, { useState, useEffect } from 'react';
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
  Zap,
  Wallet,
  ShieldCheck
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import { useApp } from '@/core/context';
import { apiCall } from '@/utils/api';

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

function CampaignRateCalculator({ mob }) {
  const [tier, setTier] = useState('mid');
  const [reels, setReels] = useState(1);
  const [stories, setStories] = useState(2);
  const [youtube, setYoutube] = useState(0);

  const TIER_RATES = {
    micro: { name: 'Micro (10K - 100K)', reel: 12000, story: 4000, youtube: 25000, avgReach: 15000, avgER: 5.4 },
    mid: { name: 'Mid-Tier (100K - 500K)', reel: 38000, story: 12000, youtube: 80000, avgReach: 68000, avgER: 4.2 },
    macro: { name: 'Macro (500K - 1M)', reel: 110000, story: 35000, youtube: 220000, avgReach: 220000, avgER: 3.6 },
    mega: { name: 'Mega (1M+)', reel: 320000, story: 95000, youtube: 650000, avgReach: 800000, avgER: 2.9 }
  };

  const currentRate = TIER_RATES[tier];
  const totalCost = (reels * currentRate.reel) + (stories * currentRate.story) + (youtube * currentRate.youtube);
  const agencyCommission = Math.round(totalCost * 0.15);
  
  const estReach = Math.round(
    (reels * currentRate.avgReach * 1.1) + 
    (stories * currentRate.avgReach * 0.35) + 
    (youtube * currentRate.avgReach * 1.6)
  );
  
  const estEngagements = Math.round(estReach * (currentRate.avgER / 100));
  const estConversions = Math.round(estReach * 0.016);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '40px',
      padding: mob ? '24px' : '40px',
      boxShadow: '0 25px 60px rgba(15,23,42,0.03)',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 900,
          color: '#3b82f6',
          background: 'rgba(59, 130, 246, 0.08)',
          padding: '6px 16px',
          borderRadius: '100px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '10px'
        }}>
          💡 Live Campaign Cost & ROI Estimator
        </span>
        <h3 style={{ fontSize: mob ? '22px' : '30px', fontWeight: 950, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Estimate Campaign Rates & ROI
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
          Adjust deliverables and creator tiers dynamically to calculate standard market campaign rates and expected engagement performance metrics.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 900, color: '#475569', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Select Creator Tier
            </label>
            <select
              value={tier}
              onChange={e => setTier(e.target.value)}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '16px',
                padding: '14px 20px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#0f172a',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 20px center',
                backgroundSize: '16px'
              }}
            >
              <option value="micro">Micro (10K - 100K followers)</option>
              <option value="mid">Mid-Tier (100K - 500K followers)</option>
              <option value="macro">Macro (500K - 1M followers)</option>
              <option value="mega">Mega (1M+ followers)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>INSTAGRAM REELS</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#FF9431', background: 'rgba(255, 148, 49, 0.08)', padding: '2px 10px', borderRadius: '8px' }}>
                {reels} Video{reels !== 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={reels}
              onChange={e => setReels(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                accentColor: '#FF9431',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>INSTAGRAM STORIES</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#FF9431', background: 'rgba(255, 148, 49, 0.08)', padding: '2px 10px', borderRadius: '8px' }}>
                {stories} Story{stories !== 1 ? 'ies' : ''}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={stories}
              onChange={e => setStories(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                accentColor: '#FF9431',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>YOUTUBE DEDICATED VIDEOS</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#FF9431', background: 'rgba(255, 148, 49, 0.08)', padding: '2px 10px', borderRadius: '8px' }}>
                {youtube} Video{youtube !== 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={youtube}
              onChange={e => setYoutube(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                accentColor: '#FF9431',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '30px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Estimated Campaign Cost
            </div>
            <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginTop: '4px' }}>
              ₹{totalCost.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', fontWeight: 550 }}>
              *Standard industry base rates (0% CreatorBharat commission)
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e2e8f0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2px' }}>
                Expected Reach
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#3b82f6', marginTop: '2px' }}>
                {estReach >= 100000 ? `${(estReach / 100000).toFixed(1)}L+` : estReach.toLocaleString()}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '1px' }}>Est. Views/Impressions</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2px' }}>
                Expected Clicks
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981', marginTop: '2px' }}>
                {estConversions.toLocaleString()}+
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '1px' }}>At avg 1.6% CTR</div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e2e8f0' }} />

          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 148, 49, 0.08) 0%, rgba(234, 88, 12, 0.04) 100%)',
            border: '1.5px dashed rgba(255, 148, 49, 0.35)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#FF9431',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0
            }}>
              🎉
            </div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                CreatorBharat Advantage
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
                Saved ₹{agencyCommission.toLocaleString()} in Agency Fees!
              </div>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0', lineHeight: 1.4, fontWeight: 550 }}>
                Traditional agencies charge 15% commission markups. CreatorBharat connects you directly for <b>Free</b>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PricingPage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [tab, setTab] = useState('creator');
  const [duration, setDuration] = useState('1m'); // '1m', '6m', '1y'
  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkSize = () => setMob(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleProActivate = async () => {
    if (!st.user) {
      navigate(tab === 'brand' ? '/brand-register' : '/apply');
      return;
    }

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Razorpay SDK failed to load. Please check your connection.' } });
        return;
      }

      const res = await apiCall('/payments/create-order', {
        method: 'POST',
        body: { type: 'PRO_LISTING' }
      });

      const options = {
        key: res.key,
        amount: res.amount,
        currency: res.currency,
        name: 'CreatorBharat Pro',
        description: 'Upgrade to Elite Creator status',
        order_id: res.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await apiCall('/payments/verify', {
              method: 'POST',
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });
            if (verifyRes.success) {
              localStorage.setItem('cb_is_pro', 'true');
              if (st.user?.creatorProfile) {
                st.user.creatorProfile.isPro = true;
              }
              dsp?.({ t: 'SESSION_UPDATE', v: { isPro: true } });
              dsp?.({ t: 'TOAST', d: { type: 'success', msg: 'Payment successful! Welcome to Pro! 🎉' } });
              navigate('/creator/dashboard');
            } else {
              dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Verification failed. Please contact support.' } });
            }
          } catch (err) {
            console.error('Verify payment error:', err);
            dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Payment verification failed.' } });
          }
        },
        prefill: {
          name: st.user.name || '',
          email: st.user.email || '',
          contact: st.user.phone || ''
        },
        theme: {
          color: '#FF9431'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment checkout initiation failed:', err);
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Failed to initiate payment. Please try again.' } });
    }
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
      
      <style>{`
        .pricing-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .pricing-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      {/* Cinematic Hero */}
      {/* Cinematic Hero */}
      <section style={{ 
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', 
        padding: mob ? '90px 20px 60px' : '130px 24px 100px', 
        position: 'relative',
        overflow: 'hidden',
        minHeight: mob ? 'auto' : '520px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {/* Full-bleed background poster image (real humans, no text in image) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/pricing_hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: mob ? 'center' : '20% center',
          opacity: mob ? 0.25 : 0.95,
          zIndex: 0
        }} />

        {/* Gradient mask to transition background image to soft white on the left for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: mob 
            ? 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start', maxWidth: mob ? '100%' : '600px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px', 
                background: 'rgba(255, 148, 49, 0.06)', 
                padding: '10px 20px', 
                borderRadius: '100px',
                marginBottom: '32px',
                border: '1px solid rgba(255, 148, 49, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Sparkles size={16} color="#FF9431" />
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Value-Driven Ecosystem</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: mob ? '40px' : '68px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.04em', lineHeight: 1.05, textAlign: mob ? 'center' : 'left' }}
            >
              Invest in Your <br />
              <span style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Future.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: mob ? '15px' : '18px', color: '#475569', maxWidth: '600px', margin: mob ? '0 auto 40px' : '0 0 40px 0', lineHeight: 1.6, fontWeight: 500, textAlign: mob ? 'center' : 'left' }}
            >
              Join Bharat's most transparent influencer ecosystem. Zero commission on deals. Affordable tools for everyone.
            </motion.p>

            {/* Perspective Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                width: '100%',
                maxWidth: '360px', 
                margin: mob ? '0 auto 24px' : '0 0 24px 0', 
                background: '#ffffff', 
                padding: '6px', 
                borderRadius: '100px', 
                display: 'flex',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
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
                background: '#ffffff', 
                padding: '6px', 
                borderRadius: '100px', 
                border: '1px solid #e2e8f0',
                gap: '4px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
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
                      background: active ? 'linear-gradient(135deg, #FF9431 0%, #ff7b00 100%)' : 'transparent',
                      color: active ? '#fff' : '#64748b',
                      fontSize: '13px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: active ? '0 4px 12px rgba(255, 148, 49, 0.2)' : 'none'
                    }}
                  >
                    {d.label}
                    {d.save && (
                      <span style={{ 
                        fontSize: '9px', 
                        background: active ? '#fff' : 'rgba(16, 185, 129, 0.1)', 
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
                   onProActivate={handleProActivate}
                 />
               ))}
            </motion.div>
          </AnimatePresence>


        </div>
      </section>

      {/* Interactive Campaign ROI/Rate Calculator */}
      <section style={{ padding: '40px 24px 80px', position: 'relative', zIndex: 2 }}>
        <CampaignRateCalculator mob={mob} />
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
            background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', 
            borderRadius: '56px', 
            padding: '100px 40px', 
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(234,88,12,0.2)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")', opacity: 0.05 }} />
            <h2 style={{ fontSize: '56px', fontWeight: 950, marginBottom: '24px', letterSpacing: '-0.05em', position: 'relative' }}>Ready to Scale?</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 56px', fontWeight: 500 }}>
              Join the elite circle of creators and brands building the future of commerce in Bharat.
            </p>
            <Btn lg onClick={() => navigate('/join')} style={{ padding: '24px 64px', borderRadius: '100px', background: '#fff', color: '#EA580C', fontSize: '18px', fontWeight: 950, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
              Get Started Now <ArrowRight size={22} />
            </Btn>
         </motion.div>
      </section>
    </div>
  );
}
