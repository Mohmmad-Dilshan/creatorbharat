import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { Btn } from '@/components/common/Primitives';
import { Lock, ChevronRight } from 'lucide-react';

const PremiumLock = ({ children }) => {
  const { st } = useApp();
  const navigate = useNavigate();

  if (st.user) return children;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '80vh', overflow: 'hidden' }}>
      {/* Blurred Content Glimpse */}
      <div style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.5 }}>
        {children}
      </div>

      {/* Modern Glass Lock Overlay */}
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(4px)'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: '#fff',
            border: '1px solid #f1f5f9',
            borderRadius: '32px',
            padding: '40px 24px',
            maxWidth: '360px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
          }}
        >
          <div style={{ 
            width: '56px', height: '56px', background: 'rgba(255,148,49,0.1)', 
            borderRadius: '16px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 20px', color: '#FF9431' 
          }}>
            <Lock size={24} />
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>
            Premium Feature
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginBottom: '32px', lineHeight: 1.5 }}>
            Ye tool sirf **Verified Creators** ke liye hai. Deals aur analytics access karne ke liye login karein.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Btn full lg onClick={() => navigate('/login')} style={{ background: '#FF9431', borderRadius: '100px', height: '56px' }}>
              Sign In to Unlock
            </Btn>
            <Btn full lg variant="ghost" onClick={() => navigate('/apply')} style={{ borderRadius: '100px', color: '#0f172a' }}>
              Create Free Account <ChevronRight size={18} />
            </Btn>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

PremiumLock.propTypes = {
  children: PropTypes.node.isRequired
};

export default PremiumLock;
