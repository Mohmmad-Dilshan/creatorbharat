import React from 'react';
import AuthContent from '../../components/auth/AuthContent.jsx';

export default function ApplyPage() {
  return (
    <div className="auth-page-wrapper">
      <AuthContent initialView="register" isPage />
    </div>
  );
}
