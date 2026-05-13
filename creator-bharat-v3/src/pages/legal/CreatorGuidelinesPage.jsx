import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  ChevronRight,
  BookOpen,
  Target,
  MessageSquare,
  Award
} from 'lucide-react';
import { Bdg, Btn } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

/**
 * THEME: CreatorBharat Elite Documentation
 * Layout: Side-Nav Editorial
 */

const SECTIONS = [
  { id: 'mission', title: 'The Elite Mission', icon: Target },
  { id: 'authenticity', title: 'Authenticity & Data', icon: ShieldCheck },
  { id: 'comms', title: 'Communication Protocol', icon: MessageSquare },
  { id: 'quality', title: 'Deliverable Standards', icon: Award },
  { id: 'deadlines', title: 'The Deadline Pact', icon: Zap },
  { id: 'violations', title: 'System Violations', icon: AlertTriangle },
];

export default function CreatorGuidelinesPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('mission');
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
        title="Creator Guidelines | The Bharat Protocol"
        description="Review the professional standards and guidelines for creators on the CreatorBharat platform. Build trust and scale your influence."
        keywords="creator guidelines, influencer standards, elite creator policy, brand deal etiquette"
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
             <Bdg color="orange" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>PROFESSIONAL PROTOCOL</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px'
             }}>
               Creator <span style={{ fontStyle: 'italic', color: '#FF9431' }}>Guidelines.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
               Maintaining the "Elite" status of Bharat\'s largest talent ecosystem through discipline and excellence.
             </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mob ? '40px 20px' : '80px 24px', display: 'grid', gridTemplateColumns: mob ? '1fr' : '300px 1fr', gap: '80px', alignItems: 'start' }}>
        
        {/* Sticky Sidebar */}
        {!mob && (
          <aside style={{ position: 'sticky', top: '120px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>DOCUMENT SECTIONS</div>
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
                  {activeSection === s.id && <motion.div layoutId="doc-indicator" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <BookOpen size={24} color="#FF9431" style={{ marginBottom: '16px' }} />
               <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Need Clarification?</h4>
               <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>Our compliance team is available 24/7 for Elite creators.</p>
               <Btn full sm style={{ background: '#0f172a', color: '#fff' }}>Contact Concierge</Btn>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
          
          <div id="mission" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>1. The Elite Mission</h2>
            <p>
              CreatorBharat is not just a marketplace; it is a **Protocol of Excellence**. To maintain the "Elite" status, we expect all creators to act as professional partners rather than just content producers. 
            </p>
            <p style={{ marginTop: '20px' }}>
              Your **Elite Score** is a direct reflection of your adherence to these guidelines. A high score unlocks lower service fees, higher-ticket brand deals, and priority placement in the discovery grid.
            </p>
          </div>

          <div id="authenticity" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>2. Authenticity & Data Integrity</h2>
            <p>
              Your profile must represent your real identity and organic reach. We use AI-driven audit nodes to verify engagement quality.
            </p>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', marginTop: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                {[
                  'Disclose all sponsored content as per ASCI & Government guidelines.',
                  'Zero tolerance for fake followers, bot engagement, or pods.',
                  'Keep your city and demographic data accurate for regional matching.',
                  'Maintain at least 80% organic content ratio on your main feed.'
                ].map((item, i) => (
                  <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '16px', fontWeight: 500 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FF9431', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '4px' }}>{i+1}</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="comms" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>3. Communication Protocol</h2>
            <p>
              Brands value fast and clear communication. The difference between a "Pro" and an "Elite" creator is their responsiveness.
            </p>
            <p style={{ marginTop: '20px' }}>
              All deal inquiries must be acknowledged within **24-48 hours**. Failure to respond to 3 consecutive inquiries will lead to automatic profile throttling in the discovery algorithm.
            </p>
          </div>

          <div id="quality" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>4. Deliverable Standards</h2>
            <p>
              Content must meet the "Elite Aesthetic" standard of the platform. This means high-resolution visuals, clear audio, and adherence to the brand\'s creative brief.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '24px' }}>
               <div style={{ padding: '24px', background: '#ecfdf5', borderRadius: '20px', border: '1px solid #d1fae5' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#065f46', textTransform: 'uppercase', marginBottom: '12px' }}>Elite Standard (Do)</h4>
                  <ul style={{ fontSize: '14px', color: '#065f46', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Shoot in 4K/60fps whenever possible</li>
                    <li>Use natural or studio lighting</li>
                    <li>Add captions for accessibility</li>
                    <li>Keep brand products in clear focus</li>
                  </ul>
               </div>
               <div style={{ padding: '24px', background: '#fef2f2', borderRadius: '20px', border: '1px solid #fee2e2' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#991b1b', textTransform: 'uppercase', marginBottom: '12px' }}>Common Mistakes (Avoid)</h4>
                  <ul style={{ fontSize: '14px', color: '#991b1b', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Blurry or shaky handheld footage</li>
                    <li>Background noise in audio</li>
                    <li>Overpowering filters that hide product</li>
                    <li>Plagiarizing other creators\' concepts</li>
                  </ul>
               </div>
            </div>
          </div>

          <div id="deadlines" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>5. The Deadline Pact</h2>
            <p>
              In the elite world, **Time is Currency**. Missing a deadline without 72-hour prior notice is considered a critical breach of trust.
            </p>
            <p style={{ marginTop: '20px' }}>
              Delayed submissions lead to a **-15 point** hit on your Elite Score instantly. 3 delayed missions will result in a 30-day "Shadow Lock" on your marketplace visibility.
            </p>
          </div>

          <div id="violations" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>6. System Violations</h2>
            <p>
              To protect the community, we have a zero-tolerance policy for certain actions:
            </p>
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {[
                 { t: 'Payment Bypassing', d: 'Asking brands to pay outside the CreatorBharat Escrow system.' },
                 { t: 'Harassment', d: 'Unprofessional behavior or toxic communication with brand managers.' },
                 { t: 'Metric Fraud', d: 'Using third-party apps to simulate engagement on your linked channels.' }
               ].map((v) => (
                 <div key={v.t} style={{ padding: '24px', border: '1.5px solid #f1f5f9', borderRadius: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0 }} />
                    <div>
                       <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{v.t}</h4>
                       <p style={{ fontSize: '14px', color: '#64748b' }}>{v.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Bottom CTA */}
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
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Zap size={200} color="#FF9431" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Ready to Scale?</h3>
               <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                 By using CreatorBharat, you agree to these standards. Excellence is the only way forward.
               </p>
               <Btn lg onClick={() => navigate('/login')} style={{ background: '#FF9431', color: '#000', borderRadius: '100px', fontWeight: 900, padding: '18px 48px' }}>I Understand & Agree</Btn>
            </div>
          </section>

        </main>
      </div>

      {/* Footer Meta */}
      <footer style={{ padding: '40px 20px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.4, fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Version 3.2.1</span>
            <span>•</span>
            <span>Compliance Node: IN-RAJ-01</span>
            <span>•</span>
            <span>© 2026 CreatorBharat</span>
         </div>
      </footer>
    </div>
  );
}
