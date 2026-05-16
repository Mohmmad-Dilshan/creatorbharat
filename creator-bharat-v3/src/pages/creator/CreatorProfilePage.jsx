import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { fetchCreatorById } from '../../utils/platformService';
import { W } from '../../utils/helpers';
import { ProfileHero } from '@/components/creators/profile/ProfileHero';
import { IdentityTab, SocialLinkTree } from '@/components/creators/profile/IdentityTab';
import { MediaKitPreview } from '@/components/creators/profile/MediaKitPreview';
import { Btn, Empty, Modal, Fld, Card } from '@/components/common/Primitives';
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
  MapPin
} from 'lucide-react';

// --- CUSTOM ELITE SOCIAL ICONS (SVG) ---

const TrustBadge = () => (
  <div style={{ background: '#f8fafc', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e2e8f0', width: '100%', marginTop: '40px' }}>
    <ShieldCheck size={20} color="#10B981" />
    <span style={{ fontSize: '12px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
      All metrics, location data, and brand history verified by CreatorBharat Official Audit
    </span>
  </div>
);

const TabNavigator = ({ activeTab, setActiveTab, mob }) => {
  const TABS = [
    { id: 'identity', label: 'Identity' },
    { id: 'story', label: 'My Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'work', label: 'Pro Work' },
    { id: 'local', label: 'Local Hub' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'packages', label: 'Packages' },
    { id: 'connect', label: 'Connect' }
  ];
  const currentIndex = TABS.findIndex(t => t.id === activeTab);
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
       {nextTab && (
         <button 
           onClick={() => setActiveTab(nextTab.id)}
           style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#0073b1', border: 'none', padding: '16px 32px', borderRadius: '100px', cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: '14px', boxShadow: '0 8px 24px rgba(0,115,177,0.2)', width: mob ? '100%' : 'auto' }}
         >
            Next: {nextTab.label} <ArrowRight size={18} />
         </button>
       )}
       <style>{`
          @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .mobile-snap { scroll-snap-type: x mandatory; }
          .mobile-snap > * { scroll-snap-align: center; }
       `}</style>
    </div>
  );
};
TabNavigator.propTypes = { activeTab: PropTypes.string.isRequired, setActiveTab: PropTypes.func.isRequired, mob: PropTypes.bool };

// Identity-related sub-components moved to @/components/creators/profile/IdentityTab

const StoryTab = ({ c, mob, setActiveTab }) => {
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

         <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '80px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
            {[{ t: 'Regional Pioneer', y: '2024', id: 'award-1' }, { t: 'Elite Hub Verified', y: '2023', id: 'award-2' }, { t: 'Cultural Impact', y: '2025', id: 'award-3' }].map(a => (
               <Card key={a.id} style={{ padding: '32px', textAlign: 'center', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', flexShrink: 0, width: mob ? '200px' : 'auto' }}>
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
                  <Btn lg onClick={() => navigate(`/blog/creator-story-${c?.id || 'elite'}`)} style={{ borderRadius: '100px', background: '#0f172a', color: '#fff', gap: '12px', padding: '16px 40px', width: mob ? '100%' : 'auto' }}>
                     Read Full Detailed Biography on Blog <ArrowRight size={20} />
                  </Btn>
               </div>
            </div>
         </div>

         <TrustBadge />
         <TabNavigator activeTab="story" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
StoryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

const ServiceCatalog = ({ mob }) => (
  <div style={{ marginBottom: '60px' }}>
     <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '32px', textAlign: 'center' }}>Professional Service Catalog</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
        {[
          { t: 'Cinematic Storytelling', d: '4K Cinematic Reels with professional grading and scripting.', i: Play, c: '#FF9431' },
          { t: 'Regional Strategy', d: 'Consultation on how to launch products in local markets.', i: Globe, c: '#0ea5e9' },
          { t: 'Product Integration', d: 'Seamless product placement in authentic life scenarios.', i: Briefcase, c: '#10b981' }
        ].map(s => (
          <Card key={s.t} style={{ padding: '40px', borderRadius: '32px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
             <div style={{ width: '60px', height: '60px', background: `${s.c}10`, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <s.i size={28} color={s.c} />
             </div>
             <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>{s.t}</h4>
             <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{s.d}</p>
          </Card>
        ))}
     </div>
  </div>
);
ServiceCatalog.propTypes = { mob: PropTypes.bool };

const AchievementWall = ({ mob }) => (
  <div style={{ marginBottom: '80px' }}>
     <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '40px' }}>The Milestone Hall of Fame</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { t: '10M+', d: 'Total Impressions', i: Activity, c: '#FF9431' },
          { t: 'Elite 100', d: 'Ranked in Top 100', i: Trophy, c: '#f97316' },
          { t: 'Verified', d: 'Official Audit Pass', i: ShieldCheck, c: '#10b981' },
          { t: '50+', d: 'Brand Partners', i: UserCheck, c: '#3b82f6' }
        ].map(a => (
          <div key={a.d} style={{ padding: '32px 24px', background: '#fff', borderRadius: '32px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
             <div style={{ width: '40px', height: '40px', background: `${a.c}10`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <a.i size={20} color={a.c} />
             </div>
             <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', lineHeight: 1, marginBottom: '8px' }}>{a.t}</div>
             <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{a.d}</div>
          </div>
        ))}
     </div>
  </div>
);
AchievementWall.propTypes = { mob: PropTypes.bool };

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

const InfluenceMedia = ({ mob }) => (
  <div style={{ marginBottom: '60px', padding: mob ? '32px 24px' : '48px', background: '#0f172a', borderRadius: '40px', color: '#fff' }}>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: '40px', alignItems: 'center' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Play size={24} color="#FF9431" fill="#FF9431" />
              <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Content Velocity</span>
           </div>
           <h3 style={{ fontSize: mob ? '24px' : '36px', fontWeight: 950, color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>Mera Content <span style={{ color: '#FF9431' }}>Duniya</span> Tak Pahunchta Hai</h3>
           <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500 }}>
              High-retention storytelling aur cinematic quality ke saath, main har brand ki kahani ko authentic banata hoon.
           </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
           {[
             { l: 'Avg View Time', v: '45s' },
             { l: 'Save Rate', v: '12%' },
             { l: 'Share Rate', v: '8.5%' },
             { l: 'Comment Positivity', v: '98%' }
           ].map(s => (
             <div key={s.l} style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>{s.l}</div>
                <div style={{ fontSize: '20px', fontWeight: 950, color: '#fff' }}>{s.v}</div>
             </div>
           ))}
        </div>
     </div>
  </div>
);
InfluenceMedia.propTypes = { mob: PropTypes.bool };

const WorkTab = ({ mob, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <AchievementWall mob={mob} />
    <ServiceCatalog mob={mob} />
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

    <InfluenceMedia mob={mob} />
    <TrustBadge />
    <TabNavigator activeTab="work" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
WorkTab.propTypes = { mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

// --- MODALS ---

const RateCreatorModal = ({ open, onClose, name, dsp }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please select a star rating' } }); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Review submitted! Our elite audit team will verify it shortly.' } });
      onClose();
    }, 1500);
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
             <Fld label="Collaboration Feedback" type="textarea" placeholder="Tell the community about your professional experience with this creator..." />
             
             <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Btn full lg onClick={onClose} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px' }}>Cancel</Btn>
                <Btn full lg onClick={handleSubmit} loading={loading} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px' }}>Submit Verified Review</Btn>
             </div>
          </div>
       </div>
    </Modal>
  );
};
RateCreatorModal.propTypes = { open: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired, name: PropTypes.string.isRequired, dsp: PropTypes.func.isRequired };

const LocalCollabHub = ({ c, mob, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ padding: mob ? '32px 24px' : '60px', background: 'linear-gradient(135deg, #fff 0%, #fff7ed 100%)', borderRadius: '40px', border: '1.5px solid #ffedd5', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', opacity: 0.1 }}><MapPin size={200} color="#f97316" /></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', background: '#f97316', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 950, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Vocal for Local Initiative</span>
        </div>
        <h2 style={{ fontSize: mob ? '28px' : '48px', fontWeight: 950, color: '#7c2d12', marginBottom: '24px', letterSpacing: '-0.04em' }}>Apne <span style={{ color: '#f97316' }}>Local Business</span> ko Global Banayein</h2>
        <p style={{ fontSize: '18px', color: '#9a3412', fontWeight: 500, lineHeight: 1.6, maxWidth: '800px' }}>
          "Main local brands aur homegrown startups ko support karne ke liye hamesha ready hoon. Chota ho ya bada, har business ki ek kahani hoti hai jaisa Bharat tak pahunchani chahiye."
        </p>
      </div>
    </div>

    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#f0fdf4', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <MapPin size={24} color="#10b981" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px' }}>Store Visits & Events</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Offline store visits, shop openings, aur local product reviews ke liye available.</p>
      </Card>

      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Mic2 size={24} color="#3b82f6" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px' }}>Regional Voice Expertise</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Bhojpuri, Marwari, aur Hinglish mein content expertise for authentic local connect.</p>
      </Card>

      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Zap size={24} color="#ef4444" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px' }}>Local Support Packages</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Small budgets aur barter collaborations ke liye special terms available.</p>
      </Card>
    </div>

    <div style={{ background: '#f8fafc', padding: mob ? '32px' : '60px', borderRadius: '40px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
       <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '16px' }}>Mera Hyper-Local Impact Hub</h3>
       <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '40px' }}>In regions mein mera influence niche average se 2x zyada hai.</p>
       <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: mob ? '32px' : '64px' }}>
          {[{ l: 'Indore', v: '85%' }, { l: 'Bhopal', v: '72%' }, { l: 'Ujjain', v: '64%' }].map(x => (
            <div key={x.l}>
               <div style={{ fontSize: '48px', fontWeight: 950, color: '#f97316', lineHeight: 1 }}>{x.v}</div>
               <div style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8', marginTop: '8px' }}>Reach in {x.l}</div>
            </div>
          ))}
       </div>
    </div>
    <TabNavigator activeTab="local" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
LocalCollabHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

// Duplicate logic removed
// ProfileHero moved to @/components/creators/profile/ProfileHero

const QuickConnectHub = ({ c, mob, dsp, onBrief, onMediaKit }) => {
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

  return (
    <div id="quick-connect" style={{ marginTop: mob ? '20px' : '0' }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: '32px', marginBottom: '32px' }}>
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
                   style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#0f172a', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(15,23,42,0.2)' }}
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
             <button onClick={onBrief} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', background: '#0f172a', border: 'none', borderRadius: '32px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'transform 0.2s', boxShadow: '0 20px 40px rgba(15,23,42,0.1)' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(255,148,49,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={24} color="#FF9431" /></div>
                <div>
                   <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>Start Official Brief</div>
                   <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Send detailed campaign info</div>
                </div>
             </button>

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

             <div style={{ padding: '32px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><MapPin size={100} /></div>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Verified size={14} /> Regional Identity
                </div>
                <div style={{ fontSize: '18px', fontWeight: 950, marginBottom: '4px' }}>{c?.city || 'Bengaluru'}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Active in South & West Bharat Hubs</div>
             </div>
          </div>
       </div>

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

const GalleryTab = ({ mob, setActiveTab }) => {
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
       <TabNavigator activeTab="gallery" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
GalleryTab.propTypes = { mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

const ReviewsTab = ({ c, mob, navigate, onWriteReview, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 2fr', gap: '40px', marginBottom: '60px' }}>
        <div>
           <Card style={{ padding: '40px', textAlign: 'center', borderRadius: '40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', border: 'none', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Aggregate Authority</div>
              <div style={{ fontSize: '72px', fontWeight: 950, lineHeight: 1, marginBottom: '8px' }}>4.9</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                 {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#FF9431" color="#FF9431" />)}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>Based on {c.reviews_count || '128'} Verified Collaborations</div>
           </Card>
           <Btn full lg onClick={() => onWriteReview()} style={{ borderRadius: '100px', background: '#fff', color: '#0f172a', border: '2px solid #0f172a', gap: '10px' }}>
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
     <TabNavigator activeTab="reviews" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
ReviewsTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, navigate: PropTypes.func.isRequired, onWriteReview: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };

const PackagesTab = ({ mob, onSelect, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: '20px' }}>
       <PackageCard onSelect={onSelect} p={{ l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] }} />
       <PackageCard onSelect={onSelect} p={{ l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] }} />
       <PackageCard onSelect={onSelect} p={{ l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }} />
    </div>
    <CollabFAQ mob={mob} />
    <TrustBadge />
    <TabNavigator activeTab="packages" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
PackagesTab.propTypes = { mob: PropTypes.bool, onSelect: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };

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
  const [mediaKitOpen, setMediaKitOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (st?.sel?.creator && (String(st.sel.creator.id) === String(id) || st.sel.creator.slug === id)) {
      setC(st.sel.creator);
      setLd(false);
      return;
    }
    if (!id) return;
    setLd(true);
    const triggerFetch = async () => {
      try {
        const found = await fetchCreatorById(id);
        if (found) {
          setC(found);
        } else {
          // Fallback for Demo/Testing
          setC({
            id: 'fallback',
            name: id.charAt(0).toUpperCase() + id.slice(1),
            slug: id,
            photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
            city: 'Mumbai',
            niche: 'Lifestyle & Tech',
            bio: 'Elite storyteller and digital creator dedicated to high-impact content and cultural narratives across Bharat.',
            isVerified: true
          });
        }
      } catch (err) {
        console.error('Creator not found, loading Elite Demo profile:', err);
        // Fallback for Demo/Testing
        setC({
          id: 'fallback',
          name: id.charAt(0).toUpperCase() + id.slice(1),
          slug: id,
          photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
          city: 'Mumbai',
          niche: 'Lifestyle & Tech',
          bio: 'Elite storyteller and digital creator dedicated to high-impact content and cultural narratives across Bharat.',
          isVerified: true
        });
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
    </div>
  );
  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty title="Profile Not Found" onCta={() => navigate('/creators')} /></div>;

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px' }}>
      <ProfileHero c={c} stats={stats} navigate={navigate} st={st} dsp={dsp} mob={mob} onRate={handleRateClick} onContact={() => setActiveTab('connect')} onMediaKit={() => setMediaKitOpen(true)} />
      
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(252, 252, 252, 0.9)', backdropFilter: 'blur(30px)', borderBottom: '1px solid #f1f5f9', overflowX: mob ? 'auto' : 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
         <div style={{ ...W(1100), padding: mob ? '0 16px' : '0 24px', display: 'flex', gap: mob ? '32px' : '48px', minWidth: mob ? 'fit-content' : 'auto' }}>
            {[{ id: 'identity', label: 'Identity', icon: Activity }, { id: 'story', label: 'My Story', icon: Globe }, { id: 'gallery', label: 'Gallery', icon: ImageIcon }, { id: 'work', label: 'Pro Work', icon: Briefcase }, { id: 'local', label: 'Local Hub', icon: MapPin }, { id: 'reviews', label: 'Reviews', icon: Star }, { id: 'packages', label: 'Packages', icon: Zap }, { id: 'connect', label: 'Connect', icon: MessageSquare }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '20px 0', background: 'none', border: 'none', borderBottom: `3.5px solid ${activeTab === t.id ? '#0073b1' : 'transparent'}`, color: activeTab === t.id ? '#111827' : '#6b7280', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                <t.icon size={18} /> {t.label}
              </button>
            ))}
         </div>
      </div>

      <div id="profile-content-area" style={{ ...W(1100), padding: mob ? '0 16px 120px' : '60px 24px' }}>
         <AnimatePresence mode="wait">
            {activeTab === 'identity' && <IdentityTab key="tab-identity" c={c} stats={stats} onRate={handleRateClick} mob={mob} setActiveTab={setActiveTab} />}
            {activeTab === 'story' && <StoryTab key="tab-story" c={c} mob={mob} setActiveTab={setActiveTab} />}
            {activeTab === 'gallery' && <GalleryTab key="tab-gallery" mob={mob} setActiveTab={setActiveTab} />}
            {activeTab === 'work' && <WorkTab key="tab-work" mob={mob} setActiveTab={setActiveTab} />}
            {activeTab === 'local' && <LocalCollabHub key="tab-local" c={c} mob={mob} setActiveTab={setActiveTab} />}
            {activeTab === 'reviews' && <ReviewsTab key="tab-reviews" c={c} mob={mob} navigate={navigate} onWriteReview={handleRateClick} setActiveTab={setActiveTab} />}
            {activeTab === 'packages' && <PackagesTab key="tab-packages" mob={mob} onSelect={handlePackageSelect} setActiveTab={setActiveTab} />}
            {activeTab === 'connect' && (
              <motion.div key="tab-connect" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <QuickConnectHub c={c} mob={mob} dsp={dsp} onBrief={() => setBriefOpen(true)} onMediaKit={() => setMediaKitOpen(true)} />
                 <div style={{ marginTop: '40px' }}>
                    <SocialLinkTree mob={mob} />
                 </div>
                 <TrustBadge />
                 <TabNavigator activeTab="connect" setActiveTab={setActiveTab} mob={mob} />
              </motion.div>
            )}
         </AnimatePresence>
      </div>

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
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Hire {c?.name || 'Elite Creators'} or explore our elite creators network for your next big campaign.</p>
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

      {mob && (
        <div style={{ 
          position: 'fixed', 
          bottom: '24px', 
          left: '16px', 
          right: '16px', 
          background: 'rgba(15, 23, 42, 0.95)', 
          backdropFilter: 'blur(12px)', 
          padding: '16px 24px', 
          borderRadius: '100px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          zIndex: 1000,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #FF9431' }}>
              <img src={c?.photo || c?.avatarUrl || c?.profile_pic || 'https://picsum.photos/100'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
            </div>
            <div>
               <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>@{c?.slug || 'elite'}</div>
               <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>Available Now</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { 
                setActiveTab('connect'); 
                const el = document.getElementById('profile-content-area');
                if (el) {
                  const yOffset = -120;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={20} />
            </button>
            <button onClick={() => { 
                setActiveTab('packages'); 
                const el = document.getElementById('profile-content-area');
                if (el) {
                  const yOffset = -120;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }} style={{ background: '#FF9431', border: 'none', color: '#fff', padding: '0 24px', height: '44px', borderRadius: '100px', fontSize: '13px', fontWeight: 950 }}>
              Book
            </button>
          </div>
        </div>
      )}

      <RateCreatorModal open={rateOpen} name={c?.name || 'Creator'} dsp={dsp} onClose={() => setRateOpen(false)} />
      <CollabBriefModal open={briefOpen} pkg={selectedPkg} creatorName={c?.name || 'Creator'} dsp={dsp} onClose={() => setBriefOpen(false)} />
      {c && stats && <MediaKitPreview open={mediaKitOpen} onClose={() => setMediaKitOpen(false)} creator={c} stats={stats} />}
    </div>
  );
}
