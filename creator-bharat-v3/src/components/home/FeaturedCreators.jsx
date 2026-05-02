import React from 'react';
import { W } from '../../theme';
import { SH, Btn } from '../Primitives';
import { CreatorCard } from '../Cards';

export default function FeaturedCreators({ mob, creators, go, loading }) {
  return (
    <section style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#fff' }}>
      <div style={W()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 600 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 16, display: 'block' }}>Elite Talent</span>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 42 : 64, fontWeight: 900, color: '#111', lineHeight: 1, letterSpacing: '-0.02em' }}>
              Meet the Creators <br />Defining Bharat.
            </h2>
          </div>
          <Btn variant="ghost" onClick={() => go('creators')} style={{ padding: '16px 32px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 700 }}>
            View All Talent →
          </Btn>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
          {loading 
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ height: 450, borderRadius: 32, background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'shimmer 2s infinite' }} />
                </div>
              ))
            : creators.slice(0, 3).map(c => (
                <div key={c.id} className="au">
                  <CreatorCard creator={c} onView={() => go('creator-profile', { creator: c })} />
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
