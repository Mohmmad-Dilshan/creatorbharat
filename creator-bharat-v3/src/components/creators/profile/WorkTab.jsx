import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Trophy, 
  ShieldCheck, 
  UserCheck, 
  Play,
  ArrowRight
} from 'lucide-react';
import { Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator } from './ProfileShared';

const AchievementWall = ({ c, mob }) => {
  // Format followers dynamically matching user profile
  let followersStr = '100K+';
  if (c.followers) {
    if (c.followers >= 1000000) {
      followersStr = `${(c.followers / 1000000).toFixed(1)}M+`;
    } else {
      followersStr = `${Math.round(c.followers / 1000)}K+`;
    }
  } else if (c.connections) {
    followersStr = c.connections;
  }

  // Format ROI dynamically from AI stats
  const roiStat = c.ai_intel?.stats?.find(s => s.l.toLowerCase().includes('roi'))?.v || c.aiRoi || '5.2x';
  
  // Brand partnerships count
  const brandPartnersCount = c.collabs?.length || c.reviews?.filter(r => r.type === 'brand').length || 3;

  const achieves = [
    { t: followersStr, d: 'Audited Reach', i: Activity, c: '#FF9431' },
    { t: `${roiStat}`, d: 'Avg Campaign ROI', i: Trophy, c: '#f97316' },
    { t: 'Elite Audit', d: 'CreatorBharat Pass', i: ShieldCheck, c: '#10b981' },
    { t: `${brandPartnersCount}+`, d: 'Active Brands', i: UserCheck, c: '#3b82f6' }
  ];

  return (
    <div style={{ marginBottom: '80px' }}>
       <h3 style={{ fontSize: '26px', fontWeight: 950, color: '#0f172a', marginBottom: '40px', letterSpacing: '-0.02em', textAlign: mob ? 'left' : 'center' }}>
         Verified Performance & Reach
       </h3>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '20px' }}>
          {achieves.map((a, idx) => {
            const Icon = a.i || Trophy;
            return (
            <motion.div 
              key={a.d + idx}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15,23,42,0.06)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ 
                padding: '32px 24px', 
                background: '#fff', 
                borderRadius: '32px', 
                border: '1px solid rgba(226, 232, 240, 0.9)', 
                textAlign: 'center',
                boxShadow: '0 8px 30px rgba(15,23,42,0.01)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
               <div style={{ 
                 width: '44px', 
                 height: '44px', 
                 background: `${a.c}10`, 
                 borderRadius: '14px', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 margin: '0 auto 16px' 
               }}>
                  <Icon size={22} color={a.c} />
               </div>
               <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', lineHeight: 1.1, marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>{a.t}</div>
               <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{a.d}</div>
            </motion.div>
          )})}
       </div>
    </div>
  );
};
AchievementWall.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const CaseStudyCard = ({ title, brand, results, desc, link, img, mob }) => {
  const brandInitial = brand ? brand.charAt(0) : 'B';
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 25px 50px rgba(15,23,42,0.06)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ display: 'flex', height: '100%', width: '100%' }}
    >
      <div style={{ 
        padding: '32px', 
        borderRadius: '32px', 
        border: '1px solid rgba(226, 232, 240, 0.9)', 
        background: '#fff',
        boxShadow: '0 8px 30px rgba(15,23,42,0.01)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
         <div>
            {/* Verification Seal Tag */}
            <div style={{ 
              display: 'inline-flex', 
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
              <ShieldCheck size={12} /> Verified Case Study
            </div>

            {/* Optional Campaign Cover Image */}
            {img && (
              <div style={{ 
                width: '100%', 
                height: '130px', 
                overflow: 'hidden', 
                borderRadius: '18px', 
                marginBottom: '20px', 
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            {/* Header: Monogram & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: '#0f172a', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '16px', 
                fontWeight: 900,
                boxShadow: '0 4px 8px rgba(15,23,42,0.1)'
              }}>
                {brandInitial}
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 950, color: '#0f172a', margin: '0 0 2px 0', lineHeight: 1.3, textAlign: 'left' }}>{title}</h4>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#FF9431', textAlign: 'left' }}>Brand: {brand}</div>
              </div>
            </div>

            {/* Campaign Brief Description */}
            {desc && (
              <p style={{ 
                fontSize: '13px', 
                color: '#64748b', 
                lineHeight: 1.6, 
                fontWeight: 500, 
                margin: '0 0 20px 0', 
                textAlign: 'left' 
              }}>
                {desc}
              </p>
            )}
         </div>

         <div>
            {/* Results Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '12px', 
              paddingTop: '16px', 
              borderTop: '1.5px solid #f1f5f9'
            }}>
               {results.map(r => (
                 <div key={r.l} style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{r.l}</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: '#10B981', fontFamily: 'Outfit, sans-serif' }}>{r.v}</div>
                 </div>
               ))}
            </div>

            {/* Link to video/post proof */}
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  color: '#FF9431',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  marginTop: '16px'
                }}
              >
                Verify Live Campaign <Play size={10} fill="#FF9431" style={{ marginLeft: 2 }} />
              </a>
            )}
         </div>
      </div>
    </motion.div>
  );
};
CaseStudyCard.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  desc: PropTypes.string,
  link: PropTypes.string,
  img: PropTypes.string,
  mob: PropTypes.bool
};

const ProgressBar = ({ label, value, color = '#FF9431' }) => {
  let percentage = 50;
  if (value.includes('%')) {
    percentage = parseFloat(value);
  } else if (value.includes('s')) {
    percentage = (parseFloat(value) / 60) * 100;
  }
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
        <span style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>{value}</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(to right, ${color}, #EA580C)`, borderRadius: '100px' }}
        />
      </div>
    </div>
  );
};
ProgressBar.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.string.isRequired, color: PropTypes.string };

const ViralCard = ({ v, idx, mob }) => {
  const viewsText = v.views || '1.0M';
  const titleText = v.title || 'Trending Video';
  const imageSrc = v.img || `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400`;

  const CardWrapper = v.link ? 'a' : 'div';
  const wrapperProps = v.link ? { href: v.link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <CardWrapper 
      {...wrapperProps} 
      style={{ 
        display: 'block', 
        textDecoration: 'none', 
        flexShrink: 0, 
        width: mob ? '260px' : '100%', 
        cursor: v.link ? 'pointer' : 'default' 
      }}
    >
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(15,23,42,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          borderRadius: '32px',
          overflow: 'hidden',
          aspectRatio: '9/16',
          background: '#000',
          position: 'relative',
          border: '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 30px rgba(15,23,42,0.04)'
        }}
      >
        {/* Cover Image with hover zoom */}
        <motion.img 
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          src={imageSrc} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} 
          alt={titleText} 
        />

        {/* Gradient Overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.4) 40%, rgba(15,23,42,0.1) 100%)' 
        }} />

        {/* Glowing Translucent Play Button in the Center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          pointerEvents: 'none',
          transition: 'all 0.3s ease'
        }}>
          <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: '4px' }} />
        </div>

        {/* Floating details at the bottom */}
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: '#fff', textAlign: 'left' }}>
           <div style={{ 
             fontSize: '10px', 
             fontWeight: 900, 
             color: '#FF9431', 
             textTransform: 'uppercase', 
             letterSpacing: '1px', 
             marginBottom: '6px',
             background: 'rgba(255, 148, 49, 0.12)',
             padding: '4px 10px',
             borderRadius: '100px',
             display: 'inline-block'
           }}>
             🔥 {viewsText} Views
           </div>
           <h4 style={{ fontSize: '18px', fontWeight: 950, margin: '0 0 4px 0', lineHeight: 1.2 }}>{titleText}</h4>
           <div style={{ fontSize: '11px', opacity: 0.7, fontWeight: 550 }}>Top Trending Campaign</div>
        </div>
      </motion.div>
    </CardWrapper>
  );
};
ViralCard.propTypes = {
  v: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  mob: PropTypes.bool
};

const InfluenceMedia = ({ c, mob }) => {
  const stats = c.media_stats || [
    { l: 'Avg View Time', v: '45s' },
    { l: 'Save Rate', v: '12%' },
    { l: 'Share Rate', v: '8.5%' },
    { l: 'Comment Positivity', v: '98%' }
  ];

  // Dynamic context based on primary niche
  const nicheName = c.niche?.[0] || 'Creative';

  return (
    <div style={{ 
      marginBottom: mob ? '24px' : '60px', 
      padding: mob ? '32px 24px' : '48px', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
      borderRadius: '40px', 
      color: '#0f172a',
      border: '1.5px solid rgba(226, 232, 240, 0.8)',
      boxShadow: '0 20px 40px rgba(15,23,42,0.03)'
    }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: '40px', alignItems: 'center' }}>
          <div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Play size={22} color="#FF9431" fill="#FF9431" />
                <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Content Resonance</span>
             </div>
             <h3 style={{ fontSize: mob ? '24px' : '34px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', lineHeight: 1.2, letterSpacing: '-0.02em', textAlign: 'left' }}>
               Connecting Natively <span style={{ color: '#FF9431' }}>Across Bharat</span>
             </h3>
             <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, fontWeight: 550, textAlign: 'left' }}>
               Through high-retention storytelling and cinematic quality, I translate organic {nicheName} content into verified brand trust, delivering stellar conversion outcomes.
             </p>
          </div>
          <div>
             {stats.map(s => (
               <ProgressBar key={s.l} label={s.l} value={s.v} />
             ))}
          </div>
       </div>
    </div>
  );
};
InfluenceMedia.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

export const WorkTab = ({ c, mob, setActiveTab }) => {
  const hasViral = c.viral_content && c.viral_content.length > 0;
  const hasCaseStudies = c.case_studies && c.case_studies.length > 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <AchievementWall c={c} mob={mob} />
      
      {hasViral && (
        <div style={{ marginBottom: mob ? '24px' : '60px' }}>
           <h3 style={{ fontSize: '26px', fontWeight: 950, marginBottom: '32px', letterSpacing: '-0.02em', textAlign: 'left' }}>Viral Hall of Fame 🔥</h3>
           <div style={{ display: mob ? 'flex' : 'grid', gap: '20px', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: mob ? '12px' : '0', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)' }}>
              {c.viral_content.map((v, idx) => (
                 <ViralCard key={v.views + idx} v={v} idx={idx} mob={mob} />
              ))}
           </div>
        </div>
      )}

      {hasCaseStudies && (
        <div style={{ marginBottom: mob ? '24px' : '60px' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 950, marginBottom: '32px', letterSpacing: '-0.02em', textAlign: 'left' }}>Successful Brand Collaborations</h3>
          <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(2, 1fr)', gap: '24px', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: mob ? '12px' : '0' }}>
             {c.case_studies.map((cs, idx) => (
                <div key={cs.title + idx} style={{ display: 'flex', flexShrink: 0, width: mob ? '300px' : 'auto' }}>
                   <CaseStudyCard 
                     title={cs.title} 
                     brand={cs.brand} 
                     results={cs.results} 
                     desc={cs.desc}
                     link={cs.link}
                     img={cs.img}
                     mob={mob}
                   />
                </div>
             ))}
          </div>
        </div>
      )}

      <InfluenceMedia c={c} mob={mob} />
      <div style={{ marginTop: 'auto', width: '100%' }}>
         <TrustBadge />
         <TabNavigator activeTab="work" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
WorkTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };
