import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS, fmt } from '../theme';
import { Btn, SH, Empty } from '../components/Primitives';

export default function ComparePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const allC = LS.get('cb_creators', []);
  const creators = st.compared.map(id => allC.find(c => c.id === id)).filter(Boolean);

  if (creators.length < 2) return <div style={{ ...W(), padding: '80px 20px' }}><Empty icon="⚖" title="Select at least 2 creators" sub="Browse creators and click Compare." ctaLabel="Browse Creators" onCta={() => go('creators')} /></div>;

  const fields = [['Followers', c => fmt.num(c.followers)], ['ER', c => c.er + '%'], ['Min Rate', c => fmt.inr(c.rateMin)], ['Score', c => c.score || fmt.score(c)], ['City', c => c.city]];

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W()}><SH eyebrow="Compare" title="Side by Side" light mb={0} /></div>
      </div>
      <div style={{ padding: mob ? '24px 20px' : '40px 20px', overflowX: 'auto' }}>
        <div style={W()}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${T.bd}` }}>
                <th style={{ width: 160, padding: '12px 16px', textAlign: 'left', color: T.t3 }}>Field</th>
                {creators.map(c => (
                  <th key={c.id} style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: 52, height: 52, borderRadius: '50%', marginBottom: 8 }} alt="" />
                    <p style={{ fontSize: 14, fontWeight: 700, color: T.n8 }}>{c.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map(([label, getValue]) => (
                <tr key={label} style={{ borderBottom: `1px solid ${T.bg3}` }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: T.t2, fontWeight: 600 }}>{label}</td>
                  {creators.map(c => <td key={c.id} style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, color: T.n8 }}>{getValue(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
