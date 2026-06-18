import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function StoryViewer({ highlight, onClose }) {
  const Icon = highlight.icon;
  const story = highlight.stories[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000);
    return () => clearTimeout(timer);
  }, [highlight, onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 3500, 
        background: 'rgba(15, 23, 42, 0.92)', 
        backdropFilter: 'blur(16px)', 
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      {/* Immersive Phone-Sized Container */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '100%',
          maxHeight: '620px',
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '28px',
          border: '1.5px solid rgba(255,255,255,0.1)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)',
          color: '#ffffff',
          overflow: 'hidden'
        }}
      >
        {/* Progress bar segments */}
        <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '100px', overflow: 'hidden', marginBottom: '20px' }}>
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 15, ease: 'linear' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #FF9431, #EA580C)' }}
          />
        </div>

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Logo size={28} iconOnly={true} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                creatorbharat
                <ShieldCheck size={13} fill="#0284c7" color="#ffffff" style={{ color: '#fff' }} />
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', fontWeight: 650 }}>{story.date}</span>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: '#ffffff', 
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            aria-label="Close story"
          >
            <X size={16} />
          </button>
        </div>

        {/* Story Center Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '10px 0', textAlign: 'center' }}>
           <div style={{ 
             width: '84px', 
             height: '84px', 
             borderRadius: '50%', 
             background: `linear-gradient(135deg, ${highlight.color} 0%, rgba(255, 255, 255, 0.05) 100%)`, 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center', 
             color: '#ffffff',
             border: `2px solid ${highlight.color}`,
             boxShadow: `0 0 25px ${highlight.color}35`
           }}>
             <Icon size={38} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
           </div>
           
           <div>
             <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 12px 0', lineHeight: 1.25 }}>{story.title}</h2>
             <p style={{ fontSize: '14.5px', color: '#cbd5e1', lineHeight: 1.6, margin: 0, fontWeight: 500, padding: '0 10px' }}>{story.text}</p>
           </div>
        </div>

        {/* Bottom swipe/tap action indicator */}
        <div 
          onClick={onClose}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '4px', 
            color: '#94a3b8', 
            fontSize: '10px', 
            fontWeight: 800, 
            letterSpacing: '1px',
            cursor: 'pointer', 
            marginTop: 'auto',
            paddingTop: '20px'
          }}
        >
          <span>TAP TO CLOSE</span>
          <motion.span 
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ fontSize: '13px' }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

StoryViewer.propTypes = { 
  highlight: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
    stories: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })).isRequired
  }).isRequired, 
  onClose: PropTypes.func.isRequired 
};
