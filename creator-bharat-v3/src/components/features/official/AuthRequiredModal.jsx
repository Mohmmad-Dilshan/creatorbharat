import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AuthRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(9,13,22,0.85)', backdropFilter: 'blur(8px)' }} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: 'relative', background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '40px 32px', borderRadius: '28px', maxWidth: '360px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(255,148,49,0.15)', color: '#fff' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid rgba(255,255,255,0.08)' }}><Lock size={30} color="#FF9431" style={{ filter: 'drop-shadow(0 0 6px rgba(255,148,49,0.3))' }} /></div>
             <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '12px', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>Direct Connection</h3>
             <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>Login to start a secure direct session with the Official CreatorBharat Node.</p>
             <button onClick={() => { navigate('/login'); }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', marginBottom: '12px', fontSize: '15px', boxShadow: '0 4px 15px rgba(255,148,49,0.3)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'} onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>Login to Chat</button>
             <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: '14px', background: 'transparent', color: '#94a3b8', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Maybe later</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

AuthRequiredModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
