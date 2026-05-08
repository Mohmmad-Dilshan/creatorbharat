import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import AuthRedirectScreen from './AuthRedirectScreen';

export default function LoginPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Open the login modal on the home page
    dsp({ t: 'UI', v: { authModal: true, authView: 'login' } });
    navigate('/', { replace: true });
  }, [dsp, navigate]);

  return (
    <AuthRedirectScreen
      title="Opening secure sign in"
      sub="Taking you to the role-aware CreatorBharat access panel."
      mode="creator"
    />
  );
}
