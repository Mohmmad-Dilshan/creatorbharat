import React from 'react';
import PropTypes from 'prop-types';
import { Globe, Shield, Zap, BarChart, ChevronRight } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';

export default function InsightsGrid({ mob }) {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
         {[
           { l: 'Network Reach', v: '85.4M', i: Globe, c: '#3B82F6', t: '+4.2%' },
           { l: 'Trust Handshakes', v: '12.4M', i: Shield, c: '#10B981', t: '+12.1%' },
           { l: 'Protocol Revenue', v: '₹4.8Cr', i: Zap, c: '#7C3AED', t: '+8.4%' }
         ].map((s) => (
           <div key={s.l} style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                 <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${s.c}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.i size={22} color={s.c} /></div>
                 <div style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', background: '#10B98110', padding: '4px 8px', borderRadius: '6px' }}>{s.t}</div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a' }}>{s.v}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>{s.l.toUpperCase()}</div>
           </div>
         ))}
      </div>

      {/* Regional Growth Table */}
      <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '32px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart size={20} color="#3B82F6" /> REGIONAL PERFORMANCE</div>
            <button style={{ color: '#3B82F6', fontSize: '13px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View Detailed Report</button>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {OFFICIAL_DATA.analytics.regions.map((reg) => (
              <div key={reg.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{reg.name}</div>
                 </div>
                 <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ fontSize: '14px', fontWeight: 700 }}>{reg.count}</div>
                       <div style={{ fontSize: '10px', color: '#64748b' }}>CREATORS</div>
                    </div>
                    <div style={{ color: '#10B981', fontSize: '13px', fontWeight: 800 }}>{reg.trend}</div>
                    <ChevronRight size={18} color="#cbd5e1" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

InsightsGrid.propTypes = {
  mob: PropTypes.bool.isRequired
};
