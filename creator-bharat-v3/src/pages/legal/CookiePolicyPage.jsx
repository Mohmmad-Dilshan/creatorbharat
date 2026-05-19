import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Settings, 
  Database, 
  Eye, 
  Lock, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Bdg, Btn } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'cookies-101', title: 'What are Cookies?', icon: Info },
  { id: 'usage', title: 'How We Use Them', icon: Eye },
  { id: 'types', title: 'Types of Cookies We Use', icon: Database },
  { id: 'preferences', title: 'Manage Preferences', icon: Settings },
  { id: 'updates', title: 'Policy Updates', icon: Clock }
];

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState('cookies-101');
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
        title="Cookie Policy | The Bharat Protocol"
        description="Learn how CreatorBharat uses cookies and tracking technologies to personalize your dashboard, secure payouts, and optimize marketplace matching."
        keywords="cookie policy, tracking technology, privacy, creator bharat cookies"
      />

      {/* Cinematic Hero */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 20px 100px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Bdg color="orange" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>BROWSER COMPLIANCE</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px',
               letterSpacing: '-1.5px'
             }}>
               Cookie <span style={{ fontStyle: 'italic', color: '#FF9431' }}>Policy.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
               Standardized tracking protocols to enable personalized dashboards, secure authentication state, and elite features.
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
                  {activeSection === s.id && <motion.div layoutId="cookie-indicator" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <Shield size={24} color="#FF9431" style={{ marginBottom: '16px' }} />
               <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Tracking Opt-Out</h4>
               <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>You can adjust cookies anytime through your native browser privacy center.</p>
               <Btn full sm style={{ background: '#0f172a', color: '#fff' }}>Compliance Center</Btn>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
          
          <div id="cookies-101" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>1. What are Cookies?</h2>
            <p>
              Cookies are minor text nodes saved locally by your browser when you enter a web portal. They enable the portal to memorize your actions, device specifications, and credentials over a span of time, preventing you from re-keying them on recurrent visits.
            </p>
            <p style={{ marginTop: '16px' }}>
              Along with standard cookies, we may utilize auxiliary browser storage nodes (like local storage or pixel tags) to deliver highly seamless responsive interfaces.
            </p>
          </div>

          <div id="usage" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>2. How We Use Them</h2>
            <p>
              We process cookies solely to guarantee structural stability, user safety, and computational efficiency on our SaaS Deal Desk.
            </p>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', marginTop: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                {[
                  { id: 'use-1', t: 'Authentication: Memorizing secure login sessions so you don\'t have to sign in repeatedly.' },
                  { id: 'use-2', t: 'Marketplace Deals: Temporary local memory of campaign details during checkout.' },
                  { id: 'use-3', t: 'Regional Settings: Saving language settings and selected regional leaderboards.' },
                  { id: 'use-4', t: 'Analytics & Scaling: Tracking dashboard speeds to automatically optimize server response.' }
                ].map((item, idx) => (
                  <li key={item.id} style={{ display: 'flex', gap: '12px', fontSize: '16px', fontWeight: 500 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FF9431', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '4px' }}>{idx + 1}</div>
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="types" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>3. Types of Cookies We Use</h2>
            <p>
              We run a structured system dividing browser cookies into three explicit layers:
            </p>
            <div style={{ display: 'grid', gap: '20px', marginTop: '24px' }}>
              <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                <Lock size={20} color="#FF9431" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 950, marginBottom: '8px', color: '#0f172a' }}>Essential & Security Cookies</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55 }}>Strictly necessary to protect payments, prevent profile spoofing, and verify creator sessions. These cannot be disabled manually without breaking the portal functionality.</p>
              </div>
              <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                <Settings size={20} color="#FF9431" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 950, marginBottom: '8px', color: '#0f172a' }}>Preference & Customization Cookies</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55 }}>These recall chosen filters, comparison deck selections, and light/dark theme preference states across recurrent sessions.</p>
              </div>
              <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                <Eye size={20} color="#FF9431" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 950, marginBottom: '8px', color: '#0f172a' }}>Analytical & Performance Metrics</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55 }}>Helps us measure page speed, track regional onboarding rates, and understand which parts of the creator marketplace require upgrade.</p>
              </div>
            </div>
          </div>

          <div id="preferences" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>4. Manage Preferences</h2>
            <p>
              You maintain full authority to control cookies. Most browsers permit you to reject or wipe cookies via your local settings panel:
            </p>
            <ul style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#FF9431" style={{ flexShrink: 0 }} /> Chrome: Settings &gt; Privacy and Security &gt; Cookies and other site data.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#FF9431" style={{ flexShrink: 0 }} /> Safari: Preferences &gt; Privacy &gt; Block all cookies.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#FF9431" style={{ flexShrink: 0 }} /> Firefox: Options &gt; Privacy &gt; Browser Privacy.</li>
            </ul>
            <p style={{ marginTop: '20px', fontSize: '15px', color: '#64748b', fontWeight: 500 }}>
              *Note: Wiping essential cookies will terminate your active logged-in dashboard session and reset any unsaved brand-scouting compare tables.
            </p>
          </div>

          <div id="updates" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>5. Policy Updates</h2>
            <p>
              We reserve the authority to update this Cookie Policy recurrently as technology, legislative mandates, and internal compliance matrices evolve. 
            </p>
            <p style={{ marginTop: '16px' }}>
              Whenever modifications occur, we will adjust the date flag at the bottom of the portal page and show a localized platform notification badge.
            </p>
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
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Sparkles size={200} color="#FF9431" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <Settings size={48} color="#FF9431" style={{ marginBottom: '24px' }} />
               <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Your Data, Your Logic</h3>
               <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                 We respect privacy directives and the Indian DPDP protection matrices. No user information is stored without express system utility.
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
            <span>Ecosystem: Tracking Protocol v3.1</span>
            <span>•</span>
            <span>© 2026 CreatorBharat</span>
         </div>
      </footer>
    </div>
  );
}
