import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Layers, Activity, Star, Plus, ArrowUpRight, BarChart3 } from 'lucide-react';
import Sparkline from './Sparkline';

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  dark: '#ffffff', // Main typography changed to high-contrast white
  glass: 'rgba(255, 255, 255, 0.02)',
  border: 'rgba(255, 255, 255, 0.08)',
  green: '#10b981',
  red: '#f43f5e',
  textSec: '#94a3b8'
};

const MobileRankCard = ({ c, navigate }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    onClick={() => navigate(`/creator/${c.id}`)}
    style={{
      background: 'rgba(255, 255, 255, 0.02)', 
      backdropFilter: 'blur(12px)',
      padding: '20px', 
      borderRadius: '24px', 
      border: '1px solid rgba(255, 255, 255, 0.05)',
      marginBottom: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
    }}
  >
    <div style={{ fontSize: '18px', fontWeight: 950, color: c.rank <= 3 ? THEME.primary : '#64748b', width: '32px' }}>#{c.rank}</div>
    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, color: THEME.textSec, fontSize: '16px', overflow: 'hidden' }}>
      {c.avatar ? (
        <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        c.name.charAt(0)
      )}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 900, color: '#fff', fontSize: '17px' }}>{c.name}</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{c.niche} • {c.followers} • ER: {c.er}</div>
    </div>
    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
       <div style={{ fontSize: '18px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>{c.score}</div>
       <div style={{ fontSize: '9px', fontWeight: 900, color: c.trend === 'up' ? THEME.green : THEME.red, background: c.trend === 'up' ? THEME.green + '10' : THEME.red + '10', padding: '2px 6px', borderRadius: '100px', display: 'inline-block' }}>
          {c.velocity}
       </div>
    </div>
  </motion.div>
);

MobileRankCard.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    er: PropTypes.string.isRequired,
    trend: PropTypes.string.isRequired,
    velocity: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  navigate: PropTypes.func.isRequired
};

export default function RankingsTable({ creators, mob, navigate }) {
  if (mob) {
    return (
      <div style={{ padding: '0 4px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#fff' }}>Verified Rankings</h4>
           <div style={{ fontSize: '12px', color: THEME.textSec, fontWeight: 700 }}>{creators.length} Found</div>
         </div>
        {creators.map(c => (
          <MobileRankCard key={c.id} c={c} navigate={navigate} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.02)', 
      backdropFilter: 'blur(16px)',
      borderRadius: '40px', 
      border: '1px solid ' + THEME.border, 
      overflow: 'hidden', 
      boxShadow: '0 30px 70px rgba(0,0,0,0.15)' 
    }}>
      <div style={{ padding: '40px', borderBottom: '1px solid ' + THEME.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(255, 148, 49, 0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: THEME.primary }}><BarChart3 size={24} /></div>
          <div>
             <h4 style={{ fontSize: '24px', fontWeight: 950, color: '#fff', letterSpacing: '-0.5px' }}>Intelligence Index</h4>
             <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>Deep-dive analysis of top 100 creators.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.8px' }}>System Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: THEME.green, fontWeight: 900, fontSize: '14px' }}>
                 <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.green, boxShadow: `0 0 6px ${THEME.green}` }} />
                 OPTIMAL
              </div>
           </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Identity</th>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Reach Tier</th>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Intelligence</th>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Growth Velocity</th>
              <th style={{ padding: '24px 40px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {creators.map((c, i) => (
              <motion.tr 
                key={c.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.03 }} 
                style={{ borderBottom: '1px solid ' + THEME.border, cursor: 'pointer' }} 
                whileHover={{ background: 'rgba(255, 255, 255, 0.03)' }} 
                onClick={() => navigate(`/creator/${c.id}`)}
              >
                <td style={{ padding: '28px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 950, color: i < 3 ? THEME.primary : '#64748b', width: '32px' }}>#{c.rank}</div>
                    <div style={{ width: '56px', height: '56px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, color: THEME.textSec, fontSize: '16px', position: 'relative', overflow: 'hidden' }}>
                      {c.avatar ? (
                        <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        c.name.charAt(0)
                      )}
                      {c.rank === 1 && <div style={{ position: 'absolute', top: -8, right: -8, background: THEME.primary, borderRadius: '50%', padding: '4px' }}><Star size={10} color="#fff" fill="#fff" /></div>}
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, color: '#fff', fontSize: '18px', marginBottom: '2px' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{c.niche} • {c.location}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '28px 40px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', background: c.tier === 'Mega' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)', color: c.tier === 'Mega' ? '#3b82f6' : '#10b981', fontWeight: 900, fontSize: '12px' }}>
                     <Layers size={14} /> {c.tier}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginTop: '6px', marginLeft: '4px' }}>{c.followers} followers</div>
                </td>
                <td style={{ padding: '28px 40px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Activity size={18} color={THEME.primary} />
                      </div>
                      <div>
                         <div style={{ fontSize: '16px', fontWeight: 950, color: '#fff' }}>{c.er}</div>
                         <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Engagement</div>
                      </div>
                   </div>
                </td>
                <td style={{ padding: '28px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <div>
                        <div style={{ fontSize: '16px', fontWeight: 950, color: c.trend === 'up' ? THEME.green : THEME.red }}>{c.velocity}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Weekly Delta</div>
                     </div>
                     <Sparkline color={c.trend === 'up' ? THEME.green : THEME.red} points={c.trend === 'up' ? [15, 10 + (c.id.codePointAt ? c.id.codePointAt(0) % 5 : c.id % 5), 12, 5, 2] : [5, 8 + (c.id.codePointAt ? c.id.codePointAt(0) % 5 : c.id % 5), 12, 15, 18]} id={c.id} />
                  </div>
                </td>
                <td style={{ padding: '28px 40px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                     <button style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }}>
                        <Plus size={18} />
                     </button>
                     <button style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#FF9431', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <ArrowUpRight size={18} />
                     </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

RankingsTable.propTypes = {
  creators: PropTypes.arrayOf(PropTypes.object).isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};
