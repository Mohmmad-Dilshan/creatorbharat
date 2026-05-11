import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { T } from '@/core/theme';
import { W, scrollToTop } from '../../utils/helpers';
import { Btn, SH as Sh, Card, Bdg } from '@/components/common/Primitives';

export default function MonetizationPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); navigate(`/${p}`); scrollToTop(); };
  const toast = (msg, type) => { dsp({ t: 'TOAST', d: { type: type || 'info', msg } }); };

  const streams = [
    { icon: 'ðŸ›ï¸', title: 'Digital Store', desc: 'Sell presets, ebooks, and courses directly to your fans. You keep 90% of the revenue.', earning: 'â‚¹500 - 50k/unit', status: 'coming', color: '#FF9431' },
    { icon: 'ðŸ”—', title: 'Affiliate Manager', desc: 'Auto-track clicks and commissions from Amazon, Flipkart, and local brand partners.', earning: '5-15% commission', status: 'coming', color: '#10B981' },
    { icon: 'â˜•', title: 'Fan Support', desc: 'Instant UPI tips from your loyal audience. No hidden platform cuts for supporters.', earning: 'Unlimited tips', status: 'coming', color: '#FF6B00' },
    { icon: 'ðŸŽ«', title: 'Premium Subscriptions', desc: 'Create a private circle for your biggest fans with exclusive content tiers.', earning: 'Stable Monthly Income', status: 'coming', color: '#7C3AED' },
    { icon: 'ðŸ¤', title: 'Marketplace Deals', desc: 'List your fixed-rate packages. Brands book you instantly without the back-and-forth.', earning: 'â‚¹5k - 2L/deal', status: 'live', color: '#3B82F6' },
    { icon: 'ðŸ“£', title: 'Referral Rewards', desc: 'Refer fellow creators from your city and earn instant cash for every verified listing.', earning: 'â‚¹50 per creator', status: 'live', color: '#10B981' },
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W(900)}>
           <Sh eyebrow="Monetization Ecosystem" title="Unlock Your Full Earning Potential" sub="Don't just rely on brand deals. Build a sustainable multi-stream creator business in Bharat." light center mb={48} />
           
           <div className="au d2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn lg onClick={() => go('apply')} style={{ borderRadius: 100, padding: '18px 48px' }}>Launch My Store</Btn>
              <Btn lg variant="outline" onClick={() => go('blog')} style={{ borderRadius: 100, padding: '18px 48px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>View Success Stories</Btn>
           </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '32px 20px' }}>
        <div style={W()}>
          <div style={{ display: 'flex', gap: mob ? 32 : 80, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { v: 'â‚¹8Cr+', l: 'Paid to Creators' },
              { v: '2,400+', l: 'Active Sellers' },
              { v: '90%', l: 'Creator Revenue Share' },
              { v: '6', l: 'Income Streams' }
            ].map((item) => (
              <div key={item.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>{item.v}</div>
                <div style={{ fontSize: 13, color: T.t4, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: mob ? '60px 20px' : '100px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
            {streams.map((s, i) => (
              <Card 
                key={s.title} 
                className={`au d${(i % 5) + 1}`}
                style={{ 
                  padding: '40px 32px', 
                  background: '#fff', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 20, 
                  position: 'relative', 
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: s.color }} />
                <div style={{ width: 64, height: 64, borderRadius: 20, background: s.color + '10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{s.icon}</div>
                
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>{s.title}</h3>
                      <Bdg color={s.status === 'live' ? 'green' : 'blue'}>{s.status.toUpperCase()}</Bdg>
                   </div>
                   <p style={{ fontSize: 14, color: T.t3, lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</p>
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                   <p style={{ fontSize: 12, fontWeight: 800, color: T.t4, textTransform: 'uppercase', letterSpacing: '1px' }}>Avg. Earnings</p>
                   <p style={{ fontSize: 18, fontWeight: 900, color: s.color, marginTop: 4 }}>{s.earning}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#050505', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% 90%, rgba(16,185,129,0.1), transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#10B981' }} />
        
        <div style={W(800)}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>ðŸ¤</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 48, fontWeight: 900, marginBottom: 16 }}>Creator Referral Program</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 40, lineHeight: 1.6 }}>Invite fellow creators from your city. Earn <span style={{ color: '#10B981', fontWeight: 900 }}>â‚¹50 instantly</span> for every verified portfolio listing. No limits, just growth.</p>
          
          <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Btn lg style={{ borderRadius: 100, padding: '18px 60px', background: '#fff', color: '#111', border: 'none' }} onClick={() => {
              if (!st.user) { navigate('/login'); return; }
              const handle = st.creatorProfile?.handle || 'me';
              navigator.clipboard.writeText(`https://creatorbharat.in/apply?ref=${handle}`);
              toast('Referral link copied! Share it with your creator circle.', 'success');
            }}>Copy Referral Link</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
