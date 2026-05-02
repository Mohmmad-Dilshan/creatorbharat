import React from 'react';
import { W, T } from '../../theme';
import { SH } from '../Primitives';

export default function Faq({ mob }) {
  const items = [
    { q: "Is CreatorBharat free for creators?", a: "Yes, our core features including the Smart Media Kit and Brand Discovery are free for all verified creators." },
    { q: "How do I get the Verified Badge?", a: "Once you connect your socials, our AI audits your engagement and authenticity. If you pass our quality score, you get the badge automatically." },
    { q: "Do you take commission from brand deals?", a: "No, we believe in a transparent ecosystem. You negotiate and receive payments directly from brands. Zero commission." },
    { q: "Can brands see my private contact info?", a: "Only verified brands with a professional account can send you inquiry requests. Your data is always secure." }
  ];

  return (
    <section style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#FAFAFA' }}>
      <div style={W(800)}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Information</span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 36 : 56, fontWeight: 900, marginTop: 16 }}>Common Questions</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((f, i) => (
            <details key={i} className="bento-item" style={{ background: '#fff', padding: '0', cursor: 'pointer' }}>
              <summary style={{ padding: '24px 32px', fontWeight: 800, fontSize: 18, color: '#111', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {f.q}
                <span style={{ fontSize: 24, color: '#FF9431' }}>+</span>
              </summary>
              <div style={{ padding: '0 32px 32px', fontSize: 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
