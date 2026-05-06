import React from 'react';
import EliteHeader from '../components/layout/EliteHeader';
import { W } from '../utils/helpers';

export default function PrivacyPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 100 }}>
      <EliteHeader 
        eyebrow="Compliance"
        title="Privacy Policy"
        sub="How we protect your data and identity in the digital ecosystem."
        light
        compact
      />
      
      <div style={{ ...W(800), padding: '60px 20px', color: '#475569', lineHeight: 1.8 }}>
        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>1. Introduction</h2>
        <p style={{ marginBottom: 32 }}>
          At CreatorBharat, we take your privacy seriously. This policy explains how we collect, use, and safeguard your information when you use our platform to build your digital identity or discover talent.
        </p>

        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>2. Data Collection</h2>
        <p style={{ marginBottom: 32 }}>
          We collect information that you provide directly to us, such as when you create a profile, apply for verification, or communicate with brands. This includes your name, handle, city, niche, and social media metrics.
        </p>

        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>3. How We Use Your Data</h2>
        <p style={{ marginBottom: 32 }}>
          Your data is used to populate your Public Portfolio, provide analytics to brands, and improve our discoverability algorithms. We do NOT sell your personal data to third-party advertisers.
        </p>

        <h2 style={{ color: '#111', fontSize: 24, fontWeight: 900, marginBottom: 24 }}>4. Security</h2>
        <p style={{ marginBottom: 32 }}>
          We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
        </p>
      </div>
    </div>
  );
}
