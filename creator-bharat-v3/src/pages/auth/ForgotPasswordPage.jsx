import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';

export default function ForgotPasswordPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    dsp({ t: 'UI', v: { authModal: true, authView: 'forgot' } });
    navigate('/', { replace: true });
  }, [dsp, navigate]);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 42, height: 42, border: '3px solid #FFF7ED', borderTop: '3px solid #FF9431', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 18px' }} />
        <p style={{ fontSize: 15, fontWeight: 700, color: '#64748B' }}>Opening account recovery...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
