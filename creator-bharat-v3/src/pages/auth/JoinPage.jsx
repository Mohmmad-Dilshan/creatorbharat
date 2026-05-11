import React from 'react';
import AuthContent from '../../components/auth/AuthContent.jsx';

export default function JoinPage() {
  return (
    <div className="auth-page-wrapper">
      <AuthContent initialView="gateway" isPage />
    </div>
  );
}
