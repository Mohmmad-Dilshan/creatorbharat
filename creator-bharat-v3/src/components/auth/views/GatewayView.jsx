import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { User, Briefcase, Sparkles } from 'lucide-react';
import { ModeButton } from '../AuthShared.jsx';

const GatewayView = ({ setView, setRole }) => (
  <motion.div key="gateway" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
    <div style={{ marginBottom: 32, position: 'relative' }}>
      <button 
        onClick={() => setView('gateway')}
        style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: '#64748B' }}
      >
        ← BACK
      </button>
      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 950, color: '#111827', marginBottom: 6, letterSpacing: '-0.5px' }}>Join the Elite</h2>
      <p style={{ color: '#64748B', fontSize: 14, fontWeight: 650 }}>Choose your journey on Bharat's #1 platform.</p>
    </div>
    <div style={{ display: 'grid', gap: 14 }}>
      <ModeButton
        active
        icon={User}
        title="Creator workspace"
        sub="Portfolio, Articles, Podcasts and local discovery identity."
        color="#FF9431"
        onClick={() => {
          setRole('creator');
          setView('register');
        }}
      />
      <ModeButton
        active
        icon={Briefcase}
        title="Brand workspace"
        sub="Register your brand and manage campaigns with verified ROI."
        color="#10B981"
        onClick={() => {
          setRole('brand');
          setView('brand-register');
        }}
      />
    </div>
    <div style={{ marginTop: 24, padding: 18, borderRadius: 18, background: '#F8FAFC', border: '1px solid #EEF2F7', display: 'flex', gap: 12, alignItems: 'center' }}>
      <Sparkles size={20} color="#FF9431" />
      <p style={{ fontSize: 13, lineHeight: 1.55, color: '#475569', fontWeight: 650 }}>
        Join Bharat's most transparent creator ecosystem. Every local creator, every verified brand.
      </p>
    </div>
    <div style={{ marginTop: 24, textAlign: 'center' }}>
      <p style={{ fontSize: 14, color: '#64748B', fontWeight: 650 }}>
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={() => setView('login')} 
          style={{ border: 'none', background: 'none', color: '#111827', fontWeight: 900, cursor: 'pointer', padding: 0 }}
        >
          Sign in
        </button>
      </p>
    </div>
  </motion.div>
);

GatewayView.propTypes = {
  setView: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired
};

export default GatewayView;
