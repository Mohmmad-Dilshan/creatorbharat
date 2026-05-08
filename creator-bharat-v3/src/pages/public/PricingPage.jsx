import React, { useState, useEffect } from 'react';
import { useApp } from '../../context';
import { T } from '../../theme';
import { W, scrollToTop, LS } from '../../utils/helpers';
import { Btn, SH as Sh, Bdg } from '../../components/Primitives';

export default function PricingPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  const plans = [
    { 
      id: 'free', 
      name: 'Starter', 
      price: 'Free', 
      period: 'forever', 
      highlight: false, 
      desc: 'Perfect for new creators starting their digital journey.', 
      features: ['Standard creator profile', 'City-based discovery', 'Apply to 3 campaigns/mo', 'Basic profile analytics'], 
      cta: 'Join for Free', 
      onClick: () => go('apply') 
    },
    {
      id: 'pro', 
      name: 'Creator Pro', 
      price: '₹49', 
      period: 'one-time', 
      highlight: true, 
      desc: 'Unlock your full potential with priority brand access.', 
      features: [
        'Premium portfolio builder', 
        'Priority search placement', 
        'Unlimited applications', 
        'Auto-generated SEO article', 
        'Verified blue badge', 
        'Direct brand messaging',
        'Featured in weekly newsletter'
      ], 
      cta: 'Get Pro Access', 
      onClick: () => {
        if (!st.user || st.role !== 'creator') { go('apply'); return; }
        toast('Razorpay test mode: Pro activated!', 'success');
        LS.update('cb_creators', st.creatorProfile?.id, { pro: true });
        dsp({ t: 'SET_CP', p: { ...st.creatorProfile, pro: true } });
      }
    },
    { 
      id: 'proplus', 
      name: 'Agency Hub', 
      price: '₹299', 
      period: 'per month', 
      highlight: false, 
      desc: 'For serious creators and emerging talent agencies.', 
      features: [
        'Everything in Pro', 
        'Homepage featured spot', 
        'WhatsApp deal alerts', 
        'Revenue tracking dashboard', 
        'Custom profile URL', 
        'Dedicated success manager'
      ], 
      cta: 'Join Agency Hub', 
      onClick: () => toast('Agency Hub coming soon!', 'info') 
    },
  ];

  const faqs = [
    ['Is it really a one-time payment?', 'Yes. The ₹49 for Creator Pro is a one-time fee for lifetime access. Humne ise affordable banaya hai taaki Bharat ka har creator grow kar sake.'], 
    ['How do brands find me?', 'Brands use our discovery engine to filter by city (Tier 2/3 focus), niche, and platform. Pro profiles rank higher in results.'], 
    ['What is the Verified Badge?', 'The blue badge signifies that your identity and stats have been verified by the CreatorBharat team, building instant trust with brands.'], 
    ['Can I upgrade from Free to Pro?', 'Absolutely. You can start with a free profile and upgrade to Pro from your dashboard at any time.']
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W(900)}>
           <Sh eyebrow="Investment for Growth" title="Simple Pricing, Infinite Reach" sub="Empowering Bharat's creators with affordable professional tools." light center mb={0} />
        </div>
      </div>

      <div style={{ padding: mob ? '60px 20px' : '100px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 32, alignItems: 'stretch' }}>
            {plans.map((plan, i) => (
              <div 
                key={plan.id} 
                className="au"
                style={{ 
                   borderRadius: 40, 
                   border: `2px solid ${plan.highlight ? '#FF9431' : 'rgba(0,0,0,0.05)'}`, 
                   padding: '48px 32px', 
                   background: plan.highlight ? '#fff' : 'rgba(0,0,0,0.02)', 
                   position: 'relative', 
                   display: 'flex', 
                   flexDirection: 'column', 
                   transition: 'all 0.3s ease',
                   boxShadow: plan.highlight ? '0 30px 60px rgba(0,0,0,0.05)' : 'none',
                   transform: plan.highlight && !mob ? 'scale(1.05)' : 'none',
                   zIndex: plan.highlight ? 2 : 1
                }}
              >
                {plan.highlight && (
                   <div style={{ position: 'absolute', top: 24, right: 32 }}>
                      <Bdg color="yellow">BEST VALUE</Bdg>
                   </div>
                )}
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: T.t3, marginBottom: 32, lineHeight: 1.5, fontWeight: 600 }}>{plan.desc}</p>
                
                <div style={{ marginBottom: 40 }}>
                   <div style={{ fontSize: 56, fontWeight: 900, color: plan.highlight ? '#FF9431' : '#111', lineHeight: 1 }}>{plan.price}</div>
                   <div style={{ fontSize: 13, fontWeight: 800, color: T.t4, textTransform: 'uppercase', letterSpacing: '1px', marginTop: 8 }}>{plan.period}</div>
                </div>

                <div style={{ flex: 1, marginBottom: 40 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 15, color: T.t2, fontWeight: 600 }}>
                       <span style={{ color: plan.highlight ? '#FF9431' : '#10B981', fontSize: 18 }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                <Btn 
                   full 
                   lg 
                   variant={plan.highlight ? 'primary' : 'outline'} 
                   style={{ borderRadius: 100, height: 60, fontSize: 16, boxShadow: plan.highlight ? '0 10px 24px rgba(255,148,49,0.2)' : 'none' }} 
                   onClick={plan.onClick}
                >
                   {plan.cta}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#fff' }}>
        <div style={W(800)}>
          <Sh eyebrow="Common Queries" title="Frequently Asked" center mb={56} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map(([q, a], i) => (
              <div key={q} style={{ borderRadius: 24, background: '#FAFAFA', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)' }}>
                <button 
                  onClick={() => setFaq(faq === i ? null : i)} 
                  style={{ width: '100%', padding: '28px 32px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, fontFamily: 'inherit' }}
                >
                  <span style={{ fontSize: 17, fontWeight: 800, color: '#111' }}>{q}</span>
                  <span style={{ color: '#FF9431', fontSize: 28, transition: 'transform 0.3s', transform: faq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {faq === i && (
                  <div className="ai" style={{ padding: '0 32px 32px' }}>
                    <p style={{ fontSize: 16, color: T.t2, lineHeight: 1.7, fontWeight: 500 }}>{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div style={{ background: '#050505', padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: T.gd }} />
         <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 48, fontWeight: 900, color: '#fff', marginBottom: 24 }}>Ready to Turn Pro?</h2>
         <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>Bharat's top creators are already here. Join them today.</p>
         <Btn lg onClick={() => go('apply')} style={{ borderRadius: 100, padding: '18px 60px', fontSize: 18 }}>Get Started Now</Btn>
      </div>
    </div>
  );
}
