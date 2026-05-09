import React from 'react';
import AuthContent from '../../components/auth/AuthContent.jsx';

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page-wrapper">
      <AuthContent initialView="forgot" isPage />
    </div>
  );
}
