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
  Activity,
  ArrowLeft,
  ArrowRight,
  Send,
  Image as ImageIcon,
  TrendingUp,
  BrainCircuit,
  ScrollText,
  Heart,
  MessageSquare,
  MapPin
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
);const ProfileViewCounter = ({ mob }) => {
  const [views, setViews] = useState(12840);
  const [active, setActive] = useState(13);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => Math.max(8, prev + (Math.random() > 0.5 ? 1 : -1)));
      setViews(prev => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ margin: '32px 0 48px', display: 'flex', gap: '20px', flexDirection: mob ? 'column' : 'row', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(255,148,49,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      
      <div style={{ flex: 1, background: '#fff', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Activity size={24} color="#ef4444" />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Live Engagement</div>
          <div style={{ fontSize: '22px', fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', lineHeight: 1 }}>
            {active} <span style={{ fontSize: '13px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}><div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }} /> Viewing Now</span>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, background: '#0f172a', padding: '24px', borderRadius: '24px', color: '#fff', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(15,23,42,0.15)', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Globe size={24} color="#FF9431" />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Global Visibility</div>
          <div style={{ fontSize: '22px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>{fmt.num(views)}+ <span style={{ fontSize: '13px', color: '#FF9431', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Lifetime</span></div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.3); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }`}</style>
    </div>
  );
};
ProfileViewCounter.propTypes = { mob: PropTypes.bool };


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

const RatingSection = ({ val, total, onRate }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
     <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.floor(val) ? '#FF9431' : 'none'} color={s <= Math.floor(val) ? '#FF9431' : '#cbd5e1'} />)}
     </div>
     <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{val} <span style={{ color: '#64748b', fontWeight: 600 }}>({total} Reviews)</span></div>
     <button onClick={onRate} style={{ background: 'none', border: 'none', color: '#0073b1', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Rate This Creator</button>
  </div>
);
RatingSection.propTypes = { val: PropTypes.number.isRequired, total: PropTypes.number.isRequired, onRate: PropTypes.func.isRequired };

const HumanStory = ({ mob }) => (
  <div style={{ marginBottom: '40px', background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)', borderRadius: '40px', padding: mob ? '32px 24px' : '60px', border: '1.5px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
     <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.05 }}><ScrollText size={280} color="#0073b1" /></div>
     <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
           <div style={{ width: '40px', height: '40px', background: '#0073b1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,115,177,0.2)' }}>
              <Heart size={20} color="#fff" fill="#fff" />
           </div>
           <span style={{ fontSize: '13px', fontWeight: 950, color: '#0073b1', textTransform: 'uppercase', letterSpacing: '1.5px' }}>The Human Behind the Screen</span>
        </div>
        
        <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginBottom: '32px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
           Namaste! <span style={{ color: '#64748b', fontWeight: 400 }}>Main hoon aapka local storyteller.</span>
        </h2>
        
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: mob ? '32px' : '60px' }}>
            <div style={{ fontSize: mob ? '16px' : '18px', color: '#475569', fontWeight: 500, lineHeight: 1.8 }}>
               "Mera safar Bengaluru ki un galiyon se shuru hua jahan har mod par ek kahani hai. Ek basic phone se shuru karke aaj **CreatorBharat Elite** ka hissa banna mere liye ek garv ki baat hai. 
               <br/><br/>
               Mera manna hai ki content sirf dikhna nahi chahiye, balki mehsus hona chahiye. Chahe wo rural Bharat ki tech innovation ho ya local insights, mera maqsad hamesha **100% authenticity** aur **world-class quality** ka balance rakhna hai."
            </div>
            
            <div style={{ display: 'flex', flexDirection: mob ? 'row' : 'column', gap: '20px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '8px' : '0' }}>
               <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', flexShrink: 0, width: mob ? '200px' : 'auto' }}>
                  <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>2021</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>The First Story Told</div>
               </div>
               <div style={{ padding: '24px', background: '#0f172a', borderRadius: '24px', color: '#fff', boxShadow: '0 10px 30px rgba(15,23,42,0.2)', flexShrink: 0, width: mob ? '200px' : 'auto' }}>
                  <div style={{ fontSize: '28px', fontWeight: 950, color: '#FF9431', marginBottom: '4px' }}>Elite</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Certified Human Authority</div>
               </div>
            </div>
         </div>
     </div>
  </div>
);
HumanStory.propTypes = { mob: PropTypes.bool };

const EliteSocialPulse = ({ stats, mob }) => {
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
             <h3 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, marginBottom: '40px', letterSpacing: '-0.03em' }}>Total Global Reach: <span style={{ color: '#FF9431' }}>{fmt.num(stats.followers)}+</span></h3>
             
             <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(4, 1fr)', gap: '16px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
                {socials.map(s => (
                  <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '24px', backdropFilter: 'blur(10px)', flexShrink: 0, width: mob ? '200px' : 'auto' }}>
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
EliteSocialPulse.propTypes = { stats: PropTypes.object.isRequired, mob: PropTypes.bool };


const AIFitInsight = ({ c, mob }) => (
  <Card style={{ padding: mob ? '24px' : '32px', borderRadius: '24px', marginBottom: '32px', background: 'linear-gradient(to right, #f8fafc, #fff)', border: '1.5px solid #f1f5f9' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', background: '#0f172a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <BrainCircuit size={22} color="#FF9431" />
        </div>
        <div>
           <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Brand Match Insight</div>
           <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>94% Compatibility with {c.niche || 'Lifestyle'} Brands</div>
        </div>
     </div>
     <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>
        Our Elite Intelligence engine has analyzed @{c.slug}'s audience sentiment. High affinity detected for brands in <b>Premium Tech</b>, <b>Regional Commerce</b>, and <b>Sustainable Lifestyle</b> sectors.
     </p>
  </Card>
);
AIFitInsight.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };


const EliteIntelligenceHub = ({ stats, mob }) => (
  <Card style={{ padding: mob ? '24px' : '40px', borderRadius: '32px', marginBottom: '32px', border: '1.5px solid #f1f5f9', background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
      <div style={{ width: '48px', height: '48px', background: '#0f172a', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BrainCircuit size={24} color="#FF9431" />
      </div>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>Elite Audience Intelligence</h3>
        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Deep-dive analysis of followers and potential brand impact.</p>
      </div>
    </div>
    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '20px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
      {[
        { l: 'Authenticity Score', v: '98.2%', d: 'Verified human followers', i: ShieldCheck, c: '#10B981' },
        { l: 'Brand Affinity', v: 'High', d: 'Premium Tech & Lifestyle', i: Zap, c: '#f97316' },
        { l: 'Content Sentiment', v: '94% Positive', d: 'Elite community trust', i: Activity, c: '#0ea5e9' }
      ].map(x => (
        <div key={x.l} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', flexShrink: 0, width: mob ? '220px' : 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <x.i size={16} color={x.c} />
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>{x.l}</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>{x.v}</div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{x.d}</div>
        </div>
      ))}
    </div>
  </Card>
);
EliteIntelligenceHub.propTypes = { stats: PropTypes.object.isRequired, mob: PropTypes.bool };

const GeoIntelligence = ({ c, mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
     <div style={{ position: 'absolute', top: '20px', right: '40px', opacity: 0.03, pointerEvents: 'none' }}>
        <Globe size={200} color="#000" />
     </div>
     
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '44px', height: '44px', background: '#FF943110', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Compass size={24} color="#FF9431" />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>Roots & Regional Dominance</h3>
     </div>

     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 1fr', gap: mob ? '40px' : '60px', position: 'relative', zIndex: 1 }}>
        <div>
           <div style={{ marginBottom: mob ? '32px' : '48px', background: 'linear-gradient(to bottom right, #f8fafc, #fff)', padding: mob ? '24px' : '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                 <div style={{ width: mob ? '56px' : '72px', height: mob ? '56px' : '72px', borderRadius: '20px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 12px 24px rgba(15,23,42,0.2)' }}>
                    <MapPin size={mob ? 24 : 32} color="#FF9431" />
                 </div>
                 <div>
                    <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Home Base & Roots</div>
                    <div style={{ fontSize: mob ? '22px' : '26px', fontWeight: 950, color: '#0f172a', lineHeight: 1.2 }}>{c.city || 'Bengaluru'} <br/><span style={{ fontSize: '14px', color: '#64748b' }}>"The Heart of {c.niche || 'Tech'} Culture"</span></div>
                 </div>
              </div>
              <p style={{ fontSize: '14px', color: '#475569', marginTop: '16px', lineHeight: 1.7, fontWeight: 500 }}>
                 Yahan ki mitti aur vibes meri storytelling ka base hain. Being in {c.city || 'Bengaluru'} gives me direct access to the latest trends while staying connected to my authentic regional roots.
              </p>
           </div>

           <div>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Activity size={16} color="#10B981" /> Where My Community Lives
              </div>
              <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(2, 1fr)', gap: '20px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
                 {[
                   { city: 'Delhi NCR', val: '35%', c: '#FF9431' },
                   { city: 'Mumbai', val: '22%', c: '#0ea5e9' },
                   { city: 'Bangalore', val: '15%', c: '#10B981' },
                   { city: 'Indore', val: '10%', c: '#6366f1' }
                 ].map(h => (
                   <div key={h.city} style={{ padding: '16px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', flexShrink: 0, width: mob ? '140px' : 'auto' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '4px' }}>{h.city}</div>
                      <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>{h.val}</div>
                      <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '100px', marginTop: '8px', overflow: 'hidden' }}>
                         <div style={{ width: h.val, height: '100%', background: h.c }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div style={{ background: '#0f172a', padding: mob ? '32px' : '40px', borderRadius: '32px', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
           <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1 }}><Briefcase size={120} color="#fff" /></div>
           
           <div>
              <h4 style={{ fontSize: '18px', fontWeight: 950, marginBottom: '32px', color: '#FF9431', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <ShieldCheck size={20} /> Regional Trust Wall
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                 {[
                   { l: 'Bengaluru', d: 'Tech & Gaming Hub', icon: Zap },
                   { l: 'Mumbai', d: 'Lifestyle & Fashion', icon: ImageIcon },
                   { l: 'Delhi', d: 'Editorial Presence', icon: FileText }
                 ].map(b => (
                   <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <b.icon size={18} color="#FF9431" />
                      </div>
                      <div>
                         <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>{b.l}</div>
                         <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{b.d}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Operational Strength</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>100% Pan-Bharat Compatibility</div>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', fontWeight: 500 }}>Ready to activate across all major Indian metros and regional hubs.</p>
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

const ContentPhilosophy = ({ c, mob }) => (
  <div style={{ padding: mob ? '24px' : '48px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '40px', color: '#fff', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
     <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}><Zap size={200} color="#FF9431" /></div>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px', color: '#FF9431' }}>Mera Content Philosophy (The 'Why')</h3>
     <p style={{ fontSize: mob ? '16px' : '20px', fontWeight: 500, lineHeight: 1.7, maxWidth: '850px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>"Main sirf videos nahi banata, main {c.city || 'Bharat'} ki mitti ki kahaniyan sunata hoon. Brands ko emotional connect chahiye, aur meri audience ko authenticity—main in dono ko milata hoon cinematic rawness ke saath. My mission is to bridge the gap between traditional Bharat and the digital future."</p>
     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {['Cinematic Rawness', 'Relatable Humor', 'High Retention Editing', 'Cultural Storytelling'].map(t => <div key={t} style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>{t}</div>)}
     </div>
  </div>
);
ContentPhilosophy.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const AboutMeLong = ({ c }) => (
  <div style={{ marginBottom: '48px' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '24px' }}>The Human Behind the Screen</h3>
     <div style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>
        <p style={{ marginBottom: '20px' }}>Namaste! My journey began in the vibrant streets of {c.city || 'my hometown'}, where every corner has a story. I started as a storyteller with nothing but a basic phone, and today, I'm honored to be part of the CreatorBharat Elite family.</p>
        <p>I believe that content should not just be viewed; it should be felt. Whether I'm exploring a local insight or talking about the latest tech innovation in rural Bharat, my goal is to remain 100% authentic to my roots while delivering world-class production quality.</p>
     </div>
  </div>
);
AboutMeLong.propTypes = { c: PropTypes.object.isRequired };

const ExpertiseHub = ({ mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
      <div style={{ width: '40px', height: '40px', background: '#0f172a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Zap size={20} color="#FF9431" />
      </div>
      <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>Technical & Creative Prowess</h3>
    </div>
    
    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
      {[
        { t: 'Production', items: ['Cinematic 4K Rendering', 'Advanced Sound Design', 'Multi-Cam Editing'], i: Play, c: '#FF9431' },
        { t: 'Creative', items: ['Cultural Storytelling', 'Scripting in Hinglish', 'Art Direction'], i: ImageIcon, c: '#0ea5e9' },
        { t: 'Strategic', items: ['Brand Integration', 'Viral Hook Engineering', 'Audience Analytics'], i: TrendingUp, c: '#10B981' }
      ].map(g => (
        <div key={g.t} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', flexShrink: 0, width: mob ? '250px' : 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <g.i size={16} color={g.c} />
            <span style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{g.t}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {g.items.map(s => (
              <div key={s} style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', background: g.c, borderRadius: '50%' }} /> {s}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Card>
);
ExpertiseHub.propTypes = { mob: PropTypes.bool };

const NationalToLocalBridge = ({ name, mob }) => (
  <div style={{ padding: mob ? '32px 24px' : '60px', background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)', borderRadius: '40px', border: '1.5px solid #e0f2fe', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '-30px', right: '-30px', opacity: 0.1 }}><Globe size={200} color="#0073b1" /></div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '40px', height: '40px', background: '#0073b1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrendingUp size={20} color="#fff" />
        </div>
        <span style={{ fontSize: '14px', fontWeight: 950, color: '#0073b1', textTransform: 'uppercase', letterSpacing: '1.5px' }}>The Bharat Bridge</span>
      </div>
      <h2 style={{ fontSize: mob ? '28px' : '48px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.04em' }}>Bridging {name}'s <span style={{ color: '#0073b1' }}>National Impact</span> to Local Bharat</h2>
      <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, lineHeight: 1.6, maxWidth: '800px' }}>
        "Maine hamesha maana hai ki asli impact tab hota hai jab hum global standards ko apne regional roots ke saath jodte hain. Mera mission Bharat ke har kone tak authentic storytelling pahunchana hai."
      </p>
    </div>
  </div>
);
NationalToLocalBridge.propTypes = { name: PropTypes.string, mob: PropTypes.bool };

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

const TabNavigator = ({ activeTab, setActiveTab, mob }) => {
  const currentIndex = TABS.findIndex(t => t.id === activeTab);
  const prevTab = currentIndex > 0 ? TABS[currentIndex - 1] : null;
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  const scrollToContent = () => {
    const el = document.getElementById('profile-content-area');
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', gap: '16px', marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #f1f5f9' }}>
       {prevTab ? (
         <button 
           onClick={() => { setActiveTab(prevTab.id); scrollToContent(); }}
           style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 32px', borderRadius: '100px', cursor: 'pointer', color: '#64748b', fontWeight: 800, fontSize: '14px', width: mob ? '100%' : 'auto' }}
         >
            <ArrowLeft size={18} /> Previous: {prevTab.label}
         </button>
       ) : <div />}

       {nextTab ? (
         <button 
           onClick={() => { setActiveTab(nextTab.id); scrollToContent(); }}
           style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#0073b1', border: 'none', padding: '16px 32px', borderRadius: '100px', cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: '14px', boxShadow: '0 8px 24px rgba(0,115,177,0.2)', width: mob ? '100%' : 'auto' }}
         >
            Next: {nextTab.label} <ArrowRight size={18} />
         </button>
       ) : <div />}
    </div>
  );
};
TabNavigator.propTypes = { activeTab: PropTypes.string.isRequired, setActiveTab: PropTypes.func.isRequired, mob: PropTypes.bool };

const InfluenceMedia = ({ mob }) => (
  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: '32px', marginBottom: '60px' }}>
     <Card style={{ padding: mob ? '24px' : '40px', borderRadius: '40px', border: '1.5px solid #f1f5f9' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#0f172a' }}>
           <Mic2 size={24} color="#FF9431" /> Podcasts & Keynote Conversations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           {[
             { t: 'The Future of Regional Bharat', p: 'The Digital Bridge Podcast', d: '45 mins', i: 'ep1' },
             { t: 'Authenticity as a Currency', p: 'Creators Roundtable', d: '32 mins', i: 'ep2' }
           ].map(ep => (
              <div key={ep.i} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}>
                 <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                    <Play size={20} color="#FF9431" fill="#FF9431" />
                 </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{ep.p}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>{ep.t}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, marginTop: '4px' }}>Duration: {ep.d} • Verified Content</div>
                 </div>
              </div>
           ))}
        </div>
     </Card>

     <Card style={{ padding: mob ? '24px' : '40px', borderRadius: '40px', border: '1.5px solid #f1f5f9', background: '#0f172a', color: '#fff' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#FF9431' }}>
           <FileText size={24} color="#FF9431" /> Thought Leadership
        </h3>
        <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
           <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px' }}>Why Authentic Content is the Future of Marketing</h4>
           <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, fontWeight: 500, marginBottom: '20px' }}>Exploring how the intersection of regional values and high-end production is redefining consumer trust in 2024.</p>
           <button style={{ background: '#FF9431', border: 'none', color: '#fff', padding: '12px 24px', borderRadius: '100px', fontSize: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Read Full Article <ArrowRight size={14} />
           </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
           <div style={{ width: '40px', height: '1px', background: '#fff' }} />
           <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Published on Medium & LinkedIn</span>
        </div>
     </Card>
  </div>
);
InfluenceMedia.propTypes = { mob: PropTypes.bool };


// --- TAB CONTENTS ---

const IdentityTab = ({ c, stats, onRate, mob, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <HumanStory mob={mob} />
    <AIFitInsight c={c} mob={mob} />
    <ContentPhilosophy c={c} mob={mob} />
    <EliteSocialPulse stats={stats} mob={mob} />
    <EliteIntelligenceHub stats={stats} mob={mob} />
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
       <Btn lg style={{ borderRadius: '100px', background: '#0f172a', color: '#fff', gap: '10px', width: mob ? '100%' : 'auto' }}><Download size={18} /> Download Verified Media Kit (PDF)</Btn>
    </div>
    <GeoIntelligence c={c} mob={mob} />
    <ExpertiseHub mob={mob} />
    <NationalToLocalBridge name={c.name} mob={mob} />
    
    <TrustBadge />
    <TabNavigator activeTab="identity" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
IdentityTab.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, onRate: PropTypes.func.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

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

         <ProfileViewCounter mob={mob} />
    <TrustBadge />
         <TabNavigator activeTab="story" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
StoryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };

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
    <ProfileViewCounter mob={mob} />
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
          "Main local brands aur homegrown startups ko support karne ke liye hamesha ready hoon. Chota ho ya bada, har business ki ek kahani hoti hai jo Bharat tak pahunchani chahiye."
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

// --- HELPERS ---

const SocialStack = ({ mob }) => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
     {[
       { id: 'insta', c: '#E4405F', l: 'Instagram' },
       { id: 'yt', c: '#FF0000', l: 'YouTube' },
       { id: 'linkedin', c: '#0077B5', l: 'LinkedIn' },
       { id: 'twitter', c: '#000', l: 'Twitter' }
     ].map(s => (
       <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <EliteSocialIcon type={s.id} size={16} color={s.c} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{s.l}</span>
       </div>
     ))}
  </div>
);
SocialStack.propTypes = { mob: PropTypes.bool };

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

const ContactMetadata = ({ city, followers, mob, onContact }) => (
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
ContactMetadata.propTypes = { city: PropTypes.string, followers: PropTypes.number.isRequired, mob: PropTypes.bool, onContact: PropTypes.func.isRequired };

const IdentityHeader = ({ category, name, mob }) => {
  const catDisplay = Array.isArray(category) ? category.join(' • ') : category;
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#FF9431', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{catDisplay || 'Lifestyle & Culture'}</div>
          {!mob && <div style={{ background: '#eef2ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>ELITE PARTNER</div>}
          <div style={{ background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #10b98120' }}>
            <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 5px #10B981' }} /> Available Now
          </div>
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
     <div style={{ marginTop: '32px' }}>
        <ProfileViewCounter mob={mob} />
     </div>
  </div>
);
IdentityDetails.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, mob: PropTypes.bool, onRate: PropTypes.func.isRequired, onContact: PropTypes.func.isRequired };

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

const HeroBanner = ({ banner, mob, onBack, onShare }) => (
  <div style={{ height: mob ? '180px' : '300px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
     <img src={banner} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} alt="banner" />
     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
     <div style={{ position: 'absolute', top: mob ? '16px' : '24px', left: mob ? '16px' : '24px', zIndex: 10 }}>
        <button onClick={onBack} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: mob ? '8px 16px' : '10px 24px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(12px)', fontSize: mob ? '12px' : '14px', fontWeight: 700 }}>
           <ArrowLeft size={mob ? 16 : 18} /> {mob ? 'Back' : 'Back to Marketplace'}
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
     <div style={{ position: 'absolute', bottom: mob ? '10px' : '20px', right: mob ? '10px' : '20px', width: mob ? '16px' : '24px', height: mob ? '16px' : '24px', background: '#10B981', border: mob ? '2px solid #fff' : '4px solid #fff', borderRadius: '50%', zIndex: 5, boxShadow: '0 0 10px rgba(16,185,129,0.5)' }} />
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
  const dpImg = c?.photo || c?.avatarUrl || c?.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'C')}&background=FF9431&color=fff&size=200`;
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

             <div style={{ marginTop: '40px', padding: '32px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <MapPin size={14} /> Regional Identity & Hub
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                   <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, marginBottom: '4px' }}>Base of Operations</div>
                      <div style={{ fontSize: '16px', fontWeight: 900 }}>{c?.city || 'Bengaluru'}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Karnataka, India</div>
                   </div>
                   <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, marginBottom: '4px' }}>Primary Region</div>
                      <div style={{ fontSize: '16px', fontWeight: 900 }}>South & West Bharat</div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Pan-India Ready</div>
                   </div>
                </div>

                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', marginBottom: '12px' }}>Cultural & Language Roots</div>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {['Kannada', 'Hinglish', 'Marathi (Expert)', 'Cultural Nuance'].map(tag => (
                        <div key={tag} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '11px', fontWeight: 800, color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</div>
                      ))}
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
       <ProfileViewCounter mob={mob} />
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
     <ProfileViewCounter mob={mob} />
<TrustBadge />
     <TabNavigator activeTab="reviews" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
ReviewsTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, navigate: PropTypes.func.isRequired, onWriteReview: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };

const PackagesTab = ({ mob, onSelect, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '20px' : '0' }}>
       <PackageCard onSelect={onSelect} p={{ l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] }} />
       <PackageCard onSelect={onSelect} p={{ l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] }} />
       <PackageCard onSelect={onSelect} p={{ l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }} />
    </div>
    <CollabFAQ mob={mob} />
    <ProfileViewCounter mob={mob} />
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
            {[{ id: 'identity', label: 'Identity', icon: Activity }, { id: 'story', label: 'My Story', icon: Globe }, { id: 'gallery', label: 'Gallery', icon: ImageIcon }, { id: 'work', label: 'Pro Work', icon: Briefcase }, { id: 'local', label: 'Local Hub', icon: MapPin }, { id: 'reviews', label: 'Reviews', icon: Star }, { id: 'packages', label: 'Packages', icon: Zap }, { id: 'connect', label: 'Connect', icon: MessageSquare }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '20px 0', background: 'none', border: 'none', borderBottom: `3.5px solid ${activeTab === t.id ? '#0073b1' : 'transparent'}`, color: activeTab === t.id ? '#111827' : '#6b7280', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                <t.icon size={18} /> {t.label}
              </button>
            ))}
         </div>
      </div>

      <div id="profile-content-area" style={{ ...W(1100), padding: mob ? '0 16px 120px' : '60px 24px' }}>
        {/* MODERN MOBILE SECTION NAVIGATOR (STORIES STYLE) */}
        {mob && (
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', scrollbarWidth: 'none', padding: '10px 0 32px', marginBottom: '12px' }}>
            {[
              { id: 'identity', l: 'Overview', i: UserPlus, c: '#0ea5e9' },
              { id: 'story', l: 'History', i: ScrollText, c: '#8b5cf6' },
              { id: 'gallery', l: 'Visuals', i: ImageIcon, c: '#ec4899' },
              { id: 'work', l: 'Projects', i: Zap, c: '#f59e0b' },
              { id: 'local', l: 'Region', i: MapPin, c: '#10b981' },
              { id: 'reviews', l: 'Trust', i: Star, c: '#f97316' },
              { id: 'packages', l: 'Deals', i: Briefcase, c: '#6366f1' }
            ].map(s => (
              <button 
                 key={s.id} 
                 onClick={() => { 
                   setActiveTab(s.id); 
                   const el = document.getElementById('profile-content-area');
                   if (el) {
                     const yOffset = -120; // Accounts for sticky header
                     const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                     window.scrollTo({ top: y, behavior: 'smooth' });
                   }
                 }} 
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     e.preventDefault();
                     setActiveTab(s.id);
                     const el = document.getElementById('profile-content-area');
                     if (el) {
                       const yOffset = -120;
                       const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                       window.scrollTo({ top: y, behavior: 'smooth' });
                     }
                   }
                 }}
                 style={{ textAlign: 'center', flexShrink: 0, cursor: 'pointer', outline: 'none' }}
               >
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  padding: '3px', 
                  background: activeTab === s.id ? `linear-gradient(45deg, ${s.c}, #fff)` : '#e2e8f0',
                  marginBottom: '8px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                    <s.i size={24} color={activeTab === s.id ? s.c : '#94a3b8'} fill={activeTab === s.id ? `${s.c}10` : 'none'} />
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: activeTab === s.id ? '#0f172a' : '#94a3b8' }}>{s.l}</span>
              </button>
            ))}
          </div>
        )}

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
                 <QuickConnectHub c={c} mob={mob} dsp={dsp} onBrief={() => setBriefOpen(true)} />
                 <ProfileViewCounter mob={mob} />
<TrustBadge />
                 <TabNavigator activeTab="connect" setActiveTab={setActiveTab} mob={mob} />
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

      {/* STICKY BOTTOM ACTION BAR FOR MOBILE */}
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
              <img src={c?.image || 'https://picsum.photos/100'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
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
    </div>
  );
}
