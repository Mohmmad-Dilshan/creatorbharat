import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Store, 
  Link as LinkIcon, 
  Coffee, 
  Ticket, 
  Handshake, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Zap,
  IndianRupee
} from 'lucide-react';
import { useApp } from '../../core/context';
import { Btn, Bdg } from '../../components/common/Primitives';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';
import Seo from '../../components/common/SEO';

export default function MonetizationPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 1024);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 1024);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Role guard — only creators can access monetization
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} role="creator" />;
  }

  const toast = (msg, type) => { dsp({ t: 'TOAST', d: { type: type || 'info', msg } }); };

  const STREAMS = [
    { 
      id: 'marketplace',
      icon: Handshake, 
      title: 'Marketplace Deals', 
      desc: 'List your fixed-rate packages. Brands book you instantly without the back-and-forth negotiation.', 
      earning: '₹5k - 2L / deal', 
      status: 'live', 
      color: '#FF9431',
      tag: 'DIRECT COMMERCE'
    },
    { 
      id: 'referral',
      icon: Users, 
      title: 'Referral Rewards', 
      desc: 'Onboard fellow creators from your regional circle and earn cash for every verified listing.', 
      earning: '₹50 / creator', 
      status: 'live', 
      color: '#10B981',
      tag: 'ECOSYSTEM GROWTH'
    },
    { 
      id: 'store',
      icon: Store, 
      title: 'Digital Storefront', 
      desc: 'Sell presets, ebooks, and masterclasses directly to your audience. Keep 90% of every sale.', 
      earning: '₹500 - 50k / unit', 
      status: 'upcoming', 
      color: '#8B5CF6',
      tag: 'PASSIVE INCOME'
    },
    { 
      id: 'affiliate',
      icon: LinkIcon, 
      title: 'Affiliate Nodes', 
      desc: 'Unified tracking for all your partner links from Amazon, Flipkart, and local brands.', 
      earning: '5-15% commission', 
      status: 'upcoming', 
      color: '#3B82F6',
      tag: 'CURATED COMMERCE'
    },
    { 
      id: 'support',
      icon: Coffee, 
      title: 'Support Matrix', 
      desc: 'Direct UPI contributions from your fans. Zero platform fees, 100% transparency.', 
      earning: 'Unlimited Tips', 
      status: 'upcoming', 
      color: '#EC4899',
      tag: 'FAN ECONOMY'
    },
    { 
      id: 'premium',
      icon: Ticket, 
      title: 'Elite Memberships', 
      desc: 'Launch a private circle for your biggest fans with exclusive content and early access tiers.', 
      earning: 'Stable Recurring', 
      status: 'upcoming', 
      color: '#F59E0B',
      tag: 'SUBSCRIPTION MODEL'
    },
  ];

  const portfolioActive = localStorage.getItem('cb_portfolio_active') === 'true';
  const portfolioExpiry = parseInt(localStorage.getItem('cb_portfolio_expiry') || '0');
  const trialStart = parseInt(localStorage.getItem('cb_trial_start') || '0');
  const isApproved = localStorage.getItem('cb_verification_status') === 'APPROVED';
  const [isPro, setIsPro] = useState(() => st.isPro || localStorage.getItem('cb_is_pro') === 'true');
  const [pricingPlan, setPricingPlan] = useState('yearly');
  const [processingPayment, setProcessingPayment] = useState('');

  const daysInTrial = trialStart ? Math.floor((Date.now() - trialStart) / 86400000) : 0;
  const trialRemaining = Math.max(0, 30 - daysInTrial);
  const trialExpired = isApproved && !portfolioActive && trialRemaining === 0;
  const trialActive = isApproved && !portfolioActive && trialRemaining > 0;

  const portfolioExpiryDate = portfolioExpiry 
    ? new Date(portfolioExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const handlePortfolioPayment = () => {
    setProcessingPayment('portfolio');
    toast('Processing payment...', 'info');
    setTimeout(() => {
      localStorage.setItem('cb_portfolio_active', 'true');
      localStorage.setItem('cb_portfolio_expiry', String(Date.now() + 63072000000)); // 2 years
      setProcessingPayment('');
      toast('₹199 paid! Your portfolio is now live on CreatorBharat marketplace! 🎉', 'success');
      window.location.reload();
    }, 2000);
  };

  const handleProUpgrade = () => {
    setProcessingPayment('pro');
    toast('Processing Pro upgrade...', 'info');
    setTimeout(() => {
      localStorage.setItem('cb_is_pro', 'true');
      localStorage.setItem('cb_pro_plan', pricingPlan);
      setIsPro(true);
      dsp({ t: 'SET_PRO' });
      setProcessingPayment('');
      toast(`🌟 Pro ${pricingPlan} plan activated! Welcome to elite creator ecosystem!`, 'success');
    }, 2000);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0f172a' }}>
      <Seo 
        title="Monetization Engine | The Bharat Protocol"
        description="Unlock your full earning potential with the CreatorBharat monetization ecosystem. Multi-stream revenue for elite creators."
      />

      {/* Portfolio Listing Fee Card */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: mob ? '24px 16px' : '40px 20px' }}>
        
        {/* Portfolio Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: portfolioActive
              ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
              : trialExpired
              ? 'linear-gradient(135deg, #fef2f2, #fee2e2)'
              : 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            borderRadius: 28, padding: '32px',
            border: `1.5px solid ${portfolioActive ? '#86efac' : trialExpired ? '#fca5a5' : '#fcd34d'}`,
            marginBottom: 32
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>{portfolioActive ? '✅' : trialExpired ? '⛔' : '⏳'}</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 950, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {portfolioActive ? 'Portfolio Listing — Active ✓' : trialExpired ? 'Portfolio Listing — Expired' : `30-Day Trial — ${trialRemaining} Days Remaining`}
              </h2>
              <p style={{ fontSize: 14, color: '#475569', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.6 }}>
                {portfolioActive
                  ? `Your profile is live and visible in the /creators marketplace. ${portfolioExpiryDate ? `Active until ${portfolioExpiryDate}.` : 'Valid for 2 years.'}`
                  : trialExpired
                  ? 'Your profile is hidden from the marketplace. Pay ₹199 once to activate for 2 years.'
                  : `Your profile is live during the 30-day trial. After trial, pay ₹199 once to stay visible for 2 years in the marketplace.`}
              </p>
              
              {!portfolioActive && (
                <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: '24px', backdropFilter: 'blur(8px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                        PORTFOLIO LISTING FEE
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 40, fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em' }}>₹199</span>
                        <span style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>/ 2 years · One Time</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700, marginBottom: 8 }}>What you get:</div>
                      {['✅ 2-year marketplace visibility', '✅ /creators page listing', '✅ Brand discovery access', '✅ Profile SEO boost'].map(item => (
                        <div key={item} style={{ fontSize: 12, color: '#475569', fontWeight: 600, textAlign: 'left' }}>{item}</div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handlePortfolioPayment}
                    disabled={processingPayment === 'portfolio'}
                    style={{
                      marginTop: 20, width: '100%', padding: '16px 24px', borderRadius: 16,
                      background: processingPayment === 'portfolio' ? '#94a3b8' : 'linear-gradient(135deg, #FF9431, #EA580C)',
                      border: 'none', color: '#fff', fontSize: 15, fontWeight: 900, cursor: processingPayment === 'portfolio' ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                    }}
                  >
                    {processingPayment === 'portfolio' ? '⏳ Processing...' : '🚀 Activate Portfolio — ₹199'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', margin: '12px 0 0', fontWeight: 600 }}>
                    Powered by Razorpay · 100% Secure · Auto-renewal after 2 years
                  </p>
                </div>
              )}

              {portfolioActive && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(16,185,129,0.15)', borderRadius: 100, border: '1px solid #86efac' }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#065f46' }}>✓ Active until {portfolioExpiryDate || '2028'}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pro Subscription Plans */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 900, color: '#8B5CF6', background: 'rgba(139,92,246,0.1)', padding: '4px 14px', borderRadius: 100, border: '1px solid rgba(139,92,246,0.2)', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                PRO MEMBERSHIP
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 950, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                Upgrade to Pro
              </h2>
              <p style={{ fontSize: 15, color: '#64748b', fontWeight: 600, margin: 0 }}>
                Unlimited applications, analytics, downloads & priority ranking
              </p>
            </div>

            {/* Plan Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 100, padding: 4 }}>
                {[{ id: 'monthly', label: 'Monthly' }, { id: 'yearly', label: 'Yearly · Save ₹89' }].map(plan => (
                  <button key={plan.id} onClick={() => setPricingPlan(plan.id)} style={{
                    padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    background: pricingPlan === plan.id ? '#fff' : 'transparent',
                    color: pricingPlan === plan.id ? '#0f172a' : '#94a3b8',
                    fontSize: 13, fontWeight: 800,
                    boxShadow: pricingPlan === plan.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s'
                  }}>
                    {plan.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
              {/* Free Plan */}
              <div style={{ background: '#f8fafc', borderRadius: 24, padding: '28px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>FREE PLAN</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 950, color: '#0f172a' }}>₹0</span>
                    <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>/month</span>
                  </div>
                </div>
                {['Max 3 campaign applications', '3 social links on profile', '4 gallery photos', '3 message conversations', 'Basic analytics', 'Standard search ranking'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: 14, color: '#10B981' }}>✓</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{f}</span>
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: '12px 20px', background: '#fff', borderRadius: 14, textAlign: 'center', border: '1.5px solid #e2e8f0' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#94a3b8' }}>Current Plan</span>
                </div>
              </div>

              {/* Pro Plan */}
              <div style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF1E5 100%)', borderRadius: 24, padding: '28px', border: '2.5px solid #FF9431', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, padding: '4px 12px', background: 'linear-gradient(90deg, #FF9431, #EA580C)', borderRadius: 100, fontSize: 10, fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>
                  MOST POPULAR
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>PRO PLAN</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 950, color: '#0F172A' }}>₹{pricingPlan === 'yearly' ? '41' : '49'}</span>
                    <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>/month</span>
                  </div>
                  {pricingPlan === 'yearly' && <div style={{ fontSize: 12, color: '#D97706', fontWeight: 700 }}>₹499/year · Save ₹89</div>}
                </div>
                {['Unlimited campaign applications', 'Unlimited social links', 'Unlimited gallery photos', 'Unlimited messages', 'Full analytics + demographics', 'Top priority search ranking', 'Verified badge ✅', 'Media kit PDF download', 'Priority support'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid rgba(255,148,49,0.15)' }}>
                    <span style={{ fontSize: 14, color: '#10B981' }}>✓</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{f}</span>
                  </div>
                ))}
                <button
                  onClick={handleProUpgrade}
                  disabled={processingPayment === 'pro'}
                  style={{
                    marginTop: 20, width: '100%', padding: '14px 20px', borderRadius: 14,
                    background: processingPayment === 'pro' ? '#94a3b8' : 'linear-gradient(135deg, #FF9431, #EA580C)',
                    border: 'none', color: '#fff', fontSize: 14, fontWeight: 900, cursor: processingPayment === 'pro' ? 'not-allowed' : 'pointer'
                  }}
                >
                  {processingPayment === 'pro' ? '⏳ Processing...' : `⚡ Start Pro — ₹${pricingPlan === 'yearly' ? '499/year' : '49/month'}`}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {isPro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(255,148,49,0.05))', borderRadius: 20, padding: '20px 24px', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <span style={{ fontSize: 32 }}>⚡</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', margin: '0 0 2px' }}>Pro Member — All features unlocked!</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#64748b', margin: 0 }}>Unlimited applications, social links, gallery, analytics and priority ranking active.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Cinematic Header */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 20px 100px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Bdg color="orange" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>REVENUE INFRASTRUCTURE</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px'
             }}>
               The Monetization <span style={{ fontStyle: 'italic', color: '#FF9431' }}>Engine.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '650px', margin: '0 auto 48px' }}>
               Don\'t just rely on brand deals. Build a sustainable, multi-stream economy powered by the Bharat Protocol.
             </p>
             
             <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Btn lg style={{ background: '#FF9431', color: '#000', borderRadius: '100px', fontWeight: 900, padding: '18px 48px' }}>Activate Income Nodes</Btn>
                <Btn lg variant="outline" style={{ borderRadius: '100px', padding: '18px 48px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>View Success Stories</Btn>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <section style={{ 
        marginTop: '-40px', 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '1200px', 
        margin: '-40px auto 0',
        padding: '0 20px'
      }}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '32px', 
          padding: '40px', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
          border: '1px solid #f1f5f9',
          display: 'grid',
          gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
          gap: '40px',
          textAlign: 'center'
        }}>
           {[
             { label: 'PAID TO CREATORS', value: '₹12Cr+', icon: IndianRupee },
             { label: 'ACTIVE SELLERS', value: '3,800+', icon: Users },
             { label: 'REVENUE SHARE', value: '90%', icon: ShieldCheck },
             { label: 'INCOME NODES', value: '06', icon: Zap }
           ].map((stat, i) => (
             <div key={stat.label} style={{ borderRight: (!mob && i < 3) ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                   <stat.icon size={20} color="#FF9431" />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', marginTop: '8px', letterSpacing: '1px' }}>{stat.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Income Grid */}
      <section style={{ padding: '100px 20px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
             <Bdg color="blue" sm style={{ marginBottom: '16px' }}>CORE ECOSYSTEM</Bdg>
             <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900 }}>Diversify Your <span style={{ color: '#FF9431' }}>Portfolio.</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
            {STREAMS.map((s, i) => (
              <motion.div 
                key={s.id}
                whileHover={{ y: -10 }}
                style={{ 
                  background: '#fff', 
                  borderRadius: '32px', 
                  padding: '40px', 
                  border: '1px solid #f1f5f9',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  transition: '0.3s ease'
                }}
              >
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  background: `${s.color}10`, 
                  borderRadius: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <s.icon size={32} color={s.color} />
                </div>

                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 950, color: s.color, letterSpacing: '1px' }}>{s.tag}</span>
                      {s.status === 'live' ? <Bdg sm color="green">LIVE</Bdg> : <Bdg sm color="blue">BETA</Bdg>}
                   </div>
                   <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{s.title}</h3>
                   <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                   <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', marginBottom: '4px' }}>ESTIMATED EARNINGS</div>
                   <div style={{ fontSize: '18px', fontWeight: 900, color: s.color }}>{s.earning}</div>
                </div>

                {s.status === 'live' && (
                  <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                     <ArrowRight size={20} color="#94a3b8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Hub */}
      <section style={{ 
        padding: '120px 20px', 
        background: '#050505', 
        color: '#fff', 
        position: 'relative', 
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% 90%, rgba(16,185,129,0.1), transparent 50%)' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
           <TrendingUp size={64} color="#10B981" style={{ marginBottom: '32px' }} />
           <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '48px', fontWeight: 900, marginBottom: '24px' }}>Growth <span style={{ color: '#10B981' }}>Accelerator.</span></h2>
           <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px', lineHeight: 1.6 }}>
             Invite creators from your region to the Bharat Protocol. Build your own network and earn <span style={{ color: '#fff', fontWeight: 900 }}>₹50 instantly</span> for every verified portfolio listing.
           </p>

           <div style={{ 
             display: 'inline-flex', 
             alignItems: 'center', 
             background: 'rgba(255,255,255,0.05)', 
             padding: '8px 8px 8px 24px', 
             borderRadius: '100px',
             border: '1px solid rgba(255,255,255,0.1)',
             maxWidth: '100%'
           }}>
             <span style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginRight: '24px' }}>creatorbharat.com/join?ref={st.user?.handle || 'ELITE'}</span>
             <Btn lg style={{ background: '#fff', color: '#000', borderRadius: '100px', fontWeight: 900 }} onClick={() => {
                const handle = st.user?.handle || 'ELITE';
                navigator.clipboard.writeText(`https://creatorbharat.com/join?ref=${handle}`);
                toast('Referral link copied to clipboard!', 'success');
             }}>Copy Link</Btn>
           </div>
        </div>
      </section>

      {/* Footer Meta */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { t: '90% Rev Share', i: ShieldCheck },
              { t: 'Direct UPI Payouts', i: IndianRupee },
              { t: 'Decentralized Deals', i: Handshake }
            ].map(f => (
              <div key={f.t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <f.i size={16} color="#FF9431" />
                <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{f.t}</span>
              </div>
            ))}
         </div>
         <div style={{ marginTop: '40px', opacity: 0.4, fontSize: '11px', fontWeight: 700 }}>© 2026 THE BHARAT PROTOCOL | COMMERCIAL DIVISION</div>
      </footer>
    </div>
  );
}
