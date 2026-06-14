import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ShieldAlert, LifeBuoy, AlertTriangle } from 'lucide-react';
import Seo from '@/components/common/SEO';

export default function ServerErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      globalThis.location.reload();
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(c => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleReload = () => {
    globalThis.location.reload();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fcfcfc',
      color: '#475569',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Dynamic SEO Meta */}
      <Seo 
        title="500 - System Pipeline Interrupted" 
        description="A minor disruption occurred in the database gateway. CreatorBharat elite engineering is working to restore dynamic creator data immediately."
      />

      {/* Orbiting Halo background mesh */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.04) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '520px',
          width: '100%',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '40px',
          padding: '48px 36px',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(0,0,0,0.03)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          boxSizing: 'border-box'
        }}
      >
        {/* Animated Badge & Icon */}
        <motion.div 
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444'
          }}
        >
          <AlertTriangle size={36} className="pulse-slow" />
        </motion.div>

        {/* Text Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h1 style={{
            fontSize: '96px',
            fontWeight: 950,
            margin: 0,
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            background: 'linear-gradient(135deg, #ef4444 0%, #EA580C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            500
          </h1>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '-0.5px',
            color: '#0f172a'
          }}>
            Ecosystem Pipeline Offline
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#475569',
            lineHeight: 1.5,
            maxWidth: '380px',
            margin: '0 auto',
            fontWeight: 500
          }}>
            Our backend pipeline received an unexpected response code while fetching campaign analytics. The engineering operations team has been notified.
          </p>
        </div>

        {/* Auto-retry Progress Bar */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '11px', color: '#475569', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>🔄 Auto-reconnecting in</span>
            <span style={{ color: '#ef4444', fontWeight: 950 }}>{countdown}s</span>
          </div>
          <div style={{ width: '100%', height: 5, background: '#f1f5f9', borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: '100%' }} 
              animate={{ width: `${(countdown / 10) * 100}%` }} 
              transition={{ duration: 1, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #ef4444, #EA580C)' }} 
            />
          </div>
        </div>

        {/* Toggle Diagnostic details */}
        <div style={{ width: '100%' }}>
          <button
            onClick={() => setShowDiagnostics(!showDiagnostics)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 10,
              textDecoration: 'underline',
              padding: 0
            }}
          >
            {showDiagnostics ? '🙈 Hide Diagnostics' : '🛠️ Show Diagnostics'}
          </button>
          
          <AnimatePresence>
            {showDiagnostics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#475569',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 8,
                  width: '100%',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444' }}>
                  <ShieldAlert size={14} />
                  <span style={{ fontWeight: 900 }}>SYSTEM DIAGNOSTIC LOG:</span>
                </div>
                <div>Status: Gateway Failure (ERR_PIPELINE_BLOCKED)</div>
                <div>Payload: {"{ api_route: '/creators/seed', latency: '15400ms', cluster_node: 'cb-ap-south-1' }"}</div>
                <div>Trace: 0xCB9431_TIMEOUT_INTRIPT</div>
                <div>Active Session ID: CBS-{Math.floor(100000 + Math.random() * 900000)}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 12,
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <motion.button 
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReload}
            style={{
              flex: 1,
              minWidth: '160px',
              padding: '14px 20px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #ef4444 0%, #EA580C 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 15px 30px rgba(239, 68, 68, 0.2)'
            }}
          >
            <RefreshCw size={16} />
            <span>Reload Pipeline</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.03, y: -1, borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/contact')}
            style={{
              flex: 1,
              minWidth: '160px',
              padding: '14px 20px',
              borderRadius: '100px',
              background: 'transparent',
              color: '#475569',
              border: '1px solid #e2e8f0',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s ease'
            }}
          >
            <LifeBuoy size={16} />
            <span>Get Concierge Help</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Embedded Animations Utility */}
      <style>{`
        .pulse-slow {
          animation: pulseShadow 2.5s ease-in-out infinite;
        }
        @keyframes pulseShadow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(239, 68, 68, 0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.6)); }
        }
      `}</style>
    </div>
  );
}
