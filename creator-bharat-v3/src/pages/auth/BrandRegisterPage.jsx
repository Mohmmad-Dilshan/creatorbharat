import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import AuthRedirectScreen from './AuthRedirectScreen';

export default function BrandRegisterPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    dsp({ t: 'UI', v: { authModal: true, authView: 'brand-register' } });
    navigate('/', { replace: true });
  }, [dsp, navigate]);

  return (
    <AuthRedirectScreen
      title="Opening brand console"
      sub="Loading campaign, discovery, and collaboration setup for your brand."
      mode="brand"
    />
  );
}
