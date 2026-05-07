import React from 'react';
import { W } from '../../utils/helpers';

const LOGOS = [
  { name: 'Zomato', url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png' },
  { name: 'Nike', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Hotstar', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Hotstar_logo.svg' },
  { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'MakeMyTrip', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/MakeMyTrip_Logo.png' },
  { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Paytm', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg' },
];

export default function BrandTrust() {
  return (
    <section style={{ padding: '60px 0', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ ...W(), textAlign: 'center', marginBottom: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05))', maxWidth: 100 }} />
          <p style={{ fontSize: 13, fontWeight: 900, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '3px' }}>
            Trusted by Bharat's biggest brands
          </p>
          <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, rgba(0,0,0,0.05), transparent)', maxWidth: 100 }} />
        </div>
      </div>
      
      <div className="marquee-container" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="marquee-content">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={`${logo.name}-${i}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 200, padding: '0 40px' }}>
              <img 
                src={logo.url} 
                style={{ height: 32, maxWidth: 140, objectFit: 'contain', filter: 'grayscale(1) opacity(0.3) brightness(0.5)', transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)' }} 
                onMouseEnter={e => { e.target.style.filter = 'grayscale(0) opacity(1) brightness(1)'; e.target.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.target.style.filter = 'grayscale(1) opacity(0.3) brightness(0.5)'; e.target.style.transform = 'scale(1)'; }}
                alt={logo.name} 
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <span style={{ display: 'none', fontSize: 18, fontWeight: 900, color: 'rgba(0,0,0,0.15)', letterSpacing: '-0.02em' }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
