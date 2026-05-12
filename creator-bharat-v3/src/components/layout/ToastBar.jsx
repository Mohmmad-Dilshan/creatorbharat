import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApp } from '@/core/context';
import { motion, AnimatePresence } from 'framer-motion';

const ToastItem = ({ t, dsp }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      dsp({ t: 'RM_TOAST', id: t.id });
    }, 4000);
    return () => clearTimeout(timer);
  }, [t.id, dsp]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      layout
      style={{
        background: '#111',
        color: '#fff',
        borderRadius: 20,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        border: `1px solid ${t.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        minWidth: '320px',
        maxWidth: '450px'
      }}
    >
      <div style={{ 
        width: 28, height: 28, borderRadius: '50%', 
        background: t.type === 'success' ? '#10B981' : '#EF4444', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        fontSize: 14, fontWeight: 900, flexShrink: 0,
        boxShadow: `0 0 15px ${t.type === 'success' ? '#10B98150' : '#EF444450'}`
      }}>
        {t.type === 'success' ? '✓' : '!'}
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, flex: 1, color: '#f8fafc', lineHeight: 1.4 }}>{t.msg}</span>
      <button 
        onClick={() => dsp({ t: 'RM_TOAST', id: t.id })} 
        style={{ 
          background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.4)', 
          cursor: 'pointer', fontSize: 18, width: 28, height: 28, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
      >
        ×
      </button>
    </motion.div>
  );
};

ToastItem.propTypes = {
  t: PropTypes.object.isRequired,
  dsp: PropTypes.func.isRequired
};

export default function ToastBar() {
  const { st, dsp } = useApp();
  
  return (
    <div style={{ 
      position: 'fixed', bottom: 32, right: 32, zIndex: 10000, 
      display: 'flex', flexDirection: 'column', gap: 12,
      pointerEvents: st.toasts.length === 0 ? 'none' : 'auto'
    }}>
      <AnimatePresence>
        {st.toasts.map(t => (
          <ToastItem key={t.id} t={t} dsp={dsp} />
        ))}
      </AnimatePresence>
    </div>
  );
}
