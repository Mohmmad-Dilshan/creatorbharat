import React from 'react';
import { W, T } from '../../theme';

const FEEDBACK = [
  { name: 'Arjun Mehta', niche: 'Tech & Gadgets', text: 'CreatorBharat helped me close my first ₹1L deal. The verified badge actually works!', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Sana Khan', niche: 'Fashion & Beauty', text: "Finally a professional ecosystem that actually attracts high-end brands.", img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Vikram Singh', niche: 'Travel & Vlogs', text: 'The analytics are insane. I finally know exactly what my reach is worth.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' }
];

export default function Testimonials({ mob }) {
  return (
    <section style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#fff', overflow: 'hidden' }}>
      <div style={W()}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Community</span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 42 : 64, fontWeight: 900, marginTop: 16 }}>The Wall of <span className="gradient-text">Trust.</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {FEEDBACK.map((t, i) => (
            <div key={i} className="bento-item au" style={{ padding: 40, border: '1px solid rgba(0,0,0,0.04)', background: '#FDFDFD' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <img src={t.img} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} alt={t.name} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#FF9431', fontWeight: 700 }}>{t.niche}</div>
                </div>
              </div>
              <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
