import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Mail, CheckCircle2, Zap, ArrowRight, User, Briefcase, ChevronDown, Target, MessageSquare } from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';


export const AdvantageCard = ({ icon: Icon, title, desc, delay }) => (
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
    <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px', fontFamily: "'Outfit', sans-serif" }}>{title}</h4>
    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{desc}</p>
  </motion.div>
);

AdvantageCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number
};

export const ContactMethodCard = ({ icon: Icon, title, value, sub, delay = 0, mob, link }) => {
  const [hovered, setHovered] = useState(false);
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        background: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(20px)',
        padding: mob ? '20px' : '28px', 
        borderRadius: '24px', 
        border: '1.5px solid rgba(241, 245, 249, 0.8)', 
        display: 'flex', 
        gap: '18px', 
        alignItems: 'center',
        cursor: link ? 'pointer' : 'default'
      }}
      whileHover={{ x: 10, borderColor: '#FF9431', boxShadow: '0 20px 40px rgba(255, 148, 49, 0.06)' }}
    >
      <motion.div 
        animate={{ 
          scale: hovered ? 1.15 : 1,
          rotate: hovered ? 5 : 0,
          backgroundColor: hovered ? 'rgba(255, 148, 49, 0.15)' : 'rgba(255, 148, 49, 0.08)'
        }}
        style={{ 
          width: '56px', 
          height: '56px', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#FF9431', 
          flexShrink: 0 
        }}
      >
        <Icon size={26} />
      </motion.div>
      <div style={{ overflow: 'hidden', textAlign: 'left' }}>
        <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px', fontFamily: "'Outfit', sans-serif" }}>{title}</div>
        <div style={{ fontSize: mob ? '15px' : '17px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "'Outfit', sans-serif" }}>{value}</div>
        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{sub}</div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel={link.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none', display: 'block' }}>
        {cardContent}
      </a>
    );
  }
  return cardContent;
};

ContactMethodCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sub: PropTypes.string,
  delay: PropTypes.number,
  mob: PropTypes.bool,
  link: PropTypes.string
};

export const SuccessMessage = ({ onReset, mob }) => (
  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: mob ? '20px 0' : '40px 0' }}>
    <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 32px' }}>
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', inset: 0, border: '2px dashed #10B981', borderRadius: '50%', opacity: 0.2 }} />
      <div style={{ position: 'absolute', inset: 10, background: '#10B98115', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
          <CheckCircle2 size={48} strokeWidth={2.5} />
      </div>
    </div>
    <h2 style={{ fontSize: mob ? '28px' : '36px', fontWeight: 950, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>Transmission Successful</h2>
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

export const ContactHero = ({ mob }) => (
  <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: mob ? '90px 20px 60px' : '130px 24px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.04), transparent 70%)', opacity: 0.8 }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #e2e8f0, #10B981)' }} />
    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 148, 49, 0.08)', padding: '10px 20px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255, 148, 49, 0.2)' }}>
        <Zap size={14} color="#FF9431" fill="#FF9431" />
        <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Outfit', sans-serif" }}>Concierge Service Active</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(42px, 10vw, 96px)', fontWeight: 950, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.06em', lineHeight: 0.9, fontFamily: "'Outfit', sans-serif" }}>
        How Can We <br /><span style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Assist You?</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: mob ? '16px' : '20px', color: '#475569', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
        Bhilwara se Bangalore tak, Bharat ke har creator aur brand ki success hamari priority hai. Aapka message hamare liye "Elite" priority hai.
      </motion.p>
    </div>
  </section>
);

ContactHero.propTypes = { mob: PropTypes.bool };

export const RoleSelectTabs = ({ role, setRole, mob }) => (
  <LayoutGroup>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', background: '#f8fafc', padding: '8px', borderRadius: '100px', width: 'fit-content' }}>
       {[
         { id: 'creator', label: 'I am a Creator', icon: User },
         { id: 'brand', label: 'I am a Brand', icon: Briefcase }
       ].map((t) => (
         <button type="button" key={t.id} onClick={() => setRole(t.id)} style={{ position: 'relative', padding: mob ? '12px 20px' : '14px 28px', borderRadius: '100px', border: 'none', background: 'transparent', color: role === t.id ? '#0f172a' : '#94a3b8', fontSize: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1, fontFamily: "'Outfit', sans-serif" }}>
           {role === t.id && <motion.div layoutId="activeRole" style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: '100px', zIndex: -1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />}
           <t.icon size={16} color={role === t.id ? '#FF9431' : '#cbd5e1'} />
           {t.label}
         </button>
       ))}
    </div>
  </LayoutGroup>
);

RoleSelectTabs.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

export const FormInputFields = ({ role, mob, formState, formData, setFormData, handleSubmit, shake }) => {
  const isValidEmail = !formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isMessageTooLong = formData.message.length > 1000;
  
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
         <div className="input-group">
            <label htmlFor="full-name" style={{ ...labelStyle, display: 'flex', alignItems: 'center' }}>
              <User size={13} style={{ marginRight: '6px' }} /> Full Name
            </label>
            <input 
              id="full-name" 
              required 
              type="text" 
              placeholder="e.g. Rahul Sharma" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className={`premium-input ${shake && !formData.name ? 'shake-field' : ''}`} 
              style={inputStyle} 
            />
         </div>
         <div className="input-group">
            <label htmlFor="email-address" style={{ ...labelStyle, display: 'flex', alignItems: 'center' }}>
              <Mail size={13} style={{ marginRight: '6px' }} /> Email Address
            </label>
            <input 
              id="email-address" 
              required 
              type="email" 
              placeholder="rahul@example.com" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className={`premium-input ${shake && !formData.email ? 'shake-field' : ''} ${!isValidEmail ? 'error-field' : ''}`} 
              style={{
                ...inputStyle,
                borderColor: !isValidEmail ? '#f43f5e' : '#f1f5f9'
              }} 
            />
            {!isValidEmail && (
              <div style={{ fontSize: '11px', color: '#f43f5e', marginTop: '6px', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                Please enter a valid email address
              </div>
            )}
         </div>
       </div>
       <div className="input-group">
          <label htmlFor="subject-select" style={{ ...labelStyle, display: 'flex', alignItems: 'center' }}>
            <Target size={13} style={{ marginRight: '6px' }} /> Subject
          </label>
          <div style={{ position: 'relative' }}>
             <select 
               id="subject-select" 
               className="premium-select"
               style={{ ...inputStyle, appearance: 'none' }} 
               onChange={(e) => setFormData({...formData, subject: e.target.value})} 
               value={formData.subject}
             >
                {role === 'creator' ? (
                  <><option value="Creator Verification Query">Creator Verification Query</option><option value="Payment Issue">Payment Issue</option><option value="Elite Score Feedback">Elite Score Feedback</option><option value="General Support">General Support</option></>
                ) : (
                  <><option value="Brand Campaign Inquiry">Brand Campaign Inquiry</option><option value="Bulk Talent Acquisition">Bulk Talent Acquisition</option><option value="Enterprise Platform Demo">Enterprise Platform Demo</option><option value="API & Integration">API & Integration</option></>
                )}
             </select>
             <ChevronDown size={20} color="#cbd5e1" style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
       </div>
       <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label htmlFor="message-area" style={{ ...labelStyle, display: 'flex', alignItems: 'center', marginBottom: 0 }}>
              <MessageSquare size={13} style={{ marginRight: '6px' }} /> Your Message
            </label>
            <span style={{ fontSize: '11px', color: isMessageTooLong ? '#f43f5e' : '#94a3b8', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              {formData.message.length} / 1000
            </span>
          </div>
          <textarea 
            id="message-area" 
            required 
            rows={5} 
            maxLength={1050}
            placeholder="Tell us how we can help you grow..." 
            value={formData.message} 
            onChange={(e) => setFormData({...formData, message: e.target.value})} 
            className={`premium-input ${shake && !formData.message ? 'shake-field' : ''} ${isMessageTooLong ? 'error-field' : ''}`} 
            style={{ 
              ...inputStyle, 
              resize: 'none',
              borderColor: isMessageTooLong ? '#f43f5e' : '#f1f5f9'
            }} 
          />
       </div>
       <Btn 
         full 
         lg 
         type="submit" 
         disabled={formState === 'loading' || !isValidEmail || isMessageTooLong} 
         style={{ padding: '24px', borderRadius: '100px', background: '#0f172a', color: '#fff', fontSize: '18px', fontWeight: 950, marginTop: '12px' }}
       >
         {formState === 'loading' ? (
           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Zap size={24} /></motion.div>
         ) : (
           <>{'Send Message'} <ArrowRight size={22} /></>
         )}
       </Btn>
    </form>
  );
};

FormInputFields.propTypes = {
  role: PropTypes.string.isRequired,
  mob: PropTypes.bool,
  formState: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  shake: PropTypes.bool
};

export const ContactFormUI = ({ role, setRole, mob, formState, setFormState, formData, setFormData, handleSubmit, shake }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(20px)', borderRadius: mob ? '32px' : '48px', padding: mob ? '28px' : '56px', boxShadow: '0 40px 100px rgba(0,0,0,0.04)', border: '1.5px solid rgba(241, 245, 249, 0.8)' }}>

    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <SuccessMessage onReset={() => setFormState('idle')} mob={mob} />
      ) : (
        <div key="form-ui">
           <div style={{ marginBottom: '40px' }}>
              <Bdg color="orange" sm>STEP 1: SELECT YOUR ROLE</Bdg>
              <h2 style={{ fontSize: mob ? '24px' : '32px', fontWeight: 950, color: '#0f172a', marginTop: '12px', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>Who are you?</h2>
           </div>
           <RoleSelectTabs role={role} setRole={setRole} mob={mob} />
           <FormInputFields role={role} mob={mob} formState={formState} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} shake={shake} />
        </div>
      )}
    </AnimatePresence>
  </motion.div>
);

ContactFormUI.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  formState: PropTypes.string.isRequired,
  setFormState: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  shake: PropTypes.bool
};

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 900,
  color: '#94a3b8',
  textTransform: 'uppercase',
  marginBottom: '8px',
  marginLeft: '4px',
  fontFamily: "'Outfit', sans-serif"
};

const inputStyle = {
  width: '100%',
  padding: '18px 24px',
  borderRadius: '16px',
  border: '2px solid #f1f5f9',
  background: '#fcfcfc',
  fontSize: '16px',
  fontWeight: 600,
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};
