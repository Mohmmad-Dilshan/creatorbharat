import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const THEME = {
  primary: '#FF9431',
  dark: '#0f172a'
};

export default function LeaderboardHero({ mob }) {
  return (
    <section style={{ 
      background: '#f8fafc', 
      padding: mob ? '120px 20px 60px' : '160px 24px 80px', 
      position: 'relative', 
      overflow: 'hidden',
      borderBottom: '1px solid #e2e8f0'
    }}>
      {/* Dynamic background decoration */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.04) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: mob ? 'column' : 'row', 
          alignItems: 'center', 
          gap: '48px',
          textAlign: mob ? 'center' : 'left'
        }}>
          {/* Left Column: Typography */}
          <div style={{ flex: 1.2 }}>
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(255, 148, 49, 0.08)', 
                padding: '8px 18px', 
                borderRadius: '100px', 
                marginBottom: '24px', 
                border: '1px solid rgba(255, 148, 49, 0.15)' 
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: THEME.primary, boxShadow: `0 0 6px ${THEME.primary}` }} />
              <span style={{ fontSize: '10px', fontWeight: 950, color: THEME.primary, textTransform: 'uppercase', letterSpacing: '2px' }}>Verified Directory</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              style={{ 
                fontSize: mob ? '44px' : '72px', 
                fontWeight: 950, 
                color: THEME.dark, 
                marginBottom: '20px', 
                letterSpacing: '-2px', 
                lineHeight: 1.05 
              }}
            >
              Bharat's <br />
              <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #ff7b00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top 100 Creators</span>
            </motion.h1>

            <p style={{ fontSize: mob ? '16px' : '18px', color: '#64748b', maxWidth: '580px', margin: mob ? '0 auto 28px' : '0 0 28px', lineHeight: 1.6, fontWeight: 550 }}>
              Definitive real-time rankings of India's leading digital economy drivers. Filtered and sorted by verified reach, engagement rates, and trust indexes.
            </p>

            {/* Live Ticker Telemetry Node */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '10px',
              fontFamily: 'monospace',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              background: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
                PEHCHAN v1.1
              </span>
              <span style={{ width: '1px', height: '10px', background: '#e2e8f0' }} />
              <span>SYNC OPTIMAL</span>
            </div>
          </div>

          {/* Right Column: 3D Graphic Showcase */}
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '20px',
                borderRadius: '32px',
                boxShadow: '0 25px 50px rgba(15,23,42,0.06)',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '360px'
              }}
            >
              <img 
                src="/leaderboard_header_art.png" 
                alt="Ecosystem Assets" 
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }} 
              />
              
              {/* Telemetry overlays */}
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '30px',
                right: '30px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                padding: '10px 16px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontWeight: 800,
                color: '#0f172a'
              }}>
                <span>DATABASE STATUS</span>
                <span style={{ color: '#10B981' }}>100% ONLINE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

LeaderboardHero.propTypes = {
  mob: PropTypes.bool.isRequired
};
