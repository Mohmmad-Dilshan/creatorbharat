import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const BottomSheet = ({ isOpen, onClose, title, children, height = 'auto' }) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '90vh',
              height: height,
              background: '#fff',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              zIndex: 1001,
              padding: '12px 24px 40px',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
              overflowY: 'auto'
            }}
          >
            {/* Drag Handle */}
            <div style={{ 
              width: 40, 
              height: 4, 
              background: '#e2e8f0', 
              borderRadius: 2, 
              margin: '0 auto 24px',
              flexShrink: 0 
            }} />

            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 24 
            }}>
              <h3 style={{ 
                fontSize: 20, 
                fontWeight: 900, 
                color: '#1e293b', 
                margin: 0,
                letterSpacing: '-0.02em' 
              }}>
                {title}
              </h3>
              <button 
                onClick={onClose}
                style={{ 
                  background: '#f8fafc', 
                  border: 'none', 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Content */}
            <div style={{ color: '#475569' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string
};

export default BottomSheet;
