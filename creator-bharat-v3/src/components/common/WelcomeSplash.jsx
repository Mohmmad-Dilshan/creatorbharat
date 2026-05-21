import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 2.5 seconds ke baad splash screen ko hata dein
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
            style={{ width: 100, height: 100, background: 'linear-gradient(135deg, #FF9431, #DC2626)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 900, marginBottom: 24, boxShadow: '0 20px 40px rgba(255,148,49,0.3)' }}
          >
            CB
          </motion.div>
          
          {/* Text Animation */}
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 900, margin: 0 }}>
            CreatorBharat
          </motion.h1>
          <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} style={{ color: '#94a3b8', marginTop: 8, fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>
            Elite Creator Ecosystem
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}