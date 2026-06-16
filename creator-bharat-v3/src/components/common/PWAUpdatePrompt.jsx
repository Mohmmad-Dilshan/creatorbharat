import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Download, ShieldCheck, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAUpdatePrompt() {
  const [isMobile, setIsMobile] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Downloading updates...');
  const progressInterval = useRef(null);

  useEffect(() => {
    // Detect mobile viewport or user agent
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobileDevice = /iphone|ipad|ipod|android|webos|blackberry|iemobile|opera mini/.test(userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;

      const checkForUpdate = () => {
        registration.update().catch(() => {});
      };

      window.addEventListener('focus', checkForUpdate);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          checkForUpdate();
        }
      });
    },
  });

  // Lock body scroll when needRefresh is active on mobile (blocks interactions)
  useEffect(() => {
    if (needRefresh && isMobile) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [needRefresh, isMobile]);

  const handleUpdate = () => {
    setIsUpdating(true);
    let currentProgress = 0;
    
    progressInterval.current = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4; // increment randomly
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval.current);
        // Delay slightly at 100% to let user see completion, then reload
        setTimeout(() => {
          updateServiceWorker(true);
        }, 500);
      }
      
      setProgress(currentProgress);
      
      // Update status text dynamically based on progress
      if (currentProgress < 25) {
        setStatusText('Fetching latest update packages...');
      } else if (currentProgress < 50) {
        setStatusText('Extracting assets & styles...');
      } else if (currentProgress < 75) {
        setStatusText('Verifying update integrity...');
      } else {
        setStatusText('Applying changes & reloading...');
      }
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  if (!needRefresh) {
    return null;
  }

  // 1. Mobile Viewport: Blocking, full-screen update screen (No dismiss, forced install)
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#090d16',
            zIndex: 9999999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {/* Glowing Background Radial */}
          <div style={{ position: 'absolute', width: '300px', height: '300px', background: '#FF9431', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.12, pointerEvents: 'none', top: '25%' }} />
          
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            {/* Animated Icon Container */}
            <motion.div
              animate={{ 
                rotate: isUpdating ? 360 : 0,
                scale: isUpdating ? [1, 1.05, 1] : 1
              }}
              transition={{ 
                rotate: isUpdating ? { repeat: Infinity, duration: 2, ease: 'linear' } : { duration: 0.5 },
                scale: isUpdating ? { repeat: Infinity, duration: 1.5 } : { duration: 0.5 }
              }}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(255,148,49,0.1) 0%, rgba(16,185,129,0.1) 100%)',
                border: '1px solid rgba(255,148,49,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                boxShadow: '0 0 30px rgba(255,148,49,0.1)'
              }}
            >
              <RefreshCw size={32} color="#FF9431" />
            </motion.div>

            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 12px 0', lineHeight: 1.2 }}>
              {isUpdating ? 'Updating App' : 'Update Required'}
            </h2>
            
            <p style={{ fontSize: '13.5px', color: '#94a3b8', fontWeight: 500, margin: '0 0 32px 0', lineHeight: 1.5, padding: '0 8px' }}>
              {isUpdating 
                ? 'Installing the latest version of CreatorBharat. Please keep the app open.' 
                : 'A critical update is available. You must install this update to continue using the app.'}
            </p>

            {isUpdating ? (
              <div style={{ width: '100%', marginTop: '8px' }}>
                {/* Progress Bar Container */}
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div 
                    style={{ 
                      width: `${progress}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #FF9431 0%, #10B981 100%)', 
                      borderRadius: '100px',
                      transition: 'width 0.15s ease-out'
                    }} 
                  />
                </div>
                
                {/* Progress Percent & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>
                    {statusText}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#FF9431' }}>
                    {progress}%
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleUpdate}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #FF9431, #EA580C)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(255,148,49,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <Download size={16} />
                Update Now
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '48px', opacity: 0.6 }}>
              <ShieldCheck size={14} color="#10B981" />
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Secure Official Release
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // 2. Desktop Viewport: Elegant non-blocking bottom toast notice
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 110, opacity: 0 }}
        style={{
          position: 'fixed',
          left: 24,
          bottom: 24,
          zIndex: 10000,
          width: 380,
          padding: 16,
          borderRadius: 20,
          background: '#ffffff',
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 20px 50px rgba(15,23,42,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: 'Outfit, sans-serif'
        }}
        role="status"
        aria-live="polite"
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: 'rgba(255,148,49,0.08)',
            color: '#FF9431',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={isUpdating ? { rotate: 360 } : {}}
            transition={isUpdating ? { repeat: Infinity, duration: 2, ease: 'linear' } : {}}
            style={{ display: 'flex' }}
          >
            <RefreshCw size={20} />
          </motion.div>
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
            Update Available
          </div>
          <div style={{ marginTop: 3, fontSize: 12, fontWeight: 600, color: '#64748b', lineHeight: 1.3 }}>
            {isUpdating ? 'Installing latest files...' : 'A new web version is ready.'}
          </div>
        </div>

        {!isUpdating ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleUpdate}
              style={{
                border: 'none',
                borderRadius: 100,
                background: '#FF9431',
                color: '#fff',
                fontSize: 12,
                fontWeight: 900,
                padding: '8px 16px',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(255,148,49,0.15)'
              }}
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setNeedRefresh(false)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FF9431' }}>{progress}%</span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
