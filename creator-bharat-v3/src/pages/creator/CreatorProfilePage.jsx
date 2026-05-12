import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { fetchCreatorById } from '../../utils/platformService';
import { W, fmt } from '../../utils/helpers';
import { Btn, Bdg, Ring, Empty, Modal, Fld, Card } from '@/components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Zap, 
  Briefcase,
  Activity,
  Globe,
  Award,
  CheckCircle2,
  Quote,
  MessageSquare,
  UserPlus,
  UserCheck,
  MapPin,
  Link as LinkIcon,
  Share2,
  Verified
} from 'lucide-react';

// --- BRAND SOCIAL SVGs ---

const SocialIcon = ({ type, size = 20, color = 'currentColor' }) => {
  const svgs = {
    insta: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    yt: <svg width={size} height={size} viewBox="0 0 24 17" fill={color}><path d="M23.495 2.205a3.04 3.04 0 0 0-2.14-2.154C19.505 0 12 0 12 0S4.495 0 2.645.05a3.04 3.04 0 0 0-2.14 2.154C0 4.06 0 8 0 8s0 3.94.504 5.795a3.04 3.04 0 0 0 2.14 2.154C4.495 16 12 16 12 16s7.505 0 9.355-.05a3.04 3.04 0 0 0 2.14-2.154C24 11.94 24 8 24 8s0-3.94-.505-5.795zM9.607 11.43V4.57l6.264 3.43-6.264 3.43z" /></svg>,
    fb: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  };
  return svgs[type] || svgs.x;
};
SocialIcon.propTypes = { type: PropTypes.string.isRequired, size: PropTypes.number, color: PropTypes.string };

// --- SEO HELPER ---

const SEOTags = ({ c }) => {
  useEffect(() => {
    if (!c) return;
    const title = `${c.name} | Official Verified Creator Portfolio | CreatorBharat`;
    const desc = `${c.name} is a verified ${c.niche || 'Digital'} creator from ${c.city || 'Bharat'}. View their elite performance score, pro work, and official brand packages.`;
    globalThis.document.title = title;
    
    // Use cover_image for OG if available, otherwise profile_pic
    const shareImg = c.cover_image || c.banner_image || c.profile_pic;
    
    const m = {
      'description': desc,
      'og:title': title,
      'og:description': desc,
      'og:image': shareImg,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': desc
    };
    
    Object.entries(m).forEach(([k, v]) => {
      let el = globalThis.document.querySelector(`meta[property="${k}"], meta[name="${k}"]`);
      if (!el) {
        el = globalThis.document.createElement('meta');
        if (k.startsWith('og:')) {
          el.setAttribute('property', k);
        } else {
          el.setAttribute('name', k);
        }
        globalThis.document.head.appendChild(el);
      }
      if (v) el.setAttribute('content', v);
    });
  }, [c]);
  return null;
};
SEOTags.propTypes = { c: PropTypes.object };

// --- PRO SUB-COMPONENTS ---

const BadgeRow = ({ score }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
     <Bdg color="orange" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px', border: '1px solid rgba(255,148,49,0.2)' }}>
        <Zap size={14} fill="currentColor" /> {score} ELITE SCORE
     </Bdg>
     <Bdg color="green" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px' }}>
        <ShieldCheck size={14} /> VERIFIED PARTNER
     </Bdg>
     <Bdg color="blue" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px' }}>
        <Award size={14} /> TOP 1% BHARAT
     </Bdg>
  </div>
);
BadgeRow.propTypes = { score: PropTypes.number.isRequired };

const SocialIconsPanel = ({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', background: 'rgba(0,0,0,0.04)', padding: '10px 20px', borderRadius: '100px', width: 'fit-content', marginTop: mob ? '20px' : '0' }}>
     <SocialIcon type="insta" size={18} color="#E4405F" />
     <SocialIcon type="yt" size={18} color="#FF0000" />
     <SocialIcon type="fb" size={18} color="#1877F2" />
     <SocialIcon type="x" size={16} color="#000" />
     <div style={{ height: '16px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
     <LinkIcon size={18} color="#6b7280" style={{ cursor: 'pointer' }} />
  </div>
);
SocialIconsPanel.propTypes = { mob: PropTypes.bool };

const IdentityHeader = ({ category, name, mob }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ background: '#FF9431', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{category || 'Lifestyle & Culture'}</div>
        {!mob && <div style={{ background: '#eef2ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>ELITE PARTNER</div>}
     </div>
     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <h1 style={{ fontSize: mob ? '28px' : '40px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>{name}</h1>
        <Verified size={mob ? 20 : 24} color="#0073b1" fill="#0073b1" style={{ color: '#fff' }} />
     </div>
  </>
);
IdentityHeader.propTypes = { category: PropTypes.string, name: PropTypes.string.isRequired, mob: PropTypes.bool };

const ContactMetadata = ({ city, followers, mob }) => (
  <>
     <div style={{ display: 'flex', flexWrap: 'wrap', gap: mob ? '12px' : '24px', color: '#6b7280', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="#9ca3af" /> {city || 'Bharat'}</div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0073b1', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '14px', fontWeight: 700 }}><LinkIcon size={16} /> Contact info</button>
     </div>
     <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div style={{ color: '#0073b1', fontWeight: 700, fontSize: '14px' }}>{fmt.num(followers)} followers • 500+ connections</div>
        {!mob && <SocialIconsPanel mob={false} />}
     </div>
  </>
);
ContactMetadata.propTypes = { city: PropTypes.string, followers: PropTypes.number.isRequired, mob: PropTypes.bool };

const IdentityDetails = ({ c, stats, mob }) => (
  <div style={{ flex: 1 }}>
     <IdentityHeader category={c.category || c.niche} name={c.name} mob={mob} />
     <p style={{ fontSize: mob ? '16px' : '22px', color: '#374151', marginBottom: '16px', fontWeight: 500, lineHeight: 1.4, maxWidth: '800px' }}>
        Expert in {c.niche || 'Lifestyle'} Storytelling | Building authentic brand identities across Bharat.
     </p>
     <ContactMetadata city={c.city} followers={stats.followers} mob={mob} />
     <BadgeRow score={stats.score} />
  </div>
);
IdentityDetails.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, mob: PropTypes.bool };

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

const ActionButtons = ({ followed, onAction, mob }) => (
  <div style={{ display: 'flex', gap: '12px', width: mob ? '100%' : 'auto', alignSelf: mob ? 'stretch' : 'flex-start' }}>
     <FollowBtn active={followed} onClick={() => onAction('follow')} mob={mob} />
     <MessageBtn onClick={() => onAction('message')} mob={mob} />
  </div>
);
ActionButtons.propTypes = { followed: PropTypes.bool.isRequired, onAction: PropTypes.func.isRequired, mob: PropTypes.bool };

const VerifiedTrustBanner = ({ mob }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255, 148, 49, 0.05)', padding: mob ? '10px 16px' : '12px 20px', borderRadius: mob ? '12px' : '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px solid rgba(255, 148, 49, 0.2)', marginBottom: mob ? '0' : '24px', width: mob ? '100%' : 'fit-content', marginTop: mob ? '0' : '40px' }}>
     <ShieldCheck size={mob ? 18 : 24} color="#FF9431" fill="rgba(255, 148, 49, 0.1)" />
     <div style={{ fontSize: mob ? '12px' : '15px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
        This Creator is <span style={{ color: '#FF9431' }}>Verified by CreatorBharat</span>
     </div>
  </motion.div>
);
VerifiedTrustBanner.propTypes = { mob: PropTypes.bool };

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

const ProfileHero = ({ c, stats, navigate, st, dsp, mob }) => {
  const [followed, setFollowed] = useState(false);
  const handleAction = (a) => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to ' + a } }); return; }
    if (a === 'follow') setFollowed(!followed);
    if (a === 'message') dsp({ t: 'TOAST', d: { type: 'success', msg: 'Opening chat...' } });
  };
  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: c.name, url: globalThis.location.href });
      else { await navigator.clipboard.writeText(globalThis.location.href); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Copied!' } }); }
    } catch (e) { console.error(e); }
  };
  
  // REAL DATA MAPPING FOR BACKEND CONSISTENCY
  const dpImg = c?.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'C')}&background=FF9431&color=fff&size=200`;
  const bannerImg = c?.cover_image || c?.banner_image || `https://picsum.photos/seed/${c?.id}/1600/500`;
  
  return (
    <section style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
       <HeroBanner banner={bannerImg} mob={mob} onBack={() => navigate('/creators')} onShare={handleShare} />
       <div style={{ ...W(1100), margin: mob ? '-50px auto 0' : '-100px auto 0', padding: '0 20px 40px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div style={{ display: 'flex', alignItems: mob ? 'center' : 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
                <ProfileImage src={dpImg} mob={mob} />
                {mob && <SocialIconsPanel mob={true} />}
                {!mob && <VerifiedTrustBanner mob={false} />}
             </div>
             {mob && <VerifiedTrustBanner mob={true} />}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <IdentityDetails c={c} stats={stats} mob={mob} />
                <ActionButtons followed={followed} onAction={handleAction} mob={mob} />
             </div>
          </div>
       </div>
    </section>
  );
};
ProfileHero.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, navigate: PropTypes.func.isRequired, st: PropTypes.object.isRequired, dsp: PropTypes.func.isRequired, mob: PropTypes.bool };

const OperationalMetrics = ({ mob }) => (
  <div style={{ display: 'flex', gap: mob ? '12px' : '32px', padding: '24px', background: 'rgba(0,0,0,0.03)', borderRadius: '24px', marginBottom: '40px' }}>
     <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Response Time</div>
        <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>&lt; 4 Hours</div>
     </div>
     <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }} />
     <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Availability</div>
        <div style={{ fontSize: '18px', fontWeight: 950, color: '#10B981' }}>Available</div>
     </div>
     <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }} />
     <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Lead Time</div>
        <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>10-14 Days</div>
     </div>
  </div>
);
OperationalMetrics.propTypes = { mob: PropTypes.bool };

const JourneyTimeline = () => (
  <div style={{ padding: '40px 0', position: 'relative' }}>
     <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: '#f1f5f9' }} />
     {[
       { year: '2021', title: 'The Genesis', desc: 'Started with zero followers and a simple smartphone, focusing on local storytelling.', id: 't1' },
       { year: '2022', title: 'Viral Breakthrough', desc: 'Reached 50k followers with the "Real Bharat" series. Awarded Best Regional Creator.', id: 't2' },
       { year: '2023', title: 'Brand Collaborations', desc: 'Partnered with 20+ national brands. Established as a lifestyle authority.', id: 't3' },
       { year: '2025', title: 'Elite Status', desc: 'Joined CreatorBharat Elite. Launched the official media portfolio.', id: 't4' }
     ].map((m, i) => (
       <div key={m.id} style={{ position: 'relative', paddingLeft: '60px', marginBottom: '48px' }}>
          <div style={{ position: 'absolute', left: '11px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: i === 3 ? '#FF9431' : '#fff', border: '4px solid ' + (i === 3 ? '#FF9431' : '#cbd5e1'), zIndex: 2 }} />
          <div style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431', marginBottom: '8px' }}>{m.year}</div>
          <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>{m.title}</h4>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{m.desc}</p>
       </div>
     ))}
  </div>
);

const BrandWall = ({ mob }) => (
  <div style={{ marginTop: '60px' }}>
     <h4 style={{ fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', marginBottom: '32px' }}>Trusted By Global Brands</h4>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: '40px', alignItems: 'center', opacity: 0.5 }}>
        {['Haldiram\'s', 'OYO', 'Meesho', 'Flipkart', 'Zomato', 'Amazon'].map(b => (
          <div key={`brand-${b}`} style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', textAlign: 'center', filter: 'grayscale(1)' }}>{b}</div>
        ))}
     </div>
  </div>
);
BrandWall.propTypes = { mob: PropTypes.bool };

const PackageCard = ({ p }) => (
  <Card style={{ padding: '40px', borderRadius: '40px', border: `2px solid ${p.pop ? '#FF9431' : '#f1f5f9'}`, background: p.pop ? 'rgba(255, 148, 49, 0.05)' : '#fff', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
     {p.pop && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#FF9431', color: '#fff', fontSize: '10px', fontWeight: 950, padding: '6px 16px', borderRadius: '100px', letterSpacing: '1px' }}>MOST POPULAR</div>}
     <div style={{ marginBottom: '32px' }}>
        <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{p.l}</h4>
        <div style={{ fontSize: '36px', fontWeight: 950, color: p.pop ? '#FF9431' : '#0f172a', letterSpacing: '-0.04em' }}>{p.v}</div>
     </div>
     <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {p.items.map((item) => (
          <div key={`pkg-feat-${item.replace(/\s+/g, '-').toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 650, color: '#475569' }}>
             <CheckCircle2 size={18} color={p.pop ? '#FF9431' : '#10B981'} /> {item}
          </div>
        ))}
     </div>
     <Btn full lg style={{ marginTop: '40px', borderRadius: '100px', background: p.pop ? '#FF9431' : '#0f172a' }}>Select Package</Btn>
  </Card>
);
PackageCard.propTypes = {
  p: PropTypes.shape({
    l: PropTypes.string.isRequired,
    v: PropTypes.string.isRequired,
    pop: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

const TestimonialCard = ({ name, role }) => (
  <Card style={{ padding: '40px', borderRadius: '40px', background: '#f8fafc', border: 'none' }}>
     <Quote size={40} color="#FF9431" fill="#FF9431" style={{ opacity: 0.1, marginBottom: '24px' }} />
     <p style={{ fontSize: '18px', color: '#0f172a', fontWeight: 600, lineHeight: 1.7, marginBottom: '32px', fontStyle: 'italic' }}>"Working with this creator was a game changer for our Jaipur launch. We saw a 3.4x ROI in terms of store visits and the content quality was cinematic. Highly professional execution!"</p>
     <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#cbd5e1' }} />
        <div>
           <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>{name}</div>
           <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{role}</div>
        </div>
     </div>
  </Card>
);
TestimonialCard.propTypes = { name: PropTypes.string.isRequired, role: PropTypes.string.isRequired };

// --- TAB CONTENT COMPONENTS ---

const IdentityTab = ({ stats, mob }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
       <div style={{ padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Total Reach</div>
          <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>{fmt.num(stats.followers)}</div>
          <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 900, marginTop: '8px' }}>+12.4K This Month</div>
       </div>
       <div style={{ padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Engagement</div>
          <div style={{ fontSize: '32px', fontWeight: 950, color: '#FF9431' }}>{stats.er}%</div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900, marginTop: '8px' }}>Industry High</div>
       </div>
       <div style={{ padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Avg Views</div>
          <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>82.4K</div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900, marginTop: '8px' }}>Per Content Piece</div>
       </div>
       <div style={{ padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Consistency</div>
          <div style={{ fontSize: '32px', fontWeight: 950, color: '#10B981' }}>98%</div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900, marginTop: '8px' }}>Posting Velocity</div>
       </div>
    </div>
    <OperationalMetrics mob={mob} />
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: '32px' }}>
       <Card style={{ padding: '48px', borderRadius: '48px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px' }}>Audience Deep-Dive</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
             <div>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Top Interests</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{['LifeStyle', 'Bharat Tech', 'Regional Food', 'Rural Growth'].map(t => <Bdg key={`interest-${t}`} color="gray">{t}</Bdg>)}</div>
             </div>
             <div>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Age Group</div>
                <div style={{ fontSize: '18px', fontWeight: 900 }}>18-34 <span style={{ color: '#FF9431' }}>(72%)</span></div>
             </div>
          </div>
       </Card>
       <Card style={{ padding: '48px', borderRadius: '48px', background: '#0f172a', color: '#fff' }}>
          <div style={{ textAlign: 'center' }}>
             <Ring score={98} size={100} strokeWidth={10} light />
             <h4 style={{ fontSize: '20px', fontWeight: 950, marginTop: '16px' }}>Authenticity Score</h4>
             <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Verified Human Interactions</p>
          </div>
       </Card>
    </div>
  </motion.div>
);
IdentityTab.propTypes = { stats: PropTypes.object.isRequired, mob: PropTypes.bool };

const StoryTab = ({ city, mob }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
       <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px', textAlign: 'center' }}>Ek Ladki, Ek Camera, <span style={{ color: '#FF9431' }}>Ek Sapna 🎬</span></h2>
       <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.8, fontWeight: 500, textAlign: 'center', marginBottom: '60px' }}>From the streets of {city} to representing Bharat on national stages. I build communities, not just follower counts.</p>
       <JourneyTimeline />
    </div>
  </motion.div>
);
StoryTab.propTypes = { city: PropTypes.string.isRequired, mob: PropTypes.bool };

const WorkTab = ({ creatorId, mob }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '16px', marginBottom: '80px' }}>
       {[
         { v: '1.2M', l: '45K', id: 'w1' }, { v: '850K', l: '32K', id: 'w2' }, { v: '2.1M', l: '110K', id: 'w3' }, { v: '920K', l: '28K', id: 'w4' }
       ].map((m, i) => (
          <div key={m.id} style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', background: '#f1f5f9', position: 'relative' }}>
             <img src={`https://picsum.photos/seed/${creatorId}${i}/600/800`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
             <div style={{ position: 'absolute', bottom: '16px', left: '16px', color: '#fff' }}><div style={{ fontSize: '14px', fontWeight: 950 }}>{m.v} Views</div></div>
          </div>
       ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '32px' }}><TestimonialCard name="Amit Sharma" role="Brand Manager, OYO Rooms" /><TestimonialCard name="Sneha Gupta" role="Marketing Head, Meesho" /></div>
    <BrandWall mob={mob} />
  </motion.div>
);
WorkTab.propTypes = { creatorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, mob: PropTypes.bool };

const PackagesTab = ({ mob }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
       <PackageCard p={{ l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] }} />
       <PackageCard p={{ l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] }} />
       <PackageCard p={{ l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }} />
    </div>
  </motion.div>
);
PackagesTab.propTypes = { mob: PropTypes.bool };

// --- CINEMATIC LOADER ---

const EliteLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'rgba(255, 148, 49, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }} />
    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '30vw', height: '30vw', background: 'rgba(0, 115, 177, 0.03)', borderRadius: '50%', filter: 'blur(80px)' }} />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ textAlign: 'center', zIndex: 2 }}>
       <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 32px' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', inset: 0, border: '3px solid rgba(255, 148, 49, 0.1)', borderTopColor: '#FF9431', borderRadius: '50%' }} />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: '20px', background: 'rgba(255, 148, 49, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={24} color="#FF9431" /></motion.div>
       </div>
       <motion.h2 animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '12px', fontWeight: 950, color: '#0f172a', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>Identity Verification</motion.h2>
       <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Synchronizing Official CreatorBharat Layer...</p>
    </motion.div>
  </div>
);

// --- MAIN PAGE ---

export default function CreatorProfilePage() {
  const { id } = useParams();
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [c, setC] = useState(st?.sel?.creator || null);
  const [ld, setLd] = useState(!c);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [showCollab, setShowCollab] = useState(false);
  const [collabMsg, setCollabMsg] = useState('');
  const [activeTab, setActiveTab] = useState('identity');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (st?.sel?.creator) { setC(st.sel.creator); setLd(false); return; }
    if (!id) return;
    setLd(true);
    fetchCreatorById(id).then(found => { setC(found); setLd(false); }).catch(() => setLd(false));
  }, [id, st.sel.creator]);

  const stats = useMemo(() => {
    if (!c) return null;
    return { followers: c.followers || 125000, er: c.er || 4.8, reach: Math.floor((c.followers || 125000) * 0.85), authenticity: 98.2, score: c.score || 94 };
  }, [c]);

  if (ld) return <EliteLoader />;
  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty icon="👤" title="Profile Not Found" sub="Aap jo creator dhoond rahe hain wo shayad abhi platform par nahi hai." ctaLabel="Back to Marketplace" onCta={() => navigate('/creators')} /></div>;

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px' }}>
      <SEOTags c={c} />
      <ProfileHero c={c} stats={stats} navigate={navigate} st={st} dsp={dsp} mob={mob} />
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(252, 252, 252, 0.9)', backdropFilter: 'blur(30px)', borderBottom: '1px solid #f1f5f9' }}>
         <div style={{ ...W(1100), padding: '0 24px', display: 'flex', justifyContent: mob ? 'center' : 'flex-start', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: mob ? '20px' : '48px' }}>
               {[
                 { id: 'identity', label: 'Identity', icon: Activity }, { id: 'story', label: 'My Story', icon: Globe }, { id: 'work', label: 'Pro Work', icon: Briefcase }, { id: 'packages', label: 'Packages', icon: Zap }
               ].map(t => (
                 <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '20px 0', background: 'none', border: 'none', borderBottom: `3.5px solid ${activeTab === t.id ? '#0073b1' : 'transparent'}`, color: activeTab === t.id ? '#111827' : '#6b7280', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s' }}>
                   <t.icon size={18} /> {!mob && t.label}
                 </button>
               ))}
            </div>
         </div>
      </div>
      <div style={{ ...W(1100), padding: mob ? '40px 16px' : '60px 24px' }}>
         <AnimatePresence mode="wait">
            {activeTab === 'identity' && <IdentityTab key="id-tab" stats={stats} mob={mob} />}
            {activeTab === 'story' && <StoryTab key="st-tab" city={c.city || 'Bharat'} mob={mob} />}
            {activeTab === 'work' && <WorkTab key="wk-tab" creatorId={c.id} mob={mob} />}
            {activeTab === 'packages' && <PackagesTab key="pk-tab" mob={mob} />}
         </AnimatePresence>
      </div>
      <Modal open={showCollab} title={'Enquire with ' + c.name} onClose={() => setShowCollab(false)}>
        <div style={{ padding: '10px' }}>
           <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Brief will be verified by CreatorBharat Elite Team.</p>
           <Fld label="Project Brief" value={collabMsg} onChange={e => setCollabMsg(e.target.value)} rows={4} placeholder="e.g. Need 2 Reels for our new launch in Indore..." />
           <Btn full lg style={{ marginTop: '20px', borderRadius: '100px' }} onClick={() => { dsp({ t: 'TOAST', d: { type: 'success', msg: 'Enquiry sent successfully!' } }); setShowCollab(false); }}>SEND PROPOSAL</Btn>
        </div>
      </Modal>
    </div>
  );
}
