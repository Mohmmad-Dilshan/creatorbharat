import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  IndianRupee,
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  HelpCircle,
  Activity
} from 'lucide-react';
import { Bdg, Btn } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'escrow', title: 'Escrow Protection', icon: Shield },
  { id: 'brand-refunds', title: 'Brand Campaign Refunds', icon: IndianRupee },
  { id: 'creator-payouts', title: 'Creator Milestones', icon: TrendingUp },
  { id: 'disputes', title: 'Dispute Resolutions', icon: ShieldAlert },
  { id: 'faq', title: 'Payout Policy FAQ', icon: HelpCircle }
];

export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState('escrow');
  const [mob, setMob] = useState(globalThis.innerWidth < 1024);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 1024);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0f172a' }}>
      <Seo 
        title="Payout & Refund Policy | The Bharat Protocol"
        description="Read CreatorBharat's unified payout, campaign escrow protection, milestone payments, and brand refund policy parameters."
        keywords="refund policy, payout guidelines, escrow, creator payments, brand protection"
      />

      {/* Cinematic Hero */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 20px 100px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(19,136,8,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #138808, #fff, #FF9431)' }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Bdg color="green" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>TRANSACTIONAL COMPLIANCE</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px',
               letterSpacing: '-1.5px'
             }}>
               Payout & <span style={{ fontStyle: 'italic', color: '#138808' }}>Refunds.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
               Air-tight escrow vaults, transparent milestone release schedules, and protected regional commerce.
             </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mob ? '40px 20px' : '80px 24px', display: 'grid', gridTemplateColumns: mob ? '1fr' : '300px 1fr', gap: '80px', alignItems: 'start' }}>
        
        {/* Sticky Sidebar */}
        {!mob && (
          <aside style={{ position: 'sticky', top: '120px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>POLICY INDEX</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: activeSection === s.id ? '#13880810' : 'transparent',
                    border: 'none',
                    color: activeSection === s.id ? '#138808' : '#64748b',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: '0.2s'
                  }}
                >
                  <s.icon size={18} />
                  {s.title}
                  {activeSection === s.id && <motion.div layoutId="refund-indicator" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <Shield size={24} color="#138808" style={{ marginBottom: '16px' }} />
               <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Escrow Guarantee</h4>
               <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>Funds are released only when campaign outcomes are mutually completed and approved.</p>
               <Btn full sm style={{ background: '#0f172a', color: '#fff' }}>Secure Payouts Portal</Btn>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
          
          <div id="escrow" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>1. Secure Escrow Protection</h2>
            <p>
              To maintain structural trust between national brand groups and regional micro-creators, CreatorBharat operates a standard **Milestone-Based Escrow Vault**. 
            </p>
            <p style={{ marginTop: '16px' }}>
              When a brand approves a creator proposal for a custom campaign, the campaign budget is deposited into our secure vault. This guarantees creators that the funds are secured before starting work, while protecting the brand from non-delivery.
            </p>
          </div>

          <div id="brand-refunds" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>2. Brand Campaign Refunds</h2>
            <p>
              Brands are entitled to a full or partial refund of campaign deposits under the following explicit criteria:
            </p>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', marginTop: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                {[
                  { id: 'ref-1', t: 'Creator Non-Delivery: If the assigned creator fails to submit campaign deliverables within 7 days of the scheduled deadline.' },
                  { id: 'ref-2', t: 'Mutual Agreement Cancelation: If both the brand and creator agree to terminate the contract prior to starting deliverables.' },
                  { id: 'ref-3', t: 'Quality Dispute: If deliverables do not match the parameters explicitly agreed upon in the Campaign Builder desk.' }
                ].map((item, idx) => (
                  <li key={item.id} style={{ display: 'flex', gap: '12px', fontSize: '16px', fontWeight: 500 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#138808', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '4px' }}>{idx + 1}</div>
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="creator-payouts" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>3. Creator Milestone Releases</h2>
            <p>
              Escrowed payouts are released to creators immediately upon satisfactory completion of campaigns:
            </p>
            <p style={{ marginTop: '16px' }}>
              Once deliverables are published live and verified by our system triggers, the brand has 72 hours to approve the outcome. If no review is provided, the escrow system automatically approves and clears 100% of the funds to the creator's secure wallet.
            </p>
            <div style={{ marginTop: '24px', padding: '24px', background: '#f0fdf4', borderRadius: '20px', border: '1px solid #bbf7d0' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#166534', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} /> Zero Platform Deductions</h4>
               <p style={{ fontSize: '14px', color: '#166534', lineHeight: 1.6, margin: 0 }}>
                 Under our DPIIT Startup Growth initiative, CreatorBharat charges 0% brokerage commission from regional micro-creators. The complete value of campaign deals belongs to the creator.
               </p>
            </div>
          </div>

          <div id="disputes" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>4. Dispute Resolution Pipeline</h2>
            <p>
              In the rare event of a quality or delivery disagreement:
            </p>
            <ul style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#138808" style={{ flexShrink: 0 }} /> **Grace Period:** The brand or creator can raise a dispute flag within 48 hours of asset submission.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#138808" style={{ flexShrink: 0 }} /> **Mediation Center:** CreatorBharat compliance managers will audit campaign logs, chat parameters, and video assets.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#138808" style={{ flexShrink: 0 }} /> **Final Decision:** A binding determination (which may involve full refund, partial payout, or redo request) will be issued within 5 business days.</li>
            </ul>
          </div>

          <div id="faq" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>5. Payout Policy FAQ</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>Are there transaction processing fees?</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55 }}>Standard gateway charges from UPI or net banking integrations are charged at actual cost, with zero markup from CreatorBharat.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>How long do refunds take to reflect?</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55 }}>Once a refund request is approved by compliance, funds are credited back to the original funding account within 5 to 7 banking days.</p>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <section style={{ 
            marginTop: '100px', 
            padding: '60px 40px', 
            background: '#0f172a', 
            borderRadius: '40px', 
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Activity size={200} color="#138808" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <IndianRupee size={48} color="#138808" style={{ marginBottom: '24px' }} />
               <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Secure Regional Commerce</h3>
               <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                 CreatorBharat provides robust financial infrastructure to elevate and secure professional creative commerce across India.
               </p>
            </div>
          </section>

        </main>
      </div>

      {/* Footer Meta */}
      <footer style={{ padding: '40px 20px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.4, fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Last Updated: May 2026</span>
            <span>•</span>
            <span>Ecosystem Trust Score: AAA+ Verified</span>
            <span>•</span>
            <span>© 2026 CreatorBharat</span>
         </div>
      </footer>
    </div>
  );
}
