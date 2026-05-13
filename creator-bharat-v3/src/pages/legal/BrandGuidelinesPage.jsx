import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  MessageSquare, 
  Briefcase, 
  Star,
  ChevronRight,
  CheckCircle,
  Info
} from 'lucide-react';
import { Bdg, Btn } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'briefing', title: 'Campaign Briefing', icon: Target },
  { id: 'creative', title: 'Creative Freedom', icon: Zap },
  { id: 'payments', title: 'Professional Payments', icon: Briefcase },
  { id: 'feedback', title: 'Feedback Loop', icon: MessageSquare },
  { id: 'rights', title: 'Usage Rights', icon: Star },
];

export default function BrandGuidelinesPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('briefing');
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
        title="Brand Excellence Guidelines | The Bharat Protocol"
        description="Framework for successful collaborations and professional engagement on India's premier creator platform."
        keywords="brand guidelines, influencer marketing policy, brand deal standards"
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
             <Bdg color="orange" sm style={{ marginBottom: '24px', letterSpacing: '2px' }}>BRAND EXCELLENCE</Bdg>
             <h1 style={{ 
               fontFamily: '"Playfair Display", serif', 
               fontSize: 'clamp(40px, 8vw, 72px)', 
               fontWeight: 900, 
               color: '#fff', 
               lineHeight: 1,
               marginBottom: '24px'
             }}>
               Brand <span style={{ fontStyle: 'italic', color: '#FF9431' }}>Protocol.</span>
             </h1>
             <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
               Framework for high-impact collaborations and professional engagement on India\'s premier talent network.
             </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mob ? '40px 20px' : '80px 24px', display: 'grid', gridTemplateColumns: mob ? '1fr' : '300px 1fr', gap: '80px', alignItems: 'start' }}>
        
        {/* Sticky Sidebar */}
        {!mob && (
          <aside style={{ position: 'sticky', top: '120px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>OPERATING MANUAL</div>
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
                  {activeSection === s.id && <motion.div layoutId="brand-indicator" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <Info size={24} color="#FF9431" style={{ marginBottom: '16px' }} />
               <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Campaign Concierge</h4>
               <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>Our Elite Brand Managers can help optimize your creative brief for better ROI.</p>
               <Btn full sm style={{ background: '#0f172a', color: '#fff' }}>Request Manager</Btn>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
          
          <div id="briefing" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>1. Campaign Briefing</h2>
            <p>
              Professional collaboration begins with **absolute clarity**. Brands must provide detailed briefs that outline not just the goals, but the emotional tone and regional context required for the campaign.
            </p>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', marginTop: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', fontSize: '16px' }}><CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '4px' }} /> Outline specific deliverables (Reels, Stories, YouTube Shorts).</li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '16px' }}><CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '4px' }} /> Define "Must-Say" vs "Nice-to-Say" brand attributes.</li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '16px' }}><CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '4px' }} /> Provide high-res brand assets (Logos, HEX codes).</li>
              </ul>
            </div>
          </div>

          <div id="creative" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>2. Creative Freedom</h2>
            <p>
              CreatorBharat is built on **Authentic Influence**. While brand safety is paramount, over-scripting often leads to disengaged content. Trust the creators to interpret your message in their unique voice.
            </p>
            <p style={{ marginTop: '20px' }}>
              Elite Creators know their audience better than any external agency. Give them the freedom to craft stories that resonate organically within their regional community.
            </p>
          </div>

          <div id="payments" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>3. Professional Payments</h2>
            <p>
              The difference between a amateur deal and an **Elite Partnership** is the security of the commercial transaction. 
            </p>
            <div style={{ marginTop: '24px', padding: '24px', background: '#ecfdf5', borderRadius: '20px', border: '1px solid #d1fae5' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#065f46', textTransform: 'uppercase', marginBottom: '12px' }}>Escrow Guarantee</h4>
               <p style={{ fontSize: '14px', color: '#065f46', lineHeight: 1.6 }}>
                 All payments must be processed through the official **Deal Desk**. This protects your budget and ensures creators deliver high-quality work before funds are released.
               </p>
            </div>
          </div>

          <div id="feedback" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>4. Feedback Loop</h2>
            <p>
              Efficiency is king. Brands should provide constructive feedback in a **single consolidated batch** whenever possible. 
            </p>
            <p style={{ marginTop: '20px' }}>
              Standard packages on CreatorBharat include **2 rounds of minor revisions**. Major pivot in creative direction post-production should be compensated fairly.
            </p>
          </div>

          <div id="rights" style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>5. Usage Rights</h2>
            <p>
              Clearly define the usage rights during the briefing phase. Standard deals include social media usage rights for 1 year.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '24px' }}>
               <div style={{ padding: '24px', border: '1.5px solid #f1f5f9', borderRadius: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px' }}>Standard Usage</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>Organic posting on creator channels and brand reposting with credit.</p>
               </div>
               <div style={{ padding: '24px', border: '1.5px solid #f1f5f9', borderRadius: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px' }}>Paid Whitelisting</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>Using creator content for dark ads or third-party boosting (extra fee applies).</p>
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
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Star size={200} color="#FF9431" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Ready to Scale?</h3>
               <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                 Join 500+ premium brands scaling their regional influence in Bharat.
               </p>
               <Btn lg onClick={() => navigate('/login')} style={{ background: '#FF9431', color: '#000', borderRadius: '100px', fontWeight: 900, padding: '18px 48px' }}>Launch Campaign</Btn>
            </div>
          </section>

        </main>
      </div>

      {/* Footer Meta */}
      <footer style={{ padding: '40px 20px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.4, fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Last Updated: May 2026</span>
            <span>•</span>
            <span>© 2026 CreatorBharat Brand Desk</span>
         </div>
      </footer>
    </div>
  );
}
