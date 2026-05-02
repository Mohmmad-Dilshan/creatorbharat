import React from 'react';
import { W, T } from '../../theme';

export default function Footer({ mob }) {
  const currentYear = new Date().getFullYear();
  
  const links = {
    Product: ['Features', 'Pricing', 'Creator Search', 'Brand Tools'],
    Company: ['About Us', 'Careers', 'Blog', 'Contact'],
    Resources: ['Help Center', 'Community Guidelines', 'Privacy Policy', 'Terms of Service'],
    Social: ['Instagram', 'Twitter', 'LinkedIn', 'YouTube']
  };

  return (
    <footer style={{ background: '#050505', color: '#fff', padding: mob ? '80px 20px 40px' : '120px 20px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={W()}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '2fr 1fr 1fr 1fr', gap: mob ? 60 : 40, marginBottom: 80 }}>
          {/* Logo & About */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: T.gd, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900 }}>CB</div>
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>CreatorBharat</span>
            </div>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 32 }}>
              Building the professional infrastructure for India's creator economy. Join 50,000+ creators scaling their influence.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['📸', '🐦', '💼', '📺'].map((emoji, i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 style={{ fontSize: 14, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 24 }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(item => (
                  <li key={item} style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ pt: 40, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: 24, padding: '40px 0 0' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>
            © {currentYear} CreatorBharat. All rights reserved. Made with ❤️ in Bharat.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
             <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Privacy Policy</span>
             <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
