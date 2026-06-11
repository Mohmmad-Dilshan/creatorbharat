import React, { useEffect } from 'react';
import { BadgeCheck, AlertTriangle, Clock, Zap } from 'lucide-react';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'authenticity', title: '1. Authenticity & Fake Followers' },
  { id: 'delivery', title: '2. The 48-Hour Delivery Rule' },
  { id: 'quality', title: '3. Content Quality & Revisions' },
  { id: 'professionalism', title: '4. Professional Conduct' }
];

export default function CreatorGuidelinesPage() {
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
      <Seo title="Creator Guidelines | CreatorBharat" description="Strict rules and guidelines for creators on the CreatorBharat Escrow platform." />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 100 : 140, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 100, marginBottom: 24, border: '1px solid rgba(59,130,246,0.2)' }}>
            <BadgeCheck size={16} color="#3B82F6" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: 1.5 }}>Creator Rules</span>
          </div>
          <h1 style={{ fontSize: mob ? 36 : 56, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>
            Creator Guidelines
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0, maxWidth: 600 }}>
            Protecting your Blue Tick requires strict adherence to our professional standards.
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
          
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #EF4444', padding: 24, borderRadius: '0 16px 16px 0', marginBottom: 40 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, color: '#991B1B', margin: '0 0 8px 0' }}>
              <AlertTriangle size={20} /> The Strike System
            </h4>
            <p style={{ margin: 0, color: '#991B1B', fontSize: 15 }}>
              Violating these guidelines results in strikes against your profile. <strong>Three strikes</strong> lead to a permanent ban and the revocation of your Verified Badge and CB Score.
            </p>
          </div>

          <section id="authenticity" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>1. Authenticity & Fake Followers</h2>
            <p>Your CB Score is built on trust. If our system detects an artificial inflation of followers, likes, or comments (via bots or engagement pods):</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Your profile will be immediately suspended.</li>
              <li>Any active Escrow funds will be frozen.</li>
              <li>Your CB Score will be permanently reset to 0.</li>
            </ul>
          </section>

          <section id="delivery" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>2. The 48-Hour Delivery Rule</h2>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 800 }}><Clock size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }}/> STRICT</div>
            </div>
            <p>Once a Brand deposits funds into Escrow and you accept the campaign, the clock starts. If you fail to submit the first draft of the deliverable within the agreed timeline (or ghost the brand for 48 hours past the deadline):</p>
            <p><strong>The brand is entitled to a full, automatic refund from Escrow.</strong> You will receive a strike, and your "Completion Rate" metric will drop, directly affecting your ability to get future deals.</p>
          </section>

          <section id="quality" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>3. Content Quality & Revisions</h2>
            <p>You must follow the Brand's brief exactly as agreed before the Escrow was funded. If the Brand requests a reasonable revision because you missed a key requirement in the brief, you are obligated to provide it.</p>
            <p>However, if the Brand tries to change the brief <em>after</em> the Escrow is funded (Scope Creep), you are protected. You can decline the new requests and still receive your payment through our dispute system.</p>
          </section>

          <section id="professionalism" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>4. Professional Conduct</h2>
            <p>We expect all verified creators to behave professionally. Using offensive language in chat, attempting to bypass the platform payment system, or threatening brands will result in an immediate permanent ban.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
