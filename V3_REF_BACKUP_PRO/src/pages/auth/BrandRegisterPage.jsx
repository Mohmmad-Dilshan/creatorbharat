import React from 'react';
import AuthContent from '../../components/auth/AuthContent.jsx';

export default function BrandRegisterPage() {
  return (
    <div className="auth-page-wrapper">
      <AuthContent initialView="brand-register" isPage />
    </div>
  );
}
