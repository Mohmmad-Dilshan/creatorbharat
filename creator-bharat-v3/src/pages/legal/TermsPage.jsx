import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  Scale, 
  ShieldAlert, 
  Gavel, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Bdg, Btn } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'role', title: 'Platform Role', icon: Scale },
  { id: 'accounts', title: 'User Accounts', icon: CheckCircle },
  { id: 'verification', title: 'Elite Verification', icon: Gavel },
  { id: 'payouts', title: 'Deals & Escrow', icon: ShieldAlert },
  { id: 'commission', title: 'Fee Structure', icon: FileText },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('role');
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
        title="Terms of Service | The Bharat Protocol"
        description="Read the terms and conditions for using the CreatorBharat platform. Rules for creators, brands, and agencies."
        keywords="terms of service, user agreement, creator bharat policies"
      />

      {/* Cinematic Hero */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 20px 100px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.05), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Bdg color="orange" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>LEGAL FRAMEWORK</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px'
             }}>
               Terms of <span style={{ fontStyle: 'italic', color: '#FF9431' }}>Service.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
               The operating agreement for Bharat\'s most trusted creator-brand ecosystem.
             </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mob ? '40px 20px' : '80px 24px', display: 'grid', gridTemplateColumns: mob ? '1fr' : '300px 1fr', gap: '80px', alignItems: 'start' }}>
        
        {/* Sticky Sidebar */}
        {!mob && (
          <aside style={{ position: 'sticky', top: '120px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>AGREEMENT INDEX</div>
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
                    background: activeSection === s.id ? '#FF943110' : 'transparent',
                    border: 'none',
                    color: activeSection === s.id ? '#FF9431' : '#64748b',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: '0.2s'
                  }}
                >
                  <s.icon size={18} />
                  {s.title}
                  {activeSection === s.id && <motion.div layoutId="terms-indicator" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <BookOpen size={24} color="#FF9431" style={{ marginBottom: '16px' }} />
               <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Legal Support?</h4>
               <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>For specific deal disputes, use the Deal Desk resolution center.</p>
               <Btn full sm style={{ background: '#0f172a', color: '#fff' }}>Open Ticket</Btn>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
          
          <div id="role" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>1. Platform Role</h2>
            <p>
              CreatorBharat is a decentralized talent discovery platform. We act as a **facilitator** between Creators and Brands. We do not act as an employer, agent, or representative for either party.
            </p>
            <p style={{ marginTop: '20px' }}>
              All contracts formed through our "Deal Desk" are legally binding agreements directly between the Creator and the Brand.
            </p>
          </div>

          <div id="accounts" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>2. User Accounts</h2>
            <p>
              To access the elite marketplace, you must maintain a verified account. You are responsible for all activity occurring under your unique profile node.
            </p>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', marginTop: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', fontSize: '16px' }}><CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '4px' }} /> One account per creator/brand identity.</li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '16px' }}><CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '4px' }} /> Minimum age requirement of 13+ (or as per regional law).</li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '16px' }}><XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '4px' }} /> Prohibition of bot-driven or automated profile management.</li>
              </ul>
            </div>
          </div>

          <div id="verification" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>3. Elite Verification</h2>
            <p>
              The **Elite Score** and **Verified Badge** are merit-based status markers. We reserve the right to revoke verification if a user is found providing fraudulent data or violating the professional guidelines.
            </p>
            <p style={{ marginTop: '20px' }}>
              Verification involves a multi-node audit of social media metrics, audience quality, and previous commercial performance.
            </p>
          </div>

          <div id="payouts" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>4. Deals & Escrow</h2>
            <p>
              All payments for brand deals are managed through our secure **Deal Desk Escrow**. Funds are released to creators only after the brand confirms the receipt and approval of the agreed-upon deliverables.
            </p>
            <div style={{ marginTop: '24px', padding: '24px', background: '#fff7ed', borderRadius: '20px', border: '1px solid #ffedd5' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#9a3412', textTransform: 'uppercase', marginBottom: '12px' }}>Payout Schedule</h4>
               <p style={{ fontSize: '14px', color: '#9a3412', lineHeight: 1.6 }}>
                 Standard release cycle is **T+3 days** after deliverable approval. Any disputes must be raised within 48 hours of work submission.
               </p>
            </div>
          </div>

          <div id="commission" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>5. Fee Structure</h2>
            <p>
              CreatorBharat operates on a **Zero Commission** philosophy for deals. 
            </p>
            <ul style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#FF9431" style={{ flexShrink: 0 }} /> We do not take a percentage cut from creator earnings.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#FF9431" style={{ flexShrink: 0 }} /> Revenue is generated via SaaS subscription tiers.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#FF9431" style={{ flexShrink: 0 }} /> Users are responsible for their own tax liabilities (GST/TDS).</li>
            </ul>
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
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Scale size={200} color="#FF9431" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <Gavel size={48} color="#FF9431" style={{ marginBottom: '24px' }} />
               <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Legal Governance</h3>
               <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                 By using this platform, you agree to these terms under the jurisdiction of Bhilwara, Rajasthan, India.
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
            <span>© 2026 CreatorBharat Elite</span>
         </div>
      </footer>
    </div>
  );
}
