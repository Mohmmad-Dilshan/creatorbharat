import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS } from '../theme';
import { Btn, SH, Card } from '../components/Primitives';

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
    { id: 'free', name: 'Starter', price: 'Free', period: 'forever', highlight: false, desc: 'Perfect for new creators starting their journey.', features: ['Basic creator profile', 'City-based discovery', 'Apply to 1 campaign/month', 'Basic analytics'], cta: 'Get Started Free', onClick: () => go('apply') },
    {
      id: 'pro', name: 'Creator Pro', price: '₹49', period: 'one-time', highlight: true, desc: 'Unlock your full potential with priority access.', features: ['Professional portfolio builder', 'Priority search placement', 'Unlimited campaign applications', 'Auto-generated SEO article', 'Verified blue badge', 'Advanced audience analytics', 'Direct brand messaging'], cta: 'Get Creator Pro', onClick: () => {
        if (!st.user || st.role !== 'creator') { go('apply'); return; }
        toast('Razorpay test mode: Pro activated!', 'success');
        LS.update('cb_creators', st.creatorProfile?.id, { pro: true });
        dsp({ t: 'SET_CP', p: { ...st.creatorProfile, pro: true } });
      }
    },
    { id: 'proplus', name: 'Agency Hub', price: '₹299', period: 'per month', highlight: false, desc: 'For serious creators and talent agencies.', features: ['Everything in Pro', 'Homepage featured placement', 'WhatsApp deal alerts', 'Revenue tracking dashboard', 'Custom profile URL', 'Dedicated account support'], cta: 'Go Agency Hub', onClick: () => toast('Agency Hub coming soon!', 'info') },
  ];

  const faqs = [['Is it really a one-time payment?', 'Yes. The ₹49 for Creator Pro is a one-time fee for lifetime access. No subscriptions or hidden renewals.'], ['How do brands find me?', 'Brands use our discovery engine to filter by city, niche, and platform. Pro profiles appear at the top of these results.'], ['What is the CS Score?', 'It is our proprietary algorithm that ranks creators based on profile completeness, engagement, and consistency.'], ['Can I upgrade later?', 'Absolutely. You can start with a free profile and upgrade to Pro whenever you are ready to scale.']];

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '60px 20px' : '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.15) 0%, transparent 70%)' }} />
        <div style={W(800)}><SH eyebrow="Investment" title="Build Your Career" sub="Simple, transparent pricing to help you monetize your influence." light center mb={0} /></div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#fff' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 32, alignItems: 'stretch' }}>
            {plans.map(plan => (
              <div key={plan.id} style={{ borderRadius: 32, border: `2px solid ${plan.highlight ? T.gd : T.bd}`, padding: 32, background: plan.highlight ? T.ga : '#fff', position: 'relative', display: 'flex', flexDirection: 'column', transition: 'transform .3s ease' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: T.gd, color: '#fff', fontSize: 12, fontWeight: 900, padding: '6px 20px', borderRadius: 20, letterSpacing: '.05em' }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: 18, fontWeight: 900, color: T.t1, marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: T.t3, marginBottom: 24, lineHeight: 1.5 }}>{plan.desc}</p>
                <div style={{ fontSize: 44, fontWeight: 900, color: plan.highlight ? T.gd : T.t1, marginBottom: 32 }}>{plan.price}<span style={{ fontSize: 16, fontWeight: 600, color: T.t4 }}> / {plan.period}</span></div>
                <div style={{ flex: 1 }}>
                  {plan.features.map(f => <div key={f} style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 15, color: T.t2, fontWeight: 500 }}><span style={{ color: '#10B981', fontWeight: 900 }}>✓</span>{f}</div>)}
                </div>
                <Btn full lg variant={plan.highlight ? 'primary' : 'outline'} style={{ marginTop: 32, borderRadius: 16, height: 56, fontSize: 16 }} onClick={plan.onClick}>{plan.cta}</Btn>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '60px 20px' : '100px 20px', background: T.bg2 }}>
        <div style={W(760)}>
          <SH eyebrow="FAQ" title="Your Questions Answered" center mb={48} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map(([q, a], i) => (
              <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => setFaq(faq === i ? null : i)} style={{ width: '100%', padding: '24px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: 'inherit' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: T.t1 }}>{q}</span>
                  <span style={{ color: T.gd, fontSize: 24, transition: 'transform .3s', transform: faq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {faq === i && <div style={{ padding: '0 24px 24px' }}><p style={{ fontSize: 15, color: T.t2, lineHeight: 1.7, fontWeight: 500 }}>{a}</p></div>}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
