import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Seo from '@/components/common/SEO';
import { useApp } from '@/core/context';
import { 
  Mail, 
  MessageCircle, 
  CheckCircle2,
  Target,
  Globe,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  User,
  Briefcase,
  Zap,
  ChevronDown,
  BarChart3,
  ShieldAlert,
  Rocket,
  Download
} from 'lucide-react';
import { Btn, Card, Bdg, Modal } from '@/components/common/Primitives';
import { LinkedinIcon } from '../../components/icons/SocialIcons';

/**
 * SENIOR DEV NOTE: 
 * ContactPage v3.1 - Elite SaaS Concierge.
 * Refactored into modular sub-components to optimize maintainability and resolve cognitive complexity.
 */

// --- SUB-COMPONENTS ---

const AdvantageCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ padding: '32px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}
  >
    <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', marginBottom: '20px' }}>
      <Icon size={24} />
    </div>
    <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{title}</h4>
    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{desc}</p>
  </motion.div>
);

AdvantageCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number
};

const ContactMethodCard = ({ icon: Icon, title, value, sub, delay = 0, mob }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{ background: '#fff', padding: mob ? '20px' : '28px', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', gap: '16px', alignItems: 'center' }}
    whileHover={{ x: 10, borderColor: '#FF9431', boxShadow: '0 10px 30px rgba(255, 148, 49, 0.05)' }}
  >
    <div style={{ width: '52px', height: '52px', background: '#FF943110', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9431', flexShrink: 0 }}>
      <Icon size={24} />
    </div>
    <div style={{ overflow: 'hidden' }}>
      <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{title}</div>
      <div style={{ fontSize: mob ? '15px' : '16px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{sub}</div>
    </div>
  </motion.div>
);

ContactMethodCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sub: PropTypes.string,
  delay: PropTypes.number,
  mob: PropTypes.bool
};

const SuccessMessage = ({ onReset, mob }) => (
  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: mob ? '20px 0' : '40px 0' }}>
    <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 32px' }}>
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', inset: 0, border: '2px dashed #10B981', borderRadius: '50%', opacity: 0.2 }} />
      <div style={{ position: 'absolute', inset: 10, background: '#10B98115', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
          <CheckCircle2 size={48} strokeWidth={2.5} />
      </div>
    </div>
    <h2 style={{ fontSize: mob ? '28px' : '36px', fontWeight: 950, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>Transmission Successful</h2>
    <p style={{ color: '#64748b', fontSize: mob ? '16px' : '18px', lineHeight: 1.6, marginBottom: '40px', fontWeight: 500, maxWidth: '400px', margin: '0 auto 40px' }}>
      Humne aapka message secure portal ke through receive kar liya hai. Humari elite team aapse jald hi connect karegi.
    </p>
    <Btn lg onClick={onReset} style={{ background: '#f1f5f9', color: '#475569', borderRadius: '100px', fontWeight: 900 }}>Send Another Message</Btn>
  </motion.div>
);

SuccessMessage.propTypes = {
  onReset: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

const ContactHero = ({ mob }) => (
  <section style={{ background: '#050505', padding: mob ? '120px 20px 80px' : '180px 24px 140px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.15), transparent 70%)', opacity: 0.8 }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 20px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <Zap size={14} color="#FF9431" fill="#FF9431" />
        <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Concierge Service Active</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(42px, 10vw, 96px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.06em', lineHeight: 0.9 }}>
        How Can We <br /><span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Assist You?</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: mob ? '16px' : '20px', color: 'rgba(255, 255, 255, 0.5)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
        Bhilwara se Bangalore tak, Bharat ke har creator aur brand ki success hamari priority hai. Aapka message hamare liye "Elite" priority hai.
      </motion.p>
    </div>
  </section>
);

const ContactFormUI = ({ role, setRole, mob, formState, setFormState, formData, setFormData, handleSubmit }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: mob ? '32px' : '48px', padding: mob ? '28px' : '56px', boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <SuccessMessage onReset={() => setFormState('idle')} mob={mob} />
      ) : (
        <div key="form-ui">
           <div style={{ marginBottom: '40px' }}>
              <Bdg color="orange" sm>STEP 1: SELECT YOUR ROLE</Bdg>
              <h2 style={{ fontSize: mob ? '24px' : '32px', fontWeight: 950, color: '#0f172a', marginTop: '12px', letterSpacing: '-0.02em' }}>Who are you?</h2>
           </div>
           <LayoutGroup>
             <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', background: '#f8fafc', padding: '8px', borderRadius: '100px', width: 'fit-content' }}>
                {[
                  { id: 'creator', label: 'I am a Creator', icon: User },
                  { id: 'brand', label: 'I am a Brand', icon: Briefcase }
                ].map((t) => (
                  <button key={t.id} onClick={() => setRole(t.id)} style={{ position: 'relative', padding: mob ? '12px 20px' : '14px 28px', borderRadius: '100px', border: 'none', background: 'transparent', color: role === t.id ? '#0f172a' : '#94a3b8', fontSize: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1 }}>
                    {role === t.id && <motion.div layoutId="activeRole" style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: '100px', zIndex: -1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />}
                    <t.icon size={16} color={role === t.id ? '#FF9431' : '#cbd5e1'} />
                    {t.label}
                  </button>
                ))}
             </div>
           </LayoutGroup>
           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                   <label htmlFor="full-name" style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', marginLeft: '4px' }}>Full Name</label>
                   <input id="full-name" required type="text" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '18px 24px', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                </div>
                <div className="input-group">
                   <label htmlFor="email-address" style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', marginLeft: '4px' }}>Email Address</label>
                   <input id="email-address" required type="email" placeholder="rahul@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '18px 24px', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                </div>
              </div>
              <div className="input-group">
                 <label htmlFor="subject-select" style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', marginLeft: '4px' }}>Subject</label>
                 <div style={{ position: 'relative' }}>
                    <select id="subject-select" style={{ width: '100%', padding: '18px 24px', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, appearance: 'none', outline: 'none' }} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                       {role === 'creator' ? (
                         <><option>Creator Verification Query</option><option>Payment Issue</option><option>Elite Score Feedback</option><option>General Support</option></>
                       ) : (
                         <><option>Brand Campaign Inquiry</option><option>Bulk Talent Acquisition</option><option>Enterprise Platform Demo</option><option>API & Integration</option></>
                       )}
                    </select>
                    <ChevronDown size={20} color="#cbd5e1" style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                 </div>
              </div>
              <div className="input-group">
                 <label htmlFor="message-area" style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', marginLeft: '4px' }}>Your Message</label>
                 <textarea id="message-area" required rows={5} placeholder="Tell us how we can help you grow..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '18px 24px', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, outline: 'none', resize: 'none' }} />
              </div>
              <Btn full lg type="submit" disabled={formState === 'loading'} style={{ padding: '24px', borderRadius: '100px', background: '#0f172a', color: '#fff', fontSize: '18px', fontWeight: 950, marginTop: '12px' }}>
                {formState === 'loading' ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Zap size={24} /></motion.div> : <>{'Send Message'} <ArrowRight size={22} /></>}
              </Btn>
           </form>
        </div>
      )}
    </AnimatePresence>
  </motion.div>
);

// --- MAIN COMPONENT ---

export default function ContactPage() {
  const { dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [role, setRole] = useState('creator');
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showDataModal, setShowDataModal] = useState(false);
  const [dataKitLoading, setDataKitLoading] = useState(false);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      dsp({ t: 'TOAST', d: { t: 'Message sent successfully!', type: 'success' } });
    }, 1800);
  };

  const handleDataKitSubmit = (e) => {
    e.preventDefault();
    setDataKitLoading(true);
    setTimeout(() => {
      setDataKitLoading(false);
      setShowDataModal(false);
      dsp({ t: 'TOAST', d: { t: 'Data Kit will be sent to your email!', type: 'success' } });
    }, 2000);
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden', paddingBottom: '120px' }}>
      <Seo title="Concierge Support | CreatorBharat" description="Connect with India's most advanced creator ecosystem support team." keywords="contact us, support, brand help, creator support" />
      
      <ContactHero mob={mob} />

      <section style={{ padding: mob ? '0 16px' : '0 24px', marginTop: mob ? '-40px' : '-80px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: mob ? '32px' : '64px', alignItems: 'start' }}>
          
          <ContactFormUI role={role} setRole={setRole} mob={mob} formState={formState} setFormState={setFormState} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginLeft: '8px' }}>Direct Communication</div>
             <ContactMethodCard icon={Mail} title="Support Inbox" value="support@creatorbharat.in" sub="Quick resolutions 24/7" delay={0.1} mob={mob} />
             <ContactMethodCard icon={LinkedinIcon} title="Brand Partnerships" value="solutions@creatorbharat.in" sub="Direct channel for agencies" delay={0.2} mob={mob} />
             <ContactMethodCard icon={MessageCircle} title="WhatsApp Concierge" value="+91 9999-000000" sub="Mon-Fri, 10am to 7pm" delay={0.3} mob={mob} />
             <ContactMethodCard icon={Building2} title="Global HQ" value="Bhilwara, Rajasthan" sub="The heart of creator economy" delay={0.4} mob={mob} />

             <Card style={{ padding: mob ? '32px' : '40px', borderRadius: '32px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Sparkles size={150} /></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <Target size={22} strokeWidth={3} /><span style={{ fontWeight: 950, fontSize: '18px', letterSpacing: '-0.02em' }}>Press & Data Request</span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>Are you a journalist or researcher? Get access to our latest data reports on Bharat's creators.</p>
                  <Btn full onClick={() => setShowDataModal(true)} style={{ background: '#fff', color: '#EA580C', borderRadius: '100px', fontWeight: 950, padding: '14px' }}>Request Data Kit</Btn>
                </div>
             </Card>

             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '12px', opacity: 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#94a3b8' }}><ShieldCheck size={14} /> SECURE PORTAL</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#94a3b8' }}><Globe size={14} /> NATIONAL REACH</div>
             </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '120px auto 0', padding: mob ? '0 20px' : '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Bdg color="orange">THE ADVANTAGE</Bdg>
          <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.04em' }}>Why Trust CreatorBharat?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
          <AdvantageCard icon={BarChart3} title="Real-Time Analytics" desc="Track campaign performance as it happens. Our dashboard provides live data on impressions, reach, and conversion metrics." delay={0.1} />
          <AdvantageCard icon={ShieldAlert} title="Bot Protection" desc="Every creator is audited using our proprietary Elite Score algorithm to ensure 100% authentic audience engagement." delay={0.2} />
          <AdvantageCard icon={Rocket} title="Mission Driven" desc="We are on a mission to empower the next billion creators from every corner of Bharat, from Bhilwara to Bangalore." delay={0.3} />
        </div>
      </section>

      <Modal open={showDataModal} onClose={() => setShowDataModal(false)} title="Request Premium Data Kit">
        <form onSubmit={handleDataKitSubmit} style={{ padding: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>Please provide your business details. Our team will verify and send the '2024 Creator Economy Insights' report to your inbox.</p>
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

ContactHero.propTypes = { mob: PropTypes.bool };
ContactFormUI.propTypes = { 
  role: PropTypes.string.isRequired, setRole: PropTypes.func.isRequired, mob: PropTypes.bool,
  formState: PropTypes.string.isRequired, setFormState: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired, setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
