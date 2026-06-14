import React, { useEffect, useState } from 'react';
import { useApp } from '@/core/context';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ShieldCheck, X } from 'lucide-react';

export default function CompareBar() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const mob = globalThis.window === undefined ? false : globalThis.window.innerWidth < 768;
  const [showLockModal, setShowLockModal] = useState(false);

  // Check if current user is logged in as a brand
  const isBrand = st.user && st.role === 'brand';

  useEffect(() => {
    if (st.compared.length > 0) {
      // Fetch details for compared creators if not available
    }
  }, [st.compared]);

  if (st.compared.length === 0) return null;

  const handleCompareClick = () => {
    if (isBrand) {
      navigate('/compare');
      globalThis.window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowLockModal(true);
    }
  };

  const handleBrandRedirect = (path) => {
    setShowLockModal(false);
    navigate(path, { state: { from: location.pathname } });
    globalThis.window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, x: '-50%' }} 
          animate={{ y: 0, x: '-50%' }} 
          exit={{ y: 100, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed', bottom: mob ? 90 : 32, left: '50%',
            zIndex: 200000, width: mob ? 'calc(100% - 32px)' : 'auto', minWidth: mob ? 0 : 400
          }}
        >
          <div style={{
            background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: 100,
            display: 'flex', alignItems: 'center', gap: mob ? 12 : 20, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {st.compared.map(id => (
                <div key={id} style={{ position: 'relative' }}>
                  <div style={{ 
                    width: 32, height: 32, borderRadius: '50%', background: '#FF9431', 
                    border: '2px solid #fff', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', fontSize: 10, fontWeight: 900 
                  }}>
                    {String(id).substring(0, 1).toUpperCase()}
                  </div>
                  <button 
                    onClick={() => dsp({ t: 'COMPARE', id })} 
                    style={{ 
                      position: 'absolute', top: -4, right: -4, width: 16, height: 16, 
                      borderRadius: '50%', background: '#EF4444', color: '#fff', 
                      border: 'none', fontSize: 10, cursor: 'pointer', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center' 
                    }}
                  >✕</button>
                </div>
              ))}
              {[1, 2, 3].slice(st.compared.length).map(slot => (
                <div key={`empty-slot-${slot}`} style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>+</div>
              ))}
            </div>
            
            {!mob && (
              <div style={{ height: 24, width: 1, background: 'rgba(255,255,255,0.1)' }} />
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap' }}>
                {st.compared.length} Selected
              </span>
              <button 
                onClick={handleCompareClick}
                style={{ 
                  background: '#FF9431', color: '#fff', border: 'none', 
                  padding: '8px 20px', borderRadius: 100, fontWeight: 950, 
                  fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(255, 148, 49, 0.25)',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Compare Now
              </button>
            </div>
            <div style={{ height: 24, width: 1, background: 'rgba(255,255,255,0.1)' }} />
            <button 
              onClick={() => dsp({ t: 'CLEAR_COMPARE' })} 
              style={{ 
                background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', 
                width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 
              }}
            >✕</button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Brand Lock Modal */}
      <AnimatePresence>
        {showLockModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 13, 22, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px'
          }} onClick={() => setShowLockModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '32px',
                width: '100%',
                maxWidth: '480px',
                padding: mob ? '32px 24px' : '40px',
                boxShadow: '0 30px 60px rgba(15,23,42,0.15)',
                position: 'relative',
                textAlign: 'center'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowLockModal(false)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}
              >
                ✕
              </button>

              <div style={{
                width: '72px',
                height: '72px',
                background: 'rgba(255, 148, 49, 0.1)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FF9431',
                margin: '0 auto 24px'
              }}>
                <Lock size={32} />
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
                Brand Feature Locked
              </h3>
              
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: '0 0 32px 0', fontWeight: 500 }}>
                {st.user ? (
                  `Your current account is registered as a Creator. Side-by-side benchmarking and advanced audience telemetry are exclusive to Brand accounts.`
                ) : (
                  `Side-by-side creator benchmarking is exclusive to verified Brand accounts. Please register or sign in as a Brand to continue.`
                )}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {st.user ? (
                  <button 
                    onClick={() => {
                      dsp({ t: 'LOGOUT' });
                      handleBrandRedirect('/login');
                    }}
                    style={{ 
                      width: '100%', 
                      background: '#FF9431', 
                      color: '#ffffff', 
                      border: 'none',
                      fontWeight: 950, 
                      borderRadius: '16px', 
                      padding: '16px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      boxShadow: '0 8px 24px rgba(255, 148, 49, 0.25)'
                    }}
                  >
                    Logout & Login as Brand
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => handleBrandRedirect('/login')}
                      style={{ 
                        width: '100%', 
                        background: '#0f172a', 
                        color: '#ffffff', 
                        border: 'none',
                        fontWeight: 950, 
                        borderRadius: '16px', 
                        padding: '16px',
                        cursor: 'pointer',
                        fontSize: '15px'
                      }}
                    >
                      Login as Brand
                    </button>
                    
                    <button 
                      onClick={() => handleBrandRedirect('/brand-register')}
                      style={{ 
                        width: '100%', 
                        background: '#ffffff', 
                        color: '#0f172a', 
                        border: '2px solid #e2e8f0',
                        fontWeight: 950, 
                        borderRadius: '16px', 
                        padding: '15px',
                        cursor: 'pointer',
                        fontSize: '15px'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0f172a'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      Create Brand Account
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
