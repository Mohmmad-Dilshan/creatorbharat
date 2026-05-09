import React from 'react';
import AuthContent from '../../components/auth/AuthContent.jsx';

export default function LoginPage() {
  return (
    <div className="auth-page-wrapper">
      <AuthContent initialView="login" isPage />
    </div>
  );
}
