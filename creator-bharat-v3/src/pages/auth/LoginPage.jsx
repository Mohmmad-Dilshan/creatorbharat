import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';

export default function LoginPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Open the login modal on the home page
    dsp({ t: 'UI', v: { authModal: true, authView: 'login' } });
    navigate('/', { replace: true });
  }, [dsp, navigate]);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #f3f3f3', borderTop: '3px solid #FF9431', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
        <p style={{ fontSize: 16, fontWeight: 600, color: '#64748b' }}>Authenticating Elite Access...</p>
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
