import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2,
  Target,
  Globe,
  Sparkles,
  ShieldCheck,
  Building2,
  Briefcase as Linkedin
} from 'lucide-react';
import { Btn, Card } from '../../components/Primitives';

const ContactMethodCard = ({ icon: Icon, title, value, sub, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{
      background: '#fff',
      padding: '32px',
      borderRadius: '32px',
      border: '1px solid #f1f5f9',
      display: 'flex',
      gap: '24px',
      alignItems: 'center',
    }}
    whileHover={{ y: -8, borderColor: '#FF9431', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}
  >
    <div style={{ 
      width: '64px', height: '64px', background: '#FF943110', borderRadius: '16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9431', flexShrink: 0
    }}>
      <Icon size={28} />
    </div>
    <div>
      <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>{sub}</div>
    </div>
  </motion.div>
);

ContactMethodCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sub: PropTypes.string,
  delay: PropTypes.number
};

const ContactHero = () => (
  <section style={{ 
    background: '#050505', 
    padding: '180px 24px 100px', 
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.12), transparent 70%)', opacity: 0.8 }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
    
    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '10px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '10px 20px', 
          borderRadius: '100px',
          marginBottom: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
        <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Support is Online</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.06em', lineHeight: 0.9 }}
      >
        How Can We <br />
        <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Assist You?</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}
      >
        Whether you are a creator from Bhilwara or a brand from Bangalore, our mission is to ensure your success on the platform.
      </motion.p>
    </div>
  </section>
);

const ContactChannels = ({ onMediaRequest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <ContactMethodCard icon={Mail} title="Direct Support" value="support@creatorbharat.in" sub="Median response time: 4 hours" delay={0.1} />
    <ContactMethodCard icon={Linkedin} title="Brand Solutions" value="solutions@creatorbharat.in" sub="For agency and large brand queries" delay={0.2} />
    <ContactMethodCard icon={MessageCircle} title="Quick Chat" value="+91 9999-000000" sub="WhatsApp Support (Mon-Fri, 10am-7pm)" delay={0.3} />
    <ContactMethodCard icon={Building2} title="Headquarters" value="Bhilwara, Rajasthan" sub="The heart and soul of Bharat's creation" delay={0.4} />

    <Card style={{ padding: '40px', borderRadius: '40px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Sparkles size={150} /></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Target size={24} strokeWidth={3} />
              <span style={{ fontWeight: 950, fontSize: '20px', letterSpacing: '-0.02em' }}>Press & Media</span>
          </div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '32px' }}>
              Are you writing about Bharat's creator economy? Connect directly with our press team for data and insights.
          </p>
          <Btn full onClick={onMediaRequest} style={{ background: '#fff', color: '#EA580C', borderRadius: '100px', fontWeight: 950 }}>
              Request Media Kit
          </Btn>
        </div>
    </Card>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '20px', opacity: 0.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 900, color: '#94a3b8' }}><ShieldCheck size={16} /> 256-BIT SSL SECURE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 900, color: '#94a3b8' }}><Globe size={16} /> NATIONAL SUPPORT</div>
    </div>
  </div>
);

ContactChannels.propTypes = {
  onMediaRequest: PropTypes.func.isRequired
};

const SuccessMessage = ({ onReset }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{ textAlign: 'center', padding: '40px 0' }}
  >
    <div style={{ width: '100px', height: '100px', background: '#10B98115', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: '#10B981' }}>
        <CheckCircle2 size={64} strokeWidth={2} />
    </div>
    <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>Message Received</h2>
    <p style={{ color: '#64748b', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px', fontWeight: 500 }}>
      Humne aapka inquiry receive kar liya hai. Humari team 4 business hours ke andar aapse connect karegi.
    </p>
    <Btn lg onClick={onReset} style={{ background: '#f8fafc', color: '#64748b', borderRadius: '100px' }}>
        Send Another Message
    </Btn>
  </motion.div>
);

SuccessMessage.propTypes = {
  onReset: PropTypes.func.isRequired
};

const FormContent = ({ tab, setTab, handleSubmit, formState }) => (
  <div key="form">
    <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', background: '#f8fafc', padding: '6px', borderRadius: '100px', width: 'fit-content' }}>
        <button onClick={() => setTab('creator')} style={{ padding: '10px 24px', borderRadius: '100px', border: 'none', background: tab === 'creator' ? '#fff' : 'transparent', color: tab === 'creator' ? '#0f172a' : '#94a3b8', fontSize: '14px', fontWeight: 900, cursor: 'pointer', boxShadow: tab === 'creator' ? '0 5px 15px rgba(0,0,0,0.05)' : 'none' }}>Creator</button>
        <button onClick={() => setTab('brand')} style={{ padding: '10px 24px', borderRadius: '100px', border: 'none', background: tab === 'brand' ? '#fff' : 'transparent', color: tab === 'brand' ? '#0f172a' : '#94a3b8', fontSize: '14px', fontWeight: 900, cursor: 'pointer', boxShadow: tab === 'brand' ? '0 5px 15px rgba(0,0,0,0.05)' : 'none' }}>Brand</button>
    </div>

    <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '40px', letterSpacing: '-0.02em' }}>Inquiry Details</h3>
    
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
              <label htmlFor="fullName" style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Full Name</label>
              <input id="fullName" required type="text" placeholder="Arjun Mehta" style={{ width: '100%', padding: '18px 24px', borderRadius: '18px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
          </div>
          <div>
              <label htmlFor="emailAddress" style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Email Address</label>
              <input id="emailAddress" required type="email" placeholder="arjun@email.com" style={{ width: '100%', padding: '18px 24px', borderRadius: '18px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
          </div>
        </div>

        <div>
          <label htmlFor="subject" style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Subject</label>
          <select id="subject" style={{ width: '100%', padding: '18px 24px', borderRadius: '18px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, appearance: 'none', outline: 'none' }}>
              {tab === 'creator' ? (
                <>
                  <option>Creator Verification Query</option>
                  <option>Payment / Payout Issue</option>
                  <option>Portfolio Customization</option>
                  <option>Other Help</option>
                </>
              ) : (
                <>
                  <option>Brand Partnership Inquiry</option>
                  <option>Bulk Talent Acquisition</option>
                  <option>Enterprise Tool Demo</option>
                  <option>Billing / Invoice Query</option>
                </>
              )}
          </select>
        </div>

        <div>
          <label htmlFor="message" style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Your Message</label>
          <textarea id="message" required placeholder="How can we help you today?" rows={5} style={{ width: '100%', padding: '18px 24px', borderRadius: '18px', border: '2px solid #f1f5f9', background: '#fcfcfc', fontSize: '16px', fontWeight: 600, outline: 'none', resize: 'none' }} />
        </div>

        <Btn full lg type="submit" disabled={formState === 'loading'} style={{ padding: '24px', borderRadius: '100px', background: '#0f172a', color: '#fff', fontSize: '18px', fontWeight: 950 }}>
          {formState === 'loading' ? 'Transmitting...' : 'Send Inquiry'} <Send size={20} />
        </Btn>
    </form>
  </div>
);

FormContent.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formState: PropTypes.string.isRequired
};

const ContactForm = ({ tab, setTab, formState, setFormState, handleSubmit }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    style={{ 
      background: '#fff', 
      borderRadius: '48px', 
      padding: '56px', 
      boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
      border: '1px solid #f1f5f9',
      position: 'relative'
    }}
  >
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <SuccessMessage onReset={() => setFormState('idle')} />
      ) : (
        <FormContent 
          tab={tab} 
          setTab={setTab} 
          handleSubmit={handleSubmit} 
          formState={formState} 
        />
      )}
    </AnimatePresence>
  </motion.div>
);

ContactForm.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  formState: PropTypes.string.isRequired,
  setFormState: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default function ContactPage() {
  const { dsp } = useApp();
  const [tab, setTab] = useState('creator');
  const [formState, setFormState] = useState('idle');

  const onMediaRequest = () => {
    dsp({ t: 'TOAST', d: { t: 'Media Kit request sent! Our team will contact you soon.', type: 'success' } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      <ContactHero />
      <section style={{ padding: '0 24px 120px', marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '48px', alignItems: 'start' }}>
          <ContactForm 
            tab={tab} 
            setTab={setTab} 
            formState={formState} 
            setFormState={setFormState} 
            handleSubmit={handleSubmit} 
          />
          <ContactChannels onMediaRequest={onMediaRequest} />
        </div>
      </section>
    </div>
  );
}
