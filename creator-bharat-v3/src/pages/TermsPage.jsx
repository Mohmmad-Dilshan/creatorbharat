import React from 'react';
import EliteHeader from '../components/layout/EliteHeader';
import { W } from '../utils/helpers';

export default function TermsPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 100 }}>
      <EliteHeader 
        eyebrow="Legal"
        title="Terms of Service"
        sub="The rules of engagement for Bharat's largest creator ecosystem."
        light
        compact
      />
      
      <div style={{ ...W(800), padding: '60px 20px', color: '#475569', lineHeight: 1.8 }}>
        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: 32 }}>
          By accessing or using CreatorBharat, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
        </p>

        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>2. Creator Identity</h2>
        <p style={{ marginBottom: 32 }}>
          Creators are responsible for the accuracy of the information provided in their portfolios. Misrepresentation of reach, followers, or engagement may result in account suspension.
        </p>

        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>3. Brand Conduct</h2>
        <p style={{ marginBottom: 32 }}>
          Brands must engage with creators professionally. Any form of harassment or failure to honor agreed-upon payments will result in permanent removal from the platform.
        </p>

        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>4. Platform Fees</h2>
        <p style={{ marginBottom: 32 }}>
          CreatorBharat maintains a 0% commission model for basic verified deals. We do not act as an intermediary for payments unless explicitly requested through our managed services.
        </p>
      </div>
    </div>
  );
}
