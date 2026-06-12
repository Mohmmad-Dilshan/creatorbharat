import React from 'react';
import PropTypes from 'prop-types';
import { Database, Server, ExternalLink } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';

export default function IntelligenceHub({ mob }) {
  return (
    <div style={{ padding: '40px 0' }}>
       <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px', color: '#0f172a' }}>PROTOCOL ARCHITECTURE</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Decentralized node distribution & regional sharding status.</p>
       </div>
       
       {/* Shard Directory */}
       <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '32px', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
             <div style={{ fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}><Server size={18} color="#3B82F6" /> ACTIVE SHARD DIRECTORY</div>
             <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>REFRESHING IN 12s...</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             {OFFICIAL_DATA.shards.map((shard) => (
               <div key={shard.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: shard.status === 'Active' ? '#10B98110' : '#FF943110', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Database size={20} color={shard.status === 'Active' ? '#10B981' : '#FF9431'} />
                     </div>
                     <div>
                        <div style={{ fontSize: '14px', fontWeight: 700 }}>{shard.region}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Node ID: {shard.id}_PROT_001</div>
                     </div>
                  </div>
                  <div style={{ textAlign: 'right', display: mob ? 'none' : 'block' }}>
                     <div style={{ fontSize: '12px', fontWeight: 700, color: shard.status === 'Active' ? '#10B981' : '#FF9431' }}>{shard.status.toUpperCase()}</div>
                     <div style={{ fontSize: '11px', color: '#64748b' }}>Latency: {shard.latency}</div>
                  </div>
                  <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>STATS</button>
               </div>
             ))}
          </div>
       </div>

       {/* Protocol CTA */}
       <div style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
             <div style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Protocol V3.2 Technical Whitepaper</div>
             <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' }}>Explore the consensus logic and trust-score algorithms.</div>
          </div>
          <button style={{ background: '#3B82F6', color: '#fff', padding: '14px 28px', borderRadius: '14px', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
             VIEW DOCS <ExternalLink size={16} />
          </button>
       </div>
    </div>
  );
}

IntelligenceHub.propTypes = {
  mob: PropTypes.bool.isRequired
};
