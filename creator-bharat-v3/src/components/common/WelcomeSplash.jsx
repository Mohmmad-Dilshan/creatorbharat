import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Server } from 'lucide-react';

const LOADING_STEPS = [
  "Initializing Secure Connection...",
  "Authenticating Credentials...",
  "Loading Creator Profile...",
  "Synchronizing Social Metrics...",
  "Welcome to the Elite Ecosystem!"
];

export default function WelcomeSplash() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increments by 2 every 40ms -> fills in 2 seconds
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Map progress to steps
    const step = Math.min(Math.floor((progress / 100) * LOADING_STEPS.length), LOADING_STEPS.length - 1);
    setStepIndex(step);
  }, [progress]);

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
            background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            padding: 24,
          }}
        >
          {/* Futuristic ambient glows */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 148, 49, 0.15) 0%, rgba(255, 148, 49, 0) 70%)',
            filter: 'blur(40px)',
            zIndex: 1
          }} />

          {/* Logo container with rotation glow */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            style={{
              position: 'relative',
              width: 120,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 36,
              zIndex: 2
            }}
          >
            {/* Spinning decorative borders */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: 36,
                border: '2px dashed rgba(255, 148, 49, 0.4)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -12,
                borderRadius: 42,
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            />

            {/* Inner logo card */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #FF9431 0%, #E04F16 100%)',
              borderRadius: 32,
              display: 'grid',
              placeItems: 'center',
              fontSize: 44,
              fontWeight: 950,
              boxShadow: '0 24px 50px rgba(255,148,49,0.35)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-1px'
            }}>
              CB
            </div>
          </motion.div>

          {/* Loading details */}
          <div style={{ zIndex: 2, textAlign: 'center', width: '100%', maxWidth: 320 }}>
            <motion.h1 
              initial={{ y: 15, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.3 }} 
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 950, margin: 0, letterSpacing: '-0.5px' }}
            >
              CreatorBharat
            </motion.h1>
            
            <motion.p 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.4 }} 
              style={{ color: '#FF9431', marginTop: 6, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Sparkles size={12} fill="currentColor" /> Elite Creator Portal <Sparkles size={12} fill="currentColor" />
            </motion.p>

            {/* Progress Bar Container */}
            <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 100, marginTop: 40, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #FF9431, #10B981)', borderRadius: 100, transition: 'width 0.1s linear' }} />
            </div>

            {/* Stepper info */}
            <div style={{ height: 20, marginTop: 14 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <Server size={12} color="#10B981" /> {LOADING_STEPS[stepIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}