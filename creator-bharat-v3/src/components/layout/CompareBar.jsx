import React, { useEffect } from 'react';
import { useApp } from '../../context';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CompareBar() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const mob = globalThis.window === undefined ? false : globalThis.window.innerWidth < 768;

  useEffect(() => {
    if (st.compared.length > 0) {
      // Fetch details for compared creators if not available
      // For now, we'll try to get them from a search or just use placeholders
      // In a real app, these might be in a global store
    }
  }, [st.compared]);

  if (st.compared.length === 0) return <AnimatePresence />;

  const go = (path) => {
    navigate(path);
    globalThis.window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, x: '-50%' }} 
        animate={{ y: 0, x: '-50%' }} 
        exit={{ y: 100, x: '-50%' }}
        style={{
          position: 'fixed', bottom: mob ? 90 : 32, left: '50%',
          zIndex: 2000000, width: mob ? 'calc(100% - 32px)' : 'auto', minWidth: mob ? 0 : 400
        }}
      >
        <div style={{
          background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 100,
          display: 'flex', alignItems: 'center', gap: mob ? 12 : 20, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {st.compared.map(id => (
              <div key={id} style={{ position: 'relative' }}>
                <div style={{ 
                  width: 32, height: 32, borderRadius: '50%', background: '#FF9431', 
                  border: '2px solid #fff', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', fontSize: 10, fontWeight: 900 
                }}>
                  {id.substring(0, 1).toUpperCase()}
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
              onClick={() => go('/compare')}
              style={{ 
                background: '#FF9431', color: '#fff', border: 'none', 
                padding: '8px 16px', borderRadius: 100, fontWeight: 900, 
                fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' 
              }}
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
  );
}
