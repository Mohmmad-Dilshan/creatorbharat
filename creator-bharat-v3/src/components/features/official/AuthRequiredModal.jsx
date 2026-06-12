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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: 'relative', background: '#fff', padding: '40px 32px', borderRadius: '28px', maxWidth: '360px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid #f1f5f9' }}><Lock size={32} color="#0f172a" /></div>
             <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '12px', color: '#0f172a' }}>Direct Connection</h3>
             <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>Login to start a secure direct session with the Official CreatorBharat Node.</p>
             <button onClick={() => { navigate('/login'); }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#0f172a', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', marginBottom: '12px', fontSize: '16px' }}>Login to Chat</button>
             <button onClick={onClose} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'transparent', color: '#64748b', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Maybe later</button>
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
