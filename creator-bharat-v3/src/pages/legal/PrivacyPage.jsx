import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Eye, 
  Lock, 
  Database, 
  UserCheck, 
  Globe,
  ChevronRight
} from 'lucide-react';
import { Bdg, Btn } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'collection', title: 'Data Collection', icon: Database },
  { id: 'usage', title: 'Usage Protocol', icon: Eye },
  { id: 'sharing', title: 'Sharing Policy', icon: Globe },
  { id: 'security', title: 'Security Nodes', icon: Lock },
  { id: 'rights', title: 'Your Rights', icon: UserCheck },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('collection');
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
        title="Privacy Policy | The Bharat Protocol"
        description="Learn how CreatorBharat protects your data and privacy. We are committed to transparency and security for all users."
        keywords="privacy policy, data protection, creator bharat security"
      />

      {/* Cinematic Hero */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 20px 100px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #fff, #FF9431)' }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Bdg color="green" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>DATA COMPLIANCE</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px'
             }}>
               Privacy <span style={{ fontStyle: 'italic', color: '#10B981' }}>Protocol.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
               Advanced encryption, transparent logic, and absolute respect for your digital identity.
             </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mob ? '40px 20px' : '80px 24px', display: 'grid', gridTemplateColumns: mob ? '1fr' : '300px 1fr', gap: '80px', alignItems: 'start' }}>
        
        {/* Sticky Sidebar */}
        {!mob && (
          <aside style={{ position: 'sticky', top: '120px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>PROTOCOL INDEX</div>
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
                    background: activeSection === s.id ? '#10B98110' : 'transparent',
                    border: 'none',
                    color: activeSection === s.id ? '#10B981' : '#64748b',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: '0.2s'
                  }}
                >
                  <s.icon size={18} />
                  {s.title}
                  {activeSection === s.id && <motion.div layoutId="privacy-indicator" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <Shield size={24} color="#10B981" style={{ marginBottom: '16px' }} />
               <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Safe & Secure</h4>
               <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>Your data is encrypted using AES-256 standards at every node.</p>
               <Btn full sm style={{ background: '#0f172a', color: '#fff' }}>DPO Contact</Btn>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
          
          <div id="collection" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>1. Data Collection</h2>
            <p>
              We only collect data that is essential for maintaining the integrity of the **Elite Talent Discovery** system. This includes information you provide directly and automated technical metadata.
            </p>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', marginTop: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                {[
                  { id: 'id-1', t: 'Identity: Name, professional handle, and regional location.' },
                  { id: 'id-2', t: 'Ecosystem: Social media metrics and public audience demographics.' },
                  { id: 'id-3', t: 'Commercial: Payout bank details and tax (GST) information.' },
                  { id: 'id-4', t: 'Behavioral: Interaction data within the Deal Desk and Dashboard.' }
                ].map((item, idx) => (
                  <li key={item.id} style={{ display: 'flex', gap: '12px', fontSize: '16px', fontWeight: 500 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '4px' }}>{idx + 1}</div>
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="usage" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>2. Usage Protocol</h2>
            <p>
              Your information is processed to power the **CreatorBharat discovery engine**. We use AI algorithms to calculate Elite Scores and match creators with relevant brand campaigns.
            </p>
            <p style={{ marginTop: '20px' }}>
              We **never** use your private contact details for unsolicited marketing. Your data stays within the secure perimeter of our internal cloud infrastructure.
            </p>
          </div>

          <div id="sharing" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>3. Sharing Policy</h2>
            <p>
              Transparency is our core value. We do not sell your personal data to third-party advertisers. 
            </p>
            <div style={{ marginTop: '24px', padding: '24px', background: '#ecfdf5', borderRadius: '20px', border: '1px solid #d1fae5' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#065f46', textTransform: 'uppercase', marginBottom: '12px' }}>Public vs Private Data</h4>
               <ul style={{ fontSize: '14px', color: '#065f46', paddingLeft: '20px', lineHeight: 1.6 }}>
                 <li>Public: Your handle, bio, city, and general audience reach.</li>
                 <li>Private: Email, phone number, and bank details (only shared during active deals).</li>
                 <li>Encrypted: Identity documents used for Elite verification.</li>
               </ul>
            </div>
          </div>

          <div id="security" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>4. Security Nodes</h2>
            <p>
              We implement enterprise-grade security protocols. Every data packet is protected by industrial-strength encryption.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '24px' }}>
               <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                  <Lock size={20} color="#10B981" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>AES-256 Encryption</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>All commercial and identity data is stored in air-gapped secure nodes.</p>
               </div>
               <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                  <Clock size={20} color="#10B981" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>24/7 Monitoring</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>Real-time threat detection and automated protocol lockdowns.</p>
               </div>
            </div>
          </div>

          <div id="rights" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>5. Your Rights</h2>
            <p>
              As a user of the Bharat Protocol, you have full control over your digital footprint:
            </p>
            <ul style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#10B981" style={{ flexShrink: 0 }} /> Right to access and download your complete data profile.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#10B981" style={{ flexShrink: 0 }} /> Right to rectify or update your commercial information.</li>
               <li style={{ display: 'flex', gap: '10px', fontSize: '16px' }}><ChevronRight size={18} color="#10B981" style={{ flexShrink: 0 }} /> Right to be forgotten (permanent account termination).</li>
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
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Shield size={200} color="#10B981" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <Eye size={48} color="#10B981" style={{ marginBottom: '24px' }} />
               <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Absolute Transparency</h3>
               <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                 Your privacy is our priority. We are fully compliant with the Indian DPDP Act and international security standards.
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
            <span>Compliance: DPDP-IN-2024</span>
            <span>•</span>
            <span>© 2026 CreatorBharat</span>
         </div>
      </footer>
    </div>
  );
}
