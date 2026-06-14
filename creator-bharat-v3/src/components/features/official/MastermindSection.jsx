import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Mail, 
  History, 
  TrendingUp, 
  Terminal,
  Cpu,
  Server
} from 'lucide-react';
import { 
  LinkedinIcon, 
  GithubIcon 
} from '@/components/icons/SocialIcons';
import { OFFICIAL_DATA } from './officialData';

const DilshanImg = "https://ui-avatars.com/api/?name=Mohmmad+Dilshan&background=0f172a&color=fff&size=512";

export default function MastermindSection({ mob }) {
  const [filter, setFilter] = useState('all');
  const [showConsoleLog, setShowConsoleLog] = useState(false);

  const filteredTeam = OFFICIAL_DATA.team.filter(member => {
    if (member.id === 'dilshan') return false; // Dilshan is already featured in the elite card
    if (filter === 'all') return true;
    if (filter === 'engineering') return member.category === 'engineering';
    if (filter === 'design') return member.category === 'design' || member.category === 'operations';
    return true;
  });

  return (
    <div style={{ padding: '40px 0' }}>
       {/* Elite Founder Card */}
       <motion.div 
         whileHover={{ y: -6, boxShadow: '0 30px 60px rgba(59,130,246,0.25)', borderColor: 'rgba(59,130,246,0.2)' }}
         style={{ 
            background: 'linear-gradient(135deg, #090d16 0%, #151e33 100%)', 
            borderRadius: '32px', 
            padding: mob ? '32px 24px' : '48px', 
            color: '#fff', 
            marginBottom: '40px', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(15,23,42,0.4)',
            border: '1.5px solid rgba(255,255,255,0.05)',
            transition: 'border-color 0.3s ease'
         }}
       >
          {/* Background Decor - Fixed pointer events to prevent scroll locks */}
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', opacity: 0.2, zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: '-20px', bottom: '-20px', opacity: 0.03, pointerEvents: 'none' }}><ShieldCheck size={200} /></div>

          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: '40px', alignItems: mob ? 'center' : 'flex-start', position: 'relative', zIndex: 1 }}>
             {/* Founder Photo */}
             <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '4px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                   <img src={DilshanImg} alt="Mohmmad Dilshan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-10px', 
                  right: '-10px', 
                  background: '#3B82F6', 
                  color: '#fff', 
                  padding: '6px 12px', 
                  borderRadius: '100px', 
                  fontSize: '10px', 
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.5)'
                }}>
                   <ShieldCheck size={12} fill="#fff" color="#3B82F6" /> VERIFIED FOUNDER
                </div>
             </div>

             {/* Founder Info */}
             <div style={{ flex: 1, textAlign: mob ? 'center' : 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                   <h4 style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-0.03em', margin: 0 }}>{OFFICIAL_DATA.founder.name}</h4>
                   <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 850, letterSpacing: '1px' }}>{OFFICIAL_DATA.founder.role.toUpperCase()}</div>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', gap: '6px', color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                      <MapPin size={14} /> {OFFICIAL_DATA.founder.location}
                   </div>
                </div>
                <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.7, marginBottom: '24px', maxWidth: '500px', fontWeight: 500 }}>
                   "{OFFICIAL_DATA.founder.vision}"
                </p>
                
                {/* Tech Commits & Node Stats Sub-Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px', maxWidth: '500px' }}>
                  {[
                    { l: 'Node Shard', v: 'MH_001_HQ', i: Server, c: '#3B82F6' },
                    { l: 'Verified Commits', v: '184 Commits', i: Terminal, c: '#FF9431' },
                    { l: 'Consensus Weight', v: '99.8%', i: Cpu, c: '#10B981' }
                  ].map(stat => (
                    <div key={stat.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', padding: '10px 12px', textAlign: mob ? 'center' : 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', gap: '6px', marginBottom: '4px' }}>
                        <stat.i size={12} color={stat.c} />
                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{stat.l}</span>
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#fff' }}>{stat.v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start', gap: '12px', marginBottom: '32px' }}>
                   {OFFICIAL_DATA.founder.achievements.map((a) => (
                     <div key={a} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Award size={16} color="#FFD700" /> {a}
                     </div>
                   ))}
                </div>

                <div style={{ display: 'flex', justifyContent: mob ? 'center' : 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                   <a 
                     href="https://linkedin.com/company/creatorbharat" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     style={{ textDecoration: 'none', background: '#fff', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                   >
                      <LinkedinIcon size={18} /> Connect
                   </a>
                   <a 
                     href="mailto:contact@creatorbharat.com" 
                     style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                   >
                      <Mail size={18} /> Contact
                   </a>
                   <button 
                     onClick={() => setShowConsoleLog(!showConsoleLog)}
                     style={{ background: 'rgba(59,130,246,0.15)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.3)', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                   >
                      <Terminal size={16} /> {showConsoleLog ? 'Hide Commits' : 'View System Log'}
                   </button>
                </div>
             </div>
          </div>

          {/* Interactive mock console system commits */}
          {showConsoleLog && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ background: '#05070a', borderRadius: '16px', padding: '20px', marginTop: '32px', fontFamily: 'monospace', fontSize: '11px', color: '#a7f3d0', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'left', overflow: 'hidden' }}
            >
              <div style={{ color: '#64748b', marginBottom: '8px' }}>// CB NODE HQ SYSTEM COMIMIT LOGS</div>
              <div>&gt; [2026-06-14 06:12:04] COMMIT: Refactored stats pipeline to pull live creator cache endpoints. (Verified)</div>
              <div>&gt; [2026-06-13 19:42:01] COMMIT: Syncing Western edge cluster nodes. Average latency 12ms. (Passed)</div>
              <div>&gt; [2026-06-11 11:23:44] COMMIT: Hardening OAuth 2.1 token validations across brand shards. (Audited)</div>
              <div style={{ color: '#10b981', marginTop: '8px', fontWeight: 'bold' }}>&gt; Node Status: 100% Operational. Consensus established.</div>
            </motion.div>
          )}
       </motion.div>

       {/* Core Team Roster Section */}
       <div style={{ marginTop: '60px', marginBottom: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '1px', color: '#0f172a' }}>CORE ARCHITECTS & LEADERS</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>The technical and operational minds directing the CreatorBharat platform.</p>
          
          {/* Roster Category Filter Toggles */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
             {[
               { id: 'all', label: 'All Operations' },
               { id: 'engineering', label: 'Engineering & Trust' },
               { id: 'design', label: 'UX & Operations' }
             ].map(btn => (
               <button
                 key={btn.id}
                 onClick={() => setFilter(btn.id)}
                 style={{
                   background: filter === btn.id ? '#0f172a' : '#f1f5f9',
                   color: filter === btn.id ? '#fff' : '#475569',
                   border: 'none',
                   padding: '10px 20px',
                   borderRadius: '100px',
                   fontSize: '12px',
                   fontWeight: 800,
                   cursor: 'pointer',
                   transition: 'all 0.2s ease',
                   boxShadow: filter === btn.id ? '0 8px 16px rgba(15,23,42,0.15)' : 'none'
                 }}
               >
                 {btn.label}
               </button>
             ))}
          </div>
       </div>

       {/* Core Team Grid */}
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '60px' }}>
          {filteredTeam.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -4, borderColor: member.category === 'engineering' ? '#3B82F6' : (member.category === 'design' ? '#7C3AED' : '#10B981') }}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '24px',
                padding: '24px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Corner accent glow - Fixed pointer events to prevent scroll locks */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: member.category === 'engineering' ? '#3B82F6' : (member.category === 'design' ? '#7C3AED' : '#10B981'),
                opacity: 0.1,
                filter: 'blur(10px)',
                pointerEvents: 'none'
              }} />

              <div>
                {/* Header: Avatar + Metadata */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        border: '2px solid #fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '-4px', 
                      right: '-4px',
                      background: member.category === 'engineering' ? '#3B82F6' : (member.category === 'design' ? '#7C3AED' : '#10B981'),
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: '2px solid #fff'
                    }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{member.name}</span>
                      {member.verified && <ShieldCheck size={14} color="#3B82F6" fill="#3B82F6" style={{ fill: '#fff' }} />}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>
                      <MapPin size={10} /> {member.location}
                    </div>
                  </div>
                </div>

                {/* Professional Vision Statement */}
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic', fontWeight: 500 }}>
                  "{member.bio}"
                </p>

                {/* Technical Skills Accents */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {member.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '10.5px',
                        fontWeight: 700
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Platform Nodes and Connections */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: 'auto' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  color: member.category === 'engineering' ? '#3B82F6' : (member.category === 'design' ? '#7C3AED' : '#10B981'),
                  background: member.category === 'engineering' ? '#3B82F612' : (member.category === 'design' ? '#7C3AED12' : '#10B98112'),
                  padding: '4px 8px',
                  borderRadius: '100px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {member.category} Node
                </span>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                    >
                      <LinkedinIcon size={14} />
                    </a>
                  )}
                  {member.github !== '#' && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
       </div>

       {/* Updates Grid */}
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
             <History size={24} color="#64748b" style={{ marginBottom: '16px' }} />
             <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>PAST UPDATES</div>
             <div style={{ fontSize: '12px', color: '#64748b' }}>• Migration to v1.0 (April)<br/>• Security Audit v1.0 (Jan)<br/>• Global Shard Beta (Dec)</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
             <TrendingUp size={24} color="#3B82F6" style={{ marginBottom: '16px' }} />
             <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>FUTURE FEATURES</div>
             <div style={{ fontSize: '12px', color: '#64748b' }}>• AI Reputation Score<br/>• Real-time Settlement<br/>• Node Marketplace</div>
          </div>
       </div>
    </div>
  );
}

MastermindSection.propTypes = {
  mob: PropTypes.bool.isRequired
};
