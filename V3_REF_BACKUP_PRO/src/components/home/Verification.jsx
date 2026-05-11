import React from 'react';
import PropTypes from 'prop-types';
import { W } from '../../utils/helpers';
import { Btn } from '@/components/common/Primitives';

export default function Verification({ mob }) {
  return (
    <section style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#050505', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(255,148,49,0.06) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      
      <div style={{ ...W(800), position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 32, animation: 'float-simple 4s ease-in-out infinite' }}>🛡️</div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 40 : 64, fontWeight: 900, color: '#fff', marginBottom: 24, lineHeight: 1.1 }}>
          Sirf Content Nahi, <br />
          <span className="gradient-text">Trust Bhi Banaiye.</span>
        </h2>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 48, maxWidth: 700, margin: '0 auto 48px' }}>
          Hamara AI engine aapki audience aur engagement audit karta hai. Verified Creator bano aur brands ko dikhao ki aapka influence real hai.
        </p>
        <Btn lg style={{ borderRadius: 100, padding: '24px 64px', background: '#fff', color: '#111', fontWeight: 900, border: 'none', fontSize: 18 }}>
          Get Verified Now →
        </Btn>
      </div>
    </section>
  );
}

Verification.propTypes = {
  mob: PropTypes.bool
};
