import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAUpdatePrompt() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      setIsStandalone(!!isStandaloneMode);
    };

    checkStandalone();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const listener = (e) => setIsStandalone(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
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

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  if (!isStandalone) {
    return null;
  }

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          style={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 18,
            zIndex: 10000,
            maxWidth: 420,
            margin: '0 auto',
            padding: 14,
            borderRadius: 18,
            background: '#ffffff',
            border: '1px solid rgba(15,23,42,0.08)',
            boxShadow: '0 24px 60px rgba(15,23,42,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
          role="status"
          aria-live="polite"
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #FF9431, #138808)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <RefreshCw size={21} />
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 950, color: '#0f172a', lineHeight: 1.2 }}>
              New CreatorBharat update is ready
            </div>
            <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: '#64748b', lineHeight: 1.35 }}>
              Tap update to load the latest experience.
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            style={{
              border: 'none',
              borderRadius: 999,
              background: '#0f172a',
              color: '#fff',
              fontSize: 12,
              fontWeight: 900,
              padding: '10px 14px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => setNeedRefresh(false)}
            aria-label="Dismiss update message"
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
            <X size={17} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
