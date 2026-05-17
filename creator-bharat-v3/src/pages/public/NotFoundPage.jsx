import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Compass, AlertCircle } from 'lucide-react';
import Seo from '@/components/common/SEO';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      color: '#ffffff',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Dynamic SEO Meta */}
      <Seo 
        title="404 - Elite Path Not Found" 
        description="The requested routing vector does not exist within the CreatorBharat elite ecosystem. Let's redirect you back to active campaigns."
      />

      {/* Orbiting Halo background mesh */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 148, 49, 0.08) 0%, transparent 70%)',
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
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '40px',
          padding: '60px 40px',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32
        }}
      >
        {/* Animated Badge & Icon */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255, 148, 49, 0.08)',
            border: '1px solid rgba(255, 148, 49, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FF9431'
          }}
        >
          <Compass size={40} className="spin-slow" />
        </motion.div>

        {/* Text Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{
            fontSize: '120px',
            fontWeight: 950,
            margin: 0,
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            404
          </h1>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '-0.5px'
          }}>
            Ecosystem Route Offline
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.5)',
            lineHeight: 1.6,
            maxWidth: '440px',
            margin: '0 auto'
          }}>
            The page you are looking for has been relocated or is currently outside our active discovery network. Verify the URL or return to dashboard.
          </p>
        </div>

        {/* Diagnostic Path Indicator */}
        <div style={{
          fontSize: '12px',
          fontFamily: 'monospace',
          color: 'rgba(255, 255, 255, 0.3)',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.04)',
          padding: '8px 16px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <AlertCircle size={14} style={{ color: '#ef4444' }} />
          <span>Path: {globalThis.location.pathname}</span>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              minWidth: '180px',
              padding: '16px 28px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 15px 30px rgba(255, 148, 49, 0.2)'
            }}
          >
            <Home size={18} />
            <span>Go to Home</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255,255,255,0.04)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/leaderboard')}
            style={{
              flex: 1,
              minWidth: '180px',
              padding: '16px 28px',
              borderRadius: '100px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={18} />
            <span>Search Creators</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Embedded Animations Utility */}
      <style>{`
        .spin-slow {
          animation: spin360 20s linear infinite;
        }
        @keyframes spin360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
