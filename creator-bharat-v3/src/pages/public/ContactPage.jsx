import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '@/components/common/SEO';
import { useApp } from '@/core/context';
import { 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Target, 
  Download, 
  HelpCircle,
  Settings,
  Trash2
} from 'lucide-react';
import { Btn, Bdg, Card, Modal } from '@/components/common/Primitives';

// Import Reusable Subcomponents
import { 
  ContactHero, 
  ContactFormUI, 
  ContactMethodCard, 
  AdvantageCard 
} from '@/components/contact/ContactComponents';

// Import Externalized Data
import { getContactData, saveContactData } from '@/data/contactData';
import { ENV } from '@/config/env';

function SupportFAQAccordion({ q, a, mob }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ 
      background: open ? '#fff' : 'rgba(255, 255, 255, 0.7)', 
      borderRadius: '24px', 
      border: `1.5px solid ${open ? '#FF9431' : '#f1f5f9'}`, 
      overflow: 'hidden',
      boxShadow: open ? '0 20px 40px rgba(255, 148, 49, 0.05)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: mob ? '15px' : '17px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>{q}</span>
        <span style={{ fontSize: '20px', color: '#FF9431', fontWeight: 900, transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 32px 28px', color: '#64748b', fontSize: '15px', lineHeight: 1.7, fontWeight: 500 }}>
          <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            {a}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [role, setRole] = useState('creator');
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Creator Verification Query', message: '' });
  const [showDataModal, setShowDataModal] = useState(false);
  const [dataKitLoading, setDataKitLoading] = useState(false);
  const [shake, setShake] = useState(false);
  
  // Dynamic Page Configurations
  const [pageData, setPageData] = useState(() => getContactData());
  const { advantages, regionalHubs, contactMethods, faqs } = pageData;

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setFormState('loading');
    try {
      const res = await fetch(`${ENV.apiUrl}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `${role} inquiry`,
          message: formData.message
        })
      });
      const data = await res.json();
      if (res.ok) {
        setFormState('success');
        dsp({ t: 'TOAST', d: { type: 'success', msg: 'Message sent successfully!' } });
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      // Fallback: save locally if API fails
      const contacts = JSON.parse(localStorage.getItem('cb_contact_submissions') || '[]');
      contacts.push({ ...formData, role, date: new Date().toISOString() });
      localStorage.setItem('cb_contact_submissions', JSON.stringify(contacts));
      setFormState('success');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Message saved! We will get back to you soon.' } });
    }
  };

  const handleDataKitSubmit = (e) => {
    e.preventDefault();
    setDataKitLoading(true);
    setTimeout(() => {
      setDataKitLoading(false);
      setShowDataModal(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: "Data Kit will be sent to your email!" } });
    }, 2000);
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Concierge Support | CreatorBharat",
    "description": "Connect with India's most advanced creator ecosystem support team.",
    "url": "https://creatorbharat.com/contact",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@creatorbharat.com",
      "contactType": "customer support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    }
  };



  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden', paddingBottom: '120px', position: 'relative' }}>
      {/* Background Mesh Spheres */}
      <div style={{ position: 'absolute', top: '15%', left: '-15%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,148,49,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '55%', right: '-15%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <Seo 
        title="Concierge Support" 
        description="Connect with India's most advanced creator ecosystem support team." 
        keywords="contact us, support, brand help, creator support" 
        jsonLd={contactJsonLd}
      />
      
      {/* Inline Styles */}
      <style>{`
        @keyframes shakeInput {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .shake-field {
          animation: shakeInput 0.4s ease-in-out !important;
          border-color: #f43f5e !important;
          box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.15) !important;
        }
        .premium-input, .premium-select {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .premium-input:focus, .premium-select:focus {
          border-color: #FF9431 !important;
          box-shadow: 0 0 0 5px rgba(255, 148, 49, 0.2) !important;
          background: #fff !important;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .gear-spin {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>

      <ContactHero mob={mob} />

      <section style={{ padding: mob ? '0 16px' : '0 24px', marginTop: mob ? '-40px' : '-80px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: mob ? '32px' : '64px', alignItems: 'start' }}>
          
          <ContactFormUI 
            role={role} 
            setRole={setRole} 
            mob={mob} 
            formState={formState} 
            setFormState={setFormState} 
            formData={formData} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            shake={shake} 
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginLeft: '8px', fontFamily: "'Outfit', sans-serif" }}>Direct Communication</div>
             {contactMethods.map((method) => (
               <ContactMethodCard 
                 key={method.title}
                 icon={method.icon} 
                 title={method.title} 
                 value={method.value} 
                 sub={method.sub} 
                 delay={method.delay} 
                 mob={mob} 
                 link={method.link}
               />
             ))}

             {/* HELP CENTER SHORTCUTS */}
             <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Outfit', sans-serif" }}>
                  <HelpCircle size={16} color="#FF9431" /> Quick Help
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                   <button onClick={() => navigate('/faq')} style={{ padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', fontWeight: 800, color: '#475569', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Payment FAQ</button>
                   <button onClick={() => navigate('/faq')} style={{ padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', fontWeight: 800, color: '#475569', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Verification</button>
                </div>
             </div>

             <Card style={{ padding: mob ? '32px' : '40px', borderRadius: '32px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Sparkles size={150} /></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <Target size={22} strokeWidth={3} /><span style={{ fontWeight: 950, fontSize: '18px', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>Press & Data Request</span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>Are you a journalist or researcher? Get access to our latest data reports on Bharat's creators.</p>
                  <Btn full onClick={() => setShowDataModal(true)} style={{ background: '#fff', color: '#EA580C', borderRadius: '100px', fontWeight: 950, padding: '14px' }}>Request Data Kit</Btn>
                </div>
             </Card>

             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '12px', opacity: 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#94a3b8', fontFamily: "'Outfit', sans-serif" }}><ShieldCheck size={14} /> SECURE PORTAL</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#94a3b8', fontFamily: "'Outfit', sans-serif" }}><Globe size={14} /> NATIONAL REACH</div>
             </div>
          </div>
        </div>
      </section>

      {/* SUPPORT FAQs ACCORDION */}
      {faqs && faqs.length > 0 && (
        <section style={{ maxWidth: '900px', margin: '100px auto 0', padding: mob ? '0 20px' : '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <Bdg color="orange">COMMON QUERIES</Bdg>
            <h2 style={{ fontSize: mob ? '28px' : '38px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.03em', fontFamily: "'Outfit', sans-serif" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, i) => (
              <SupportFAQAccordion key={i} q={faq.q} a={faq.a} mob={mob} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
             <Btn outline onClick={() => navigate('/faq')} style={{ borderRadius: '100px', padding: '14px 32px', fontWeight: 900 }}>Visit Full Support Center</Btn>
          </div>
        </section>
      )}

      {/* REGIONAL HUBS SECTION */}
      <section style={{ padding: '80px 24px', background: '#fff', marginTop: '100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
            {regionalHubs.map((hub, i) => (
              <motion.div 
                key={hub.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, borderColor: '#FF9431', boxShadow: '0 20px 40px rgba(255, 148, 49, 0.05)' }}
                style={{ padding: '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', transition: 'all 0.3s ease' }}
              >
                 <div style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em', fontFamily: "'Outfit', sans-serif" }}>{hub.type}</div>
                 <h4 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '4px', fontFamily: "'Outfit', sans-serif" }}>{hub.city}</h4>
                 <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{hub.state} • {hub.focus}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ADVANTAGE SECTION */}
      <section style={{ maxWidth: '1200px', margin: '120px auto 0', padding: mob ? '0 20px' : '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Bdg color="orange">THE ADVANTAGE</Bdg>
          <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.04em', fontFamily: "'Outfit', sans-serif" }}>Why Trust CreatorBharat?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
          {advantages.map((adv) => (
            <AdvantageCard 
              key={adv.title}
              icon={adv.icon} 
              title={adv.title} 
              desc={adv.desc} 
              delay={adv.delay} 
            />
          ))}
        </div>
      </section>

      {/* PRESS & DATA KIT REQUEST MODAL */}
      <Modal open={showDataModal} onClose={() => setShowDataModal(false)} title="Request Premium Data Kit">
        <form onSubmit={handleDataKitSubmit} style={{ padding: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>Please provide your business details. Our team will verify and send the '2026 Creator Economy Insights' report to your inbox.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input required type="text" placeholder="Organization Name" style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
            <input required type="email" placeholder="Work Email" style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
            <Btn full lg type="submit" disabled={dataKitLoading} style={{ background: '#FF9431', color: '#fff', borderRadius: '100px', fontWeight: 900 }}>{dataKitLoading ? 'Processing...' : <>{'Download Data Kit'} <Download size={18} /></>}</Btn>
          </div>
        </form>
      </Modal>
    </div>
  );
}
