import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingFAQAccordion({ q, a, i }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.5 }}
      style={{
        background: isOpen ? '#fff' : 'rgba(255, 255, 255, 0.6)',
        borderRadius: '24px',
        border: `1.5px solid ${isOpen ? '#FF9431' : '#f1f5f9'}`,
        marginBottom: '12px',
        overflow: 'hidden',
        boxShadow: isOpen ? '0 20px 40px rgba(255, 148, 49, 0.06)' : 'none',
        transition: 'all 0.3s ease',
        textAlign: 'left'
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em', paddingRight: '12px' }}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#FF9431' : '#cbd5e1' }}
          style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', background: isOpen ? '#FF943110' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ fontSize: '18px', fontWeight: 700 }}>{isOpen ? '−' : '+'}</span>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: '0 32px 24px', color: '#64748b', fontSize: '14px', lineHeight: 1.6, fontWeight: 500 }}
          >
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
               {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

PricingFAQAccordion.propTypes = {
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired
};
