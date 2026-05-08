import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const sections = [
  {
    icon: BadgeCheck,
    title: 'Authentic Identity',
    text: 'Use your real creator identity, current profile links, accurate city details, and honest audience data. CreatorBharat is built on verified trust.',
  },
  {
    icon: Briefcase,
    title: 'Professional Collaboration',
    text: 'Reply to brands clearly, respect campaign timelines, disclose deliverables, and keep all deal communication transparent.',
  },
  {
    icon: ShieldCheck,
    title: 'Brand-Safe Content',
    text: 'Avoid fake engagement, copied content, misleading claims, unsafe promotions, or content that harms community trust.',
  },
  {
    icon: Handshake,
    title: 'Fair Payments',
    text: 'Creators should quote responsibly and brands should honor approved deliverables, usage rights, and payment commitments.',
  },
];

export default function CreatorGuidelinesPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <section style={{ background: '#050505', color: '#fff', padding: '150px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(255,148,49,0.16), transparent 34%), radial-gradient(circle at 82% 28%, rgba(19,136,8,0.13), transparent 30%)' }} />
        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'rgba(255,148,49,0.12)', color: '#FF9431', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 22 }}>
            <Sparkles size={14} /> Platform Standard
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(38px, 7vw, 76px)', lineHeight: 0.98, fontWeight: 950, margin: 0, letterSpacing: 0 }}>
            Creator Guidelines
          </h1>
          <p style={{ maxWidth: 680, marginTop: 22, color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.7 }}>
            The operating code for creators and brands using CreatorBharat. Simple rules, high trust, better collaborations.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
          {sections.map(item => {
            const Icon = item.icon;
            return (
              <article key={item.title} style={{ border: '1px solid #eef2f7', borderRadius: 18, padding: 24, background: '#fff', boxShadow: '0 20px 50px rgba(15,23,42,0.04)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,148,49,0.1)', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={20} />
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>{item.title}</h2>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>{item.text}</p>
              </article>
            );
          })}
        </div>

        <section style={{ marginTop: 34, borderRadius: 24, background: '#f8fafc', border: '1px solid #e2e8f0', padding: 28 }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 950, color: '#0f172a', margin: '0 0 18px' }}>
            <CheckCircle2 size={22} color="#138808" /> Quick Checklist
          </h2>
          <div style={{ display: 'grid', gap: 12, color: '#475569', fontSize: 15, lineHeight: 1.6 }}>
            <p>Keep profile information accurate and updated.</p>
            <p>Do not inflate followers, engagement, screenshots, or brand results.</p>
            <p>Disclose sponsored collaborations wherever required by platform rules.</p>
            <p>Respect campaign briefs, revision limits, deadlines, and payment terms.</p>
            <p>Report suspicious, abusive, or off-platform payment behavior to CreatorBharat.</p>
          </div>
        </section>

        <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/privacy" style={{ color: '#0f172a', fontWeight: 850, textDecoration: 'none', padding: '12px 18px', borderRadius: 999, border: '1px solid #e2e8f0' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: '#0f172a', fontWeight: 850, textDecoration: 'none', padding: '12px 18px', borderRadius: 999, border: '1px solid #e2e8f0' }}>Terms of Service</Link>
          <Link to="/contact" style={{ color: '#fff', background: '#0f172a', fontWeight: 850, textDecoration: 'none', padding: '12px 18px', borderRadius: 999 }}>Contact Support</Link>
        </div>
      </main>
    </div>
  );
}
