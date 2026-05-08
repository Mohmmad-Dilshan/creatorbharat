import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import AuthRedirectScreen from './AuthRedirectScreen';

export default function ForgotPasswordPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    dsp({ t: 'UI', v: { authModal: true, authView: 'forgot' } });
    navigate('/', { replace: true });
  }, [dsp, navigate]);

  return (
    <AuthRedirectScreen
      title="Opening account recovery"
      sub="Preparing a secure recovery panel for your CreatorBharat account."
      mode="creator"
    />
  );
}
