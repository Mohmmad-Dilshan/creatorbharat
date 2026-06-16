import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIosPrompt, setIsIosPrompt] = useState(false);

  useEffect(() => {
    // Check if the app is already installed to prevent showing it if we are already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      return;
    }

    // Only show install prompt on mobile devices (width < 768px or mobile user agent)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileDevice = /iphone|ipad|ipod|android|webos|blackberry|iemobile|opera mini/.test(userAgent) || window.innerWidth < 768;
    if (!isMobileDevice) {
      return;
    }

    // Detect iOS devices
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    
    // If it's an iOS device, we can't use the standard install prompt.
    // Show a custom instruction banner instead.
    if (isIos) {
      setTimeout(() => {
        setIsIosPrompt(true);
        setShowPrompt(true);
      }, 3000);
      return;
    }

    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Wait a few seconds before showing the prompt so it doesn't interrupt initial page load
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt native to the browser
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            maxWidth: '380px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            padding: '16px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            border: '1px solid #f0f0f0'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#FF9431',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Download color="#ffffff" size={24} />
          </div>
          
          {isIosPrompt ? (
            <>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111', fontFamily: 'inherit' }}>
                  Install CreatorBharat
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', lineHeight: 1.4, fontFamily: 'inherit' }}>
                  Tap <Share size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> below and select <strong>Add to Home Screen</strong>.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={handleClose}
                  style={{
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                >
                  Got it
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111', fontFamily: 'inherit' }}>
                  Install CreatorBharat
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', lineHeight: 1.4, fontFamily: 'inherit' }}>
                  Add to your home screen for faster access & better experience.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  onClick={handleInstallClick}
                  style={{
                    backgroundColor: '#FF9431',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e88229'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF9431'}
                >
                  Install
                </button>
                <button 
                  onClick={handleClose}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#999',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontFamily: 'inherit'
                  }}
                >
                  Later
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
