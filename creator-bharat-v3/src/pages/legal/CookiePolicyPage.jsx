import React, { useEffect } from 'react';
import { Cookie, Info } from 'lucide-react';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'what-are-cookies', title: '1. What are Cookies?' },
  { id: 'how-we-use', title: '2. How We Use Them' },
  { id: 'cb-score', title: '3. CB Score Analytics' },
  { id: 'managing', title: '4. Managing Cookies' }
];

export default function CookiePolicyPage() {
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
      <Seo title="Cookie Policy | CreatorBharat" description="How CreatorBharat uses cookies to ensure platform security and accurate tracking." />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 100 : 140, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: 100, marginBottom: 24, border: '1px solid rgba(168,85,247,0.2)' }}>
            <Cookie size={16} color="#A855F7" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#A855F7', textTransform: 'uppercase', letterSpacing: 1.5 }}>Tracking & Analytics</span>
          </div>
          <h1 style={{ fontSize: mob ? 36 : 56, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>
            Cookie Policy
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0, maxWidth: 600 }}>
            Ensuring a secure, authenticated session for Escrow and Analytics.
          </p>
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
          
          <div style={{ background: 'rgba(168, 85, 247, 0.05)', borderLeft: '4px solid #A855F7', padding: 24, borderRadius: '0 16px 16px 0', marginBottom: 40 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, color: '#7E22CE', margin: '0 0 8px 0' }}>
              <Info size={20} /> Transparency First
            </h4>
            <p style={{ margin: 0, color: '#7E22CE', fontSize: 15 }}>
              We do not use intrusive third-party advertising cookies. Our cookies are strictly used to keep your financial session secure and to track real engagement metrics.
            </p>
          </div>

          <section id="what-are-cookies" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>1. What are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit CreatorBharat. They help our platform remember your login session, so you don't have to re-authenticate every time you click a new page inside your dashboard.</p>
          </section>

          <section id="how-we-use" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>2. How We Use Them</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Essential (Auth):</strong> JWT tokens stored securely to maintain your logged-in state. Without these, you cannot access your Wallet or Applications.</li>
              <li><strong>Security:</strong> CSRF protection tokens to ensure your Escrow transactions cannot be hijacked.</li>
              <li><strong>Performance:</strong> Caching heavily-loaded pages (like the Creator Marketplace) so they load instantly on your next visit.</li>
            </ul>
          </section>

          <section id="cb-score" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>3. CB Score Analytics</h2>
            <p>For Creators, we utilize first-party analytics to track profile views and engagement from Brands. This data feeds directly into your CB Score. We do NOT share this tracking data with external data brokers.</p>
          </section>

          <section id="managing" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>4. Managing Cookies</h2>
            <p>You can clear cookies directly from your browser settings. Note that doing so will instantly log you out of the CreatorBharat dashboard and clear any unsaved Campaign Builder drafts.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
