import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Award,
  Link,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Btn, Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator } from './ProfileShared';

const DEFAULT_MILESTONES = [
  { y: '2021', t: 'The Foundation', d: 'Launched the first video series on regional heritage with zero budget.', i: Globe, c: '#FF9431' },
  { y: '2022', t: 'First Viral Wave', d: 'Crossed 100K hearts with authentic storytelling that resonated globally.', i: Zap, c: '#0073b1' },
  { y: '2023', t: 'Elite Recognition', d: 'Officially audited and verified by CreatorBharat as a top regional voice.', i: ShieldCheck, c: '#10B981' },
  { y: '2024', t: 'The National Pulse', d: 'Scaling impact by bridging the digital divide for Bharat.', i: Trophy, c: '#7c3aed' }
];

const DEFAULT_AWARDS = [
  { t: 'Regional Pioneer', o: 'CreatorBharat Office', y: '2024' },
  { t: 'Elite Hub Verified', o: 'Govt of Rajasthan', y: '2023' },
  { t: 'Cultural Impact', o: 'Jaipur Literature Festival', y: '2025' }
];

const DEFAULT_COLLABS = [
  { p: 'Rajasthan Tourism Govt', l: 'Government Partner', d: 'Official campaign promoting local heritage and rural homestays.' },
  { p: 'MS Dhoni / Seven brand', l: 'Celebrity Linkup', d: 'Co-starred in the regional sportswear launch campaign.' },
  { p: 'TEDx Jaipur', l: 'Keynote Feature', d: 'Delivered a talk on the power of regional dialects in storytelling.' }
];

const DEFAULT_ICONS = [Globe, Zap, ShieldCheck, Trophy];
const DEFAULT_COLORS = ['#FF9431', '#0073b1', '#10B981', '#7c3aed'];

function getMilestones(creatorMilestones) {
  if (!creatorMilestones || creatorMilestones.length === 0) return [];
  return creatorMilestones.map((m, idx) => ({
    ...m,
    i: m.i || DEFAULT_ICONS[idx % DEFAULT_ICONS.length] || Globe,
    c: m.c || DEFAULT_COLORS[idx % DEFAULT_COLORS.length] || '#FF9431'
  }));
}

const CollabCard = ({ col, mob }) => {
  const isGov = col.l?.toLowerCase().includes('gov') || col.l?.toLowerCase().includes('tour');
  const badgeColor = isGov ? '#10b981' : '#7c3aed';
  const cardWidth = mob ? '280px' : '100%';

  // Dynamic brand initials
  const brandInitial = col.p ? col.p.charAt(0) : 'B';

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ display: 'flex', height: '100%', width: cardWidth, flexShrink: 0 }}
    >
      <Card style={{ 
        padding: '32px', 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '32px', 
        border: '1px solid rgba(226, 232, 240, 0.9)', 
        boxShadow: '0 8px 30px rgba(15,23,42,0.02)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        position: 'relative',
        overflow: 'hidden',
        flex: 1
      }}>
         <div>
            {/* Header Brand Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              {col.brandLink ? (
                <a href={col.brandLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '14px', 
                    background: '#0f172a', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '18px', 
                    fontWeight: 950,
                    boxShadow: '0 6px 12px rgba(15,23,42,0.12)'
                  }}>
                    {brandInitial}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '17px', fontWeight: 950, color: '#0f172a', margin: '0 0 2px 0', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '6px', textAlign: 'left' }}>
                      {col.p} <Link size={12} color="#94a3b8" />
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: badgeColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {col.l}
                      </div>
                      {col.metric && (
                        <div style={{ 
                          fontSize: '9px', 
                          fontWeight: 900, 
                          color: '#fff', 
                          background: '#0f172a', 
                          padding: '2px 8px', 
                          borderRadius: '100px', 
                          letterSpacing: '0.3px',
                          lineHeight: 1
                        }}>
                          {col.metric}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ) : (
                <>
                  <div style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '14px', 
                    background: '#0f172a', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '18px', 
                    fontWeight: 950,
                    boxShadow: '0 6px 12px rgba(15,23,42,0.12)'
                  }}>
                    {brandInitial}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '17px', fontWeight: 950, color: '#0f172a', margin: '0 0 2px 0', lineHeight: 1.2, textAlign: 'left' }}>{col.p}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: badgeColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {col.l}
                      </div>
                      {col.metric && (
                        <div style={{ 
                          fontSize: '9px', 
                          fontWeight: 900, 
                          color: '#fff', 
                          background: '#0f172a', 
                          padding: '2px 8px', 
                          borderRadius: '100px', 
                          letterSpacing: '0.3px',
                          lineHeight: 1
                        }}>
                          {col.metric}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Campaign cover photo */}
            {col.img && (
              <div style={{ 
                width: '100%', 
                height: '130px', 
                overflow: 'hidden', 
                borderRadius: '18px', 
                marginBottom: '16px', 
                border: '1px solid rgba(226, 232, 240, 0.8)' 
              }}>
                <img src={col.img} alt={col.p} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            {/* Campaign details */}
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, fontWeight: 500, margin: '0 0 16px 0', textAlign: 'left' }}>{col.d}</p>
         </div>

         {/* Audited Metrics bar */}
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', alignItems: 'center' }}>
            {col.videoLink && (
              <a href={col.videoLink} target="_blank" rel="noopener noreferrer" style={{
                background: 'rgba(255, 148, 49, 0.08)',
                padding: '6px 12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255, 148, 49, 0.15)',
                textDecoration: 'none',
                fontSize: '10px',
                fontWeight: 800,
                color: '#FF9431',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <span style={{ fontSize: '12px' }}>▶</span> Watch Campaign
              </a>
            )}
            <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF9431' }} />
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Link</span>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '6px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <CheckCircle2 size={12} color="#10b981" />
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Audited</span>
            </div>
         </div>
      </Card>
    </motion.div>
  );
};
CollabCard.propTypes = {
  col: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

const MilestoneRow = ({ m, idx, mob }) => {
  const MilestoneIcon = m.i;
  // Dynamic step number: "01", "02", etc.
  const stepNumber = `0${idx + 1}`;
  const isDesktopWithImage = !mob && m.img;

  return (
    <div style={{ 
      display: 'flex', 
      position: 'relative', 
      paddingLeft: mob ? '56px' : '72px', 
      marginBottom: '48px',
      width: '100%',
      alignItems: 'flex-start'
    }}>
       {/* 1. Horizontal dashed connector */}
       <div style={{
         position: 'absolute',
         left: mob ? '20px' : '32px',
         width: mob ? '36px' : '40px',
         top: '22px',
         height: '1px',
         borderTop: '2px dashed rgba(226, 232, 240, 0.8)',
         zIndex: 1
       }} />

       {/* 2. Timeline glowing dot node */}
       <div style={{ 
         position: 'absolute', 
         left: mob ? '20px' : '32px', 
         transform: 'translateX(-50%)', 
         top: '22px',
         width: '18px', 
         height: '18px', 
         borderRadius: '50%',
         background: '#fff',
         border: `4px solid ${m.c}`,
         boxShadow: `0 0 0 6px ${m.c}15, 0 4px 12px ${m.c}30`,
         zIndex: 10,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
       }}>
         {/* Glowing pulsing aura node */}
         <motion.div 
           animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
           transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
           style={{
             position: 'absolute',
             width: '100%',
             height: '100%',
             borderRadius: '50%',
             border: `2px solid ${m.c}`,
             boxShadow: `0 0 8px ${m.c}`,
             pointerEvents: 'none'
           }}
         />
       </div>

       {/* 3. Milestone Card */}
       <motion.div 
         initial={{ opacity: 0, x: 20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true, margin: '-60px' }}
         style={{ width: '100%' }}
       >
         <motion.div 
           whileHover={{ 
             y: -4,
             borderColor: m.c,
             boxShadow: `0 12px 35px rgba(15, 23, 42, 0.05), 0 0 20px ${m.c}15`
           }}
           transition={{ type: 'spring', stiffness: 300, damping: 20 }}
           style={{ 
             padding: mob ? '24px' : '32px', 
             background: 'rgba(255, 255, 255, 0.95)', 
             borderRadius: '32px', 
             border: '1.5px solid rgba(226, 232, 240, 0.8)', 
             boxShadow: '0 8px 30px rgba(15,23,42,0.02)',
             position: 'relative',
             overflow: 'hidden',
             display: 'flex',
             flexDirection: isDesktopWithImage ? 'row' : 'column',
             alignItems: isDesktopWithImage ? 'stretch' : 'stretch',
             gap: isDesktopWithImage ? '32px' : '16px',
             transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
           }}
         >
            {/* Big Translucent Step Number Overlay (Pro dev aesthetic) */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: isDesktopWithImage ? 'calc(41.6% + 24px)' : '24px',
              fontSize: '48px',
              fontWeight: 950,
              color: 'rgba(15, 23, 42, 0.03)',
              fontFamily: 'Outfit, sans-serif',
              userSelect: 'none',
              lineHeight: 1,
              zIndex: 0
            }}>
              {stepNumber}
            </div>

            {isDesktopWithImage ? (
              <>
                {/* Left Column - Content */}
                <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between', zIndex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Header / Year */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 900, 
                        color: m.c, 
                        textTransform: 'uppercase', 
                        letterSpacing: '1.5px', 
                        background: `${m.c}10`, 
                        padding: '4px 12px', 
                        borderRadius: '100px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.c }} />
                        {m.y}
                      </span>
                      
                      {m.category && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          color: m.c,
                          background: `${m.c}08`,
                          padding: '4px 10px',
                          borderRadius: '100px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          border: `1px solid ${m.c}15`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {m.category.toLowerCase().includes('launch') && '🚀'}
                          {m.category.toLowerCase().includes('growth') && '📈'}
                          {m.category.toLowerCase().includes('viral') && '🔥'}
                          {m.category.toLowerCase().includes('collab') && '🤝'}
                          {m.category.toLowerCase().includes('partner') && '🤝'}
                          {m.category.toLowerCase().includes('award') && '🏆'}
                          {m.category.toLowerCase().includes('elite') && '🏆'}
                          {m.category.toLowerCase().includes('impact') && '🌍'}
                          {m.category}
                        </span>
                      )}

                      {m.metric && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          color: '#fff',
                          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 10px rgba(15,23,42,0.1)'
                        }}>
                          {m.metric}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '11px', 
                        background: `${m.c}08`, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0
                       }}>
                         <MilestoneIcon size={19} color={m.c} />
                       </div>
                       <div style={{ flex: 1 }}>
                         <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3, textAlign: 'left' }}>{m.t}</h4>
                         <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 550, margin: 0, textAlign: 'left' }}>{m.d}</p>
                       </div>
                     </div>
                   </div>

                   {/* Verification Link */}
                   {m.link && (
                     <a 
                       href={m.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       style={{
                         display: 'inline-flex',
                         alignItems: 'center',
                         gap: '6px',
                         fontSize: '12px',
                         fontWeight: 900,
                         color: m.c,
                         textDecoration: 'none',
                         transition: 'all 0.2s ease',
                         alignSelf: 'flex-start'
                       }}
                       onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                       onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; e.currentTarget.style.transform = 'translateX(0)'; }}
                     >
                       Verify Milestone Proof <ArrowRight size={14} />
                     </a>
                   )}
                 </div>

                 {/* Right Column - Image Preview */}
                 <div style={{ 
                   flex: 1, 
                   minHeight: '180px', 
                   overflow: 'hidden', 
                   borderRadius: '20px', 
                   border: '1px solid rgba(226, 232, 240, 0.8)',
                   position: 'relative',
                   zIndex: 1
                 }}>
                    <motion.img 
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.4 }}
                      src={m.img} 
                      alt={m.t} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                 </div>
               </>
             ) : (
               <>
                 {/* Standard stacked layout for mobile / no image */}
                 <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                   <span style={{ 
                     fontSize: '11px', 
                     fontWeight: 900, 
                     color: m.c, 
                     textTransform: 'uppercase', 
                     letterSpacing: '1.5px', 
                     background: `${m.c}10`, 
                     padding: '4px 12px', 
                     borderRadius: '100px',
                     display: 'inline-flex',
                     alignItems: 'center',
                     gap: '6px'
                   }}>
                     <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.c }} />
                     {m.y}
                   </span>
                   
                   {m.category && (
                     <span style={{
                       fontSize: '10px',
                       fontWeight: 900,
                       color: m.c,
                       background: `${m.c}08`,
                       padding: '4px 10px',
                       borderRadius: '100px',
                       textTransform: 'uppercase',
                       letterSpacing: '0.5px',
                       border: `1px solid ${m.c}15`,
                       display: 'inline-flex',
                       alignItems: 'center',
                       gap: '4px'
                     }}>
                       {m.category.toLowerCase().includes('launch') && '🚀'}
                       {m.category.toLowerCase().includes('growth') && '📈'}
                       {m.category.toLowerCase().includes('viral') && '🔥'}
                       {m.category.toLowerCase().includes('collab') && '🤝'}
                       {m.category.toLowerCase().includes('partner') && '🤝'}
                       {m.category.toLowerCase().includes('award') && '🏆'}
                       {m.category.toLowerCase().includes('elite') && '🏆'}
                       {m.category.toLowerCase().includes('impact') && '🌍'}
                       {m.category}
                     </span>
                   )}

                   {m.metric && (
                     <span style={{
                       fontSize: '10px',
                       fontWeight: 900,
                       color: '#fff',
                       background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                       padding: '4px 10px',
                       borderRadius: '100px',
                       letterSpacing: '0.5px',
                       boxShadow: '0 4px 10px rgba(15,23,42,0.1)'
                     }}>
                       {m.metric}
                     </span>
                   )}
                 </div>

                 <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                   <div style={{ 
                     width: '38px', 
                     height: '38px', 
                     borderRadius: '11px', 
                     background: `${m.c}08`, 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     marginTop: '2px',
                     flexShrink: 0
                   }}>
                     <MilestoneIcon size={19} color={m.c} />
                   </div>
                   <div style={{ flex: 1 }}>
                     <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3, textAlign: 'left' }}>{m.t}</h4>
                     <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 550, margin: 0, textAlign: 'left' }}>{m.d}</p>
                   </div>
                 </div>

                 {m.img && (
                   <div style={{ 
                     width: '100%', 
                     height: mob ? '140px' : '200px', 
                     overflow: 'hidden', 
                     borderRadius: '20px', 
                     border: '1px solid rgba(226, 232, 240, 0.8)',
                     position: 'relative',
                     marginTop: '4px'
                   }}>
                      <motion.img 
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.4 }}
                        src={m.img} 
                        alt={m.t} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                   </div>
                 )}

                 {m.link && (
                   <a 
                     href={m.link} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     style={{
                       display: 'inline-flex',
                       alignItems: 'center',
                       gap: '6px',
                       fontSize: '12px',
                       fontWeight: 900,
                       color: m.c,
                       textDecoration: 'none',
                       marginTop: '4px',
                       transition: 'all 0.2s ease',
                       alignSelf: 'flex-start'
                     }}
                     onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; e.currentTarget.style.transform = 'translateX(0)'; }}
                   >
                     Verify Milestone Proof <ArrowRight size={14} />
                   </a>
                 )}
               </>
             )}
         </motion.div>
       </motion.div>
    </div>
  );
};
MilestoneRow.propTypes = {
  m: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  mob: PropTypes.bool
};

const AwardsSection = ({ awards, mob, awardsLayout, awardsTemplate, awardWidth }) => (
  <div style={{ marginTop: '40px' }}>
     <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '8px' }}>Key Awards & Recognitions</h3>
        <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, margin: 0 }}>Validated achievements & industry accreditations</p>
     </div>
     <div style={{ display: awardsLayout, gridTemplateColumns: awardsTemplate, gap: '24px', marginBottom: mob ? '32px' : '80px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
        {awards.map((a, idx) => (
           <motion.div
             key={a.t + idx}
             whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}
             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
             style={{ display: 'flex', width: awardWidth, flexShrink: 0 }}
           >
             <Card style={{ 
               padding: '32px 32px 32px 40px', 
               borderRadius: '32px', 
               border: '1px solid rgba(226, 232, 240, 0.9)', 
               background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.95) 100%)',
               boxShadow: '0 8px 30px rgba(15,23,42,0.02)', 
               display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'flex-start',
               position: 'relative',
               overflow: 'hidden',
               width: '100%',
               flex: 1
             }}>
                {/* Left accent bar for official credential look */}
                <div style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: 0, 
                  bottom: 0, 
                  width: '6px', 
                  background: 'linear-gradient(to bottom, #FF9431, #EA580C)' 
                }} />

                {/* Audit Seal */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  background: 'rgba(16, 185, 129, 0.08)', 
                  color: '#10b981', 
                  padding: '4px 10px', 
                  borderRadius: '100px', 
                  fontSize: '10px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '20px' 
                }}>
                  <ShieldCheck size={12} /> Verified Audit
                </div>

                {/* Real Certificate Image if present */}
                {a.img && (
                  <div style={{ width: '100%', height: '110px', overflow: 'hidden', borderRadius: '18px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                    <img src={a.img} alt={a.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                  {!a.img && (
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '10px', 
                      background: 'rgba(255, 148, 49, 0.08)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                       <Award size={22} color="#FF9431" />
                    </div>
                  )}
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    RECOGNITION {a.y}
                  </span>
                </div>

                <h4 style={{ fontSize: '17px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3, textAlign: 'left' }}>{a.t}</h4>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textAlign: 'left', marginBottom: a.link ? '16px' : '0' }}>Issued by {a.o}</div>

                {/* Verification link */}
                {a.link && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#FF9431',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'none'
                  }}>
                    Verify Credential <ArrowRight size={14} />
                  </a>
                )}
             </Card>
           </motion.div>
        ))}
     </div>
  </div>
);
AwardsSection.propTypes = {
  awards: PropTypes.array.isRequired,
  mob: PropTypes.bool,
  awardsLayout: PropTypes.string,
  awardsTemplate: PropTypes.string,
  awardWidth: PropTypes.string
};

const BiographySection = ({ c, city, name, storyBodyPadding, storyBodyTextSize, quoteFontSize, readBtnWidth, navigate }) => {
  const hasFullStory = !!(c.full_story?.p1 || c.fullStory?.p1 || c.full_story?.p2 || c.fullStory?.p2 || c.full_story?.p3 || c.fullStory?.p3);

  const p1 = c.full_story?.p1 || c.fullStory?.p1 || c.bio || `My journey in ${city} began with a passion for authentic storytelling, aiming to capture the rich culture and daily lives of people. I believe in creating premium visual content that connects deeply with viewers.`;
  const quote = c.full_story?.quote || c.fullStory?.quote || c.tagline || `"Authentic storytelling is about building a genuine connection with the audience."`;
  
  const p2 = c.full_story?.p2 || c.fullStory?.p2 || (hasFullStory ? `Through consistent creation, my goal is to elevate regional voices and bring professional storytelling to the forefront. Being recognized on CreatorBharat is a milestone that drives my commitment to high-retention content.` : '');
  const p3 = c.full_story?.p3 || c.fullStory?.p3 || (hasFullStory ? `This is just the beginning. I look forward to partnering with brands that value real impact, local culture, and creative excellence.` : '');

  return (
    <Card style={{ 
      marginTop: '24px', 
      padding: storyBodyPadding, 
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(253, 244, 235, 0.3) 100%)', 
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '40px', 
      border: '1px solid rgba(226, 232, 240, 0.8)', 
      boxShadow: '0 12px 40px rgba(15,23,42,0.02)',
      position: 'relative',
      overflow: 'hidden'
    }}>
       {/* Background decorative watermark */}
       <div style={{ position: 'absolute', top: '24px', right: '32px', color: 'rgba(255,148,49,0.03)', pointerEvents: 'none' }}><FileText size={180} /></div>
       
       <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.02em' }}>
            Beyond the Milestones: <span style={{ color: '#FF9431' }}>My Story</span>
          </h3>
          <div style={{ fontSize: storyBodyTextSize, color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>
             <p style={{ marginBottom: '24px' }}>{p1}</p>
             
             {quote && (
               <blockquote style={{ 
                 margin: '36px 0', 
                 padding: '24px 32px', 
                 borderLeft: '5px solid #FF9431', 
                 background: 'rgba(255, 255, 255, 0.9)', 
                 borderRadius: '0 24px 24px 0', 
                 fontSize: quoteFontSize, 
                 fontWeight: 800, 
                 fontStyle: 'italic', 
                 color: '#1e293b', 
                 boxShadow: '0 8px 30px rgba(15,23,42,0.02)' 
               }}>
                 {quote}
               </blockquote>
             )}

             {p2 && <p style={{ marginBottom: '24px' }}>{p2}</p>}
             {p3 && <p style={{ marginBottom: 0 }}>{p3}</p>}
          </div>
          
          <div style={{ marginTop: '40px', display: 'flex' }}>
             <Btn lg onClick={() => navigate(`/blog/creator-story-${c?.id || c?.slug || 'elite'}`)} style={{ 
               borderRadius: '100px', 
               background: '#0f172a', 
               color: '#fff', 
               gap: '10px', 
               padding: '16px 36px', 
               width: readBtnWidth,
               boxShadow: '0 10px 25px rgba(15,23,42,0.15)',
               border: 'none',
               cursor: 'pointer',
               fontWeight: 700
             }}>
                Read Full Biography on Blog <ArrowRight size={18} />
              </Btn>
           </div>
        </div>
     </Card>
  );
};
BiographySection.propTypes = {
  c: PropTypes.object.isRequired,
  city: PropTypes.string,
  name: PropTypes.string,
  storyBodyPadding: PropTypes.string,
  storyBodyTextSize: PropTypes.string,
  quoteFontSize: PropTypes.string,
  readBtnWidth: PropTypes.string,
  navigate: PropTypes.func.isRequired
};

const PartnershipsSection = ({ collabs, collabsPadding, collabsTitleAlign, awardsLayout, awardsTemplate, mob }) => {
  if (!collabs || collabs.length === 0) return null;
  return (
    <div style={{ 
      marginTop: '60px', 
      padding: collabsPadding, 
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)', 
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '40px', 
      border: '1px solid rgba(226, 232, 240, 0.8)' 
    }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collabsTitleAlign, marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,148,49,0.3)' }}>
             <Sparkles size={20} color="#fff" />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>Elite Brand Partnerships</h3>
       </div>
       <div style={{ display: awardsLayout, gridTemplateColumns: awardsTemplate, gap: '24px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
          {collabs.map((col, idx) => (
            <CollabCard key={col.p + idx} col={col} mob={mob} />
          ))}
       </div>
    </div>
  );
};
PartnershipsSection.propTypes = {
  collabs: PropTypes.array.isRequired,
  collabsPadding: PropTypes.string,
  collabsTitleAlign: PropTypes.string,
  awardsLayout: PropTypes.string,
  awardsTemplate: PropTypes.string,
  mob: PropTypes.bool
};

const STORY_LAYOUT = {
  mobile: {
    storyPadding: '0 16px',
    maxWidth: '100%',
    titleSize: '36px',
    awardsLayout: 'flex',
    awardsTemplate: 'none',
    awardWidth: '240px',
    timelineLeft: '20px',
    timelineBg: 'translateX(-50%)',
    storyBodyPadding: '32px 24px',
    storyBodyTextSize: '15px',
    quoteFontSize: '15px',
    readBtnWidth: '100%',
    collabsPadding: '32px 24px',
    collabsTitleAlign: 'flex-start'
  },
  desktop: {
    storyPadding: '0 40px',
    maxWidth: '1150px',
    titleSize: '52px',
    awardsLayout: 'grid',
    awardsTemplate: 'repeat(3, 1fr)',
    awardWidth: 'auto',
    timelineLeft: '32px',
    timelineBg: 'translateX(-50%)',
    storyBodyPadding: '56px',
    storyBodyTextSize: '17px',
    quoteFontSize: '19px',
    readBtnWidth: 'auto',
    collabsPadding: '52px',
    collabsTitleAlign: 'flex-start'
  }
};

export const StoryTab = ({ c, mob, setActiveTab }) => {
  const city = c?.city || 'Bharat';
  const name = c?.name || 'Elite Creator';
  const milestones = getMilestones(c.milestones);
  const awards = c.awards && c.awards.length > 0 ? c.awards : [];
  const collabs = c.collabs && c.collabs.length > 0 ? c.collabs : [];
  const navigate = useNavigate();

  const layout = STORY_LAYOUT[mob ? 'mobile' : 'desktop'];

  // Adjust bento template if awards length is less than 3
  const currentAwardsTemplate = awards.length < 3 ? `repeat(${awards.length}, 1fr)` : layout.awardsTemplate;
  const currentCollabsTemplate = collabs.length < 3 ? `repeat(${collabs.length}, 1fr)` : layout.awardsTemplate;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: layout.storyPadding, display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
         {/* Title Section */}
         <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: layout.titleSize, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
              The Journey of <span style={{ color: '#FF9431' }}>Authenticity</span>
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b', fontWeight: 500, maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              From a small-town vision in {city} to the digital screens of millions.
            </p>
         </div>

         {/* 1. Biography (Full Story Intro) */}
         <BiographySection 
           c={c}
           city={city}
           name={name}
           storyBodyPadding={layout.storyBodyPadding}
           storyBodyTextSize={layout.storyBodyTextSize}
           quoteFontSize={layout.quoteFontSize}
           readBtnWidth={layout.readBtnWidth}
           navigate={navigate}
         />

         {/* Spacing */}
         {(milestones.length > 0 || awards.length > 0 || collabs.length > 0) && <div style={{ height: mob ? '32px' : '70px' }} />}

         {/* 2. Timeline Chapters */}
         {milestones.length > 0 && (
           <>
             <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '8px' }}>Creator Journey Timeline</h3>
                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, margin: 0 }}>Chronological roadmap of content growth and impact milestones.</p>
             </div>
             <div style={{ position: 'relative', marginBottom: mob ? '40px' : '80px' }}>
                <div style={{ 
                  position: 'absolute', 
                  left: layout.timelineLeft, 
                  transform: layout.timelineBg, 
                  top: '20px', 
                  bottom: '20px', 
                  width: '4px', 
                  background: 'linear-gradient(to bottom, #FF9431, #0073b1, #10B981, rgba(241,245,249,0))', 
                  borderRadius: '100px' 
                }} />

                {milestones.map((m, idx) => (
                  <MilestoneRow key={`${m.y}-${m.t}-${idx}`} m={m} idx={idx} mob={mob} />
                ))}
             </div>
           </>
         )}

         {/* 3. Key Achievements & Awards */}
         {awards.length > 0 && (
           <AwardsSection 
             awards={awards} 
             mob={mob} 
             awardsLayout={layout.awardsLayout} 
             awardsTemplate={currentAwardsTemplate} 
             awardWidth={layout.awardWidth} 
           />
         )}

         {/* 4. Elite Partnerships Section */}
         {collabs.length > 0 && (
           <PartnershipsSection 
             collabs={collabs}
             collabsPadding={layout.collabsPadding}
             collabsTitleAlign={layout.collabsTitleAlign}
             awardsLayout={layout.awardsLayout}
             awardsTemplate={currentCollabsTemplate}
             mob={mob}
           />
         )}

          <div style={{ marginTop: 'auto', width: '100%' }}>
             <TrustBadge />
             <TabNavigator activeTab="story" setActiveTab={setActiveTab} mob={mob} />
          </div>
       </div>
    </motion.div>
  );
};
StoryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };
