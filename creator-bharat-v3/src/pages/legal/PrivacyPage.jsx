import React, { useEffect } from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'data-collection', title: '1. Information We Collect' },
  { id: 'kyc-data', title: '2. KYC & Identity Data' },
  { id: 'data-sharing', title: '3. Data Sharing & Partners' },
  { id: 'security', title: '4. Data Security' },
  { id: 'user-rights', title: '5. Your Privacy Rights' },
];

export default function PrivacyPage() {
  const mob = window.innerWidth < 768;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      <Seo title="Privacy Policy | CreatorBharat" description="How CreatorBharat protects your data, KYC documents, and Escrow transactions." />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 100 : 140, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: 100, marginBottom: 24, border: '1px solid rgba(34,197,94,0.2)' }}>
            <Lock size={16} color="#22C55E" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#22C55E', textTransform: 'uppercase', letterSpacing: 1.5 }}>Data Protection</span>
          </div>
          <h1 style={{ fontSize: mob ? 36 : 56, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>Last Updated: June 1, 2026</p>
        </div>
      </div>

      {/* CONTENT LAYOUT */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px', display: 'flex', gap: 60, flexDirection: mob ? 'column' : 'row' }}>
        
        {/* SIDEBAR */}
        {!mob && (
          <div style={{ width: 260, flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: 120 }}>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Contents</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SECTIONS.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, fontSize: 15, fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN TEXT */}
        <div style={{ flex: 1, fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          
          <div style={{ background: 'rgba(34, 197, 94, 0.05)', borderLeft: '4px solid #22C55E', padding: 24, borderRadius: '0 16px 16px 0', marginBottom: 40 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, color: '#166534', margin: '0 0 8px 0' }}>
              <ShieldCheck size={20} /> Bank-Grade Security
            </h4>
            <p style={{ margin: 0, color: '#166534', fontSize: 15 }}>
              We do not sell your personal data. Period. As a financial intermediary managing Escrow transactions, your privacy and data security are our highest priorities.
            </p>
          </div>

          <section id="data-collection" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>1. Information We Collect</h2>
            <p>We collect information directly from you when you register, including your name, email, brand name, social media handles, and engagement metrics. For creators, we dynamically fetch public metrics via official APIs to calculate your CB Score.</p>
          </section>

          <section id="kyc-data" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>2. KYC & Identity Data</h2>
            <p>To prevent fraud and maintain the integrity of our Blue/Orange Ticks, we require KYC verification.</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><strong>Government IDs:</strong> Aadhaar, PAN, or GSTIN documents are processed by our secure third-party KYC partners. <em>We do not store raw images of your ID cards on our servers.</em></li>
              <li><strong>Bank Details:</strong> Account numbers and UPI IDs are collected solely for routing your Escrow payouts safely.</li>
            </ul>
          </section>

          <section id="data-sharing" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>3. Data Sharing & Partners</h2>
            <p>We only share data with essential infrastructure partners to make the platform work:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><strong>Razorpay:</strong> We share transaction data required to process Escrow payments and creator payouts securely.</li>
              <li><strong>Brands:</strong> If you are a Creator, your CB Score, public portfolio, and verified status are visible to Brands to help them hire you. Your private contact info is only shared <em>after</em> a campaign is agreed upon.</li>
            </ul>
          </section>

          <section id="security" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>4. Data Security</h2>
            <p>We implement strict security measures including AES-256 encryption for database at-rest data, TLS 1.3 for data in transit, and multi-factor authentication for our internal staff. No employee has direct access to your financial routing data.</p>
          </section>

          <section id="user-rights" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>5. Your Privacy Rights</h2>
            <p>Under the DPDP Act (India), you have the right to request a copy of your data or request account deletion. However, if you have active Escrow transactions or pending disputes, deletion requests will be paused until the financial obligations are cleared.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
