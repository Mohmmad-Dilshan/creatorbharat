import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Check, Send, AlertCircle, Plus, Minus, ArrowRight, Star } from 'lucide-react';
import Seo from '@/components/common/SEO';
import { Btn, Bdg } from '@/components/common/Primitives';
import { AMBASSADOR_PERKS, AMBASSADOR_STEPS, AMBASSADOR_FAQS } from '@/data/ambassadorData';

const FAQItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      borderBottom: '1px solid #e2e8f0',
      padding: '24px 0',
      width: '100%'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: 0,
          color: '#0f172a',
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 700, paddingRight: '20px' }}>{q}</span>
        <span style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF9431',
          flexShrink: 0
        }}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              color: '#475569',
              fontSize: '15px',
              lineHeight: 1.6,
              margin: 0
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

FAQItem.propTypes = {
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default function AmbassadorPage() {
  const [mob, setMob] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    city: '',
    year: '1st Year',
    social: '',
    reason: ''
  });

  useEffect(() => {
    const checkSize = () => setMob(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        college: '',
        city: '',
        year: '1st Year',
        social: '',
        reason: ''
      });
    }, 1500);
  };

  return (
    <div style={{ background: '#fcfcfc', color: '#475569', minHeight: '100vh', overflow: 'hidden' }}>
      <Seo 
        title="Campus Ambassador Program | CreatorBharat" 
        description="Become the voice of CreatorBharat at your college. Empower regional creators, organize events, earn commissions and official experience certificates." 
      />
      <style>{`
        .ambassador-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .ambassador-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ 
        padding: mob ? '90px 20px 60px' : '130px 24px 100px', 
        position: 'relative', 
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.05), transparent 70%)', 
          opacity: 0.9 
        }} />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(90deg, #FF9431, #e2e8f0, #10B981)' 
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="ambassador-landing-grid">
            {/* Left side: content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(255, 148, 49, 0.06)', 
                  padding: '10px 20px', 
                  borderRadius: '100px', 
                  marginBottom: '28px', 
                  border: '1px solid rgba(255, 148, 49, 0.15)', 
                  backdropFilter: 'blur(10px)',
                  color: '#0f172a'
                }}
              >
                <Trophy size={14} color="#FF9431" />
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Campus Ambassador Program 2026</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ 
                  fontSize: mob ? '40px' : '68px', 
                  fontWeight: 950, 
                  letterSpacing: '-0.04em', 
                  lineHeight: 1.05, 
                  marginBottom: '24px',
                  fontFamily: "'Outfit', sans-serif",
                  color: '#0f172a',
                  textAlign: mob ? 'center' : 'left'
                }}
              >
                Represent Bharat's <br />
                <span style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Creator Revolution.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                style={{ 
                  fontSize: mob ? '15px' : '18px', 
                  color: '#475569', 
                  maxWidth: '600px', 
                  margin: mob ? '0 auto 32px' : '0 0 32px 0', 
                  lineHeight: 1.6, 
                  fontWeight: 500,
                  textAlign: mob ? 'center' : 'left'
                }}
              >
                Empower the next wave of regional voices, coordinate student communities, and gain top-tier startup experience. Turn your campus network into growth opportunities.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
              >
                <Btn lg onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'linear-gradient(135deg, #FF9431, #FF5B1A)', color: '#fff', borderRadius: '100px', fontWeight: 900 }}>
                  Apply Now <ArrowRight size={16} />
                </Btn>
              </motion.div>
            </div>

            {/* Right side: Canva Visual Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 24,
                padding: 12,
                boxShadow: '0 20px 40px rgba(255, 148, 49, 0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255, 148, 49, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '75%', // 4:3 Aspect Ratio
                background: '#f8fafc'
              }}>
                <img
                  src="/ambassador_hero.png"
                  alt="Campus Ambassador Program"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 12, padding: '0 8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff9431' }} className="animate-pulse" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campus Nodes Syncing</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#FF9431' }}>Open for Apply</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {/* Perks Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Bdg color="orange" sm>EXCLUSIVE REWARDS</Bdg>
          <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>Perks of Being an Ambassador</h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>We value your effort and leadership. Here is what you get in return.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {AMBASSADOR_PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ y: -6, borderColor: '#FF9431', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)' }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${perk.color}15`,
                  color: perk.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>{perk.title}</h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{perk.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Steps Section */}
      <section style={{ 
        padding: '80px 24px', 
        background: '#f8fafc', 
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Bdg color="green" sm>THE JOURNEY</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>How it Works</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>A streamlined path from onboarding to leading your community.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px' 
          }}>
            {AMBASSADOR_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  fontSize: '48px',
                  fontWeight: 950,
                  color: 'rgba(255, 148, 49, 0.15)',
                  fontFamily: "'Outfit', sans-serif",
                  lineHeight: 1
                }}>{step.num}</div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', marginTop: '24px', fontFamily: "'Outfit', sans-serif" }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" style={{ padding: '100px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.03)',
          borderRadius: '32px',
          padding: mob ? '32px 20px' : '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #FF9431, #10B981)' }} />
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '40px 0' }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <Check size={36} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '12px', fontFamily: "'Outfit', sans-serif" }}>Application Received!</h3>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 24px' }}>
                Thank you for applying to the CreatorBharat Campus Ambassador Program. Our community team will review your application and reach out to you within 3-5 working days.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                style={{
                  background: '#f1f5f9',
                  color: '#0f172a',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                Apply for another student
              </button>
            </motion.div>
          ) : (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>Become a Campus Ambassador</h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>Fill out the application below accurately. Let's start the revolution together.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input 
                      required 
                      type="text" 
                      name="name"
                      placeholder="e.g. Priyanshu Vyas"
                      value={form.name}
                      onChange={handleInputChange}
                      style={inputStyle} 
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      placeholder="e.g. student@college.edu"
                      value={form.email}
                      onChange={handleInputChange}
                      style={inputStyle} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={form.phone}
                      onChange={handleInputChange}
                      style={inputStyle} 
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Your City</label>
                    <input 
                      required 
                      type="text" 
                      name="city"
                      placeholder="e.g. Bhilwara"
                      value={form.city}
                      onChange={handleInputChange}
                      style={inputStyle} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 0.8fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>College / University Name</label>
                    <input 
                      required 
                      type="text" 
                      name="college"
                      placeholder="e.g. BITS Pilani"
                      value={form.college}
                      onChange={handleInputChange}
                      style={inputStyle} 
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Year of Study</label>
                    <select 
                      name="year"
                      value={form.year}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Postgraduate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Social Profile Link (Instagram/LinkedIn/YouTube)</label>
                  <input 
                    required 
                    type="url" 
                    name="social"
                    placeholder="https://instagram.com/yourusername"
                    value={form.social}
                    onChange={handleInputChange}
                    style={inputStyle} 
                  />
                </div>

                <div>
                  <label style={labelStyle}>Why do you want to join as a Campus Ambassador?</label>
                  <textarea 
                    required 
                    name="reason"
                    rows={4}
                    placeholder="Tell us about your leadership qualities or your network in college..."
                    value={form.reason}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <div style={{ marginTop: '12px' }}>
                  <Btn 
                    type="submit" 
                    lg 
                    disabled={loading}
                    style={{ 
                      width: '100%', 
                      background: 'linear-gradient(135deg, #FF9431, #FF5B1A)', 
                      color: '#fff', 
                      borderRadius: '14px', 
                      fontWeight: 800,
                      justifyContent: 'center',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.8 : 1
                    }}
                  >
                    {loading ? 'Submitting Application...' : 'Submit Application'} <Send size={16} style={{ marginLeft: '6px' }} />
                  </Btn>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Bdg color="orange" sm>FAQ</Bdg>
          <h2 style={{ fontSize: mob ? '32px' : '44px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {AMBASSADOR_FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 900,
  color: '#64748b',
  textTransform: 'uppercase',
  marginBottom: '8px',
  marginLeft: '4px',
  letterSpacing: '0.08em'
};

const inputStyle = {
  width: '100%',
  padding: '16px 20px',
  borderRadius: '14px',
  border: '1.5px solid #e2e8f0',
  background: '#ffffff',
  color: '#0f172a',
  fontSize: '15px',
  fontWeight: 600,
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};
