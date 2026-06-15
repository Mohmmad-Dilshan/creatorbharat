import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { fetchCreatorById } from '../../utils/platformService';
import { W, LS, fmt } from '../../utils/helpers';
import { ProfileHero } from '../../components/creators/profile/ProfileHero';
import { IdentityTab } from '../../components/creators/profile/IdentityTab';
import { MediaKitPreview } from '../../components/creators/profile/MediaKitPreview';
import { TAB_LIST, TabNavigator, TrustBadge, SocialLinkTree } from '../../components/creators/profile/ProfileShared';
import { Btn, Empty, Modal, Fld, Card } from '../../components/common/Primitives';
import Seo from '../../components/common/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Briefcase,
  Globe,
  CheckCircle2,
  Share2,
  Verified,
  Star,
  Sparkles,
  FileText,
  Mic2,
  Trophy,
  Play,
  UserCheck,
  Activity,
  ArrowRight,
  Send,
  Image as ImageIcon,
  MessageSquare,
  MapPin,
  Lock,
  Megaphone,
  Link2,
  ExternalLink,
  Crown,
  Trash2,
  Edit3
} from 'lucide-react';

// --- CUSTOM ELITE SOCIAL ICONS (SVG) ---

const GatedOverlay = ({ title, description, ctaText = "Unlock as Brand", onCtaClick }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(16px) saturate(120%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    zIndex: 10,
    textAlign: 'center',
    borderRadius: '32px'
  }}>
    <div style={{
      background: '#fff',
      padding: '40px 32px',
      borderRadius: '32px',
      maxWidth: '460px',
      boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255, 148, 49, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#EA580C',
        border: '1.5px solid rgba(234, 88, 12, 0.1)'
      }}>
        <Lock size={28} />
      </div>
      <div>
        <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {title}
        </h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 550, margin: 0 }}>
          {description}
        </p>
      </div>
      <button 
        onClick={onCtaClick}
        style={{
          background: 'linear-gradient(90deg, #FF9431, #EA580C)',
          color: '#fff',
          border: 'none',
          padding: '14px 32px',
          borderRadius: '100px',
          fontSize: '14px',
          fontWeight: 850,
          cursor: 'pointer',
          boxShadow: '0 12px 24px rgba(234, 88, 12, 0.25)',
          transition: 'transform 0.2s',
          width: '100%'
        }}
      >
        {ctaText}
      </button>
    </div>
  </div>
);
GatedOverlay.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  onCtaClick: PropTypes.func.isRequired
};

TabNavigator.propTypes = { activeTab: PropTypes.string.isRequired, setActiveTab: PropTypes.func.isRequired, mob: PropTypes.bool };

// Identity-related sub-components moved to @/components/creators/profile/IdentityTab

const EmptyState = ({ title }) => (
  <Card style={{ padding: '32px', textAlign: 'center', background: '#f8fafc', borderRadius: '32px', border: '1.5px dashed #e2e8f0', marginBottom: '40px' }}>
     <div style={{ fontSize: '16px', fontWeight: 900, color: '#94a3b8', marginBottom: '8px' }}>{title}</div>
     <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>Creator has not updated this section yet.</div>
  </Card>
);
EmptyState.propTypes = { title: PropTypes.string.isRequired };

const TabEmptyState = ({ title, icon: Icon, mob, setActiveTab, tabId }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div style={{ padding: mob ? '40px 20px' : '80px', textAlign: 'center', background: '#f8fafc', borderRadius: '40px', border: '1.5px dashed #cbd5e1', marginBottom: '40px', maxWidth: '800px', margin: '0 auto' }}>
         {Icon && <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}><Icon size={40} color="#cbd5e1" /></div>}
         <div style={{ fontSize: '24px', fontWeight: 950, color: '#94a3b8', marginBottom: '16px' }}>{title}</div>
         <div style={{ fontSize: '16px', color: '#cbd5e1', fontWeight: 600 }}>The creator hasn't updated this section yet.</div>
      </div>
      <TabNavigator activeTab={tabId} setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
TabEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  mob: PropTypes.bool,
  setActiveTab: PropTypes.func.isRequired,
  tabId: PropTypes.string.isRequired
};

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
  const raw = (creatorMilestones && creatorMilestones.length > 0) ? creatorMilestones : DEFAULT_MILESTONES;
  return raw.map((m, idx) => ({
    ...m,
    i: m.i || DEFAULT_ICONS[idx % DEFAULT_ICONS.length] || Globe,
    c: m.c || DEFAULT_COLORS[idx % DEFAULT_COLORS.length] || '#FF9431'
  }));
}

const CollabCard = ({ col, mob }) => {
  const isGov = col.l?.toLowerCase().includes('gov');
  const badgeBg = isGov ? '#10b98112' : '#7c3aed12';
  const badgeColor = isGov ? '#10b981' : '#7c3aed';
  const cardWidth = mob ? '260px' : 'auto';

  return (
    <Card style={{ padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 12px 24px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0, width: cardWidth }}>
       <div>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: badgeBg, borderRadius: '100px', fontSize: '11px', fontWeight: 900, color: badgeColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
             {col.l}
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{col.p}</h4>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, fontWeight: 500, margin: 0 }}>{col.d}</p>
       </div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF9431' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#FF9431', textTransform: 'uppercase' }}>Verified Connection</span>
       </div>
    </Card>
  );
};
CollabCard.propTypes = {
  col: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

const MilestoneRow = ({ m, idx, mob }) => {
  const isEven = idx % 2 === 0;
  const desktopAlign = isEven ? 'flex-start' : 'flex-end';
  const align = mob ? 'flex-start' : desktopAlign;
  const MilestoneIcon = m.i;
  const leftPos = mob ? '20px' : '50%';
  const marginLeftVal = mob ? '60px' : '0';
  const widthVal = mob ? 'calc(100% - 60px)' : '42%';

  return (
    <div style={{ display: 'flex', justifyContent: align, alignItems: 'center', marginBottom: '80px', width: '100%', position: 'relative' }}>
       <div style={{ position: 'absolute', left: leftPos, transform: 'translateX(-50%)', width: '40px', height: '40px', background: '#fff', border: `4px solid ${m.c}`, borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          <MilestoneIcon size={18} color={m.c} />
       </div>

       <div style={{ width: widthVal, marginLeft: marginLeftVal, padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', fontWeight: 950, color: m.c, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>{m.y} CHAPTER</div>
          <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>{m.t}</h4>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{m.d}</p>
       </div>
    </div>
  );
};
MilestoneRow.propTypes = {
  m: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  mob: PropTypes.bool
};

const AwardsSection = ({ awards, mob, awardsLayout, awardsTemplate, awardWidth }) => (
  <>
     <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>Key Awards & Recognitions</h3>
     </div>
     <div style={{ display: awardsLayout, gridTemplateColumns: awardsTemplate, gap: '24px', marginBottom: '80px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
        {awards.map((a) => (
           <Card key={a.t} style={{ padding: '32px', textAlign: 'center', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', flexShrink: 0, width: awardWidth }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#FF943112', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                 <Trophy size={24} color="#FF9431" />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '6px', lineHeight: 1.3 }}>{a.t}</h4>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginBottom: '10px' }}>{a.o}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{a.y}</div>
           </Card>
        ))}
     </div>
  </>
);

AwardsSection.propTypes = {
  awards: PropTypes.array.isRequired,
  mob: PropTypes.bool,
  awardsLayout: PropTypes.string,
  awardsTemplate: PropTypes.string,
  awardWidth: PropTypes.string
};

const BiographySection = ({ c, city, name, storyBodyPadding, storyBodyTextSize, quoteFontSize, readBtnWidth, navigate }) => (
  <div style={{ marginTop: '100px', padding: storyBodyPadding, background: '#fcfcfc', borderRadius: '40px', border: '1.5px solid #f1f5f9', position: 'relative' }}>
     <div style={{ position: 'absolute', top: '24px', left: '24px', color: '#FF943110' }}><FileText size={80} /></div>
     <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '32px' }}>Beyond the Milestones: <span style={{ color: '#FF9431' }}>My Full Story</span></h3>
        <div style={{ fontSize: storyBodyTextSize, color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>
           <p style={{ marginBottom: '24px' }}>{c.full_story?.p1 || `Mera safar ${city} ki un galiyon se shuru hua jahan har mod par ek kahani hai. Shuruat mein mere paas sirf ek purana phone aur ek junoon tha. Log kehte the ki Bharat ke regional stories mein global appeal nahi hai, par maine hamesha mana ki "Authenticity is the only language that the world understands."`}</p>
           <blockquote style={{ margin: '40px 0', padding: '24px 32px', borderLeft: '6px solid #FF9431', background: '#fff', borderRadius: '0 24px 24px 0', fontSize: quoteFontSize, fontWeight: 750, fontStyle: 'italic', color: '#111827', boxShadow: '0 8px 32px rgba(0,0,0,0.02)' }}>{c.full_story?.quote || `"Content sirf views ke liye nahi hona chahiye, wo ek connection hona chahiye jo screen ke uss paar baithe insaan ke dil tak jaye. Main, ${name}, hamesha isme vishwas rakhta hoon."`}</blockquote>
           <p style={{ marginBottom: '24px' }}>{c.full_story?.p2 || 'Aaj, jab main CreatorBharat ke verified creators ki list mein aata hoon, toh mujhe garv hota hai. Maine seekha hai ki elite banna sirf followers se nahi, balki consistency aur audience ke saath sacche rishte se hota hai. Mera agla chapter Bharat ki regional creativity ko ek global benchmark banana hai.'}</p>
           <p>{c.full_story?.p3 || 'Ye toh bas shuruat hai. Abhi toh bohot saari aisi kahaniyan hain jo sunani baaki hain, aur bohot saari aisi jagah hain jahan Bharat ka jhanda gaadna hai.'}</p>
        </div>
        <div style={{ marginTop: '40px' }}>
           <Btn lg onClick={() => navigate(`/blog/creator-story-${c?.id || 'elite'}`)} style={{ borderRadius: '100px', background: '#0f172a', color: '#fff', gap: '12px', padding: '16px 40px', width: readBtnWidth }}>
              Read Full Detailed Biography on Blog <ArrowRight size={20} />
            </Btn>
         </div>
      </div>
   </div>
);

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
  if (collabs.length === 0) return null;
  return (
    <div style={{ marginTop: '60px', padding: collabsPadding, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '40px', border: '1.5px solid #e2e8f0' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collabsTitleAlign, marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Sparkles size={20} color="#fff" />
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em' }}>Elite & Public Partnerships</h3>
       </div>
       <div style={{ display: awardsLayout, gridTemplateColumns: awardsTemplate, gap: '24px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
          {collabs.map((col) => (
            <CollabCard key={col.p} col={col} mob={mob} />
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
    titleSize: '36px',
    awardsLayout: 'flex',
    awardsTemplate: 'none',
    awardWidth: '220px',
    timelineLeft: '20px',
    timelineBg: 'none',
    storyBodyPadding: '32px 24px',
    storyBodyTextSize: '16px',
    quoteFontSize: '16px',
    readBtnWidth: '100%',
    collabsPadding: '32px 24px',
    collabsTitleAlign: 'flex-start'
  },
  desktop: {
    storyPadding: '0 40px',
    titleSize: '56px',
    awardsLayout: 'grid',
    awardsTemplate: 'repeat(3, 1fr)',
    awardWidth: 'auto',
    timelineLeft: '50%',
    timelineBg: 'translateX(-50%)',
    storyBodyPadding: '60px',
    storyBodyTextSize: '18px',
    quoteFontSize: '20px',
    readBtnWidth: 'auto',
    collabsPadding: '56px',
    collabsTitleAlign: 'center'
  }
};

const StoryTab = ({ c, mob, setActiveTab }) => {
  const city = c?.city || 'Bharat';
  const name = c?.name || 'Elite Creator';
  const milestones = getMilestones(c.milestones);
  const awards = (c.awards && c.awards.length > 0) ? c.awards : DEFAULT_AWARDS;
  const collabs = (c.collabs && c.collabs.length > 0) ? c.collabs : DEFAULT_COLLABS;
  const navigate = useNavigate();

  const layout = STORY_LAYOUT[mob ? 'mobile' : 'desktop'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: layout.storyPadding }}>
         <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: layout.titleSize, fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px' }}>The Journey of <span style={{ color: '#FF9431' }}>Authenticity</span></h2>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, maxWidth: '650px', margin: '0 auto' }}>From a small-town vision in {city} to the digital screens of millions.</p>
         </div>

         {/* Achievements Section */}
         <AwardsSection awards={awards} mob={mob} awardsLayout={layout.awardsLayout} awardsTemplate={layout.awardsTemplate} awardWidth={layout.awardWidth} />

         {/* Timeline */}
         <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: layout.timelineLeft, transform: layout.timelineBg, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, #FF9431, #f1f5f9)', borderRadius: '100px' }} />

            {milestones.map((m, idx) => (
              <MilestoneRow key={`${m.y}-${m.t}`} m={m} idx={idx} mob={mob} />
            ))}
         </div>

         {/* Story Body */}
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

         {/* Elite Partnerships Section */}
         <PartnershipsSection 
           collabs={collabs}
           collabsPadding={layout.collabsPadding}
           collabsTitleAlign={layout.collabsTitleAlign}
           awardsLayout={layout.awardsLayout}
           awardsTemplate={layout.awardsTemplate}
           mob={mob}
         />

         <TrustBadge />
         <TabNavigator activeTab="story" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
StoryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

const ServiceCatalog = ({ c, mob }) => {
  const services = (c.services && c.services.length > 0) ? c.services : [
    { t: 'Cinematic Storytelling', d: '4K Cinematic Reels with professional grading and scripting.', i: Play, c: '#FF9431' },
    { t: 'Regional Strategy', d: 'Consultation on how to launch products in local markets.', i: Globe, c: '#0ea5e9' },
    { t: 'Product Integration', d: 'Seamless product placement in authentic life scenarios.', i: Briefcase, c: '#10b981' }
  ];

  return (
    <div style={{ marginBottom: '60px' }}>
       <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '32px', textAlign: 'center' }}>Professional Service Catalog</h3>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          {services.map((s, idx) => {
            const defaultIcons = [Play, Globe, Briefcase];
            const defaultColors = ['#FF9431', '#0ea5e9', '#10b981'];
            const Icon = s.i || defaultIcons[idx % defaultIcons.length];
            const color = s.c || defaultColors[idx % defaultColors.length];
            
            return (
              <Card key={s.t} style={{ padding: '40px', borderRadius: '32px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
                 <div style={{ width: '60px', height: '60px', background: `${color}10`, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Icon size={28} color={color} />
                 </div>
                 <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>{s.t}</h4>
                 {s.rate && (
                   <div style={{ fontSize: '18px', fontWeight: 950, color: '#FF9431', marginBottom: '16px' }}>
                     ₹{Number(s.rate).toLocaleString('en-IN')}
                   </div>
                 )}
                 <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{s.d}</p>
              </Card>
            );
          })}
       </div>
    </div>
  );
};
ServiceCatalog.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const AchievementWall = ({ c, mob }) => {
  const achieves = c.achievements || [
    { t: '10M+', d: 'Total Impressions', i: Activity, c: '#FF9431' },
    { t: 'Elite 100', d: 'Ranked in Top 100', i: Trophy, c: '#f97316' },
    { t: 'Verified', d: 'Official Audit Pass', i: ShieldCheck, c: '#10b981' },
    { t: '50+', d: 'Brand Partners', i: UserCheck, c: '#3b82f6' }
  ];

  return (
    <div style={{ marginBottom: '80px' }}>
       <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '40px' }}>The Milestone Hall of Fame</h3>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
          {achieves.map(a => {
            const Icon = a.i || Trophy;
            return (
            <div key={a.d} style={{ padding: '32px 24px', background: '#fff', borderRadius: '32px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
               <div style={{ width: '40px', height: '40px', background: `${a.c}10`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Icon size={20} color={a.c} />
               </div>
               <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', lineHeight: 1, marginBottom: '8px' }}>{a.t}</div>
               <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{a.d}</div>
            </div>
          )})}
       </div>
    </div>
  );
};
AchievementWall.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const CaseStudyCard = ({ title, brand, results }) => (
  <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff' }}>
     <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', marginBottom: '8px' }}>Verified Case Study</div>
     <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>{title}</h4>
     <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '24px' }}>Brand: {brand}</div>
     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {results.map(r => (
          <div key={r.l}>
             <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>{r.l}</div>
             <div style={{ fontSize: '18px', fontWeight: 950, color: '#10B981' }}>{r.v}</div>
          </div>
        ))}
     </div>
  </Card>
);
CaseStudyCard.propTypes = { title: PropTypes.string.isRequired, brand: PropTypes.string.isRequired, results: PropTypes.array.isRequired };

const InfluenceMedia = ({ c, mob }) => {
  const stats = c.media_stats || [
    { l: 'Avg View Time', v: '45s' },
    { l: 'Save Rate', v: '12%' },
    { l: 'Share Rate', v: '8.5%' },
    { l: 'Comment Positivity', v: '98%' }
  ];

  return (
    <div style={{ 
      marginBottom: '60px', 
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
                <Play size={24} color="#FF9431" fill="#FF9431" />
                <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Content Velocity</span>
             </div>
             <h3 style={{ fontSize: mob ? '24px' : '36px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', lineHeight: 1.2 }}>Mera Content <span style={{ color: '#FF9431' }}>Duniya</span> Tak Pahunchta Hai</h3>
             <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, fontWeight: 550 }}>
                High-retention storytelling aur cinematic quality ke saath, main har brand ki kahani ko authentic banata hoon.
             </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             {stats.map(s => (
               <div key={s.l} style={{ 
                  padding: '24px', 
                  background: '#fff', 
                  borderRadius: '24px', 
                  border: '1.5px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>{s.l}</div>
                  <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>{s.v}</div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};
InfluenceMedia.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const WorkTab = ({ c, mob, setActiveTab }) => {
  const hasViral = true;
  const hasCaseStudies = true;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <AchievementWall c={c} mob={mob} />
      
      {hasViral && (
        <div style={{ marginBottom: '60px' }}>
           <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px' }}>Viral Hall of Fame 🔥</h3>
           <div style={{ display: mob ? 'flex' : 'grid', gap: '16px', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: mob ? '12px' : '0', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)' }}>
              {(c.viral_content || [1.2, 3.5, 5.8]).map((v) => (
                 <div key={typeof v === 'object' ? (v.id || v.views) : v} style={{ borderRadius: '32px', overflow: 'hidden', aspectRatio: '9/16', background: '#000', position: 'relative', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
                    <img src={v.img || `https://picsum.photos/seed/viral${typeof v === 'object' ? (v.id || v.views) : v}/600/1000`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                    <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: '#fff' }}>
                       <div style={{ fontSize: '18px', fontWeight: 950 }}>{v.views || `${v}M`} Views</div>
                       <div style={{ fontSize: '12px', opacity: 0.8 }}>Top Trending Content</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {hasCaseStudies && (
        <>
          <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px' }}>Successful Brand Collaborations</h3>
          <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: mob ? '12px' : '0' }}>
             {(c.case_studies || [
                { title: "Jaipur Heritage Launch", brand: "OYO Rooms", results: [{ l: 'Reach', v: '2.1M' }, { l: 'ROI', v: '4.2x' }] },
                { title: "Summer Fashion Drop", brand: "Meesho", results: [{ l: 'Sales', v: '15K+' }, { l: 'Clicks', v: '85K' }] },
                { title: "Tech Rural Growth", brand: "Amazon", results: [{ l: 'Views', v: '1.2M' }, { l: 'Shares', v: '10K' }] }
             ]).map((cs) => (
                <div key={cs.title} style={{ flexShrink: 0, width: mob ? '300px' : 'auto' }}>
                   <CaseStudyCard title={cs.title} brand={cs.brand} results={cs.results} />
                </div>
             ))}
          </div>
        </>
      )}

      <InfluenceMedia c={c} mob={mob} />
      <TrustBadge />
      <TabNavigator activeTab="work" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
WorkTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

const ServicesTab = ({ c, mob, setActiveTab }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <ServiceCatalog c={c} mob={mob} />
      <TrustBadge />
      <TabNavigator activeTab="services" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
ServicesTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

// --- MODALS ---

const RateCreatorModal = ({ open, onClose, name, dsp, onSubmit, user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please select a star rating' } }); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSubmit) {
        onSubmit({
          b: user?.name || 'Partner Brand',
          r: rating,
          t: text || 'Absolute professional. Highly recommended!',
          u: user?.email ? 'Verified Brand' : 'Verified Partner',
          d: 'Just now',
          type: 'brand',
          id: 'brand-' + Date.now()
        });
      }
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Review submitted and verified!' } });
      onClose();
    }, 1000);
  };

  return (
    <Modal open={open} title={'Write a Review for ' + name} onClose={onClose} width={500}>
       <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Only verified brands and creators can provide feedback to maintain platform integrity.</p>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
             {[1,2,3,4,5].map(s => (
               <button 
                 key={s} 
                 onMouseEnter={() => setHover(s)}
                 onMouseLeave={() => setHover(0)}
                 onClick={() => setRating(s)}
                 style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
               >
                 <Star 
                   size={40} 
                   fill={s <= (hover || rating) ? '#FF9431' : 'none'} 
                   color={s <= (hover || rating) ? '#FF9431' : '#cbd5e1'} 
                   style={{ transition: 'all 0.2s transform', transform: s === hover ? 'scale(1.2)' : 'scale(1)' }}
                 />
               </button>
             ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Fld label="Collaboration Feedback" type="textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Tell the community about your professional experience with this creator..." />
             
             <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Btn full lg onClick={onClose} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px' }}>Cancel</Btn>
                <Btn full lg onClick={handleSubmit} loading={loading} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px' }}>Submit Verified Review</Btn>
             </div>
          </div>
       </div>
    </Modal>
  );
};
RateCreatorModal.propTypes = { 
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  name: PropTypes.string.isRequired, 
  dsp: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
};

const LocalCollabHub = ({ c, mob, setActiveTab }) => {
  const isDummy = c.id === 'fallback';
  if (!c.local_collab && !isDummy) return <TabEmptyState title="Local Collab Hub" icon={MapPin} mob={mob} setActiveTab={setActiveTab} tabId="local" />;

  const voice = c.local_voice || `"Main local brands aur homegrown startups ko support karne ke liye hamesha ready hoon. Chota ho ya bada, har business ki ek kahani hoti hai jaisa Bharat tak pahunchani chahiye."`;
  const dialects = c.regional_dialects || 'Bhojpuri, Marwari, aur Hinglish';
  const hubs = c.local_impact_hubs || [
    { l: 'Indore', v: '85%' },
    { l: 'Bhopal', v: '72%' },
    { l: 'Ujjain', v: '64%' }
  ];

  return (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: '#FF9431' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,148,49,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="#FF9431" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Vocal for Local Initiative</span>
        </div>
        <h2 style={{ fontSize: mob ? '28px' : '44px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.04em' }}>Apne <span style={{ color: '#FF9431' }}>Local Business</span> ko Global Banayein</h2>
        <p style={{ fontSize: '18px', color: '#475569', fontWeight: 600, lineHeight: 1.6, maxWidth: '800px', fontStyle: 'italic' }}>
          {voice}
        </p>
      </div>
    </div>

    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#f0fdf4', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <MapPin size={24} color="#10b981" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Store Visits & Events</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>Offline store visits, launch events, aur local product reviews ke liye available in my active regions.</p>
      </Card>

      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Mic2 size={24} color="#3b82f6" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Regional Voice Expertise</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{dialects} mein content expertise for authentic regional connection and high local trust.</p>
      </Card>

      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Zap size={24} color="#ef4444" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Local Support Packages</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>Homegrown startups, small budgets, aur barter collaborations ke liye special terms available.</p>
      </Card>
    </div>

    <div style={{ background: '#fff', padding: mob ? '32px 24px' : '60px', borderRadius: '40px', border: '1.5px solid #f1f5f9', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
       <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: '#FF9431' }} />
       <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Mera Hyper-Local Impact Hub</h3>
       <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '40px', fontSize: '15px' }}>In regions mein mein active audience engagement average se 2x zyada hai.</p>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {hubs.map(x => (
            <div key={x.l} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ fontSize: '48px', fontWeight: 950, color: '#FF9431', lineHeight: 1, marginBottom: '8px' }}>{x.v}</div>
               <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>Reach in {x.l}</div>
               <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Hub Point</div>
            </div>
          ))}
       </div>
    </div>
    <TabNavigator activeTab="local" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
  );
};
LocalCollabHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

const QuickConnectHub = ({ c, mob, dsp, onBrief, onMediaKit }) => {
  const { st } = useApp();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [dlStatus, setDlStatus] = useState('idle'); // idle, loading, done

  const handleSend = () => {
    if(!msg.trim()) return;
    dsp({ t: 'TOAST', d: { type: 'success', msg: 'Message sent to ' + c.name } });
    setMsg('');
  };

  const handleMediaKit = () => {
    setDlStatus('loading');
    dsp({ t: 'TOAST', d: { type: 'info', msg: 'Generating Elite Media Kit...' } });
    
    setTimeout(() => {
       setDlStatus('done');
       dsp({ t: 'TOAST', d: { 
         type: 'success', 
         msg: 'Media Kit Ready! Click to view.',
         action: { label: 'View Now', onClick: onMediaKit }
       } });
    }, 2500);
  };

  let dlText = 'Download Media Kit';
  if (dlStatus === 'loading') dlText = 'Preparing PDF...';
  else if (dlStatus === 'done') dlText = 'Media Kit Downloaded';

  const hasUser = !!st?.user;

  return (
    <div id="quick-connect" style={{ marginTop: mob ? '20px' : '0', position: 'relative' }}>
       <div style={{ 
         display: 'grid', 
         gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', 
         gap: '32px', 
         marginBottom: '32px',
         filter: hasUser ? 'none' : 'blur(6px) grayscale(20%)',
         pointerEvents: hasUser ? 'auto' : 'none'
       }}>
          {/* Messaging Core */}
          <Card style={{ padding: mob ? '32px' : '48px', borderRadius: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', background: '#0073b110', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <MessageSquare size={20} color="#0073b1" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>Direct Line to {c.name}</h3>
             </div>
             <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', fontWeight: 500, lineHeight: 1.6 }}>
                "Professional collaborations start with a conversation. Main typically <b>24 ghanton</b> ke andar reply karta hoon professional inquiries ke liye."
             </p>
             
             <div style={{ position: 'relative' }}>
                <textarea 
                   value={msg}
                   onChange={e => setMsg(e.target.value)}
                   placeholder="Hi, I'm interested in collaborating on..." 
                   style={{ width: '100%', height: '180px', padding: '24px', borderRadius: '24px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '15px', outline: 'none', resize: 'none', color: '#1e293b', fontWeight: 500, transition: 'border-color 0.2s' }} 
                />
                <div style={{ position: 'absolute', bottom: '16px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }} />
                   <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Available Now</span>
                </div>
                <button 
                   onClick={handleSend}
                   style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(234, 88, 12, 0.25)' }}
                >
                   Send Message <Send size={16} />
                </button>
             </div>

             <div style={{ marginTop: '32px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[{ l: 'Response Rate', v: '98%' }, { l: 'Avg Time', v: '4h' }, { l: 'Verified', v: 'Yes' }].map(i => (
                  <div key={i.l}>
                     <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>{i.l}</div>
                     <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{i.v}</div>
                  </div>
                ))}
             </div>
          </Card>

          {/* Quick Actions Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Card style={{ padding: '24px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff' }}>
                <div style={{ fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Quick Toolkit</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button 
                      onClick={handleMediaKit} 
                      disabled={dlStatus === 'loading'}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: dlStatus === 'done' ? '#10B98110' : '#f8fafc', border: `1.5px solid ${dlStatus === 'done' ? '#10B98120' : '#f1f5f9'}`, borderRadius: '16px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.3s' }}
                    >
                       {dlStatus === 'loading' && (
                         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <Activity size={18} color="#FF9431" />
                         </motion.div>
                       )}
                       {dlStatus === 'done' && <CheckCircle2 size={18} color="#10B981" />}
                       {dlStatus === 'idle' && <FileText size={18} color="#64748b" />}
                       
                       <span style={{ fontSize: '14px', fontWeight: 800, color: dlStatus === 'done' ? '#10B981' : '#475569' }}>
                         {dlText}
                       </span>
                       {dlStatus === 'done' && <ArrowRight size={14} color="#10B981" style={{ marginLeft: 'auto' }} />}
                    </button>
                   <button onClick={() => { navigator.clipboard.writeText(globalThis.location.href); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile link copied!' } }); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#f8fafc', border: '1.5px solid #f1f5f9', borderRadius: '16px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                      <Share2 size={18} color="#64748b" />
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Copy Profile Link</span>
                   </button>
                </div>
             </Card>

             <div style={{ padding: '32px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderRadius: '32px', color: '#0f172a', border: '1.5px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 20px 40px rgba(15,23,42,0.03)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}><MapPin size={100} color="#FF9431" /></div>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Verified size={14} /> Regional Identity
                </div>
                <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>{c?.city || 'Bengaluru'}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active in South & West Bharat Hubs</div>
             </div>
          </div>
       </div>
       {!hasUser && (
         <GatedOverlay 
           title="Direct Communication Locked" 
           description="Join the platform as a verified Brand to send direct proposals, negotiate terms, and download official creator media kits." 
           onCtaClick={() => navigate('/login')}
         />
       )}

       {/* Professional Trust Bar */}
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {[
            { t: 'Secure Payments', d: 'Escrow protection for all brand collaborations.', i: ShieldCheck, c: '#10B981' },
            { t: 'Verified Metrics', d: 'Real-time audience and engagement data auditing.', i: Activity, c: '#FF9431' },
            { t: 'Elite Support', d: 'Dedicated manager for high-value partnerships.', i: UserCheck, c: '#3b82f6' }
          ].map(p => (
            <div key={p.t} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
               <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <p.i size={20} color={p.c} />
               </div>
               <div>
                  <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>{p.t}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{p.d}</div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};
QuickConnectHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, dsp: PropTypes.func.isRequired, onBrief: PropTypes.func.isRequired, onMediaKit: PropTypes.func.isRequired };

const PackageCard = ({ p, onSelect }) => (
  <Card style={{ padding: '32px', borderRadius: '40px', border: p.pop ? '2px solid #FF9431' : '1.5px solid #f1f5f9', position: 'relative', display: 'flex', flexDirection: 'column', background: '#fff', boxShadow: p.pop ? '0 20px 40px rgba(255,148,49,0.1)' : 'none' }}>
    {p.pop && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#FF9431', color: '#fff', padding: '4px 16px', borderRadius: '100px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Most Popular</div>}
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '14px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{p.l}</div>
      <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>{p.v}</div>
    </div>
    <div style={{ flex: 1, marginBottom: '32px' }}>
      {p.items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
          <CheckCircle2 size={16} color="#10B981" /> {item}
        </div>
      ))}
    </div>
    <button 
      onClick={() => onSelect(p)} 
      style={{ width: '100%', padding: '16px', borderRadius: '100px', background: p.pop ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)' : '#1e293b', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      Select Package
    </button>
  </Card>
);
PackageCard.propTypes = { 
  p: PropTypes.shape({
    l: PropTypes.string.isRequired,
    v: PropTypes.string.isRequired,
    pop: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired 
};

const CollabBriefModal = ({ open, onClose, pkg, creatorName, dsp }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brief sent successfully! The creator will review and respond.' } });
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title={`Brief for ${creatorName}`} width={550}>
       <div style={{ padding: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Selected Package</div>
             <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{pkg ? `${pkg.l} (${pkg.v})` : 'Custom Campaign Brief (Sponsorship)'}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Fld label="Campaign Objective" placeholder="e.g. Brand Awareness, Sales Drive, New Launch" />
             <Fld label="Target Timeline" placeholder="When do you want to go live?" />
             <Fld label="Additional Notes" type="textarea" placeholder="Tell the creator about your brand vision..." />
             
             <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Btn full lg onClick={onClose} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px' }}>Cancel</Btn>
                <Btn full lg onClick={handleSubmit} loading={loading} style={{ background: '#0073b1', color: '#fff', borderRadius: '100px' }}>Send Collaboration Brief</Btn>
             </div>
          </div>
       </div>
    </Modal>
  );
};
CollabBriefModal.propTypes = { open: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired, pkg: PropTypes.object, creatorName: PropTypes.string, dsp: PropTypes.func.isRequired };

const CollabFAQ = ({ mob }) => (
  <div style={{ marginTop: '80px', background: '#f8fafc', padding: mob ? '32px' : '60px', borderRadius: '40px', border: '1.5px solid #f1f5f9' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '40px', textAlign: 'center' }}>Collaboration Intelligence (FAQ)</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
        {[
          { q: 'What is the typical turnaround time?', a: 'For cinematic reels, it is 5-7 working days. Express delivery (48hrs) is available for select packages.' },
          { q: 'How do revisions work?', a: 'Every package includes 2 rounds of creative revisions to ensure the content aligns with brand guidelines.' },
          { q: 'Are raw files provided?', a: 'Raw footage can be provided as an add-on or included in the Brand Partner tier.' },
          { q: 'Usage rights for content?', a: 'Digital usage rights for 6 months are included in all professional tiers.' }
        ].map((f) => (
          <div key={f.q.slice(0, 20)} style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{f.q}</div>
             <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>{f.a}</div>
          </div>
        ))}
     </div>
  </div>
);
CollabFAQ.propTypes = { mob: PropTypes.bool };

const GalleryItem = ({ i, src, index, mob, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgUrl = typeof src === 'string' ? src : `https://picsum.photos/seed/elite-gal-${i}/1000/1000`;
  return (
    <button 
      key={`gal-${i}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '32px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', outline: 'none', padding: 0, background: 'none', width: '100%', display: 'block' }}
      onClick={() => onClick(index)}
    >
      <img src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ background: '#fff', padding: '16px', borderRadius: '50%', color: '#0f172a', display: 'flex' }}><ImageIcon size={24} /></span>
      </span>
    </button>
  );
};
GalleryItem.propTypes = { i: PropTypes.number.isRequired, src: PropTypes.any, index: PropTypes.number.isRequired, mob: PropTypes.bool, onClick: PropTypes.func.isRequired };

const GalleryTab = ({ c, mob, setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const isDummy = c.id === 'fallback';
  if (!c.gallery && !isDummy) return <TabEmptyState title="Gallery" icon={ImageIcon} mob={mob} setActiveTab={setActiveTab} tabId="gallery" />;
  const images = c.gallery || [1,2,3,4,5,6,7,8,9];

  const getImgUrl = (idx) => {
    if (idx === null || idx < 0 || idx >= images.length) return '';
    const src = images[idx];
    return typeof src === 'string' ? src : `https://picsum.photos/seed/elite-gal-${idx + 1}/1000/1000`;
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        setActiveIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
       <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>Lifestyle Gallery</h2>
             <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>The Elite Visual Identity</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: mob ? '16px' : '24px' }}>
             {images.map((img, idx) => (
                <GalleryItem key={img} i={idx + 1} index={idx} src={img} mob={mob} onClick={setActiveIndex} />
             ))}
          </div>
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
             <Btn lg onClick={() => window.open('https://instagram.com', '_blank', 'noopener,noreferrer')} style={{ borderRadius: '100px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', gap: '10px' }}>
                Follow on Instagram <ArrowRight size={20} />
             </Btn>
          </div>
       </div>

       {activeIndex !== null && createPortal(
         <AnimatePresence>
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setActiveIndex(null)}
             style={{
               position: 'fixed',
               inset: 0,
               background: 'rgba(10, 10, 10, 0.95)',
               backdropFilter: 'blur(20px)',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 999999,
               padding: '24px'
             }}
           >
             {/* Lightbox Header */}
             <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', zIndex: 10 }}>
                <div style={{ fontSize: '14px', fontWeight: 750, color: '#94a3b8' }}>
                   Image {activeIndex + 1} of {images.length}
                </div>
                <button 
                  onClick={() => setActiveIndex(null)} 
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  ✕
                </button>
             </div>

             {/* Main Container with Nav buttons and Image */}
             <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: mob ? '50vh' : '70vh' }}>
                {/* Left Arrow Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev - 1 + images.length) % images.length); }}
                  style={{
                    position: 'absolute',
                    left: mob ? '12px' : '-80px',
                    background: 'rgba(20, 20, 20, 0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: mob ? '44px' : '56px',
                    height: mob ? '44px' : '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '24px',
                    zIndex: 10,
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  ‹
                </button>

                {/* Image Wrapper */}
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <motion.img
                    key={activeIndex}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={getImgUrl(activeIndex)}
                    alt={`Gallery item ${activeIndex + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      borderRadius: '24px',
                      objectFit: 'contain',
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)'
                    }}
                  />
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev + 1) % images.length); }}
                  style={{
                    position: 'absolute',
                    right: mob ? '12px' : '-80px',
                    background: 'rgba(20, 20, 20, 0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: mob ? '44px' : '56px',
                    height: mob ? '44px' : '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '24px',
                    zIndex: 10,
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  ›
                </button>
             </div>

             {/* Bottom watermark or caption */}
             <div style={{ position: 'absolute', bottom: '24px', color: '#64748b', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Lifestyle Showcase • CreatorBharat verified
             </div>
           </motion.div>
         </AnimatePresence>,
         document.body
       )}

       <TrustBadge />
       <TabNavigator activeTab="gallery" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
GalleryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

const ReviewsTab = ({ c, mob, navigate, onWriteReview, setActiveTab }) => {
  const reviews = c.reviews || [
     { b: 'OYO Rooms', r: 5, t: 'Absolute professional. The Jaipur heritage campaign delivered 4x the expected engagement.', u: 'Brand Manager', d: '2 weeks ago', type: 'brand', id: 'oyo' },
     { b: 'Rohan Sharma', r: 5, t: 'The cultural storytelling in the summer drop was raw and authentic. Highly recommended!', u: 'Travel Creator', d: '1 month ago', type: 'creator', id: 'rohan' },
     { b: 'Amazon Bharat', r: 4, t: 'Great content quality. Revision process was smooth and delivery was on time.', u: 'Marketing Lead', d: '3 months ago', type: 'brand', id: 'amazon' }
  ];

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, rev) => sum + rev.r, 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 2fr', gap: '40px', marginBottom: '60px' }}>
          <div>
              <Card style={{ 
                padding: '40px', 
                textAlign: 'center', 
                borderRadius: '40px', 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                color: '#0f172a', 
                border: '1.5px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 20px 40px rgba(15,23,42,0.03)',
                marginBottom: '24px' 
              }}>
                 <div style={{ fontSize: '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Aggregate Authority</div>
                 <div style={{ fontSize: '72px', fontWeight: 950, color: '#0f172a', lineHeight: 1, marginBottom: '8px' }}>{averageRating}</div>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(s => {
                      const roundedRating = Math.round(Number(averageRating));
                      return <Star key={s} size={20} fill={s <= roundedRating ? '#FF9431' : 'none'} color={s <= roundedRating ? '#FF9431' : '#cbd5e1'} />;
                    })}
                 </div>
                 <div style={{ fontSize: '14px', fontWeight: 750, color: '#64748b' }}>Based on {c.reviews_count || totalReviews} Verified Collaborations</div>
              </Card>
              <Btn full lg onClick={() => onWriteReview()} style={{ borderRadius: '100px', background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none', gap: '10px', boxShadow: '0 12px 24px rgba(234, 88, 12, 0.2)' }}>
                  <Star size={18} fill="currentColor" /> Write a Review
              </Btn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {reviews.map((rev) => (
               <Card key={rev.id || Math.random()} style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                     <div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                           {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= rev.r ? '#FF9431' : 'none'} color={s <= rev.r ? '#FF9431' : '#cbd5e1'} />)}
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>"{rev.t}"</h4>
                     </div>
                     <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>{rev.d}</div>
                  </div>
                  <button 
                     onClick={() => rev.type ? navigate(`/${rev.type}/${rev.id}`) : null} 
                     style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', outline: 'none', background: 'none', border: 'none', padding: 0, textAlign: 'left', width: '100%' }}
                  >
                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>{rev.b[0]}</div>
                     <div>
                        <div style={{ fontSize: '15px', fontWeight: 900, color: '#0073b1', textDecoration: 'underline' }}>{rev.b}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 650 }}>{rev.u}</div>
                     </div>
                  </button>
               </Card>
             ))}
          </div>
       </div>
       <TrustBadge />
       <TabNavigator activeTab="reviews" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
ReviewsTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, navigate: PropTypes.func.isRequired, onWriteReview: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };

const PackagesTab = ({ c, mob, onSelect, setActiveTab }) => {
  const { st } = useApp();
  const navigate = useNavigate();
  const isDummy = c.id === 'fallback';
  if (!c.packages && (!c.services || c.services.length === 0) && !isDummy) return <TabEmptyState title="Packages" icon={Zap} mob={mob} setActiveTab={setActiveTab} tabId="packages" />;
  const packages = c.packages || (c.services && c.services.length > 0 ? c.services.map((s, idx) => ({
    l: s.t,
    v: s.rate ? `₹${Number(s.rate).toLocaleString('en-IN')}` : 'Custom',
    pop: idx === 1,
    items: s.d ? s.d.split(',').map(item => item.trim()) : []
  })) : [
    { l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] },
    { l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] },
    { l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }
  ]);

  const hasUser = !!st?.user;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: 'relative' }}>
      <div style={{ 
        display: mob ? 'flex' : 'grid', 
        gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', 
        gap: '24px', 
        overflowX: mob ? 'auto' : 'visible', 
        scrollbarWidth: 'none', 
        paddingBottom: '20px',
        filter: hasUser ? 'none' : 'blur(6px) grayscale(20%)',
        pointerEvents: hasUser ? 'auto' : 'none'
      }}>
         {packages.map((p) => (
           <PackageCard key={p.l} onSelect={onSelect} p={p} />
         ))}
      </div>
      {!hasUser && (
        <GatedOverlay 
          title="Collaboration Rates Gated" 
          description="Register as a verified Brand to unlock custom pricing sheets, specific campaign deliverables, and direct secure escrow bookings." 
          onCtaClick={() => navigate('/login')}
        />
      )}
      <CollabFAQ mob={mob} />
      <TrustBadge />
      <TabNavigator activeTab="packages" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
PackagesTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, onSelect: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };

// ─── SPONSOR TAB ─────────────────────────────────────────────────────────────
// Creator apne sponsor posts / promoted content yahan add kar sakta hai
// Free: max 1 post | Pro: unlimited posts
// Visitor view: promoted links, banners, shoutouts dekhta hai

const SPONSOR_TYPES = [
  { id: 'link', label: 'Promoted Link', icon: '🔗', desc: 'Kisi bhi website / app / product ka link promote karo', color: '#3B82F6' },
  { id: 'banner', label: 'Ad Banner', icon: '🖼️', desc: 'Image banner with CTA button — brand awareness ke liye', color: '#FF9431' },
  { id: 'shoutout', label: 'Shoutout Post', icon: '📣', desc: 'Kisi brand, creator ya product ka text shoutout', color: '#10B981' },
];

const SponsorPostCard = ({ post, isOwner, onDelete, mob }) => {
  const typeInfo = SPONSOR_TYPES.find(t => t.id === post.type) || SPONSOR_TYPES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#fff',
        borderRadius: 24,
        border: `1.5px solid ${typeInfo.color}20`,
        padding: mob ? '20px' : '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}
    >
      {/* Accent top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: typeInfo.color, borderRadius: '24px 24px 0 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>{typeInfo.icon}</span>
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, color: typeInfo.color, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
              {typeInfo.label}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>{post.date}</span>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(post.id)}
            style={{ background: '#fef2f2', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 11, fontWeight: 800, color: '#ef4444', cursor: 'pointer' }}
          >
            Remove
          </button>
        )}
      </div>

      {/* Banner image */}
      {post.imageUrl && (
        <div style={{ width: '100%', height: 160, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
          <img src={post.imageUrl} alt="Sponsor banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <h4 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>{post.title}</h4>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, fontWeight: 500, marginBottom: post.link ? 16 : 0 }}>
        {post.description}
      </p>

      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: typeInfo.color, color: '#fff',
            padding: '10px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 800, textDecoration: 'none',
            marginTop: 4
          }}
        >
          {post.ctaText || 'Visit Now'} →
        </a>
      )}

      {/* Sponsored label */}
      <div style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 9, fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px' }}>
        SPONSORED
      </div>
    </motion.div>
  );
};
SponsorPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

const AddSponsorModal = ({ onClose, onAdd, existingCount, isPro }) => {
  const navigate = useNavigate();
  const [type, setType] = useState('link');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const FREE_LIMIT = 1;
  const isLocked = !isPro && existingCount >= FREE_LIMIT;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setTimeout(() => {
      onAdd({
        id: 'sp-' + Date.now(),
        type,
        title: title.trim(),
        description: description.trim(),
        link: link.trim(),
        ctaText: ctaText.trim() || 'Visit Now',
        imageUrl: imageUrl.trim(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      setSaving(false);
      onClose();
    }, 800);
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 28, padding: 36, maxWidth: 520, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: 0 }}>Add Sponsor Post</h3>
          <button onClick={onClose} style={{ background: '#f8fafc', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'grid', placeItems: 'center', cursor: 'pointer', fontSize: 18, color: '#64748b' }}>✕</button>
        </div>

        {isLocked ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
            <h4 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Pro Feature</h4>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>
              Free plan mein sirf 1 sponsor post allowed hai. Unlimited posts ke liye Pro upgrade karo.
            </p>
            <button onClick={() => navigate('/creator/pricing')} style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '12px 28px', borderRadius: 100, fontWeight: 900, fontSize: 14, border: 'none', cursor: 'pointer' }}>
              Upgrade to Pro →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Type selector */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 10 }}>Post Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {SPONSOR_TYPES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    style={{
                      flex: 1, padding: '10px 6px', borderRadius: 12,
                      border: `1.5px solid ${type === t.id ? t.color : '#e2e8f0'}`,
                      background: type === t.id ? t.color + '10' : '#fff',
                      cursor: 'pointer', fontSize: 11, fontWeight: 800,
                      color: type === t.id ? t.color : '#64748b',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    {t.label.split(' ')[0]}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 8, fontWeight: 500 }}>
                {SPONSOR_TYPES.find(t => t.id === type)?.desc}
              </p>
            </div>

            {/* Title */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>
                Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Nykaa New Launch — 20% Off"
                required
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Brief description jo visitor ko action lene ke liye inspire kare..."
                rows={3}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>

            {/* Link */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>URL / Link</label>
              <input
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://..."
                type="url"
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* CTA Text */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>CTA Button Text</label>
                <input
                  value={ctaText}
                  onChange={e => setCtaText(e.target.value)}
                  placeholder="Visit Now"
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Image URL (Optional)</label>
                <input
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://image..."
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || !title.trim()}
              style={{ width: '100%', padding: '16px', background: saving ? '#94a3b8' : '#0f172a', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 900, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', marginTop: 4 }}
            >
              {saving ? 'Adding...' : 'Publish Sponsor Post'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
AddSponsorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  existingCount: PropTypes.number.isRequired,
  isPro: PropTypes.bool
};

const SponsorTab = ({ c, mob, setActiveTab }) => {
  const STORAGE_KEY = `cb_sponsor_posts_${c?.id || c?.slug || 'default'}`;

  // Load posts from localStorage — demo posts for fallback/preview creators
  const posts = (() => {
    if (c?.sponsored_posts && c.sponsored_posts.length > 0) {
      return c.sponsored_posts;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch (_) { /* ignore */ }
    if (c?.id === 'fallback' || !c?.email) {
      return [
        {
          id: 'sp-demo-1', type: 'link',
          title: 'Nykaa Summer Collection — Flat 30% Off',
          description: 'Meri favourite beauty brand ka summer sale chal raha hai. Is link se extra 30% discount milega — limited time offer!',
          link: 'https://nykaa.com', ctaText: 'Shop Now', imageUrl: '', date: '12 Jun 2026'
        },
        {
          id: 'sp-demo-2', type: 'shoutout',
          title: 'Shoutout: @BharatStartups Podcast',
          description: 'Ye podcast sunna chahiye — India ke young founders ki real stories. Weekly episodes, amazing guests. Highly recommend!',
          link: 'https://bharatstartups.in', ctaText: 'Listen Now', imageUrl: '', date: '8 Jun 2026'
        }
      ];
    }
    return [];
  })();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>

      {/* Section heading */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>📢</span>
          <h2 style={{ fontSize: mob ? 22 : 28, fontWeight: 950, color: '#0f172a', margin: 0 }}>
            Sponsored Content
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0 }}>
          Creator ke promoted products, links aur shoutouts — unke audience ke liye.
        </p>
      </div>

      {/* Empty state */}
      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: 24, border: '1.5px dashed #e2e8f0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📢</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#475569', marginBottom: 6 }}>No sponsored content yet</div>
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Creator ne abhi koi promoted post share nahi kiya.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {posts.map(post => {
            const typeInfo = SPONSOR_TYPES.find(t => t.id === post.type) || SPONSOR_TYPES[0];
            return (
              <motion.div
                key={post.id}
                whileHover={{ y: -4 }}
                style={{
                  background: '#fff', borderRadius: 24,
                  border: `1.5px solid ${typeInfo.color}20`,
                  padding: mob ? '20px' : '26px',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: typeInfo.color, borderRadius: '24px 24px 0 0' }} />

                {/* Type + date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>{typeInfo.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 900, color: typeInfo.color, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    {typeInfo.label}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{post.date}</span>
                </div>

                {/* Banner image */}
                {post.imageUrl && (
                  <div style={{ width: '100%', height: 150, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                    <img src={post.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                {/* Title */}
                <h4 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>
                  {post.title}
                </h4>

                {/* Description */}
                {post.description && (
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500, marginBottom: post.link ? 16 : 0 }}>
                    {post.description}
                  </p>
                )}

                {/* CTA Button */}
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: typeInfo.color, color: '#fff',
                      padding: '9px 18px', borderRadius: 100,
                      fontSize: 13, fontWeight: 800, textDecoration: 'none'
                    }}
                  >
                    {post.ctaText || 'Visit Now'} →
                  </a>
                )}

                {/* Sponsored watermark */}
                <div style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 9, fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  SPONSORED
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <TrustBadge />
      <TabNavigator activeTab="sponsor" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
SponsorTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };


// --- MAIN PAGE ---

const getFallbackCreator = (id) => {
  if (id === 'empty') {
    return {
      id: 'empty',
      name: 'Empty Creator Profile',
      slug: 'empty',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      city: 'Delhi',
      niche: 'Demo',
      bio: '',
      isVerified: false
    };
  }
  return {
    id: 'fallback',
    name: id.charAt(0).toUpperCase() + id.slice(1),
    slug: id,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    city: 'Mumbai',
    niche: 'Lifestyle & Tech',
    bio: 'Elite storyteller and digital creator dedicated to high-impact content and cultural narratives across Bharat.',
    isVerified: true,
    followers: 130000,
    score: 85,
    er: 4.8,
    likes: 1242,
    connections: '10K+',
    tagline: 'Expert in Lifestyle & Tech Storytelling | Building authentic brand identities across Bharat.'
  };
};

const ProfileTabContent = ({ 
  activeTab, c, stats, mob, onRateClick, navigate, onPackageSelect, dsp, setBriefOpen, setMediaKitOpen, setActiveTab 
}) => {
  switch (activeTab) {
    case 'identity':
      return <IdentityTab key="tab-identity" c={c} stats={stats} onRate={onRateClick} mob={mob} setActiveTab={setActiveTab} />;
    case 'story':
      return <StoryTab key="tab-story" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'gallery':
      return <GalleryTab key="tab-gallery" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'work':
      return <WorkTab key="tab-work" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'services':
      return <ServicesTab key="tab-services" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'local':
      return <LocalCollabHub key="tab-local" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'reviews':
      return <ReviewsTab key="tab-reviews" c={c} mob={mob} navigate={navigate} onWriteReview={onRateClick} setActiveTab={setActiveTab} />;
    case 'packages':
      return <PackagesTab key="tab-packages" c={c} mob={mob} onSelect={onPackageSelect} setActiveTab={setActiveTab} />;
    case 'sponsor':
      return <SponsorTab key="tab-sponsor" c={c} mob={mob} st={dsp} setActiveTab={setActiveTab} />;
    case 'connect':
      return (
        <motion.div key="tab-connect" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
           <QuickConnectHub c={c} mob={mob} dsp={dsp} onBrief={() => setBriefOpen(true)} onMediaKit={() => setMediaKitOpen(true)} />
           <div style={{ marginTop: '40px' }}>
              <SocialLinkTree links={c?.links} mob={mob} />
           </div>
           <TrustBadge />
           <TabNavigator activeTab="connect" setActiveTab={setActiveTab} mob={mob} />
        </motion.div>
      );
    default:
      return null;
  }
};
ProfileTabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  c: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  onRateClick: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  onPackageSelect: PropTypes.func.isRequired,
  dsp: PropTypes.func.isRequired,
  setBriefOpen: PropTypes.func.isRequired,
  setMediaKitOpen: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const ProfileSkeleton = ({ id, mob }) => {
  const heroPadding = mob ? '40px 16px 60px' : '80px 0 100px';
  const containerPadding = mob ? '0 16px' : '0 24px';
  const flexDir = mob ? 'column' : 'row';
  const avatarSize = mob ? '120px' : '180px';
  const alignStyle = mob ? 'center' : 'flex-start';
  const nameWidth = mob ? '80%' : '320px';
  const bioWidth1 = mob ? '95%' : '480px';
  const bioWidth2 = mob ? '85%' : '400px';
  const statsColumns = mob ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)';
  const sliceCount = mob ? 4 : 5;
  const bodyColumns = mob ? '1fr' : '2fr 1fr';

  return (
    <div style={{ minHeight: '100vh', background: '#fcfcfc', color: '#0f172a', paddingBottom: '100px' }}>
      {/* Injecting CSS Keyframes inline */}
      <style>{`
        @keyframes cbShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-light {
          background: linear-gradient(90deg, #f8fafc 25%, #e2e8f0 37%, #f8fafc 63%);
          background-size: 200% 100%;
          animation: cbShimmer 1.5s infinite ease-in-out;
        }
      `}</style>

      {/* SKELETON HERO COVER (LIGHT WHITE) */}
      <div style={{ background: '#ffffff', padding: heroPadding, borderBottom: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: containerPadding, display: 'flex', flexDirection: flexDir, gap: '32px', alignItems: 'center' }}>
          
          {/* Avatar Circle Shimmer */}
          <div className="shimmer-light" style={{ width: avatarSize, height: avatarSize, borderRadius: '50%', flexShrink: 0, border: '4px solid #fff', boxShadow: '0 12px 32px rgba(0,0,0,0.05)' }} />
          
          {/* Details Shimmer */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: alignStyle, gap: '16px', width: '100%' }}>
            
            {/* Saffron accent mini-pill */}
            <div className="shimmer-light" style={{ width: '100px', height: '20px', borderRadius: '100px' }} />
            
            {/* Creator Name pulse */}
            <div className="shimmer-light" style={{ width: nameWidth, height: '40px', borderRadius: '12px' }} />
            
            {/* Bio paragraph pulses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: alignStyle }}>
              <div className="shimmer-light" style={{ width: bioWidth1, height: '16px', borderRadius: '8px' }} />
              <div className="shimmer-light" style={{ width: bioWidth2, height: '16px', borderRadius: '8px' }} />
            </div>

            {/* Verification & Button Group */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px', width: '100%', justifyContent: alignStyle }}>
              <div className="shimmer-light" style={{ width: '120px', height: '36px', borderRadius: '100px' }} />
              <div className="shimmer-light" style={{ width: '140px', height: '36px', borderRadius: '100px' }} />
            </div>

          </div>
        </div>
      </div>

      {/* STATS STRIP SHIMMER */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9', padding: '24px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: containerPadding, display: 'grid', gridTemplateColumns: statsColumns, gap: '16px' }}>
          {[1, 2, 3, 4, 5].slice(0, sliceCount).map(idx => (
            <div key={idx} className="shimmer-light" style={{ height: '70px', borderRadius: '16px', border: '1px solid #f1f5f9' }} />
          ))}
        </div>
      </div>

      {/* STICKY NAV TABS SHIMMER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '16px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: containerPadding, display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[1, 2, 3, 4, 5, 6].map(idx => (
            <div key={idx} className="shimmer-light" style={{ width: '100px', height: '32px', borderRadius: '8px', flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* BODY COMPONENT SHIMMER */}
      <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: containerPadding }}>
        <div style={{ display: 'grid', gridTemplateColumns: bodyColumns, gap: '40px' }}>
          
          {/* Main Content Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="shimmer-light" style={{ height: '350px', borderRadius: '32px' }} />
            <div className="shimmer-light" style={{ height: '220px', borderRadius: '32px' }} />
          </div>

          {/* Sidebar Connect Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="shimmer-light" style={{ height: '200px', borderRadius: '32px' }} />
            <div className="shimmer-light" style={{ height: '140px', borderRadius: '32px' }} />
          </div>

        </div>
      </div>

      {/* Floating sweep loading tag */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', padding: '12px 24px', borderRadius: '100px', color: '#0f172a', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 12px 32px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <ShieldCheck size={14} color="#FF9431" style={{ animation: 'spin 2s infinite linear' }} />
        <span>Authenticating {id}..</span>
      </div>

    </div>
  );
};
ProfileSkeleton.propTypes = {
  id: PropTypes.string,
  mob: PropTypes.bool
};


export default function CreatorProfilePage() {
  const { id } = useParams();
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [c, setC] = useState(st?.sel?.creator || null);
  const [ld, setLd] = useState(!c);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('identity');
  const [rateOpen, setRateOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [mediaKitOpen, setMediaKitOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const [tabScrolled, setTabScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    globalThis.dispatchEvent(new CustomEvent('cb-tab-change', { detail: activeTab }));
    return () => {
      globalThis.dispatchEvent(new CustomEvent('cb-tab-change', { detail: 'identity' }));
    };
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const curY = globalThis.scrollY;
      const diff = curY - lastY.current;
      if (curY < 50) setNavVisible(true);
      else if (diff > 10) setNavVisible(false);
      else if (diff < -10) setNavVisible(true);
      setTabScrolled(curY > 100);
      lastY.current = curY;
    };
    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (st?.sel?.creator?.packages && (String(st?.sel?.creator?.id) === String(id) || st?.sel?.creator?.slug === id)) {
      setC(st.sel.creator);
      setLd(false);
      return;
    }
    if (!id) return;
    setLd(true);
    const triggerFetch = async () => {
      if (id === 'fallback') {
        setC(getFallbackCreator(id));
        setLd(false);
        return;
      }
      try {
        const found = await fetchCreatorById(id);
        setC(found || getFallbackCreator(id));
      } catch (err) {
        if (import.meta.env.DEV && (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('fetch'))) {
          console.warn('Creator Profile fetch warning (API sleeping/offline, using seed fallback):', err.message);
        } else {
          console.error('Creator not found, loading Elite Demo profile:', err);
        }
        setC(getFallbackCreator(id));
      } finally {
        setLd(false);
      }
    };
    triggerFetch();
  }, [id, st?.sel?.creator]);

  const stats = useMemo(() => {
    if (!c) return { followers: 0, er: 0, reach: 0, authenticity: 0, score: 0 };
    return { 
      followers: c.followers || 130000, 
      er: c.er || 4.8, 
      reach: Math.floor((c.followers || 130000) * 0.85), 
      authenticity: c.authenticity || 98.2, 
      score: c.score || 85 
    };
  }, [c]);

  const handleRateClick = () => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to rate this creator' } }); return; }
    setRateOpen(true);
  };

  const handleReviewSubmit = (newReview) => {
    const updatedReviews = c.reviews ? [newReview, ...c.reviews] : [newReview];
    const updatedCreator = {
      ...c,
      reviews: updatedReviews,
      reviews_count: (c.reviews_count || (c.reviews ? c.reviews.length : 3)) + 1
    };
    setC(updatedCreator);

    // Save to LocalStorage
    const allC = LS.get('cb_creators', []);
    const idx = allC.findIndex(cr => cr.id === c.id || cr.email === c.email || cr.slug === c.slug);
    if (idx !== -1) {
      allC[idx] = updatedCreator;
      LS.set('cb_creators', allC);
    }
  };

  const handlePackageSelect = (pkg) => {
    if (!st?.user) { 
      dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login as a Brand to book packages' } }); 
      navigate('/login');
      return; 
    }
    setSelectedPkg(pkg);
    setBriefOpen(true);
  };

  const handleMediaKitOpen = () => {
    if (!st?.user) {
      dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login as a Brand to download the official Media Kit' } });
      navigate('/login');
      return;
    }
    setMediaKitOpen(true);
  };

  const profileJsonLd = useMemo(() => {
    if (!c) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": c.name,
        "description": c.bio || `${c.name} is an elite storyteller and verified digital content creator on CreatorBharat.`,
        "image": c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=0f172a&color=fff`,
        "jobTitle": c.niche || "Content Creator",
        "homeLocation": {
          "@type": "Place",
          "name": c.city || "India"
        },
        "url": typeof window !== 'undefined' ? window.location.href : `https://creatorbharat.com/creator/${c.id || c.slug || 'profile'}`,
        "interactionStatistic": [
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/FollowAction",
            "userInteractionCount": stats?.followers || 12000
          }
        ]
      }
    };
  }, [c, stats]);

  const tabBarRef = useRef(null);
  const contentRef = useRef(null);

  // When tab changes: scroll to content top + scroll active tab into view in bar
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // Scroll page so content area is just below sticky tab bar
    setTimeout(() => {
      if (tabBarRef.current) {
        const barBottom = tabBarRef.current.getBoundingClientRect().bottom;
        const scrollTarget = globalThis.scrollY + barBottom - 8;
        globalThis.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      }
    }, 40);

    // Scroll active tab into view horizontally in the sticky bar (mobile)
    setTimeout(() => {
      if (tabBarRef.current) {
        const activeBtn = tabBarRef.current.querySelector(`[data-tabid="${tabId}"]`);
        if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 20);
  };

  if (ld) return <ProfileSkeleton id={id} mob={mob} />;
  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty title="Profile Not Found" onCta={() => navigate('/creators')} /></div>;

  // Sticky offset — always account for Navbar height so tab bar hugs just below it
  const NAVBAR_H_DESKTOP = 72;
  const NAVBAR_H_MOBILE = 60;
  let stickyTop;
  if (!mob) {
    stickyTop = navVisible ? `${NAVBAR_H_DESKTOP}px` : '0px';
  } else {
    // On mobile the navbar is always visible at the top
    stickyTop = `${NAVBAR_H_MOBILE}px`;
  }

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px', overflow: 'visible' }}>
      <Seo 
        title={`${c.name} (@${c.handle || 'creator'}) — Verified Profile`}
        description={c.bio || `${c.name} is an elite storytelling content creator specializing in ${Array.isArray(c.niche) ? c.niche.join(', ') : (c.niche || 'Digital Content')} from ${c.city || 'Bharat'}. View portfolio, reach stats & campaign history on CreatorBharat.`}
        image={c.profile_pic || c.avatarUrl}
        type="profile"
        jsonLd={profileJsonLd}
      />
      <ProfileHero c={c} stats={stats} navigate={navigate} st={st} dsp={dsp} mob={mob} onRate={handleRateClick} onContact={() => setActiveTab('connect')} onMediaKit={handleMediaKitOpen} navVisible={navVisible} onBrief={handlePackageSelect} />
      
      {/* ── STICKY TAB BAR: Apple 2026 Glassmorphism Floating Pill ── */}
      <div
        ref={tabBarRef}
        style={{
          position: 'sticky',
          top: stickyTop,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: mob ? '8px 12px' : '12px 24px',
          transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          // transparent row — pill itself has the glass background
        }}
      >
        <style>{`
          @keyframes cb-tab-pop {
            0% { transform: scale(0.92); opacity: 0.6; }
            60% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .cb-pill-btn { -webkit-tap-highlight-color: transparent; }
          .cb-pill-btn:hover .cb-pill-hover { opacity: 1 !important; }
        `}</style>

        {/* The floating pill container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: mob ? '2px' : '3px',
            padding: mob ? '5px' : '6px',
            background: tabScrolled
              ? 'rgba(255,255,255,0.96)'
              : 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            borderRadius: '100px',
            border: '1px solid rgba(226,232,240,0.6)',
            boxShadow: tabScrolled
              ? '0 8px 32px rgba(15,23,42,0.16), 0 2px 8px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.95)'
              : '0 4px 24px rgba(15,23,42,0.10), 0 1px 6px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.95)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
            transition: 'box-shadow 0.3s ease, background 0.3s ease',
          }}
        >
          {[
            { id: 'identity',  label: 'Identity',    icon: Activity,      group: 'main' },
            { id: 'story',     label: 'Story',       icon: Globe,         group: 'main' },
            { id: 'gallery',   label: 'Gallery',     icon: ImageIcon,     group: 'main' },
            { id: 'work',      label: 'Work',        icon: Briefcase,     group: 'main' },
            { id: 'services',  label: 'Services',    icon: Sparkles,      group: 'main' },
            { id: 'local',     label: 'Local',       icon: MapPin,        group: 'main' },
            { id: 'reviews',   label: 'Reviews',     icon: Star,          group: 'main' },
            { id: 'packages',  label: 'Packages',    icon: Zap,           group: 'action' },
            { id: 'sponsor',   label: 'Sponsored',   icon: Megaphone,     group: 'action' },
            { id: 'connect',   label: 'Connect',     icon: MessageSquare, group: 'action' },
          ].map((t, idx, arr) => {
            const isActive = activeTab === t.id;
            const isAction = t.group === 'action';
            const showDivider = !mob && idx > 0 && arr[idx - 1].group !== t.group;

            const activeBg = isAction
              ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)'
              : 'linear-gradient(135deg, #0073b1 0%, #0ea5e9 100%)';
            const activeGlow = isAction
              ? '0 4px 14px rgba(255,148,49,0.5), 0 1px 3px rgba(0,0,0,0.1)'
              : '0 4px 14px rgba(0,115,177,0.4), 0 1px 3px rgba(0,0,0,0.1)';

            return (
              <React.Fragment key={t.id}>
                {showDivider && (
                  <div style={{
                    width: '1px',
                    height: '18px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(203,213,225,0.7) 50%, transparent 100%)',
                    flexShrink: 0,
                    margin: '0 2px',
                  }} />
                )}
                <button
                  className="cb-pill-btn"
                  data-tabid={t.id}
                  onClick={() => handleTabChange(t.id)}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: mob ? 4 : 6,
                    padding: isActive
                      ? (mob ? '7px 13px' : '8px 16px')
                      : (mob ? '7px 10px' : '8px 13px'),
                    background: isActive ? activeBg : 'transparent',
                    border: 'none',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    color: isActive ? '#fff' : '#64748b',
                    fontSize: mob ? 11 : 12.5,
                    fontWeight: isActive ? 800 : 600,
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? activeGlow : 'none',
                    transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    outline: 'none',
                    letterSpacing: isActive ? '-0.01em' : '0',
                    animation: isActive ? 'cb-tab-pop 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
                  }}
                >
                  {/* Hover ghost for inactive */}
                  {!isActive && (
                    <span
                      className="cb-pill-hover"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '100px',
                        background: isAction ? 'rgba(255,148,49,0.08)' : 'rgba(15,23,42,0.06)',
                        opacity: 0,
                        transition: 'opacity 0.15s ease',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <t.icon size={mob ? 12 : 13} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0 }} />

                  <span>{t.label}</span>

                  {/* AD badge */}
                  {t.id === 'sponsor' && !isActive && (
                    <span style={{
                      background: 'rgba(255,148,49,0.12)',
                      color: '#FF9431',
                      fontSize: 7.5,
                      fontWeight: 900,
                      padding: '2px 5px',
                      borderRadius: 100,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255,148,49,0.18)',
                    }}>AD</span>
                  )}
                  {/* HIRE badge */}
                  {t.id === 'connect' && !isActive && (
                    <span style={{
                      background: 'rgba(16,185,129,0.1)',
                      color: '#10B981',
                      fontSize: 7.5,
                      fontWeight: 900,
                      padding: '2px 5px',
                      borderRadius: 100,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(16,185,129,0.18)',
                    }}>HIRE</span>
                  )}

                  {/* Shimmer overlay on active */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '100px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)',
                      pointerEvents: 'none',
                    }} />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div ref={contentRef} id="profile-content-area" style={{ ...W(1100), padding: mob ? '0 16px 120px' : '60px 24px' }}>
         <AnimatePresence mode="wait">
            <ProfileTabContent 
               activeTab={activeTab}
               c={c}
               stats={stats}
               mob={mob}
               onRateClick={handleRateClick}
               navigate={navigate}
               onPackageSelect={handlePackageSelect}
               dsp={dsp}
               setBriefOpen={setBriefOpen}
               setMediaKitOpen={handleMediaKitOpen}
               setActiveTab={handleTabChange}
            />
         </AnimatePresence>
      </div>

      {activeTab === 'identity' && (
        <section style={{ marginTop: '100px', padding: mob ? '60px 16px' : '100px 0', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: '#FF9431', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
           <div style={{ ...W(1100), margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                 <button onClick={() => navigate(st.user ? (st.role === 'brand' ? '/brand-dashboard' : '/creator/dashboard') : '/')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '8px 24px', borderRadius: '100px', fontSize: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Visit Official Platform <ArrowRight size={14} />
                 </button>
              </div>
              <h2 style={{ fontSize: mob ? '32px' : '56px', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', marginBottom: '24px' }}>Ready to Scale Your <span style={{ color: '#FF9431' }}>Brand Legacy?</span></h2>
              <p style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 500, maxWidth: '700px', margin: '0 auto 48px' }}>Join the exclusive circle of Bharat's most influential voices and top-tier brands building the future of storytelling.</p>
              
              <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '32px', textAlign: 'center', width: mob ? '100%' : '450px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ width: '50px', height: '50px', background: '#FF943120', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                       <Briefcase size={24} color="#FF9431" />
                    </div>
                    <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{st?.role === 'brand' ? 'Brand Console' : 'I am a Brand'}</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Hire {c?.name || 'Elite Creators'} or explore our elite creators network for your next big campaign.</p>
                    <Btn full lg style={{ background: '#FF9431', borderRadius: '100px' }} onClick={() => navigate(st?.role === 'brand' ? '/brand-dashboard' : '/creators')}>{st?.role === 'brand' ? 'Open Brand Dashboard' : 'Hire Elite Creators'}</Btn>
                 </div>

                 <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '32px', textAlign: 'center', width: mob ? '100%' : '450px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ width: '50px', height: '50px', background: '#10B98120', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                       <Verified size={24} color="#10B981" />
                    </div>
                    <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{st?.role === 'creator' ? 'Creator Workspace' : 'I am a Creator'}</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>{st?.role === 'creator' ? 'Edit your profile builder and keep this public page polished for brands.' : 'Apply for an Elite Audit and get a professional profile like this one.'}</p>
                    <Btn full lg style={{ background: '#fff', color: '#0f172a', borderRadius: '100px' }} onClick={() => navigate(st?.role === 'creator' ? '/creator/profile' : '/apply')}>{st?.role === 'creator' ? 'Edit My Profile' : 'Get Elite Verified'}</Btn>
                 </div>
              </div>
           </div>
        </section>
      )}


      <RateCreatorModal open={rateOpen} name={c?.name || 'Creator'} dsp={dsp} onSubmit={handleReviewSubmit} user={st?.user} onClose={() => setRateOpen(false)} />
      <CollabBriefModal open={briefOpen} pkg={selectedPkg} creatorName={c?.name || 'Creator'} dsp={dsp} onClose={() => setBriefOpen(false)} />
      {c && stats && <MediaKitPreview open={mediaKitOpen} onClose={() => setMediaKitOpen(false)} creator={c} stats={stats} />}
    </div>
  );
}
