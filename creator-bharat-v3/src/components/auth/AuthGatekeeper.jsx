import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Logo, Btn } from '@/components/common/Primitives';
import { Sparkles, ChevronRight, Zap, Users, Rocket } from 'lucide-react';

const AuthGatekeeper = ({ mob, role = 'creator' }) => {
  const navigate = useNavigate();

  const config = {
    creator: {
      badge: "India's Largest Creator Network",
      icon: <Sparkles size={14} color="#FF9431" />,
      title: <>Bharat Ke Har <span className="accent">Local Creator</span> Ki Pehchan!</>,
      desc: "Apna **Web Portfolio** banayein, **Articles & Podcasts** host karein aur Bharat ke har kone se **Local Brand Identity** payein.",
      primary: { label: "Apna Dashboard Open Karein", path: "/login" },
      secondary: { label: "Apply as Verified Creator", path: "/apply" },
      glow: "gate-glow-saffron",
      footer: [
        { icon: <Zap size={16} color="#FF9431" fill="#FF9431" />, label: "Verified Opportunities" },
        { icon: <Users size={16} color="#10B981" fill="#10B981" />, label: "10k+ Creators" }
      ]
    },
    brand: {
      badge: "Premium Brand Command Center",
      icon: <Rocket size={14} color="#10B981" />,
      title: <>Launch Your <span className="accent-green">Brand's Mission</span></>,
      desc: "Verified creators ke saath apne campaigns scale karein. Login karein aur **Direct Talent Scout** karein, apni **Missions** launch karein aur **Real-time ROI** track karein.",
      primary: { label: "Console Login Karein", path: "/login" },
      secondary: { label: "Register Your Brand", path: "/brand-register" },
      glow: "gate-glow-green-brand",
      footer: [
        { icon: <Zap size={16} color="#10B981" fill="#10B981" />, label: "High ROI Deals" },
        { icon: <Users size={16} color="#3B82F6" fill="#3B82F6" />, label: "Verified Talent" }
      ]
    }
  };

  const c = config[role] || config.creator;

  return (
    <div className="gatekeeper-container">
      {/* Cinematic Background Elements */}
      <div className={`gate-glow ${c.glow}`} />
      <div className="gate-glow gate-glow-blue" />
      
      {/* Mock Blurred Dashboard Content */}
      <div className={`gate-mock-grid ${mob ? 'mob' : ''}`}>
         {[1,2,3,4,5,6].map(i => (
           <div key={i} className="gate-mock-card">
              <div className="mock-icon" />
              <div className="mock-line-lg" />
              <div className="mock-line-sm" />
           </div>
         ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`gatekeeper-card ${mob ? 'mob' : ''}`}
      >
         <div className="gate-logo-pulsar">
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="pulse-ring"
              style={{ background: role === 'brand' ? '#10B981' : '#FF9431' }}
            />
            <div className="logo-inner">
               <Logo iconOnly />
            </div>
         </div>

         <div className="gate-content">
            <div className="gate-badge" style={{ background: role === 'brand' ? 'rgba(16,185,129,0.1)' : 'rgba(255,148,49,0.1)' }}>
               {c.icon}
               <span style={{ color: role === 'brand' ? '#10B981' : '#FF9431' }}>{c.badge}</span>
            </div>
            <h2 className="gate-title">
              {c.title}
            </h2>
            <p className="gate-description">
              {c.desc}
            </p>
         </div>

         <div className="gate-actions">
            <Btn full lg onClick={() => navigate(c.primary.path)} className="btn-primary-elite" style={{ background: role === 'brand' ? '#10B981' : '#0F172A' }}>
              {c.primary.label} <ChevronRight size={20} />
            </Btn>
            <Btn full lg variant="outline" onClick={() => navigate(c.secondary.path)} className="btn-outline-elite">
              {c.secondary.label}
            </Btn>
         </div>

         <div className="gate-footer">
            {c.footer.map((f, i) => (
              <div key={i} className="footer-item">
                 {f.icon} {f.label}
              </div>
            ))}
         </div>
      </motion.div>
    </div>
  );
};

AuthGatekeeper.propTypes = {
  mob: PropTypes.bool,
  role: PropTypes.oneOf(['creator', 'brand'])
};

export default AuthGatekeeper;
