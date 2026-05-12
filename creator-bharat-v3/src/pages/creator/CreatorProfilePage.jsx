import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { fetchCreatorById } from '../../utils/platformService';
import { W, fmt } from '../../utils/helpers';
import { Btn, Bdg, Empty, Modal, Fld, Card } from '@/components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Briefcase,
  Activity,
  Globe,
  CheckCircle2,
  Share2,
  Verified,
  Star,
  Compass,
  FileText,
  Mic2,
  Trophy,
  Download,
  Play,
  UserPlus,
  UserCheck,
  ArrowRight,
  Send,
  Image as ImageIcon
} from 'lucide-react';

// --- CUSTOM ELITE SOCIAL ICONS (SVG) ---

const EliteSocialIcon = ({ type, size = 20, color = 'currentColor' }) => {
  const icons = {
    insta: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    yt: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    twitter: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    spotify: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.218.358-.678.473-1.036.255-2.853-1.743-6.444-2.138-10.672-1.173-.408.094-.814-.162-.907-.57-.094-.409.163-.815.572-.908 4.629-1.059 8.594-.613 11.782 1.334.358.219.473.678.261 1.062zm1.472-3.255c-.274.446-.855.589-1.301.314-3.264-2.006-8.24-2.589-12.099-1.417-.5.152-1.026-.134-1.179-.636-.153-.502.134-1.027.636-1.18 4.414-1.339 9.904-.683 13.629 1.606.446.274.589.855.314 1.313zm.127-3.385C15.35 8.441 9.176 8.236 5.617 9.317c-.551.167-1.127-.152-1.294-.702-.167-.552.152-1.127.702-1.294 4.093-1.242 10.916-1.008 15.222 1.549.497.295.661.935.366 1.432-.295.498-.935.662-1.432.366z"/></svg>,
    substack: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.078V0z"/></svg>
  };
  return icons[type] || icons.insta;
};
EliteSocialIcon.propTypes = { type: PropTypes.string.isRequired, size: PropTypes.number, color: PropTypes.string };

// --- ELITE UI UTILITIES ---

const TrustBadge = () => (
  <div style={{ background: '#f8fafc', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e2e8f0', width: '100%', marginTop: '40px' }}>
    <ShieldCheck size={20} color="#10B981" />
    <span style={{ fontSize: '12px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
      All metrics, location data, and brand history verified by CreatorBharat Official Audit
    </span>
  </div>
);

const BadgeRow = ({ score }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
     <Bdg color="orange" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px', border: '1px solid rgba(255,148,49,0.2)' }}>
        <Zap size={14} fill="currentColor" /> {score} ELITE SCORE
     </Bdg>
     <Bdg color="green" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px' }}>
        <ShieldCheck size={14} /> VERIFIED PARTNER
     </Bdg>
  </div>
);
BadgeRow.propTypes = { score: PropTypes.number.isRequired };

// --- SOCIAL STACK (EXHAUSTIVE) ---

// --- SOCIAL PULSE SYSTEM ---

const EliteSocialPulse = ({ mob }) => {
  const socials = [
    { n: 'Instagram', id: 'insta', c: '#E4405F', v: '150K+', p: 'High Engagement' },
    { n: 'YouTube', id: 'yt', c: '#FF0000', v: '85K+', p: 'Long-form Authority' },
    { n: 'LinkedIn', id: 'linkedin', c: '#0077B5', v: '12K+', p: 'B2B Influence' },
    { n: 'Twitter', id: 'twitter', c: '#000000', v: '45K+', p: 'Viral Velocity' }
  ];

  return (
    <div style={{ marginBottom: '60px' }}>
       <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', padding: mob ? '32px' : '60px', color: '#fff', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#FF9431', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981' }} />
                <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: '#94a3b8' }}>Live Social Pulse</span>
             </div>
             <h3 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, marginBottom: '40px', letterSpacing: '-0.03em' }}>Total Global Reach: <span style={{ color: '#FF9431' }}>292K+</span></h3>
             
             <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
                {socials.map(s => (
                  <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '24px', backdropFilter: 'blur(10px)' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${s.c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <EliteSocialIcon type={s.id} size={20} color={s.c} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '14px' }}>{s.n}</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div>
                           <div style={{ fontSize: '24px', fontWeight: 900, marginBottom: '4px' }}>{s.v}</div>
                           <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{s.p}</div>
                        </div>
                        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>
                           Visit <ArrowRight size={10} />
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};
EliteSocialPulse.propTypes = { mob: PropTypes.bool };

const SocialStack = ({ mob }) => {
  const socials = [
    { n: 'Instagram', id: 'insta', c: '#E4405F', v: '150K' },
    { n: 'YouTube', id: 'yt', c: '#FF0000', v: '85K' },
    { n: 'LinkedIn', id: 'linkedin', c: '#0077B5', v: '12K' },
    { n: 'Twitter', id: 'twitter', c: '#000000', v: '45K' },
    { n: 'Spotify', id: 'spotify', c: '#1DB954', v: '5K' },
    { n: 'Substack', id: 'substack', c: '#FF6719', v: '2K' }
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
       {socials.map(s => (
         <div key={s.n} style={{ padding: '16px', background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${s.c}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <EliteSocialIcon type={s.id} size={18} color={s.c} />
            </div>
            <div>
               <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8' }}>{s.n}</div>
               <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{s.v}</div>
            </div>
         </div>
       ))}
    </div>
  );
};
SocialStack.propTypes = { mob: PropTypes.bool };

// --- RATING SYSTEM ---

const RatingSection = ({ val, total, onRate }) => (
  <div style={{ marginBottom: '32px' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fcfcfc', padding: '12px 24px', borderRadius: '100px', border: '1px solid #f1f5f9' }}>
           <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= val ? '#FF9431' : 'none'} color={s <= val ? '#FF9431' : '#cbd5e1'} />)}
           </div>
           <span style={{ fontSize: '14px', fontWeight: 950 }}>{val}/5 ({total} Reviews)</span>
        </div>
        <button onClick={onRate} style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Star size={16} fill="#fff" /> Rate this Creator
        </button>
     </div>
  </div>
);
RatingSection.propTypes = { val: PropTypes.number.isRequired, total: PropTypes.number.isRequired, onRate: PropTypes.func.isRequired };

// --- GEO INSIGHTS ---

const GeoIntelligence = ({ c, mob }) => (
  <Card style={{ padding: mob ? '24px' : '40px', borderRadius: '32px', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
     <h3 style={{ fontSize: '20px', fontWeight: 950, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Compass size={24} color="#FF9431" /> Geographic Authority</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: '40px' }}>
        <div>
           <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Creator Location</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>{c.city}, Bharat <span style={{ fontSize: '14px', fontWeight: 650, color: '#64748b' }}>- "The Pink City Heritage"</span></div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px', lineHeight: 1.5 }}>Deeply rooted in local Rajasthani culture with a global storytelling vision.</p>
           </div>
           <div>
              <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>Audience Geography Hotspots</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                 {['Delhi NCR (35%)', 'Mumbai (22%)', 'Bangalore (15%)', 'Indore (10%)'].map(h => (
                   <div key={h} style={{ background: '#f8fafc', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, color: '#475569', border: '1.5px solid #f1f5f9' }}>{h}</div>
                 ))}
              </div>
           </div>
        </div>
        <div style={{ background: '#fcfcfc', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
           <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Past Brand Presence</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Bengaluru (Tech Brands)', 'Mumbai (Lifestyle)', 'Delhi (Editorial)'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 750, color: '#334155' }}>
                   <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF9431' }} /> {b}
                </div>
              ))}
           </div>
        </div>
     </div>
  </Card>
);
GeoIntelligence.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

// --- CASE STUDIES ---

const CaseStudyCard = ({ title, brand, results }) => (
  <Card style={{ padding: '24px', borderRadius: '24px', background: '#fff' }}>
     <div style={{ height: '140px', borderRadius: '16px', background: '#f1f5f9', marginBottom: '16px', overflow: 'hidden' }}>
        <img src={`https://picsum.photos/seed/${title}/500/300`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
     </div>
     <div style={{ fontSize: '11px', fontWeight: 950, color: '#0073b1', textTransform: 'uppercase', marginBottom: '8px' }}>{brand} Collaboration</div>
     <h4 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '16px', color: '#0f172a' }}>{title}</h4>
     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {results.map(r => (
           <div key={r.l} style={{ padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8' }}>{r.l}</div>
              <div style={{ fontSize: '14px', fontWeight: 950, color: '#10B981' }}>{r.v}</div>
           </div>
        ))}
     </div>
  </Card>
);
CaseStudyCard.propTypes = { title: PropTypes.string.isRequired, brand: PropTypes.string.isRequired, results: PropTypes.array.isRequired };

// --- SUB-COMPONENTS ---

const ContentPhilosophy = ({ mob }) => (
  <div style={{ padding: mob ? '24px' : '48px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '40px', color: '#fff', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
     <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}><Zap size={200} color="#FF9431" /></div>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px', color: '#FF9431' }}>Mera Content Philosophy (The 'Why')</h3>
     <p style={{ fontSize: mob ? '16px' : '20px', fontWeight: 500, lineHeight: 1.7, maxWidth: '850px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>"Main sirf videos nahi banata, main Bharat ki mitti ki kahaniyan sunata hoon. Brands ko emotional connect chahiye, aur meri audience ko authenticity—main in dono ko milata hoon cinematic rawness ke saath. My mission is to bridge the gap between traditional Bharat and the digital future."</p>
     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {['Cinematic Rawness', 'Relatable Humor', 'High Retention Editing', 'Cultural Storytelling'].map(t => <div key={t} style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>{t}</div>)}
     </div>
  </div>
);
ContentPhilosophy.propTypes = { mob: PropTypes.bool };

const AboutMeLong = () => (
  <div style={{ marginBottom: '48px' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '24px' }}>The Human Behind the Screen</h3>
     <div style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>
        <p style={{ marginBottom: '20px' }}>Namaste! My journey began in the vibrant streets of Rajasthan, where every corner has a story. I started as a storyteller with nothing but a basic phone, and today, I'm honored to be part of the CreatorBharat Elite family.</p>
        <p>I believe that content should not just be viewed; it should be felt. Whether I'm exploring a hidden food stall or talking about the latest tech innovation in rural Bharat, my goal is to remain 100% authentic to my roots while delivering world-class production quality.</p>
     </div>
  </div>
);


// --- TAB CONTENTS ---

const IdentityTab = ({ c, stats, onRate, mob }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <ContentPhilosophy mob={mob} />
    <EliteSocialPulse mob={mob} />
    <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: mob ? '16px' : '24px', marginBottom: '40px' }}>
       {[{ l: 'Total Reach', v: fmt.num(stats.followers), sub: '+12K Monthly', c: '#0f172a' }, { l: 'Engagement', v: stats.er+'%', sub: 'Industry High', c: '#FF9431' }, { l: 'Avg Views', v: '82.4K', sub: 'Per Content', c: '#0f172a' }, { l: 'Consistency', v: '98%', sub: 'Velocity', c: '#10B981' }].map(x => (
         <div key={x.l} style={{ padding: mob ? '20px' : '32px', background: '#fff', borderRadius: mob ? '24px' : '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>{x.l}</div>
            <div style={{ fontSize: mob ? '20px' : '28px', fontWeight: 900, color: x.c, lineHeight: 1 }}>{x.v}</div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', marginTop: '8px' }}>{x.sub}</div>
         </div>
       ))}
    </div>
    <div style={{ marginBottom: '40px' }}>
       <Btn lg style={{ borderRadius: '100px', background: '#0f172a', gap: '10px', width: mob ? '100%' : 'auto' }}><Download size={18} /> Download Verified Media Kit (PDF)</Btn>
    </div>
    <GeoIntelligence c={c} mob={mob} />
    <AboutMeLong />
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.5fr', gap: mob ? '40px' : '32px', marginBottom: '40px' }}>
       <Card style={{ padding: mob ? '24px' : '40px', borderRadius: mob ? '24px' : '40px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 950, marginBottom: '24px' }}>Skills & Expertise</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>{['Scripting', 'Cinematography', 'Editing', 'Audio Engineering'].map(s => <Bdg key={s} color="orange" lg>{s}</Bdg>)}</div>
       </Card>
       <Card style={{ padding: mob ? '24px' : '40px', borderRadius: mob ? '24px' : '40px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 950, marginBottom: '24px' }}>Official Social Stack</h3>
          <SocialStack mob={mob} />
       </Card>
    </div>
    <TrustBadge />
  </motion.div>
);
IdentityTab.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, onRate: PropTypes.func.isRequired, mob: PropTypes.bool };

const StoryTab = ({ c, mob }) => {
  const city = c?.city || 'Bharat';
  const milestones = [
    { y: '2021', t: 'The Foundation', d: 'Launched the first video series on regional heritage with zero budget.', i: Globe, c: '#FF9431' },
    { y: '2022', t: 'First Viral Wave', d: 'Crossed 100K hearts with authentic storytelling that resonated globally.', i: Zap, c: '#0073b1' },
    { y: '2023', t: 'Elite Recognition', d: 'Officially audited and verified by CreatorBharat as a top regional voice.', i: ShieldCheck, c: '#10B981' },
    { y: '2024', t: 'The National Pulse', d: 'Scaling impact by bridging the digital divide for Bharat.', i: Trophy, c: '#7c3aed' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: mob ? '0 16px' : '0 40px' }}>
         <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: mob ? '36px' : '56px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px' }}>The Journey of <span style={{ color: '#FF9431' }}>Authenticity</span></h2>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, maxWidth: '650px', margin: '0 auto' }}>From a small-town vision in {city} to the digital screens of millions.</p>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '80px' }}>
            {[{ t: 'Regional Pioneer', y: '2024', id: 'award-1' }, { t: 'Elite Hub Verified', y: '2023', id: 'award-2' }, { t: 'Cultural Impact', y: '2025', id: 'award-3' }].map(a => (
               <Card key={a.id} style={{ padding: '32px', textAlign: 'center', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.02)' }}>
                  <Trophy size={32} color="#FF9431" style={{ margin: '0 auto 20px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>{a.t}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>{a.y}</div>
               </Card>
            ))}
         </div>

         <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: mob ? '20px' : '50%', transform: mob ? 'none' : 'translateX(-50%)', top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, #FF9431, #f1f5f9)', borderRadius: '100px' }} />

            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              const desktopAlign = isEven ? 'flex-start' : 'flex-end';
              const align = mob ? 'flex-start' : desktopAlign;
              return (
                <div key={m.y} style={{ display: 'flex', justifyContent: align, alignItems: 'center', marginBottom: '80px', width: '100%', position: 'relative' }}>
                   <div style={{ position: 'absolute', left: mob ? '20px' : '50%', transform: 'translateX(-50%)', width: '40px', height: '40px', background: '#fff', border: `4px solid ${m.c}`, borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                      <m.i size={18} color={m.c} />
                   </div>

                   <div style={{ width: mob ? 'calc(100% - 60px)' : '42%', marginLeft: mob ? '60px' : '0', padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 950, color: m.c, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>{m.y} CHAPTER</div>
                      <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>{m.t}</h4>
                      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{m.d}</p>
                   </div>
                </div>
              );
            })}
         </div>

         {/* Full Text Narrative Section */}
         <div style={{ marginTop: '100px', padding: mob ? '32px 24px' : '60px', background: '#fcfcfc', borderRadius: '40px', border: '1.5px solid #f1f5f9', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '24px', color: '#FF943110' }}><FileText size={80} /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '32px' }}>Beyond the Milestones: <span style={{ color: '#FF9431' }}>My Full Story</span></h3>
               <div style={{ fontSize: mob ? '16px' : '18px', color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>
                  <p style={{ marginBottom: '24px' }}>
                     Mera safar Rajasthan ki un galiyon se shuru hua jahan har mod par ek kahani hai. Shuruat mein mere paas sirf ek purana phone aur ek junoon tha. Log kehte the ki Bharat ke regional stories mein global appeal nahi hai, par maine hamesha mana ki "Authenticity is the only language that the world understands."
                  </p>
                  <blockquote style={{ margin: '40px 0', padding: '24px 32px', borderLeft: '6px solid #FF9431', background: '#fff', borderRadius: '0 24px 24px 0', fontSize: '20px', fontWeight: 750, fontStyle: 'italic', color: '#111827', boxShadow: '0 8px 32px rgba(0,0,0,0.02)' }}>
                     "Content sirf views ke liye nahi hona chahiye, wo ek connection hona chahiye jo screen ke uss paar baithe insaan ke dil tak jaye."
                  </blockquote>
                  <p style={{ marginBottom: '24px' }}>
                     Aaj, jab main CreatorBharat ke verified creators ki list mein aata hoon, toh mujhe garv hota hai. Maine seekha hai ki elite banna sirf followers se nahi, balki consistency aur audience ke saath sacche rishte se hota hai. Mera agla chapter Bharat ki regional creativity ko ek global benchmark banana hai.
                  </p>
                  <p>
                     Ye toh bas shuruat hai. Abhi toh bohot saari aisi kahaniyan hain jo sunani baaki hain, aur bohot saari aisi jagah hain jahan Bharat ka jhanda gaadna hai.
                  </p>
               </div>
               <div style={{ marginTop: '40px' }}>
                  <Btn lg onClick={() => navigate(`/blog/creator-story-${c?.id || 'elite'}`)} style={{ borderRadius: '100px', background: '#0f172a', gap: '12px', padding: '16px 40px', width: mob ? '100%' : 'auto' }}>
                     Read Full Detailed Biography on Blog <ArrowRight size={20} />
                  </Btn>
               </div>
            </div>
         </div>

         <TrustBadge />
      </div>
    </motion.div>
  );
};
StoryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const WorkTab = ({ mob }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ marginBottom: '60px' }}>
       <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px' }}>Viral Hall of Fame 🔥</h3>
       <div style={{ display: mob ? 'flex' : 'grid', gap: '16px', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: mob ? '12px' : '0', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)' }}>
          {[1.2, 3.5, 5.8].map((v) => (
             <div key={`viral-${v}`} style={{ borderRadius: '32px', overflow: 'hidden', aspectRatio: '9/16', background: '#000', position: 'relative', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
                <img src={`https://picsum.photos/seed/viral${v}/600/1000`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: '#fff' }}>
                   <div style={{ fontSize: '18px', fontWeight: 950 }}>{v}M Views</div>
                   <div style={{ fontSize: '12px', opacity: 0.8 }}>Top Trending Content</div>
                </div>
             </div>
          ))}
       </div>
    </div>

    <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px' }}>Successful Brand Collaborations</h3>
    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: mob ? '12px' : '0' }}>
       <div style={{ flexShrink: 0, width: mob ? '300px' : 'auto' }}><CaseStudyCard title="Jaipur Heritage Launch" brand="OYO Rooms" results={[{ l: 'Reach', v: '2.1M' }, { l: 'ROI', v: '4.2x' }]} /></div>
       <div style={{ flexShrink: 0, width: mob ? '300px' : 'auto' }}><CaseStudyCard title="Summer Fashion Drop" brand="Meesho" results={[{ l: 'Sales', v: '15K+' }, { l: 'Clicks', v: '85K' }]} /></div>
       <div style={{ flexShrink: 0, width: mob ? '300px' : 'auto' }}><CaseStudyCard title="Tech Rural Growth" brand="Amazon" results={[{ l: 'Views', v: '1.2M' }, { l: 'Shares', v: '10K' }]} /></div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: '32px', marginBottom: '60px' }}>
       <div>
          <h3 style={{ fontSize: mob ? '20px' : '24px', fontWeight: 950, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}><Mic2 size={24} color="#FF9431" /> Podcasts & Conversations</h3>
          {[1, 2].map(i => (
             <div key={`pod-ep-${i}`} style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', background: '#FF943110', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Play size={20} color="#FF9431" fill="#FF9431" /></div>
                <div style={{ flex: 1 }}>
                   <div style={{ fontSize: '16px', fontWeight: 900 }}>Episode #{i}: Breaking Digital Barriers</div>
                </div>
             </div>
          ))}
       </div>
       <div>
          <h3 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}><FileText size={24} color="#0073b1" /> Thought Leadership</h3>
          <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
             <h4 style={{ fontSize: '15px', fontWeight: 900 }}>Why Authentic Content is the Future of Marketing</h4>
             <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>Read my latest article on Medium...</p>
          </div>
       </div>
    </div>
    <TrustBadge />
  </motion.div>
);
WorkTab.propTypes = { mob: PropTypes.bool };

// --- MODALS ---

const RateCreatorModal = ({ open, onClose, name, dsp }) => (
  <Modal open={open} title={'Rate ' + name} onClose={onClose}>
     <div style={{ padding: '10px' }}>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Only verified accounts can provide ratings to ensure authenticity.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
           {[1,2,3,4,5].map(s => <Star key={s} size={40} color="#cbd5e1" style={{ cursor: 'pointer' }} />)}
        </div>
        <Fld label="Write a Review" rows={4} placeholder="Tell us about your collaboration experience..." />
        <Btn full lg style={{ marginTop: '24px', borderRadius: '100px' }} onClick={() => { dsp({ t: 'TOAST', d: { type: 'success', msg: 'Thank you! Your review is under audit.' } }); onClose(); }}>SUBMIT RATING</Btn>
     </div>
  </Modal>
);
RateCreatorModal.propTypes = { open: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired, name: PropTypes.string.isRequired, dsp: PropTypes.func.isRequired };

// --- HELPERS ---

const MapPin = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
MapPin.propTypes = { size: PropTypes.number.isRequired, color: PropTypes.string };

const SocialIconsPanel = ({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', background: 'rgba(0,0,0,0.04)', padding: '10px 20px', borderRadius: '100px', width: 'fit-content', marginTop: mob ? '20px' : '0' }}>
     <EliteSocialIcon type="insta" size={18} color="#E4405F" />
     <EliteSocialIcon type="yt" size={18} color="#FF0000" />
     <EliteSocialIcon type="linkedin" size={18} color="#0077B5" />
     <EliteSocialIcon type="twitter" size={16} color="#000" />
     <div style={{ height: '16px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
     <Verified size={18} color="#6b7280" />
  </div>
);
SocialIconsPanel.propTypes = { mob: PropTypes.bool };

const ContactMetadata = ({ city, followers, mob }) => (
  <>
     <div style={{ display: 'flex', flexWrap: 'wrap', gap: mob ? '12px' : '24px', color: '#6b7280', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="#9ca3af" /> {city || 'Bharat'}</div>
        <button 
          onClick={() => onContact()}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0073b1', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '14px', fontWeight: 700 }}
        >
          Contact info
        </button>
     </div>
     <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div style={{ color: '#0073b1', fontWeight: 700, fontSize: '14px' }}>{fmt.num(followers)} followers • 500+ connections</div>
        {!mob && <SocialIconsPanel mob={false} />}
     </div>
  </>
);
ContactMetadata.propTypes = { city: PropTypes.string, followers: PropTypes.number.isRequired, mob: PropTypes.bool };

const IdentityHeader = ({ category, name, mob }) => {
  const catDisplay = Array.isArray(category) ? category.join(' • ') : category;
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ background: '#FF9431', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{catDisplay || 'Lifestyle & Culture'}</div>
          {!mob && <div style={{ background: '#eef2ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>ELITE PARTNER</div>}
       </div>
     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <h1 style={{ fontSize: mob ? '28px' : '40px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>{name}</h1>
        <Verified size={mob ? 20 : 24} color="#0073b1" fill="#0073b1" style={{ color: '#fff' }} />
     </div>
  </>
  );
};
IdentityHeader.propTypes = { category: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), name: PropTypes.string.isRequired, mob: PropTypes.bool };

const IdentityDetails = ({ c, stats, mob, onRate, onContact }) => (
  <div style={{ flex: 1 }}>
     <IdentityHeader category={c.category || c.niche} name={c.name} mob={mob} />
     <p style={{ fontSize: mob ? '16px' : '22px', color: '#374151', marginBottom: '16px', fontWeight: 500, lineHeight: 1.4, maxWidth: '800px' }}>
        Expert in {c.niche || 'Lifestyle'} Storytelling | Building authentic brand identities across Bharat.
     </p>
     <ContactMetadata city={c.city} followers={stats.followers} mob={mob} onContact={onContact} />
     <BadgeRow score={stats.score || 94} />
     <RatingSection val={4.9} total={24} onRate={onRate} />
  </div>
);
IdentityDetails.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, mob: PropTypes.bool, onRate: PropTypes.func.isRequired, onContact: PropTypes.func.isRequired };

const MessageSquare = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
MessageSquare.propTypes = { size: PropTypes.number.isRequired, color: PropTypes.string };

const FollowBtn = ({ active, onClick, mob }) => (
  <button onClick={onClick} style={{ flex: mob ? 1 : 'initial', background: active ? '#fff' : '#0073b1', color: active ? '#374151' : '#fff', border: active ? '2px solid #374151' : 'none', padding: mob ? '12px 16px' : '14px 40px', borderRadius: '100px', fontSize: mob ? '15px' : '18px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }}>
    {active ? <UserCheck size={mob ? 18 : 22} /> : <UserPlus size={mob ? 18 : 22} />} {active ? 'Following' : 'Follow'}
  </button>
);
FollowBtn.propTypes = { active: PropTypes.bool.isRequired, onClick: PropTypes.func.isRequired, mob: PropTypes.bool };

const MessageBtn = ({ onClick, mob }) => (
  <button onClick={onClick} style={{ flex: mob ? 1 : 'initial', background: '#fff', color: '#0073b1', border: '2.5px solid #0073b1', padding: mob ? '12px 16px' : '12px 40px', borderRadius: '100px', fontSize: mob ? '15px' : '18px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }}>
    <MessageSquare size={mob ? 18 : 22} /> Message
  </button>
);
MessageBtn.propTypes = { onClick: PropTypes.func.isRequired, mob: PropTypes.bool };

const ActionButtons = ({ followed, onAction, mob }) => {
  return (
    <div style={{ display: 'flex', gap: '12px', width: mob ? '100%' : 'auto', alignSelf: mob ? 'stretch' : 'flex-start' }}>
       <FollowBtn active={followed} onClick={() => onAction('follow')} mob={mob} />
       <MessageBtn onClick={() => onAction('message')} mob={mob} />
    </div>
  );
};
ActionButtons.propTypes = { followed: PropTypes.bool.isRequired, onAction: PropTypes.func.isRequired, mob: PropTypes.bool };

const ArrowLeft = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
ArrowLeft.propTypes = { size: PropTypes.number.isRequired, color: PropTypes.string };

const HeroBanner = ({ banner, mob, onBack, onShare }) => (
  <div style={{ height: mob ? '180px' : '300px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
     <img src={banner} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} alt="banner" />
     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
     <div style={{ position: 'absolute', top: mob ? '16px' : '24px', left: mob ? '16px' : '24px', zIndex: 10 }}>
        <button onClick={onBack} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: mob ? '8px 16px' : '10px 24px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(12px)', fontSize: mob ? '12px' : '14px', fontWeight: 700 }}>
           <ArrowLeft size={mob ? 16 : 18} /> Back
        </button>
     </div>
     <div style={{ position: 'absolute', top: mob ? '16px' : '24px', right: mob ? '16px' : '24px', zIndex: 10 }}>
        <button onClick={onShare} style={{ background: 'rgba(255,255,255,0.95)', border: 'none', color: '#0f172a', padding: mob ? '8px 16px' : '10px 24px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(12px)', fontSize: mob ? '12px' : '14px', fontWeight: 700, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
           <Share2 size={mob ? 16 : 18} /> Share
        </button>
     </div>
  </div>
);
HeroBanner.propTypes = { banner: PropTypes.string.isRequired, mob: PropTypes.bool, onBack: PropTypes.func.isRequired, onShare: PropTypes.func.isRequired };

const ProfileImage = ({ src, mob }) => (
  <div style={{ position: 'relative', width: mob ? '110px' : '200px', height: mob ? '110px' : '200px', borderRadius: '50%', border: mob ? '4px solid #fff' : '8px solid #fff', overflow: 'hidden', background: '#fff', boxShadow: '0 12px 48px rgba(0,0,0,0.15)', flexShrink: 0 }}>
     <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="profile" />
  </div>
);
ProfileImage.propTypes = { src: PropTypes.string.isRequired, mob: PropTypes.bool };

const ProfileHero = ({ c, stats, navigate, st, dsp, mob, onRate, onContact }) => {
  const [followed, setFollowed] = useState(false);
  const handleAction = (a) => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to ' + a } }); return; }
    if (a === 'follow') setFollowed(!followed);
    if (a === 'message') dsp({ t: 'TOAST', d: { type: 'success', msg: 'Opening chat...' } });
    if (a === 'rate') onRate();
  };
  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: c.name, url: globalThis.location.href });
      else { await navigator.clipboard.writeText(globalThis.location.href); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Copied!' } }); }
    } catch (e) { console.error(e); }
  };
  const dpImg = c?.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'C')}&background=FF9431&color=fff&size=200`;
  const bannerImg = c?.cover_image || c?.banner_image || `https://picsum.photos/seed/${c?.id}/1600/500`;
  return (
    <section style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
       <HeroBanner banner={bannerImg} mob={mob} onBack={() => navigate('/creators')} onShare={handleShare} />
       <div style={{ ...W(1100), margin: mob ? '-60px auto 0' : '-100px auto 0', padding: mob ? '0 16px 32px' : '0 20px 40px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: mob ? 'center' : 'flex-start', textAlign: mob ? 'center' : 'left' }}>
             <div style={{ display: 'flex', alignItems: mob ? 'center' : 'flex-end', gap: '20px', flexDirection: mob ? 'column' : 'row' }}>
                <ProfileImage src={dpImg} mob={mob} />
                {mob && <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><SocialIconsPanel mob={true} /></div>}
                {!mob && <div style={{ background: 'rgba(255, 148, 49, 0.05)', padding: '12px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px solid rgba(255, 148, 49, 0.2)', marginBottom: '24px' }}>
                   <ShieldCheck size={24} color="#FF9431" fill="rgba(255, 148, 49, 0.1)" />
                   <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>This Creator is <span style={{ color: '#FF9431' }}>Verified by CreatorBharat</span></div>
                </div>}
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', alignItems: mob ? 'center' : 'flex-start' }}>
                <IdentityDetails c={c} stats={stats} mob={mob} onRate={() => handleAction('rate')} onContact={onContact} />
                {mob && (
                  <div style={{ background: 'rgba(255, 148, 49, 0.05)', padding: '12px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px solid rgba(255, 148, 49, 0.2)', width: '100%', justifyContent: 'center' }}>
                    <ShieldCheck size={18} color="#FF9431" fill="rgba(255, 148, 49, 0.1)" />
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>Verified by <span style={{ color: '#FF9431' }}>CreatorBharat</span></div>
                  </div>
                )}
                <ActionButtons followed={followed} onAction={handleAction} mob={mob} />
             </div>
          </div>
       </div>
    </section>
  );
};
ProfileHero.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, navigate: PropTypes.func.isRequired, st: PropTypes.object.isRequired, dsp: PropTypes.func.isRequired, mob: PropTypes.bool, onRate: PropTypes.func.isRequired, onContact: PropTypes.func.isRequired };

const QuickConnectHub = ({ c, mob, dsp, onBrief }) => {
  const [msg, setMsg] = useState('');
  const handleSend = () => {
    if(!msg.trim()) return;
    dsp({ t: 'TOAST', d: { type: 'success', msg: 'Message sent to ' + c.name } });
    setMsg('');
  };

  return (
    <div id="quick-connect" style={{ marginTop: mob ? '20px' : '0', background: '#fff', borderRadius: '40px', border: '1.5px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '0' }}>
          <div style={{ padding: mob ? '32px' : '60px', borderRight: mob ? 'none' : '1.5px solid #f1f5f9', borderBottom: mob ? '1.5px solid #f1f5f9' : 'none' }}>
             <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Send a Message</h3>
             <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', fontWeight: 500 }}>@{c?.slug || 'creator'} ko directly message karein aur collaboration start karein.</p>
             
             <div style={{ position: 'relative' }}>
                <textarea 
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Type your message here..." 
                  style={{ width: '100%', height: '150px', padding: '24px', borderRadius: '24px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '15px', outline: 'none', resize: 'none', color: '#1e293b', fontWeight: 500 }} 
                />
                <button 
                  onClick={handleSend}
                  style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#0073b1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,115,177,0.2)' }}
                >
                  Message Bhejein <Send size={16} />
                </button>
             </div>
          </div>

          <div style={{ padding: mob ? '32px' : '60px', background: '#fcfcfc' }}>
             <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '32px' }}>Quick Actions</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={onBrief} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '20px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s' }}>
                   <div style={{ width: '40px', height: '40px', background: '#FF943120', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={20} color="#FF9431" /></div>
                   <div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>🤝 Brand Inquiry Bhejein</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Formal collaboration request</div>
                   </div>
                </button>

                <button onClick={() => dsp({ t: 'TOAST', d: { type: 'info', msg: 'Starting Media Kit download...' } })} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '20px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s' }}>
                   <div style={{ width: '40px', height: '40px', background: '#10B98120', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={20} color="#10B981" /></div>
                   <div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>📄 Media Kit Download</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Get verified metrics as PDF</div>
                   </div>
                </button>

                <button onClick={() => { navigator.clipboard.writeText(globalThis.location.href); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile link copied!' } }); }} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '20px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s' }}>
                   <div style={{ width: '40px', height: '40px', background: '#0073b120', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Share2 size={20} color="#0073b1" /></div>
                   <div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>⬆ Profile Share Karein</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Share with team or clients</div>
                   </div>
                </button>
             </div>

             <div style={{ marginTop: '40px', padding: '24px', background: '#0f172a', borderRadius: '24px', color: '#fff' }}>
                <div style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Direct Contact Info</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600 }}>
                      <Globe size={16} color="#FF9431" /> collab@{c?.slug || 'creator'}.com
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600 }}>
                      <ShieldCheck size={16} color="#10B981" /> Verified Phone: +91 98XXX-X8XX
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
QuickConnectHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, dsp: PropTypes.func.isRequired, onBrief: PropTypes.func.isRequired };

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
      style={{ width: '100%', padding: '16px', borderRadius: '100px', background: p.pop ? '#FF9431' : '#0f172a', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
             <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{pkg?.l} ({pkg?.v})</div>
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

const HelpCircle = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
HelpCircle.propTypes = { size: PropTypes.number.isRequired, color: PropTypes.string };

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

const GalleryItem = ({ i, mob, dsp }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button 
      key={`gal-${i}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '32px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', outline: 'none', padding: 0, background: 'none', width: '100%', display: 'block' }}
      onClick={() => dsp({ t: 'TOAST', d: { type: 'info', msg: 'Full Image View coming soon!' } })}
    >
      <img src={`https://picsum.photos/seed/elite-gal-${i}/1000/1000`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ background: '#fff', padding: '16px', borderRadius: '50%', color: '#0f172a', display: 'flex' }}><ImageIcon size={24} /></span>
      </span>
    </button>
  );
};
GalleryItem.propTypes = { i: PropTypes.number.isRequired, mob: PropTypes.bool, dsp: PropTypes.func.isRequired };

const GalleryTab = ({ mob }) => {
  const { dsp } = useApp();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
       <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>Lifestyle Gallery</h2>
             <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>The Elite Visual Identity</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: mob ? '16px' : '24px' }}>
             {[1,2,3,4,5,6,7,8,9].map(i => (
               <GalleryItem key={i} i={i} mob={mob} dsp={dsp} />
             ))}
          </div>
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
             <Btn lg onClick={() => window.open('https://instagram.com', '_blank', 'noopener,noreferrer')} style={{ borderRadius: '100px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', gap: '10px' }}>
                Follow on Instagram <ArrowRight size={20} />
             </Btn>
          </div>
       </div>
       <TrustBadge />
    </motion.div>
  );
};
GalleryTab.propTypes = { mob: PropTypes.bool };

const ReviewsTab = ({ mob, navigate }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 2fr', gap: '40px', marginBottom: '60px' }}>
        <div>
           <Card style={{ padding: '40px', textAlign: 'center', borderRadius: '40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', border: 'none', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Aggregate Authority</div>
              <div style={{ fontSize: '72px', fontWeight: 950, lineHeight: 1, marginBottom: '8px' }}>4.9</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                 {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#FF9431" color="#FF9431" />)}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>Based on 128 Verified Collaborations</div>
           </Card>
           <Btn full lg onClick={() => navigate('/reviews/new')} style={{ borderRadius: '100px', background: '#fff', color: '#0f172a', border: '2px solid #0f172a', gap: '10px' }}>
              <Star size={18} /> Write a Review
           </Btn>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           {[
             { b: 'OYO Rooms', r: 5, t: 'Absolute professional. The Jaipur heritage campaign delivered 4x the expected engagement.', u: 'Brand Manager', d: '2 weeks ago', type: 'brand', id: 'oyo' },
             { b: 'Rohan Sharma', r: 5, t: 'The cultural storytelling in the summer drop was raw and authentic. Highly recommended!', u: 'Travel Creator', d: '1 month ago', type: 'creator', id: 'rohan' },
             { b: 'Amazon Bharat', r: 4, t: 'Great content quality. Revision process was smooth and delivery was on time.', u: 'Marketing Lead', d: '3 months ago', type: 'brand', id: 'amazon' }
           ].map((rev) => (
             <Card key={rev.id} style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff' }}>
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
                   onClick={() => navigate(`/${rev.type}/${rev.id}`)} 
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
  </motion.div>
);
ReviewsTab.propTypes = { mob: PropTypes.bool, navigate: PropTypes.func.isRequired };

const PackagesTab = ({ mob, onSelect }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
       <PackageCard onSelect={onSelect} p={{ l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] }} />
       <PackageCard onSelect={onSelect} p={{ l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] }} />
       <PackageCard onSelect={onSelect} p={{ l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }} />
    </div>
    <CollabFAQ mob={mob} />
  </motion.div>
);
PackagesTab.propTypes = { mob: PropTypes.bool, onSelect: PropTypes.func.isRequired };

// --- MAIN PAGE ---

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
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    // If we have a selected creator in context, use it immediately
    if (st?.sel?.creator && (String(st.sel.creator.id) === String(id) || st.sel.creator.slug === id)) {
      setC(st.sel.creator);
      setLd(false);
      return;
    }

    // Otherwise, fetch by ID (handles refresh case)
    if (!id) return;
    setLd(true);
    
    const triggerFetch = async () => {
      try {
        const found = await fetchCreatorById(id);
        if (found) {
          setC(found);
        } else {
          setC(null);
        }
      } catch (err) {
        console.error('Refresh fetch failed:', err);
        setC(null);
      } finally {
        setLd(false);
      }
    };

    triggerFetch();
  }, [id, st?.sel?.creator]);

  const stats = useMemo(() => {
    if (!c) return { followers: 0, er: 0, reach: 0, authenticity: 0, score: 0 };
    return { 
      followers: c.followers || 125000, 
      er: c.er || 4.8, 
      reach: Math.floor((c.followers || 125000) * 0.85), 
      authenticity: 98.2, 
      score: c.score || 94 
    };
  }, [c]);

  const handleRateClick = () => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to rate this creator' } }); return; }
    setRateOpen(true);
  };

  const handlePackageSelect = (pkg) => {
    if (!st?.user) { 
      dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login as a Brand to book packages' } }); 
      return; 
    }
    setSelectedPkg(pkg);
    setBriefOpen(true);
  };

  if (ld) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc' }}>
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <ShieldCheck size={48} color="#FF9431" style={{ animation: 'pulse 1.5s infinite ease-in-out' }} />
          <p style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>Authenticating Profile...</p>
       </div>
       <style>{`@keyframes pulse { 0% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1); } 100% { opacity: 0.5; transform: scale(0.95); } }`}</style>
    </div>
  );
  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty title="Profile Not Found" onCta={() => navigate('/creators')} /></div>;

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px' }}>
      <ProfileHero c={c} stats={stats} navigate={navigate} st={st} dsp={dsp} mob={mob} onRate={handleRateClick} onContact={() => setActiveTab('connect')} />
      
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(252, 252, 252, 0.9)', backdropFilter: 'blur(30px)', borderBottom: '1px solid #f1f5f9', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
         <div style={{ ...W(1100), padding: mob ? '0 16px' : '0 24px', display: 'flex', gap: mob ? '32px' : '48px', minWidth: mob ? 'fit-content' : 'auto' }}>
            {[{ id: 'identity', label: 'Identity', icon: Activity }, { id: 'story', label: 'My Story', icon: Globe }, { id: 'gallery', label: 'Gallery', icon: ImageIcon }, { id: 'work', label: 'Pro Work', icon: Briefcase }, { id: 'reviews', label: 'Reviews', icon: Star }, { id: 'packages', label: 'Packages', icon: Zap }, { id: 'connect', label: 'Connect', icon: MessageSquare }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '20px 0', background: 'none', border: 'none', borderBottom: `3.5px solid ${activeTab === t.id ? '#0073b1' : 'transparent'}`, color: activeTab === t.id ? '#111827' : '#6b7280', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                <t.icon size={18} /> {t.label}
              </button>
            ))}
         </div>
      </div>

      <div style={{ ...W(1100), padding: mob ? '40px 16px' : '60px 24px' }}>
         <AnimatePresence mode="wait">
            {activeTab === 'identity' && <IdentityTab key="tab-identity" c={c} stats={stats} onRate={handleRateClick} mob={mob} />}
            {activeTab === 'story' && <StoryTab key="tab-story" c={c} mob={mob} />}
            {activeTab === 'gallery' && <GalleryTab key="tab-gallery" mob={mob} />}
            {activeTab === 'work' && <WorkTab key="tab-work" mob={mob} />}
            {activeTab === 'reviews' && <ReviewsTab key="tab-reviews" mob={mob} navigate={navigate} />}
            {activeTab === 'packages' && <PackagesTab key="tab-packages" mob={mob} onSelect={handlePackageSelect} />}
            {activeTab === 'connect' && (
              <motion.div key="tab-connect" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <QuickConnectHub c={c} mob={mob} dsp={dsp} onBrief={() => setBriefOpen(true)} />
                 <TrustBadge />
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* GLOBAL PLATFORM CTA */}
      <section style={{ marginTop: '100px', padding: mob ? '60px 16px' : '100px 0', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: '#FF9431', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
         <div style={{ ...W(1100), margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
               <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '8px 24px', borderRadius: '100px', fontSize: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
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
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>I am a Brand</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Hire {c?.name || 'Elite Creators'} or explore our elite marketplace for your next big campaign.</p>
                  <Btn full lg style={{ background: '#FF9431', borderRadius: '100px' }} onClick={() => navigate('/creators')}>Hire Elite Creators</Btn>
               </div>

               <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '32px', textAlign: 'center', width: mob ? '100%' : '450px', backdropFilter: 'blur(10px)' }}>
                  <div style={{ width: '50px', height: '50px', background: '#10B98120', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                     <Verified size={24} color="#10B981" />
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>I am a Creator</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Apply for an Elite Audit and get a professional profile like this one.</p>
                  <Btn full lg style={{ background: '#fff', color: '#0f172a', borderRadius: '100px' }} onClick={() => navigate('/apply')}>Get Elite Verified</Btn>
               </div>
            </div>
         </div>
      </section>

      <RateCreatorModal open={rateOpen} name={c?.name || 'Creator'} dsp={dsp} onClose={() => setRateOpen(false)} />
      <CollabBriefModal open={briefOpen} pkg={selectedPkg} creatorName={c?.name || 'Creator'} dsp={dsp} onClose={() => setBriefOpen(false)} />
    </div>
  );
}
