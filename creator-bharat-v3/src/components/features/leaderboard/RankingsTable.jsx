import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Layers, Activity, Star, Plus, Check, ArrowUpRight, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import Sparkline from './Sparkline';
import { useApp } from '@/core/context';

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  dark: '#0f172a',
  border: '#e2e8f0',
  green: '#10b981',
  red: '#f43f5e',
  textSec: '#64748b'
};

const MobileRankCard = ({ c, navigate, onScoreClick }) => {
  const [expanded, setExpanded] = useState(false);
  const { st, dsp } = useApp();
  const isCompared = st.compared.includes(c.id);

  return (
    <div style={{
      background: '#ffffff', 
      borderRadius: '24px', 
      border: expanded ? '1.5px solid #FF9431' : '1px solid #e2e8f0',
      marginBottom: '12px', 
      boxShadow: expanded ? '0 12px 24px rgba(255, 148, 49, 0.08)' : '0 8px 20px rgba(0,0,0,0.015)',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {/* Main Row Header */}
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          cursor: 'pointer'
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 950, color: c.rank <= 3 ? THEME.primary : '#94a3b8', width: '28px' }}>#{c.rank}</div>
        <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, color: THEME.textSec, fontSize: '15px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
          {c.avatar ? (
            <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            c.name.charAt(0)
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: THEME.dark, fontSize: '15px', display: 'flex', alignItems: 'center', gap: 4 }}>
            {c.name}
            {c.rank <= 3 && <Star size={12} color="#F59E0B" fill="#F59E0B" />}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>{c.niche} • {c.location}</div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 950, color: THEME.dark, lineHeight: 1 }}>{c.score}</div>
            <div style={{ fontSize: '9px', fontWeight: 900, color: c.trend === 'up' ? THEME.green : THEME.red, marginTop: '2px' }}>
              {c.velocity}
            </div>
          </div>
          <div style={{ color: '#94a3b8' }}>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded Accordion Panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', background: '#fcfcfc', borderTop: '1px solid #e2e8f0' }}
          >
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Detailed Metrics Subgrid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Followers</div>
                  <div style={{ fontSize: '14px', fontWeight: 950, color: THEME.dark, marginTop: '2px' }}>{c.followers} <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 650 }}>({c.tier})</span></div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engagement Rate</div>
                  <div style={{ fontSize: '14px', fontWeight: 950, color: THEME.green, marginTop: '2px' }}>{c.er}</div>
                </div>
              </div>

              {/* Sparkline & Score Trigger */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 14px' }}>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onScoreClick(c);
                  }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ShieldCheck size={14} color={THEME.primary} />
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textDecoration: 'underline' }}>View Score Details</span>
                </div>
                <div>
                  <Sparkline 
                    color={c.trend === 'up' ? THEME.green : THEME.red} 
                    points={c.trend === 'up' ? [15, 12, 10, 5, 2] : [5, 8, 12, 15, 18]} 
                    id={`mob-${c.id}`} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dsp({ t: 'COMPARE', id: c.id });
                  }}
                  style={{
                    flex: 1,
                    background: isCompared ? THEME.primary : 'rgba(15,23,42,0.03)',
                    color: isCompared ? '#fff' : '#64748b',
                    border: isCompared ? 'none' : '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  {isCompared ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                  <span>{isCompared ? 'Compared' : 'Compare'}</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/creator/${c.id}`);
                  }}
                  style={{
                    flex: 1,
                    background: THEME.dark,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <span>View Profile</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

MobileRankCard.propTypes = {
  c: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  onScoreClick: PropTypes.func.isRequired
};

export default function RankingsTable({ creators, mob, navigate, onScoreClick }) {
  const { st, dsp } = useApp();

  if (mob) {
    return (
      <div style={{ padding: '0 4px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h4 style={{ fontSize: '18px', fontWeight: 950, color: THEME.dark }}>Verified Rankings</h4>
           <div style={{ fontSize: '12px', color: THEME.textSec, fontWeight: 700 }}>{creators.length} Found</div>
         </div>
        {creators.map(c => (
          <MobileRankCard key={c.id} c={c} navigate={navigate} onScoreClick={onScoreClick} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Directory Title Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 8px', 
        marginBottom: '12px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', background: 'rgba(255, 148, 49, 0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: THEME.primary }}><BarChart3 size={20} /></div>
          <div>
             <h4 style={{ fontSize: '20px', fontWeight: 950, color: THEME.dark, letterSpacing: '-0.5px' }}>Verified Creator Roster</h4>
             <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Deep analytics verified on the public Pehchan register.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
           <span style={{ fontSize: '11px', color: THEME.textSec, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Platform Consensus:</span>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: THEME.green, fontWeight: 900, fontSize: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: THEME.green, boxShadow: `0 0 6px ${THEME.green}` }} />
              SECURE
           </div>
        </div>
      </div>

      {/* Grid List Deck */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {creators.map((c, i) => {
          const isCompared = st.compared.includes(c.id);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              whileHover={{ 
                y: -4, 
                boxShadow: '0 15px 35px rgba(15,23,42,0.06)', 
                borderColor: 'rgba(255, 148, 49, 0.25)' 
              }}
              onClick={() => navigate(`/creator/${c.id}`)}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '20px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Column 1: Rank & Portrait Identity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1.2 }}>
                <div style={{ fontSize: '18px', fontWeight: 950, color: c.rank <= 3 ? THEME.primary : '#94a3b8', width: '36px' }}>
                  #{c.rank}
                </div>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  border: '2px solid #e2e8f0', 
                  position: 'relative' 
                }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 900, color: THEME.dark, fontSize: '17px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {c.name}
                    {c.rank <= 3 && <Star size={14} color="#F59E0B" fill="#F59E0B" />}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>
                    {c.niche} • {c.location}
                  </div>
                </div>
              </div>

              {/* Column 2: Reach Tier & Followers */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: c.tier === 'Mega' ? '#eff6ff' : '#f0fdf4',
                  color: c.tier === 'Mega' ? '#3b82f6' : '#10b981',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: 900
                }}>
                  <Layers size={12} />
                  {c.tier} Tier
                </div>
                <div style={{ fontSize: '13px', fontWeight: 750, color: THEME.dark }}>
                  {c.followers} <span style={{ color: '#94a3b8', fontWeight: 550 }}>Followers</span>
                </div>
              </div>

              {/* Column 3: Engagement Metrics (Clickable to trigger modal) */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onScoreClick(c);
                }}
                style={{ 
                  flex: 0.8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer'
                }}
                title="Click to view full scoring report"
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 148, 49, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: THEME.primary }}>
                  <Activity size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: THEME.dark, textDecoration: 'underline', decorationColor: '#FF9431' }}>{c.er}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>Engagement</div>
                </div>
              </div>

              {/* Column 4: Growth Velocity Graph */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: c.trend === 'up' ? THEME.green : THEME.red }}>
                    {c.velocity}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>Weekly Delta</div>
                </div>
                <Sparkline 
                  color={c.trend === 'up' ? THEME.green : THEME.red} 
                  points={c.trend === 'up' ? [15, 12, 10, 5, 2] : [5, 8, 12, 15, 18]} 
                  id={c.id} 
                />
              </div>

              {/* Column 5: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     dsp({ t: 'COMPARE', id: c.id });
                   }}
                   style={{ 
                     width: '40px', 
                     height: '40px', 
                     borderRadius: '12px', 
                     background: isCompared ? THEME.primary : '#f8fafc', 
                     border: `1px solid ${isCompared ? THEME.primary : '#e2e8f0'}`, 
                     color: isCompared ? '#fff' : '#0f172a', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     cursor: 'pointer', 
                     transition: 'all 0.2s',
                     boxShadow: isCompared ? '0 4px 12px rgba(255, 148, 49, 0.25)' : 'none'
                   }}
                   title={isCompared ? "Remove from comparison" : "Add to comparison"}
                   onMouseEnter={(e) => { if (!isCompared) e.currentTarget.style.background = '#e2e8f0'; }}
                   onMouseLeave={(e) => { if (!isCompared) e.currentTarget.style.background = '#f8fafc'; }}
                 >
                    {isCompared ? <Check size={16} strokeWidth={3} /> : <Plus size={16} />}
                 </button>
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     navigate(`/creator/${c.id}`);
                   }}
                   style={{ 
                     width: '40px', 
                     height: '40px', 
                     borderRadius: '12px', 
                     background: THEME.dark, 
                     border: 'none', 
                     color: '#fff', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     cursor: 'pointer',
                     transition: 'all 0.2s' 
                   }}
                   onMouseEnter={(e) => { e.currentTarget.style.background = THEME.primary; }}
                   onMouseLeave={(e) => { e.currentTarget.style.background = THEME.dark; }}
                 >
                    <ArrowUpRight size={16} />
                 </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

RankingsTable.propTypes = {
  creators: PropTypes.arrayOf(PropTypes.object).isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  onScoreClick: PropTypes.func.isRequired
};
