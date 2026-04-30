import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop } from '../theme';
import { Btn, PL } from '../components/Primitives';

export default function MonetizationPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const isCreator = st.role === 'creator';

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };
  const toast = (msg, type) => { dsp({ t: 'TOAST', d: { type: type || 'info', msg } }); };

  const streams = [
    { icon: '🛍', title: 'Digital Products Store', desc: 'Presets, ebooks, templates, courses sell karo directly profile se. 90% revenue tumhara.', earning: '₹500-50,000/product', status: 'coming', color: '#FF9933' },
    { icon: '🔗', title: 'Affiliate Link Manager', desc: 'Amazon, Flipkart, brand affiliate links manage karo. Click tracking aur commission display.', earning: '5-15% per sale', status: 'coming', color: '#138808' },
    { icon: '☕', title: 'Tip Jar — Fan Support', desc: '"Buy me a chai" — UPI se seedha support. Instant payout tumhare account mein.', earning: '₹10-10,000/tip', status: 'coming', color: '#FF6B00' },
    { icon: '🎫', title: 'Fan Subscription', desc: 'Monthly subscribers ke liye exclusive content. Tiered membership: ₹49/₹149/₹499.', earning: '₹49-499/month/fan', status: 'coming', color: '#7C3AED' },
    { icon: '🤝', title: 'Brand Deal Marketplace', desc: 'Apne packages list karo. Brands directly book karo bina negotiation ke. Secure escrow.', earning: '₹5,000-2,00,000/deal', status: 'live', color: '#2563EB' },
    { icon: '📣', title: 'Creator Referral Program', desc: 'Naye creators refer karo. Har successful listing pe ₹50 tumhe milega.', earning: '₹50 per referral', status: 'live', color: '#138808' },
  ];

  const comingSoonFeatures = [
    { icon: '🎨', title: 'Preset Packs', desc: 'Lightroom/Filmora presets sell karo apne audience ko' },
    { icon: '📚', title: 'E-books & Guides', desc: '"My Brand Deal Playbook", "Instagram Growth Secrets"' },
    { icon: '🎥', title: 'Online Courses', desc: 'Video courses on content creation, editing, niche skills' },
    { icon: '📋', title: 'Templates Pack', desc: 'Media kits, pitch decks, Instagram templates' },
    { icon: '📅', title: '1:1 Consultation', desc: '30/60 min video calls — charge per session' },
    { icon: '🔴', title: 'Live Superchat', desc: 'Live stream pe fans se direct donation lo' },
  ];

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg,#0a0a0a 0%,#1a0800 60%,#001a00 100%)', padding: mob ? '48px 20px 32px' : '72px 20px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FF9933 33%,#fff 33%,#fff 66%,#138808 66%)' }} />
        <div style={{ ...W() }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '6px 14px', borderRadius: 20, background: 'rgba(255,153,51,.1)', border: '1px solid rgba(255,153,51,.3)' }}>
            <span style={{ fontSize: 14 }}>💰</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '.08em' }}>Monetization Hub</span>
          </div>
          <h1 style={{ fontSize: mob ? 32 : 56, fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: 16 }}>
            Creator Economy<br /><span style={{ color: '#FF9933' }}>Ka Full Power Lo</span>
          </h1>
          <p style={{ fontSize: mob ? 14 : 17, color: 'rgba(255,255,255,.65)', lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}>
            Brand deals se aage jao. Digital products, affiliates, fan support, subscriptions — multiple income streams ek jagah manage karo.
          </p>
          {!isCreator && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn lg style={{ background: 'linear-gradient(135deg,#FF9933,#FF6B00)', border: 'none', color: '#fff', fontWeight: 800 }} onClick={() => go('apply')}>Creator Profile Banao</Btn>
              <Btn lg style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.8)' }} onClick={() => dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } })}>Login Karo</Btn>
            </div>
          )}
          {isCreator && <Btn lg style={{ background: 'linear-gradient(135deg,#FF9933,#FF6B00)', border: 'none', color: '#fff', fontWeight: 800 }} onClick={() => go('dashboard')}>Dashboard Pe Jao</Btn>}
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #E8E6E3', padding: '16px 20px' }}>
        <div style={W()}>
          <div style={{ display: 'flex', gap: mob ? 20 : 48, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['8Cr+', 'Paid to creators'], ['2,400+', 'Creators earning'], ['6', 'Income streams'], ['90%', 'Creator share']].map((item) => (
              <div key={item[1]} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: mob ? 20 : 26, fontWeight: 900, color: '#FF9933', lineHeight: 1 }}>{item[0]}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{item[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '64px 20px', background: '#FAFAF9' }}>
        <div style={W()}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10 }}>Income Streams</p>
            <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 900, color: '#1a1a1a', marginBottom: 12 }}>6 Tarike Se Kamao</h2>
            <p style={{ fontSize: 15, color: '#555', maxWidth: 500, margin: '0 auto' }}>Sirf brand deals pe depend mat karo. Multiple income streams banao.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2,1fr)', gap: 18 }}>
            {streams.map((s) => (
              <div key={s.title} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E6E3', padding: '22px', display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: s.color }} />
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>{s.title}</h3>
                    {s.status === 'live' ? <span style={{ fontSize: 9, background: 'rgba(19,136,8,.1)', color: '#138808', padding: '2px 7px', borderRadius: 10, fontWeight: 800 }}>LIVE</span> : <span style={{ fontSize: 9, background: 'rgba(255,153,51,.1)', color: '#FF9933', padding: '2px 7px', borderRadius: 10, fontWeight: 800 }}>COMING SOON</span>}
                  </div>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 10 }}>{s.desc}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: s.color + '12', border: '1px solid ' + s.color + '30' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>Earning: {s.earning}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '64px 20px', background: '#138808', position: 'relative', overflow: 'hidden' }}>
        <div style={{ ...W(700), textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤝</div>
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Creator Referral Program</h2>
          <p style={{ fontSize: mob ? 14 : 16, color: 'rgba(255,255,255,.85)', marginBottom: 8, lineHeight: 1.7 }}>Apne creator dost ko CreatorBharat pe laao. Har successful listing pe tumhe milega</p>
          <div style={{ fontSize: mob ? 36 : 52, fontWeight: 900, color: '#fff', marginBottom: 8 }}>₹50</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', marginBottom: 32 }}>Sirf refer karo — aur kuch nahi. Monthly payout tumhare account mein.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn lg style={{ background: '#fff', color: '#138808', fontWeight: 800, border: 'none' }} onClick={() => {
              if (!st.user) { dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } }); return; }
              try { navigator.clipboard.writeText('https://creatorbharat.in/r/' + ((st.creatorProfile && st.creatorProfile.handle) || 'creator')); } catch (e) { }
              toast('Referral link copied! Share karo aur kamao.', 'success');
            }}>Referral Link Copy Karo</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
