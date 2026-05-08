import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import AuthRedirectScreen from './AuthRedirectScreen';

export default function ApplyPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Open the registration modal on the home page
    dsp({ t: 'UI', v: { authModal: true, authView: 'register' } });
    navigate('/', { replace: true });
  }, [dsp, navigate]);

  return (
    <AuthRedirectScreen
      title="Preparing creator onboarding"
      sub="Loading the verified profile builder for your creator workspace."
      mode="creator"
    />
  );
}
