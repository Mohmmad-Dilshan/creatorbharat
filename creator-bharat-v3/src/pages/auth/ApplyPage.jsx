import React from 'react';
import { AuthContent } from '../../components/auth/AuthContent';
import { Logo } from '../../components/ui';

export default function ApplyPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at 82% 18%, rgba(255,148,49,0.06), transparent 30%), #F8FAFC', 
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </div>
        <div style={{ maxWidth: 1060, margin: '0 auto', width: '100%' }}>
          <AuthContent initialView="register" isPage />
        </div>
      </div>
    </div>
  );
}
