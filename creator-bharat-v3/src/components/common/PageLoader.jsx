import React from 'react';
import PropTypes from 'prop-types';

/**
 * PageLoader Component: A premium Flag-Sweep animated loader for routing fallbacks
 * and local asynchronous states.
 * 
 * @param {string} message - Custom subtext to display below the loader
 * @param {boolean} fullScreen - Whether to cover the full viewport (fixed layout) or fit the parent container
 * @param {boolean} darkTheme - Whether to render in dark glassmorphism mode or standard light mode
 */
export default function PageLoader({ 
  message = 'Entering Elite Ecosystem...', 
  fullScreen = true, 
  darkTheme = false 
}) {
  const containerStyle = {
    height: fullScreen ? '100vh' : '100%',
    width: fullScreen ? '100vw' : '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: darkTheme ? '#050505' : '#fcfcfc',
    position: fullScreen ? 'fixed' : 'relative',
    inset: fullScreen ? 0 : 'auto',
    zIndex: fullScreen ? 9999999 : 10,
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const textStyle = {
    color: darkTheme ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase'
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        
        {/* Flag Spinner Rings */}
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          <div style={{ 
            position: 'absolute', inset: 0, borderRadius: '50%', 
            border: `2px solid ${darkTheme ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}`, 
            borderTopColor: '#FF9431',
            animation: 'spin 1s linear infinite'
          }} />
          <div style={{ 
            position: 'absolute', inset: 6, borderRadius: '50%', 
            border: `2px solid ${darkTheme ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}`, 
            borderBottomColor: '#138808',
            animation: 'spin 1.5s linear reverse infinite'
          }} />
        </div>

        {/* FlagSweep Logo Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 className="nav-logo-text-loader" style={{ 
            fontSize: '20px', fontWeight: 950, letterSpacing: '4px', textTransform: 'uppercase',
            margin: 0
          }}>
            CREATORBHARAT
          </h1>
          <p style={textStyle}>
            {message}
          </p>
        </div>
      </div>
      
      {/* Dynamic CSS Keyframes */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .nav-logo-text-loader {
          background: linear-gradient(90deg, #FF9933 0%, #000000 50%, #138808 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flagSweepLoader 3s linear infinite;
        }
        @keyframes flagSweepLoader { to { background-position: 200% center; } }
      `}</style>
    </div>
  );
}

PageLoader.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
  darkTheme: PropTypes.bool,
};
