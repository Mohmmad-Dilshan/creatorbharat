import React from 'react';
import { T } from '../../theme';
import { W } from '../../utils/helpers';
import { Btn } from '../Primitives';

export default function Features({ mob }) {
  return (
    <section style={{ padding: mob ? '60px 20px' : '100px 20px', background: '#fff', position: 'relative' }}>
      <div style={W()}>
        <div style={{ maxWidth: 800, marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
             <span style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Superpowers for Creators</span>
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 42 : 72, fontWeight: 900, color: '#111', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 24 }}>
            Bas Content Banao, <br /> 
            <span className="gradient-text">Baaki Hum Sambhaal Lenge.</span>
          </h2>
          <p style={{ fontSize: 20, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, fontWeight: 500 }}>
            India's first creator-ecosystem built to turn your passion into a professional business. No more manual data, no more chasing brands.
          </p>
        </div>

        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(12, 1fr)', gridAutoRows: 'minmax(200px, auto)', gap: 24 }}>
          
          {/* Smart Portfolio */}
          <div className="bento-item au" style={{ gridColumn: mob ? '1' : '1 / 9', gridRow: 'span 3', background: '#FDF7F2', padding: mob ? 32 : 48, display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 40, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Apni Pehchan Banao</span>
              <h3 style={{ fontSize: 32, fontWeight: 900, marginTop: 12, marginBottom: 16 }}>Professional Media Kit</h3>
              <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: 24 }}>Ek click mein apne saare socials sync karo. Brands ko WhatsApp screenshot nahi, professional link bhejo.</p>
              <Btn style={{ borderRadius: 100, padding: '12px 24px', fontSize: 14 }}>Claim My Link →</Btn>
            </div>
            <div style={{ flex: 1, width: '100%', maxWidth: 300, background: '#fff', borderRadius: 24, padding: 20, boxShadow: '0 30px 60px rgba(255,148,49,0.15)', border: '1px solid rgba(255,148,49,0.1)', transform: 'rotate(2deg)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" style={{ width: 44, height: 44, borderRadius: '50%' }} />
                 <div style={{ flex: 1 }}>
                    <div style={{ height: 10, width: '60%', background: '#eee', borderRadius: 5, marginBottom: 6 }} />
                    <div style={{ height: 6, width: '30%', background: '#f5f5f5', borderRadius: 3 }} />
                 </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                 <div style={{ height: 60, background: '#FDF7F2', borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 900 }}>240K+</div>
                    <div style={{ fontSize: 8, opacity: 0.5 }}>FOLLS</div>
                 </div>
                 <div style={{ height: 60, background: '#FDF7F2', borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#10B981' }}>8.2%</div>
                    <div style={{ fontSize: 8, opacity: 0.5 }}>ENGAGEMENT</div>
                 </div>
               </div>
            </div>
          </div>

          {/* Direct Deals */}
          <div className="bento-item au d1" style={{ gridColumn: mob ? '1' : '9 / 13', gridRow: 'span 5', background: '#0A0A0A', color: '#fff', padding: 40, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>Paisa Hi Paisa</span>
            <h3 style={{ fontSize: 28, fontWeight: 900, marginTop: 12, marginBottom: 16 }}>Direct Brand Deals</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 40 }}>Koi beech mein nahi. Brands seedha aapko contact karenge. 0% Commission.</p>
            <div style={{ marginTop: 'auto' }}>
               {[
                 { b: 'Starbucks', a: '₹15k', i: '☕' },
                 { b: 'Samsung', a: '₹60k', i: '📱' },
                 { b: 'Myntra', a: '₹35k', i: '👗' }
               ].map((d, i) => (
                 <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '14px 18px', borderRadius: 20, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 20 }}>{d.i}</div>
                    <div style={{ flex: 1 }}>
                       <div style={{ fontSize: 14, fontWeight: 800 }}>{d.b}</div>
                       <div style={{ fontSize: 10, color: '#10B981' }}>Verified Invitation</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 900 }}>{d.a}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="bento-item au d2" style={{ gridColumn: mob ? '1' : '1 / 6', gridRow: 'span 2', background: '#fff', padding: 32, border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Apni Value Jano</h3>
            <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>Track every single follower and click. Know exactly how much your post is worth.</p>
            <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
               {[40, 70, 45, 90, 65, 100, 80, 50].map((h, i) => <div key={i} style={{ flex: 1, height: h + '%', background: '#FF9431', borderRadius: '4px 4px 2px 2px', opacity: 0.2 + (i * 0.1) }} />)}
            </div>
          </div>

          {/* AI Matchmaker */}
          <div className="bento-item au d3" style={{ gridColumn: mob ? '1' : '6 / 9', gridRow: 'span 2', background: 'linear-gradient(135deg, #111, #333)', color: '#fff', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔥</div>
            <h3 style={{ fontSize: 20, fontWeight: 900 }}>Hype Engine</h3>
            <p style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Predicting your next viral content topic...</p>
            <div style={{ marginTop: 16, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
               <div style={{ width: '45%', height: '100%', background: '#FF9431', animation: 'shimmer 2s infinite' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
