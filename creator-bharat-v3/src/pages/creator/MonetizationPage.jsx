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
import { useApp } from '@/core/context';
import { Btn, Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

export default function MonetizationPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 1024);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 1024);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

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

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0f172a' }}>
      <Seo 
        title="Monetization Engine | The Bharat Protocol"
        description="Unlock your full earning potential with the CreatorBharat monetization ecosystem. Multi-stream revenue for elite creators."
      />

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
             <span style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginRight: '24px' }}>creatorbharat.in/join?ref={st.user?.handle || 'ELITE'}</span>
             <Btn lg style={{ background: '#fff', color: '#000', borderRadius: '100px', fontWeight: 900 }} onClick={() => {
                const handle = st.user?.handle || 'ELITE';
                navigator.clipboard.writeText(`https://creatorbharat.in/join?ref=${handle}`);
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
