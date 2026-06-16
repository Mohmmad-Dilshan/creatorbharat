import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS, fmt } from '../../utils/helpers';
import { Btn, Card, Fld, Bdg, Ring, Bar } from '../../components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Globe, Camera, CheckCircle2, ChevronRight, Sparkles,
  BookOpen, Layers, MapPin, Plus, Trash2, Loader2, ExternalLink,
  Shield, Megaphone, Lock, Link2, Phone, MessageCircle, Star,
  AtSign, Video, MessageSquare
} from 'lucide-react';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';
import { updateCreatorProfile } from '../../utils/platformService';

// ─── Step Nav Item ──────────────────────────────────────────────────────────
const StepNavItem = ({ id, label, icon: Icon, active, completed, onClick }) => (
  <button
    onClick={onClick}
    className={`step-nav-item ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
    style={{ position: 'relative' }}
  >
    <div className="step-nav-icon-box">
       {completed && !active ? <CheckCircle2 size={18} /> : <Icon size={18} />}
    </div>
    <span className="step-nav-label">{label}</span>
    {active && <ChevronRight size={16} className="active-chevron" style={{ opacity: 0.5, color: '#FFF' }} />}
  </button>
);

StepNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

// ─── Pro Lock Overlay ────────────────────────────────────────────────────────
const ProLockBanner = ({ onUpgrade }) => (
  <div style={{
    background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
    border: '1.5px solid rgba(255,148,49,0.3)',
    borderRadius: 16,
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 16
  }}>
    <div style={{ background: 'rgba(255,148,49,0.15)', borderRadius: 10, padding: 8 }}>
      <Lock size={18} color="#FF9431" />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 13, fontWeight: 900, color: '#92400e', marginBottom: 2 }}>Pro Feature</p>
      <p style={{ fontSize: 12, color: '#b45309', margin: 0 }}>Unlimited social links — upgrade to Pro (₹49/month)</p>
    </div>
    <button
      onClick={onUpgrade}
      style={{
        background: 'linear-gradient(90deg, #FF9431, #EA580C)',
        color: '#fff', border: 'none', borderRadius: 100,
        padding: '8px 16px', fontSize: 12, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap'
      }}
    >
      Upgrade ↗
    </button>
  </div>
);

ProLockBanner.propTypes = {
  onUpgrade: PropTypes.func.isRequired
};

const PLATFORM_OPTIONS = ['Instagram', 'YouTube', 'LinkedIn', 'Twitter / X', 'Telegram', 'WhatsApp', 'Threads', 'Moj', 'ShareChat', 'Josh', 'Snapchat', 'Facebook', 'Pinterest', 'Twitch', 'Spotify', 'Discord', 'Reddit', 'GitHub', 'Behance', 'Dribbble', 'Medium', 'Website'];
const PLATFORM_EMOJI = {
  'Instagram': '📸', 'YouTube': '▶️', 'LinkedIn': '💼', 'Twitter / X': '𝕏',
  'Telegram': '✈️', 'WhatsApp': '💬', 'Threads': '🧵', 'Moj': '🎵',
  'ShareChat': '💬', 'Josh': '🎥', 'Snapchat': '👻', 'Facebook': '👥',
  'Pinterest': '📌', 'Twitch': '🎮', 'Spotify': '🎧', 'Discord': '👾',
  'Reddit': '🤖', 'GitHub': '💻', 'Behance': '🎨', 'Dribbble': '🏀',
  'Medium': '📝', 'Website': '🌐'
};
const PLATFORM_ICONS = {
  'Instagram': Link2, 'YouTube': Link2, 'Twitter / X': Link2,
  'LinkedIn': Link2, 'Website': Link2
};


// ─── Tab 1: Identity ──────────────────────────────────────────────────────────
const IdentityTabContent = ({ F, c, st, mob, upF, saveProfile, saving }) => (
  <Card className="settings-form-card card-3d-effect">
     <h3 className="db-section-title">Step 1: Personal Identity</h3>
     
     <div className="profile-visual-box">
        <div className="avatar-preview-wrap">
           <img src={F.photo || c?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}`} alt="" />
        </div>
        <div className="visual-actions">
           <input type="file" id="creator-photo-upload" accept="image/jpeg,image/png,image/webp"
             style={{ display: 'none' }}
             onChange={(e) => {
               const file = e.target.files?.[0];
               if (!file) return;
               if (file.size > 2 * 1024 * 1024) { alert('Image 2MB se badi nahi honi chahiye'); return; }
               const reader = new FileReader();
               reader.onload = (ev) => upF('photo', ev.target.result);
               reader.readAsDataURL(file);
             }}
           />
           <button className="btn-primary-pill" onClick={() => document.getElementById('creator-photo-upload').click()}>
              <Camera size={14} /> Update Photo
           </button>
           <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 600 }}>JPEG/PNG up to 2MB</p>
        </div>
     </div>

     <div className="form-stack">
        <Fld label="Full Name" value={F.name} onChange={e => upF('name', e.target.value)} placeholder="Amit Sharma" />
        <div style={{ position: 'relative' }}>
           <Fld label="Cinematic Bio (150 chars)" value={F.bio} onChange={e => upF('bio', e.target.value.slice(0, 150))} rows={4} placeholder="I create high-impact tech reviews for regional India..." />
           <span style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 11, color: (F.bio?.length || 0) >= 150 ? '#EF4444' : '#94a3b8', fontWeight: 600 }}>{F.bio?.length || 0}/150</span>
        </div>
        <Fld label="Professional Tagline / Headline (e.g. Gym Creator, YouTube Vlogger, Food Storyteller)" value={F.tagline} onChange={e => upF('tagline', e.target.value)} placeholder="Expert in FoodCulture Storytelling | Building authentic brand identities across Bharat." />
        <Fld label="Full Address (Real Address)" value={F.address} onChange={e => upF('address', e.target.value)} placeholder="123 Street Name, Neighborhood, District, Jaipur, Rajasthan, 302001" />
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr 1fr', gap: '24px' }}>
           <Fld label="Base City" value={F.city} onChange={e => upF('city', e.target.value)} placeholder="Jaipur" />
           <Fld label="State / Region" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
           <Fld label="Connections / Reach count (e.g. 500+)" value={F.connections} onChange={e => upF('connections', e.target.value)} placeholder="500+ connections" />
        </div>
        
        <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Content Philosophy & Brand-Fit Intel</p>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
              <Fld label="Content Philosophy Heading (e.g. My Content Vision)" value={F.philosophyTitle} onChange={e => upF('philosophyTitle', e.target.value)} placeholder="My Content Philosophy (The 'Why')" />
              <Fld label="Regional Dominance Heading (e.g. Heartland Core Reach)" value={F.dominanceTitle} onChange={e => upF('dominanceTitle', e.target.value)} placeholder="My Regional Dominance" />
           </div>
           <Fld label="Mera Content Philosophy (The 'Why')" value={F.philosophy} onChange={e => upF('philosophy', e.target.value)} rows={3} placeholder="Content creation isn't just about demonstrating silicon specifications..." />
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginTop: '16px' }}>
              <Fld label="AI Brand-Fit Match %" value={F.aiMatch} onChange={e => upF('aiMatch', e.target.value)} placeholder="98%" />
              <Fld label="Why You Fit Brands" value={F.aiSummary} onChange={e => upF('aiSummary', e.target.value)} placeholder="Vibrant Cinematic Editing, High Conversion ROI" />
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
              <Fld label="Brand Safety" value={F.aiSafety} onChange={e => upF('aiSafety', e.target.value)} placeholder="99% Secure" />
              <Fld label="Retention Score" value={F.aiRetention} onChange={e => upF('aiRetention', e.target.value)} placeholder="Excellent" />
              <Fld label="ROI Potential" value={F.aiRoi} onChange={e => upF('aiRoi', e.target.value)} placeholder="5.2x" />
           </div>
        </div>
     </div>

     <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
        <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px', display: 'flex', gap: 8 }} onClick={saveProfile} disabled={saving}>
           {saving ? <Loader2 className="spin" size={18} /> : 'Save Identity →'}
        </Btn>
     </div>
  </Card>
);

IdentityTabContent.propTypes = {
  F: PropTypes.object.isRequired, c: PropTypes.object.isRequired, st: PropTypes.object.isRequired,
  mob: PropTypes.bool.isRequired, upF: PropTypes.func.isRequired, saveProfile: PropTypes.func.isRequired, saving: PropTypes.bool
};

// ─── Tab 2: Social Ecosystem ──────────────────────────────────────────────────
const SocialTabContent = ({ F, mob, upF, upGallery, upSocialLink, addSocialLink, removeSocialLink, saveProfile, setTab, isPro, navigate }) => {
  const freeLimit = 3;
  const linksUsed = F.socialLinks?.filter(l => l.url).length || 0;

  const instagramFollowersInt = parseInt(F.instagramFollowers) || 0;
  const youtubeFollowersInt = parseInt(F.youtubeFollowers) || 0;
  const linkedinFollowersInt = parseInt(F.linkedinFollowers) || 0;
  const twitterFollowersInt = parseInt(F.twitterFollowers) || 0;
  const facebookFollowersInt = parseInt(F.facebookFollowers) || 0;
  const customFollowersSum = F.socialLinks?.filter(l => l.url).reduce((sum, l) => sum + (parseInt(l.followers) || 0), 0) || 0;
  const currentTotalReach = instagramFollowersInt + youtubeFollowersInt + linkedinFollowersInt + twitterFollowersInt + facebookFollowersInt + customFollowersSum;

  return (
    <Card className="settings-form-card card-3d-effect">
       <h3 className="db-section-title">Step 2: Social Ecosystem & Gallery</h3>
       <p className="db-sub-text" style={{ marginBottom: 40 }}>Link your active social channels, add extra links, and showcase your visual gallery.</p>
       
      <div className="form-stack">
         {/* Primary Platforms */}
         <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Primary Platforms & Handles</p>
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <Fld label="Instagram Profile Handle" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@username" />
              <Fld label="Instagram Followers" type="number" value={F.instagramFollowers} onChange={e => upF('instagramFollowers', e.target.value)} placeholder="e.g. 50000" style={{ marginTop: '8px' }} />
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <Fld label="YouTube Channel Link" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="https://youtube.com/c/..." />
              <Fld label="YouTube Subscribers" type="number" value={F.youtubeFollowers} onChange={e => upF('youtubeFollowers', e.target.value)} placeholder="e.g. 120000" style={{ marginTop: '8px' }} />
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <Fld label="LinkedIn Profile URL" value={F.linkedin} onChange={e => upF('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
              <Fld label="LinkedIn Followers" type="number" value={F.linkedinFollowers} onChange={e => upF('linkedinFollowers', e.target.value)} placeholder="e.g. 15000" style={{ marginTop: '8px' }} />
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <Fld label="Twitter / X Profile URL" value={F.twitter} onChange={e => upF('twitter', e.target.value)} placeholder="https://twitter.com/username" />
              <Fld label="Twitter / X Followers" type="number" value={F.twitterFollowers} onChange={e => upF('twitterFollowers', e.target.value)} placeholder="e.g. 25000" style={{ marginTop: '8px' }} />
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <Fld label="Facebook Profile URL" value={F.facebook} onChange={e => upF('facebook', e.target.value)} placeholder="https://facebook.com/username" />
              <Fld label="Facebook Followers" type="number" value={F.facebookFollowers} onChange={e => upF('facebookFollowers', e.target.value)} placeholder="e.g. 8000" style={{ marginTop: '8px' }} />
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center' }}>
              <Fld label="Portfolio / Website URL" value={F.portfolio} onChange={e => upF('portfolio', e.target.value)} placeholder="https://mywork.com" style={{ width: '100%' }} />
            </div>
         </div>

          {/* Additional Social Links — Subscription Gated */}
          <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 32 }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', margin: 0 }}>
                    Additional Social Links
                  </p>
                  <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0', fontWeight: 600 }}>
                    {isPro ? 'Unlimited links (Pro)' : `${linksUsed}/${freeLimit} links used (Free)`}
                  </p>
                </div>
                {(isPro || linksUsed < freeLimit) && (
                  <button onClick={addSocialLink} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,148,49,0.1)', border: '1px solid rgba(255,148,49,0.3)',
                    color: '#FF9431', borderRadius: 100, padding: '8px 16px', fontSize: 12, fontWeight: 800, cursor: 'pointer'
                  }}>
                    <Plus size={14} /> Add Link
                  </button>
                )}
             </div>
             
             {F.socialLinks?.map((link, idx) => {
               const isLocked = !isPro && idx >= freeLimit;
               return (
                 <div key={idx} style={{ 
                   display: 'grid', 
                   gridTemplateColumns: mob ? '1fr' : '150px 1.8fr 1.2fr 44px', 
                   gap: 12, 
                   marginBottom: 12,
                   background: mob ? '#f8fafc' : 'transparent',
                   padding: mob ? '16px' : '0',
                   borderRadius: mob ? '16px' : '0',
                   border: mob ? '1px solid #e2e8f0' : 'none'
                 }}>
                   <select
                     value={link.platform}
                     onChange={e => upSocialLink(idx, 'platform', e.target.value)}
                     disabled={isLocked}
                     style={{
                       padding: '10px 12px', borderRadius: 12, border: '1px solid #e2e8f0',
                       fontSize: 13, fontWeight: 700, color: '#0f172a', background: isLocked ? '#f8fafc' : '#fff',
                       cursor: isLocked ? 'not-allowed' : 'pointer', height: '42px'
                     }}
                   >
                     {PLATFORM_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                   </select>
                   <div style={{ position: 'relative' }}>
                     <input
                       type="text"
                       value={link.url}
                       onChange={e => upSocialLink(idx, 'url', e.target.value)}
                       placeholder="https://..."
                       disabled={isLocked}
                       style={{
                         width: '100%', padding: '10px 12px', borderRadius: 12,
                         border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 600,
                         color: '#0f172a', background: isLocked ? '#f8fafc' : '#fff',
                         boxSizing: 'border-box', cursor: isLocked ? 'not-allowed' : 'text', height: '42px'
                       }}
                     />
                     {isLocked && (
                       <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
                         <Lock size={14} color="#FF9431" />
                       </div>
                     )}
                   </div>
                   <div>
                     <input
                       type="number"
                       value={link.followers || ''}
                       onChange={e => upSocialLink(idx, 'followers', e.target.value)}
                       placeholder="Followers"
                       disabled={isLocked}
                       style={{
                         width: '100%', padding: '10px 12px', borderRadius: 12,
                         border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 600,
                         color: '#0f172a', background: isLocked ? '#f8fafc' : '#fff',
                         boxSizing: 'border-box', cursor: isLocked ? 'not-allowed' : 'text', height: '42px'
                       }}
                     />
                   </div>
                   <button onClick={() => removeSocialLink(idx)} style={{
                     background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)',
                     borderRadius: 12, color: '#EF4444', cursor: 'pointer', display: 'flex',
                     alignItems: 'center', justifyContent: 'center', flexShrink: 0, height: '42px', width: '100%'
                   }}>
                     <Trash2 size={14} />
                   </button>
                 </div>
               );
             })}

             {!isPro && linksUsed >= freeLimit && (
               <ProLockBanner onUpgrade={() => navigate('/creator/monetization')} />
             )}
          </div>

          {/* Dynamic dynamic calculated reach card */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: 24,
            padding: '24px',
            marginTop: 32,
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: mob ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: mob ? 'flex-start' : 'center',
            gap: 16,
            boxShadow: '0 20px 40px rgba(15,23,42,0.15)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Sparkles size={16} color="#FF9431" fill="#FF9431" />
                <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#FF9431' }}>Dynamically Calculated Reach</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 600 }}>Your profile's verified aggregate audience count across all platforms.</p>
            </div>
            <div style={{ textAlign: mob ? 'left' : 'right' }}>
              <p style={{ fontSize: '32px', fontWeight: 950, color: '#FFF', margin: 0, letterSpacing: '-0.02em' }}>{fmt.num(currentTotalReach)}</p>
              <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>TOTAL FOLLOWER REACH</span>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 32 }}>
             <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Contact Details (Visible to Verified Brands Only)</p>
             <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                <Fld label="WhatsApp / Phone" value={F.contactPhone} onChange={e => upF('contactPhone', e.target.value)} placeholder="+91 98765 43210" />
                <div>
                  <label style={{ fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>Preferred Contact Method</label>
                  <select value={F.contactMethod} onChange={e => upF('contactMethod', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="platform">Platform Messages</option>
                    <option value="instagram">Instagram DM</option>
                  </select>
                </div>
             </div>
          </div>

          {/* Gallery */}
          <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 32 }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
               <div>
                 <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', margin: 0 }}>Gallery Portfolio Images</p>
                 <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0', fontWeight: 600 }}>
                   {isPro ? 'Unlimited (Pro) — Add image URLs' : 'Up to 4 images (Free) — Upgrade for unlimited'}
                 </p>
               </div>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                {(isPro ? [...F.gallery, '', '', ''].slice(0, Math.max(F.gallery.length + 1, 4)) : F.gallery).map((imgUrl, idx) => {
                  const isLocked = !isPro && idx >= 4;
                  return !isLocked ? (
                    <Fld 
                      key={idx}
                      label={`Gallery Image ${idx + 1}`} 
                      value={imgUrl} 
                      onChange={e => upGallery(idx, e.target.value)} 
                      placeholder="https://images.unsplash.com/..." 
                    />
                  ) : null;
                })}
             </div>
             {!isPro && (
               <div style={{ marginTop: 12, padding: '10px 16px', background: '#f8fafc', borderRadius: 12, border: '1px dashed #e2e8f0' }}>
                 <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontWeight: 600 }}>
                   🔒 Upgrade to Pro for unlimited gallery images (currently max 4)
                 </p>
               </div>
             )}
          </div>
       </div>

       <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setTab('identity')} className="btn-text-slate">← Previous</button>
          <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Social Hub →</Btn>
       </div>
    </Card>
  );
};

SocialTabContent.propTypes = {
  F: PropTypes.object.isRequired, mob: PropTypes.bool.isRequired, upF: PropTypes.func.isRequired,
  upGallery: PropTypes.func.isRequired, upSocialLink: PropTypes.func.isRequired,
  addSocialLink: PropTypes.func.isRequired, removeSocialLink: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired, setTab: PropTypes.func.isRequired,
  isPro: PropTypes.bool, navigate: PropTypes.func.isRequired
};

// ─── Tab 3: Story ─────────────────────────────────────────────────────────────
const StoryTabContent = ({ F, mob, upF, upAward, upCollab, upMilestone, saveProfile, setTab }) => (
  <Card className="settings-form-card card-3d-effect">
     <h3 className="db-section-title">Step 3: Journey Milestones & Bio</h3>
     <p className="db-sub-text" style={{ marginBottom: 40 }}>Write your rich biography and declare historical milestones to construct your My Story tab.</p>
     
     <div className="form-stack">
        <Fld label="Biography Intro Paragraph" value={F.storyP1} onChange={e => upF('storyP1', e.target.value)} rows={3} placeholder="Mera safar Hapur ki galiyon se shuru hua jahan..." />
        <Fld label="Featured Dynamic Quote" value={F.storyQuote} onChange={e => upF('storyQuote', e.target.value)} placeholder="Content is a connection that touches hearts." />
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
           <Fld label="Biography Middle Paragraph" value={F.storyP2} onChange={e => upF('storyP2', e.target.value)} rows={3} placeholder="Shuruat mein mere paas sirf ek camera aur sapna tha..." />
           <Fld label="Biography Conclusion Paragraph" value={F.storyP3} onChange={e => upF('storyP3', e.target.value)} rows={3} placeholder="Aaj scale karte hue, Bharat ki regional voice banana agla aim hai..." />
        </div>

        {/* Awards */}
        <div style={{ marginTop: 32 }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>🏆 Key Achievements & Awards (Up to 3)</p>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {['award-1', 'award-2', 'award-3'].map((awardKey, idx) => {
                const award = F.awards[idx] || { t: '', o: '', y: '', img: '', link: '' };
                return (
                  <div key={awardKey} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                     <Fld label={`Award Title ${idx + 1}`} value={award.t} onChange={e => upAward(idx, 't', e.target.value)} placeholder="Youth Icon Award" />
                     <Fld label="Issuer Organization" value={award.o} onChange={e => upAward(idx, 'o', e.target.value)} placeholder="Govt of Rajasthan" style={{ marginTop: 8 }} />
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 8 }}>
                       <Fld label="Year" value={award.y} onChange={e => upAward(idx, 'y', e.target.value)} placeholder="2024" />
                       <Fld label="Verification Link" value={award.link || ''} onChange={e => upAward(idx, 'link', e.target.value)} placeholder="https://awards.org/verify" />
                     </div>
                     <Fld label="Award / Certificate Image URL" value={award.img || ''} onChange={e => upAward(idx, 'img', e.target.value)} placeholder="https://images.unsplash.com/..." style={{ marginTop: 8 }} />
                  </div>
                );
              })}
           </div>
        </div>

        {/* Collabs */}
        <div style={{ marginTop: 32 }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>🤝 Elite Partnerships & Collaborations (Up to 3)</p>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {['collab-1', 'collab-2', 'collab-3'].map((collabKey, idx) => {
                const collab = F.collabs[idx] || { p: '', l: '', d: '', brandLink: '', videoLink: '', img: '', metric: '' };
                return (
                  <div key={collabKey} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                     <Fld label={`Partner Name ${idx + 1}`} value={collab.p} onChange={e => upCollab(idx, 'p', e.target.value)} placeholder="Rajasthan Tourism Govt" />
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 8 }}>
                       <Fld label="Collab Type" value={collab.l} onChange={e => upCollab(idx, 'l', e.target.value)} placeholder="Government Partner" />
                       <Fld label="Highlight Metric" value={collab.metric || ''} onChange={e => upCollab(idx, 'metric', e.target.value)} placeholder="3.2M Reach" />
                     </div>
                     <Fld label="Description" value={collab.d} onChange={e => upCollab(idx, 'd', e.target.value)} placeholder="Official campaign promoting local heritage." style={{ marginTop: 8 }} />
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 8 }}>
                       <Fld label="Brand Website Link" value={collab.brandLink || ''} onChange={e => upCollab(idx, 'brandLink', e.target.value)} placeholder="https://brand.com" />
                       <Fld label="Campaign Video URL" value={collab.videoLink || ''} onChange={e => upCollab(idx, 'videoLink', e.target.value)} placeholder="https://youtube.com/..." />
                     </div>
                     <Fld label="Campaign Image URL" value={collab.img || ''} onChange={e => upCollab(idx, 'img', e.target.value)} placeholder="https://images.unsplash.com/..." style={{ marginTop: 8 }} />
                  </div>
                );
              })}
           </div>
        </div>

        {/* Timeline Milestones */}
        <div style={{ marginTop: 32 }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>📅 Creator Journey Timeline (4 Milestones)</p>
           {F.milestones.map((m, idx) => (
              <div key={m.id} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9', marginBottom: 16 }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16, marginBottom: 12 }}>
                    <Fld label="Year" value={m.y} onChange={e => upMilestone(idx, 'y', e.target.value)} placeholder="2022" />
                    <Fld label="Chapter Title" value={m.t} onChange={e => upMilestone(idx, 't', e.target.value)} placeholder="First Viral Short" />
                 </div>
                 <Fld label="Chapter Details" value={m.d} onChange={e => upMilestone(idx, 'd', e.target.value)} placeholder="Crossed 100K views by highlighting regional monuments..." style={{ marginBottom: 12 }} />
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <Fld label="Category Tag (e.g. Launch, Collab)" value={m.category || ''} onChange={e => upMilestone(idx, 'category', e.target.value)} placeholder="Growth" />
                    <Fld label="Highlight Metric (e.g. 500K Subs)" value={m.metric || ''} onChange={e => upMilestone(idx, 'metric', e.target.value)} placeholder="500K Views" />
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 12 }}>
                    <Fld label="Thumbnail Image URL" value={m.img || ''} onChange={e => upMilestone(idx, 'img', e.target.value)} placeholder="https://images.unsplash.com/..." />
                    <Fld label="Verification Link" value={m.link || ''} onChange={e => upMilestone(idx, 'link', e.target.value)} placeholder="https://youtube.com/watch?..." />
                 </div>
              </div>
           ))}
        </div>
     </div>

     <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setTab('social')} className="btn-text-slate">← Previous</button>
        <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Journey →</Btn>
     </div>
  </Card>
);

StoryTabContent.propTypes = {
  F: PropTypes.object.isRequired, mob: PropTypes.bool.isRequired, upF: PropTypes.func.isRequired,
  upAward: PropTypes.func.isRequired, upCollab: PropTypes.func.isRequired, upMilestone: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired, setTab: PropTypes.func.isRequired
};

// ─── Tab 4: Packages ──────────────────────────────────────────────────────────
const PackagesTabContent = ({ F, mob, upF, upService, upViralContent, upCaseStudy, saveProfile, setTab }) => (
  <Card className="settings-form-card card-3d-effect">
     <h3 className="db-section-title">Step 4: Commercial Deliverables & Pro Work</h3>
     <p className="db-sub-text" style={{ marginBottom: 40 }}>Define your rate range, service packages, viral hits, and case studies for brand discovery.</p>
     
     <div className="form-stack">
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: 24 }}>
           <Fld label="Reel Minimum Rate (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="8,000" />
           <Fld label="Reel Maximum Rate (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="25,000" />
        </div>

        {/* Services */}
        <div>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>⚡ Service Packages (3 Tiers)</p>
           {F.services.map((s, idx) => (
              <div key={s.id} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9', marginBottom: 16 }}>
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 150px', gap: 16, marginBottom: 12 }}>
                    <Fld label="Package Title" value={s.t} onChange={e => upService(idx, 't', e.target.value)} placeholder="Cinematic Storytelling" />
                    <Fld label="Rate (₹)" type="number" value={s.rate} onChange={e => upService(idx, 'rate', e.target.value)} placeholder="12000" />
                 </div>
                 <Fld label="Package Description & Inclusions" value={s.d} onChange={e => upService(idx, 'd', e.target.value)} placeholder="4K dynamic reel editing, color grading, and native scripting." />
              </div>
           ))}
        </div>

        {/* Viral Content */}
        <div style={{ marginTop: 32 }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>🔥 Viral Content Hits (Up to 3)</p>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {['viral-1', 'viral-2', 'viral-3'].map((viralKey, idx) => {
                const viral = F.viralContent[idx] || { views: '', img: '', title: '', link: '' };
                return (
                  <div key={viralKey} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                     <Fld label={`Video ${idx + 1} Views`} value={viral.views} onChange={e => upViralContent(idx, 'views', e.target.value)} placeholder="1.2M" />
                     <Fld label="Video Title / Topic" value={viral.title || ''} onChange={e => upViralContent(idx, 'title', e.target.value)} placeholder="BMW X5 Review" style={{ marginTop: 8 }} />
                     <Fld label="Video Link / Proof" value={viral.link || ''} onChange={e => upViralContent(idx, 'link', e.target.value)} placeholder="https://youtube.com/watch?..." style={{ marginTop: 8 }} />
                     <Fld label="Cover Image URL" value={viral.img || ''} onChange={e => upViralContent(idx, 'img', e.target.value)} placeholder="https://images.unsplash.com/..." style={{ marginTop: 8 }} />
                  </div>
                );
              })}
           </div>
        </div>

        {/* Case Studies */}
        <div style={{ marginTop: 32 }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>📊 Brand Case Studies (Up to 3)</p>
           {F.caseStudies.map((cs, idx) => (
              <div key={cs.id} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9', marginBottom: 16 }}>
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 12 }}>
                    <Fld label="Campaign Title" value={cs.title} onChange={e => upCaseStudy(idx, 'title', e.target.value)} placeholder="Jaipur Heritage Launch" />
                    <Fld label="Brand Name" value={cs.brand} onChange={e => upCaseStudy(idx, 'brand', e.target.value)} placeholder="OYO Rooms" />
                 </div>
                 <Fld label="Campaign Brief Description" value={cs.desc || ''} onChange={e => upCaseStudy(idx, 'desc', e.target.value)} placeholder="Promoted heritage homestays to urban young travelers via visual Reels..." style={{ marginBottom: 12 }} />
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 12 }}>
                    <Fld label="Campaign Verification Link" value={cs.link || ''} onChange={e => upCaseStudy(idx, 'link', e.target.value)} placeholder="https://youtube.com/..." />
                    <Fld label="Cover/Thumbnail Image URL" value={cs.img || ''} onChange={e => upCaseStudy(idx, 'img', e.target.value)} placeholder="https://images.unsplash.com/..." />
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(4, 1fr)', gap: 12 }}>
                    <Fld label="Metric 1 Label" value={cs.r1_label} onChange={e => upCaseStudy(idx, 'r1_label', e.target.value)} placeholder="Reach" />
                    <Fld label="Metric 1 Value" value={cs.r1_val} onChange={e => upCaseStudy(idx, 'r1_val', e.target.value)} placeholder="2.1M" />
                    <Fld label="Metric 2 Label" value={cs.r2_label} onChange={e => upCaseStudy(idx, 'r2_label', e.target.value)} placeholder="ROI" />
                    <Fld label="Metric 2 Value" value={cs.r2_val} onChange={e => upCaseStudy(idx, 'r2_val', e.target.value)} placeholder="4.2x" />
                 </div>
              </div>
           ))}
        </div>
     </div>

     <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setTab('story')} className="btn-text-slate">← Previous</button>
        <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Deliverables →</Btn>
     </div>
  </Card>
);

PackagesTabContent.propTypes = {
  F: PropTypes.object.isRequired, mob: PropTypes.bool.isRequired, upF: PropTypes.func.isRequired,
  upService: PropTypes.func.isRequired, upViralContent: PropTypes.func.isRequired,
  upCaseStudy: PropTypes.func.isRequired, saveProfile: PropTypes.func.isRequired, setTab: PropTypes.func.isRequired
};

// ─── Tab 5: Local Hub ─────────────────────────────────────────────────────────
const LocalTabContent = ({ F, mob, upF, upLocalHub, saveProfile, setTab }) => (
  <Card className="settings-form-card card-3d-effect">
     <h3 className="db-section-title">Step 5: Local Collab Hub</h3>
     <p className="db-sub-text" style={{ marginBottom: 40 }}>Define your regional reach and attract hyper-local sponsorships from Tier-2 city brands.</p>
     
     <div className="form-stack">
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: 24 }}>
           <Fld label="Local Initiative Heading (e.g. Vocal for Local / Store Visits)" value={F.localTitle} onChange={e => upF('localTitle', e.target.value)} placeholder="Supporting Local Businesses & Homegrown Brands" />
           <Fld label="Impact Hubs Section Heading (e.g. My Active Regional Hubs)" value={F.localHubsTitle} onChange={e => upF('localHubsTitle', e.target.value)} placeholder="My Hyper-Local Impact Hub" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: 24 }}>
           <Fld label="Regional Dialects / Languages" value={F.regionalDialects} onChange={e => upF('regionalDialects', e.target.value)} placeholder="Bhojpuri, Marwari, Hinglish" />
           <Fld label="Local Market Penetration %" value={F.localPenetration} onChange={e => upF('localPenetration', e.target.value)} placeholder="85%" />
        </div>

        <Fld label="Vocal for Local / Regional Voice Statement" value={F.localVoice} onChange={e => upF('localVoice', e.target.value)} rows={3} placeholder="Main local brands aur startups ko support karne ke liye hamesha ready hoon..." />

        <div style={{ marginTop: 32 }}>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>📍 Active Local Hubs (Up to 3 Cities)</p>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {['hub-1', 'hub-2', 'hub-3'].map((hubKey, idx) => {
                const hub = F.localHubs[idx] || { l: '', v: '' };
                const placeholders = [['Indore', '85%'], ['Bhopal', '72%'], ['Ujjain', '64%']];
                return (
                  <div key={hubKey} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                     <Fld label={`Hub City ${idx + 1}`} value={hub.l} onChange={e => upLocalHub(idx, 'l', e.target.value)} placeholder={placeholders[idx][0]} />
                     <Fld label="Hub Reach %" value={hub.v} onChange={e => upLocalHub(idx, 'v', e.target.value)} placeholder={placeholders[idx][1]} style={{ marginTop: 8 }} />
                  </div>
                );
              })}
           </div>
        </div>
     </div>

     <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setTab('packages')} className="btn-text-slate">← Previous</button>
        <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Local Hub →</Btn>
     </div>
  </Card>
);

LocalTabContent.propTypes = {
  F: PropTypes.object.isRequired, mob: PropTypes.bool.isRequired, upF: PropTypes.func.isRequired,
  upLocalHub: PropTypes.func.isRequired, saveProfile: PropTypes.func.isRequired, setTab: PropTypes.func.isRequired
};

// ─── Tab 6: Sponsored Posts ───────────────────────────────────────────────────
const SponsoredTabContent = ({ F, mob, upSponsoredPost, saveProfile, setTab }) => {
  const PLATFORM_OPTS = ['Instagram', 'YouTube', 'Twitter / X', 'Threads', 'Snapchat', 'Other'];
  
  return (
    <Card className="settings-form-card card-3d-effect">
       <h3 className="db-section-title">Step 6: Sponsored Posts & Brand Work</h3>
       <p className="db-sub-text" style={{ marginBottom: 40 }}>
         Showcase your past sponsored collaborations. This data populates the "Sponsored" tab on your public profile and helps brands see your track record.
       </p>

       {/* Info Banner */}
       <div style={{ background: 'linear-gradient(135deg, rgba(255,148,49,0.08) 0%, rgba(234,88,12,0.05) 100%)', border: '1px solid rgba(255,148,49,0.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 32, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
         <Megaphone size={20} color="#FF9431" style={{ flexShrink: 0, marginTop: 2 }} />
         <div>
           <p style={{ fontSize: 13, fontWeight: 900, color: '#92400e', margin: '0 0 4px' }}>Why this matters?</p>
           <p style={{ fontSize: 12, color: '#b45309', margin: 0, lineHeight: 1.6 }}>
             Brands specifically look for past sponsored work before hiring. A filled Sponsored tab increases your profile views by <strong>3.2x</strong> and deal conversion by <strong>67%</strong>.
           </p>
         </div>
       </div>

       <div className="form-stack">
          {F.sponsoredPosts.map((post, idx) => (
            <div key={idx} style={{ padding: 24, background: '#f8fafc', borderRadius: 20, border: '1px solid #f1f5f9', marginBottom: 20 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                 <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #FF9431, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Megaphone size={16} color="#fff" />
                 </div>
                 <p style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', margin: 0 }}>Sponsored Post #{idx + 1}</p>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Fld label="Brand Name" value={post.brand} onChange={e => upSponsoredPost(idx, 'brand', e.target.value)} placeholder="OYO Rooms" />
                  <Fld label="Campaign Title" value={post.campaign} onChange={e => upSponsoredPost(idx, 'campaign', e.target.value)} placeholder="Jaipur Heritage Launch 2024" />
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '160px 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>Platform</label>
                    <select value={post.platform} onChange={e => upSponsoredPost(idx, 'platform', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                      {PLATFORM_OPTS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <Fld label="Post URL (optional)" value={post.postUrl} onChange={e => upSponsoredPost(idx, 'postUrl', e.target.value)} placeholder="https://instagram.com/p/..." />
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                  <Fld label="Reach / Views" value={post.reach} onChange={e => upSponsoredPost(idx, 'reach', e.target.value)} placeholder="2.1M views" />
                  <Fld label="Engagement Rate" value={post.engagement} onChange={e => upSponsoredPost(idx, 'engagement', e.target.value)} placeholder="8.4%" />
                  <Fld label="Campaign Month" value={post.month} onChange={e => upSponsoredPost(idx, 'month', e.target.value)} placeholder="March 2024" />
               </div>
               
               <Fld label="Campaign Thumbnail Image URL" value={post.thumbnail} onChange={e => upSponsoredPost(idx, 'thumbnail', e.target.value)} placeholder="https://images.unsplash.com/..." />
            </div>
          ))}
       </div>

       {/* Completion Tip */}
       <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '16px 20px', marginTop: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
         <CheckCircle2 size={18} color="#10B981" />
         <p style={{ fontSize: 12, color: '#065f46', margin: 0, fontWeight: 700 }}>
           Fill at least 1 sponsored post to unlock the "Sponsored" tab on your public profile and earn a <strong>+5 CB Score bonus</strong>!
         </p>
       </div>

       <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setTab('local')} className="btn-text-slate">← Previous</button>
          <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>
            🎉 Complete Profile & Go Live
          </Btn>
       </div>
    </Card>
  );
};

SponsoredTabContent.propTypes = {
  F: PropTypes.object.isRequired, mob: PropTypes.bool.isRequired,
  upSponsoredPost: PropTypes.func.isRequired, saveProfile: PropTypes.func.isRequired, setTab: PropTypes.func.isRequired
};

// ─── Completion Logic ──────────────────────────────────────────────────────────
const checkTabComplete = (tabName, F) => {
  if (tabName === 'identity')  return !!(F.name && F.bio);
  if (tabName === 'social')    return !!(F.instagram || F.youtube || F.gallery.some(Boolean));
  if (tabName === 'story')     return !!(F.storyP1 && F.milestones.some(m => m.t));
  if (tabName === 'packages')  return !!(F.rateMin && F.services.some(s => s.t));
  if (tabName === 'local')     return !!(F.localVoice || F.localHubs?.some(h => h.l));
  if (tabName === 'sponsored') return !!(F.sponsoredPosts?.some(p => p.brand));
  return true;
};

const getTabStyle = (tabId, currentTab) => ({
  flexShrink: 0, padding: '10px 16px', borderRadius: 100,
  border: tabId === currentTab ? '1px solid #FF9431' : '1px solid #e2e8f0',
  background: tabId === currentTab ? 'rgba(255,148,49,0.1)' : '#fff',
  color: tabId === currentTab ? '#FF9431' : '#64748b',
  fontSize: '13px', fontWeight: 800, cursor: 'pointer'
});

// ─── Sidebar Steps ─────────────────────────────────────────────────────────────
const SIDEBAR_STEPS = [
  { id: 'identity',  label: 'Basic Identity',      icon: User },
  { id: 'social',    label: 'Social & Links',       icon: Globe },
  { id: 'story',     label: 'Journey & Awards',     icon: BookOpen },
  { id: 'packages',  label: 'Services & Rates',     icon: Layers },
  { id: 'local',     label: 'Local Hub',            icon: MapPin },
  { id: 'sponsored', label: 'Sponsored Posts',      icon: Megaphone }
];

const MOBILE_TABS = [
  { id: 'identity',  label: 'Identity' },
  { id: 'social',    label: 'Socials' },
  { id: 'story',     label: 'Story' },
  { id: 'packages',  label: 'Packages' },
  { id: 'local',     label: 'Local Hub' },
  { id: 'sponsored', label: 'Sponsored' }
];

// ─── Settings Sidebar ──────────────────────────────────────────────────────────
const SettingsSidebar = ({ score, comp, tab, setTab, F }) => (
  <div className="db-col-left">
     <Card className="settings-sidebar-card">
        <div className="card-header-center">
           <p className="db-sidebar-label">Profile Strength</p>
           <div className="ring-container">
              <Ring score={score} size={140} strokeWidth={12} color="#FF9431" />
           </div>
           <Bdg color="saffron" lg>Elite Creator</Bdg>
        </div>

        <div className="progress-box">
           <div className="progress-labels">
              <span className="label">Completion</span>
              <span className="value">{comp.pct}%</span>
           </div>
           <Bar value={comp.pct} color="#FF9431" height={6} />
        </div>

        <div className="tasks-box" style={{ marginTop: 32 }}>
           {SIDEBAR_STEPS.map(step => (
              <StepNavItem 
                key={step.id} id={step.id} label={step.label}
                icon={step.icon} active={tab === step.id}
                completed={checkTabComplete(step.id, F)} onClick={() => setTab(step.id)}
              />
           ))}
        </div>
     </Card>

     <Card className="promo-card-dark" style={{ marginTop: 24, padding: 32, background: '#0F172A', color: '#FFF', borderRadius: 32 }}>
        <div className="promo-header" style={{ marginBottom: 16 }}>
           <Sparkles size={18} color="#FF9431" fill="#FF9431" />
           <span style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase' }}>Pro Checklist</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 16px' }}>
          Fill all 6 tabs including Sponsored Posts to unlock "Submit to Admin" and get <strong style={{ color: '#FF9431' }}>+15 CB Score bonus</strong>!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SIDEBAR_STEPS.map(step => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: checkTabComplete(step.id, F) ? '#10B981' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {checkTabComplete(step.id, F) && <CheckCircle2 size={10} color="#fff" />}
              </div>
              <span style={{ fontSize: 12, color: checkTabComplete(step.id, F) ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{step.label}</span>
            </div>
          ))}
        </div>
     </Card>
  </div>
);

SettingsSidebar.propTypes = {
  score: PropTypes.number.isRequired, comp: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired, setTab: PropTypes.func.isRequired, F: PropTypes.object.isRequired
};

// ─── Mobile Tab Selector ───────────────────────────────────────────────────────
const MobileTabSelector = ({ comp, tab, setTab, F }) => (
  <div className="settings-mobile-tabs-container" style={{ width: '100%', marginBottom: 20 }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Completion</span>
        <span style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431' }}>{comp.pct}%</span>
     </div>
     <Bar value={comp.pct} color="#FF9431" height={4} />

     <div className="settings-mobile-scroll-row" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 0 4px', scrollbarWidth: 'none' }}>
        {MOBILE_TABS.map(t => {
          const isCompleted = checkTabComplete(t.id, F);
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={getTabStyle(t.id, tab)}>
               {t.label} {isCompleted && '✓'}
            </button>
          );
        })}
     </div>
  </div>
);

MobileTabSelector.propTypes = {
  comp: PropTypes.object.isRequired, tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired, F: PropTypes.object.isRequired
};

// ─── Helper Functions ──────────────────────────────────────────────────────────
const getDefaultCreator = (st, allC) => 
  st.user?.creatorProfile || st.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {
    name: st.user?.name || '', email: st.user?.email || '', bio: '', city: st.user?.city || '', state: st.user?.state || '',
    instagram: '', youtube: '', rateMin: '', rateMax: '', portfolio: '',
    followers: 0, score: 85, gallery: [], full_story: { p1: '', quote: '', p2: '', p3: '' },
    milestones: [], services: [], awards: [], collabs: []
  };

const getDefaultSponsoredPosts = () => [
  { brand: '', campaign: '', platform: 'Instagram', postUrl: '', reach: '', engagement: '', month: '', thumbnail: '' },
  { brand: '', campaign: '', platform: 'YouTube', postUrl: '', reach: '', engagement: '', month: '', thumbnail: '' },
  { brand: '', campaign: '', platform: 'Instagram', postUrl: '', reach: '', engagement: '', month: '', thumbnail: '' },
  { brand: '', campaign: '', platform: 'Instagram', postUrl: '', reach: '', engagement: '', month: '', thumbnail: '' }
];

const getInitialFormState = (c) => {
  const localHubs = c?.local_impact_hubs?.length ? [...c.local_impact_hubs] : [
    { l: 'Indore', v: '85%' }, { l: 'Bhopal', v: '72%' }, { l: 'Ujjain', v: '64%' }
  ];
  const awards = c?.awards?.length ? [...c.awards] : [
    { t: '', o: '', y: '' },
    { t: '', o: '', y: '' },
    { t: '', o: '', y: '' }
  ];
  const collabs = (c?.collabs?.length ? c.collabs : [
    { p: '', l: '', d: '', brandLink: '', videoLink: '', img: '', metric: '' },
    { p: '', l: '', d: '', brandLink: '', videoLink: '', img: '', metric: '' },
    { p: '', l: '', d: '', brandLink: '', videoLink: '', img: '', metric: '' }
  ]).map((col, idx) => ({
    p: col.p || '',
    l: col.l || '',
    d: col.d || '',
    brandLink: col.brandLink || '',
    videoLink: col.videoLink || '',
    img: col.img || '',
    metric: col.metric || '',
    id: col.id || `collab-${idx}`
  }));
  const milestones = (c?.milestones?.length ? c.milestones : [
    { y: '', t: '', d: '', category: '', metric: '', img: '', link: '' }, 
    { y: '', t: '', d: '', category: '', metric: '', img: '', link: '' },
    { y: '', t: '', d: '', category: '', metric: '', img: '', link: '' }, 
    { y: '', t: '', d: '', category: '', metric: '', img: '', link: '' }
  ]).map((m, idx) => ({
    y: m.y || '',
    t: m.t || '',
    d: m.d || '',
    category: m.category || '',
    metric: m.metric || '',
    img: m.img || '',
    link: m.link || '',
    id: m.id || `milestone-${idx}`
  }));
  const services = (c?.services?.length ? c.services : [
    { t: 'Cinematic Reel', d: 'Brand integration in high-fidelity 4K video reel.', rate: '12000' },
    { t: 'Product Placement', d: 'Seamless product placement in community posts.', rate: '6000' },
    { t: 'Full YouTube Review', d: 'Dedicated 5-minute product breakdown.', rate: '25000' }
  ]).map((s, idx) => ({ ...s, id: s.id || `service-${idx}` }));
  const viralContent = (c?.viral_content?.length 
    ? c.viral_content.map(v => typeof v === 'object' ? { views: v.views || '', img: v.img || '', title: v.title || '', link: v.link || '' } : { views: `${v}M`, img: '', title: '', link: '' }) 
    : [{ views: '1.2M', img: '', title: '', link: '' }, { views: '3.5M', img: '', title: '', link: '' }, { views: '5.8M', img: '', title: '', link: '' }]
  ).map((v, idx) => ({ ...v, id: `viral-${idx}` }));
  const caseStudies = (c?.case_studies?.length ? c.case_studies.map(cs => ({
    title: cs.title || '', brand: cs.brand || '',
    desc: cs.desc || '', link: cs.link || '', img: cs.img || '',
    r1_label: cs.results?.[0]?.l || 'Reach', r1_val: cs.results?.[0]?.v || '',
    r2_label: cs.results?.[1]?.l || 'ROI', r2_val: cs.results?.[1]?.v || ''
  })) : [
    { title: '', brand: '', desc: '', link: '', img: '', r1_label: 'Reach', r1_val: '', r2_label: 'ROI', r2_val: '' },
    { title: '', brand: '', desc: '', link: '', img: '', r1_label: 'Sales', r1_val: '', r2_label: 'Clicks', r2_val: '' },
    { title: '', brand: '', desc: '', link: '', img: '', r1_label: 'Views', r1_val: '', r2_label: 'Shares', r2_val: '' }
  ]).map((cs, idx) => ({ ...cs, id: cs.id || `casestudy-${idx}` }));

  const socialLinks = (c?.social_links?.length ? c.social_links : []).map(link => ({
    platform: link.platform || 'Instagram',
    url: link.url || '',
    followers: link.followers || ''
  }));
  const sponsoredPosts = c?.sponsored_posts?.length ? c.sponsored_posts.map(p => ({
    brand: p.brand || '', campaign: p.campaign || '', platform: p.platform || 'Instagram',
    postUrl: p.postUrl || '', reach: p.reach || '', engagement: p.engagement || '',
    month: p.month || '', thumbnail: p.thumbnail || ''
  })) : getDefaultSponsoredPosts();

  return {
    name: c?.name || '', bio: c?.bio || '', city: c?.city || '', state: c?.state || '',
    photo: c?.photo || '', instagram: c?.instagram || '', youtube: c?.youtube || '',
    linkedin: c?.linkedin || '', twitter: c?.twitter || '', facebook: c?.facebook || '',
    instagramFollowers: c?.instagram_followers || c?.instagramFollowers || '',
    youtubeFollowers: c?.youtube_followers || c?.youtubeFollowers || '',
    linkedinFollowers: c?.linkedin_followers || c?.linkedinFollowers || '',
    twitterFollowers: c?.twitter_followers || c?.twitterFollowers || '',
    facebookFollowers: c?.facebook_followers || c?.facebookFollowers || '',
    rateMin: c?.rateMin || '', rateMax: c?.rateMax || '', portfolio: c?.portfolio || '',
    address: c?.address || '', tagline: c?.tagline || '', connections: c?.connections || '500+',
    gallery: [c?.gallery?.[0]||'', c?.gallery?.[1]||'', c?.gallery?.[2]||'', c?.gallery?.[3]||''],
    storyP1: c?.full_story?.p1 || '', storyQuote: c?.full_story?.quote || '',
    storyP2: c?.full_story?.p2 || '', storyP3: c?.full_story?.p3 || '',
    philosophy: c?.philosophy || '', aiMatch: c?.ai_intel?.match || '',
    aiSummary: c?.ai_intel?.summary || '', aiSafety: c?.ai_intel?.stats?.[0]?.v || '',
    aiRetention: c?.ai_intel?.stats?.[1]?.v || '', aiRoi: c?.ai_intel?.stats?.[2]?.v || '',
    localVoice: c?.local_voice || '', localPenetration: c?.local_penetration || '',
    regionalDialects: c?.regional_dialects || '', localHubs, awards, collabs, milestones,
    services, viralContent, caseStudies, socialLinks, sponsoredPosts,
    philosophyTitle: c?.philosophy_title || c?.philosophyTitle || '',
    dominanceTitle: c?.dominance_title || c?.dominanceTitle || '',
    localTitle: c?.local_title || c?.localTitle || '',
    localHubsTitle: c?.local_hubs_title || c?.localHubsTitle || '',
    contactPhone: c?.contact_phone || '', contactMethod: c?.contact_method || 'whatsapp'
  };
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProfileBuilderPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [tab, setTab] = useState('identity');
  const [saving, setSaving] = useState(false);

  const isPro = st.isPro || localStorage.getItem('cb_is_pro') === 'true';
  const allC = LS.get('cb_creators', []);
  const c = getDefaultCreator(st, allC);
  const [F, setF] = useState(() => getInitialFormState(c));

  useEffect(() => {
    if (c) {
      setF(p => ({
        ...getInitialFormState(c),
        socialLinks: c?.social_links?.length 
          ? c.social_links.map(link => ({ platform: link.platform || 'Instagram', url: link.url || '', followers: link.followers || '' })) 
          : p.socialLinks,
        sponsoredPosts: c?.sponsored_posts?.length ? c.sponsored_posts.map(sp => ({
          brand: sp.brand || '', campaign: sp.campaign || '', platform: sp.platform || 'Instagram',
          postUrl: sp.postUrl || '', reach: sp.reach || '', engagement: sp.engagement || '',
          month: sp.month || '', thumbnail: sp.thumbnail || ''
        })) : p.sponsoredPosts
      }));
    }
  }, [st.user?.creatorProfile]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // ── Update Helpers ──
  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const upGallery = (idx, val) => setF(p => { const copy = [...p.gallery]; copy[idx] = val; return { ...p, gallery: copy }; });
  const upMilestone = (idx, field, val) => setF(p => { const copy = [...p.milestones]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, milestones: copy }; });
  const upService = (idx, field, val) => setF(p => { const copy = [...p.services]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, services: copy }; });
  const upAward = (idx, field, val) => setF(p => { const copy = [...p.awards]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, awards: copy }; });
  const upCollab = (idx, field, val) => setF(p => { const copy = [...p.collabs]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, collabs: copy }; });
  const upLocalHub = (idx, field, val) => setF(p => { const copy = [...p.localHubs]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, localHubs: copy }; });
  const upViralContent = (idx, field, val) => setF(p => { const copy = [...p.viralContent]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, viralContent: copy }; });
  const upCaseStudy = (idx, field, val) => setF(p => { const copy = [...p.caseStudies]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, caseStudies: copy }; });
  const upSocialLink = (idx, field, val) => setF(p => { const copy = [...p.socialLinks]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, socialLinks: copy }; });
  const addSocialLink = () => setF(p => ({ ...p, socialLinks: [...p.socialLinks, { platform: 'Instagram', url: '', followers: '' }] }));
  const removeSocialLink = (idx) => setF(p => ({ ...p, socialLinks: p.socialLinks.filter((_, i) => i !== idx) }));
  const upSponsoredPost = (idx, field, val) => setF(p => { const copy = [...p.sponsoredPosts]; copy[idx] = { ...copy[idx], [field]: val }; return { ...p, sponsoredPosts: copy }; });

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  if (!st.user || st.role !== 'creator') return <AuthGatekeeper mob={mob} />;

  const saveProfile = async () => {
    setSaving(true);
    try {
      const filteredGallery = F.gallery.filter(Boolean);
      const filteredMilestones = F.milestones.filter(m => m.y && m.t).map(m => ({
        y: m.y, t: m.t, d: m.d,
        category: m.category || '', metric: m.metric || '', img: m.img || '', link: m.link || ''
      }));
      const filteredServices = F.services.filter(s => s.t && s.rate);
      const filteredAwards = F.awards.filter(a => a.t && a.y);
      const filteredCollabs = F.collabs.filter(col => col.p && col.l).map(col => ({
        p: col.p, l: col.l, d: col.d,
        brandLink: col.brandLink || '',
        videoLink: col.videoLink || '',
        img: col.img || '',
        metric: col.metric || ''
      }));
      const filteredLocalHubs = F.localHubs.filter(h => h.l && h.v);
      const filteredViral = F.viralContent.filter(v => v.views).map(v => ({
        views: v.views, img: v.img || '', title: v.title || '', link: v.link || ''
      }));
      const filteredSponsoredPosts = F.sponsoredPosts.filter(p => p.brand && p.campaign);
      
      const filteredSocialLinks = F.socialLinks.filter(l => l.url).map(l => ({
        platform: l.platform,
        url: l.url,
        followers: parseInt(l.followers) || 0
      }));

      const filteredCaseStudies = F.caseStudies.filter(cs => cs.title && cs.brand).map(cs => ({
        title: cs.title, brand: cs.brand,
        desc: cs.desc || '', link: cs.link || '', img: cs.img || '',
        results: [
          { l: cs.r1_label || 'Reach', v: cs.r1_val || 'N/A' },
          { l: cs.r2_label || 'ROI', v: cs.r2_val || 'N/A' }
        ]
      }));

      const instagramFollowersInt = parseInt(F.instagramFollowers) || 0;
      const youtubeFollowersInt = parseInt(F.youtubeFollowers) || 0;
      const linkedinFollowersInt = parseInt(F.linkedinFollowers) || 0;
      const twitterFollowersInt = parseInt(F.twitterFollowers) || 0;
      const facebookFollowersInt = parseInt(F.facebookFollowers) || 0;
      const customFollowersSum = filteredSocialLinks.reduce((sum, l) => sum + (l.followers || 0), 0);
      const totalReach = instagramFollowersInt + youtubeFollowersInt + linkedinFollowersInt + twitterFollowersInt + facebookFollowersInt + customFollowersSum;

      const updatedProfile = { 
        ...c, name: F.name, bio: F.bio, city: F.city, state: F.state,
        instagram: F.instagram, youtube: F.youtube, rateMin: F.rateMin, rateMax: F.rateMax,
        portfolio: F.portfolio, gallery: filteredGallery,
        address: F.address, tagline: F.tagline, connections: F.connections,
        facebook: F.facebook, linkedin: F.linkedin, twitter: F.twitter,
        instagramFollowers: instagramFollowersInt,
        youtubeFollowers: youtubeFollowersInt,
        linkedinFollowers: linkedinFollowersInt,
        twitterFollowers: twitterFollowersInt,
        facebookFollowers: facebookFollowersInt,
        instagram_followers: instagramFollowersInt,
        youtube_followers: youtubeFollowersInt,
        linkedin_followers: linkedinFollowersInt,
        twitter_followers: twitterFollowersInt,
        facebook_followers: facebookFollowersInt,
        followers: totalReach,
        photo: F.photo || c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(F.name || st.user.name)}`,
        fullStory: { p1: F.storyP1, quote: F.storyQuote, p2: F.storyP2, p3: F.storyP3 },
        awards: filteredAwards, collabs: filteredCollabs, milestones: filteredMilestones,
        services: filteredServices, viralContent: filteredViral, caseStudies: filteredCaseStudies,
        philosophy: F.philosophy,
        aiMatch: F.aiMatch,
        aiSummary: F.aiSummary,
        aiSafety: F.aiSafety,
        aiRetention: F.aiRetention,
        aiRoi: F.aiRoi,
        localVoice: F.localVoice,
        localPenetration: F.localPenetration,
        regionalDialects: F.regionalDialects,
        localHubs: filteredLocalHubs,
        sponsoredPosts: filteredSponsoredPosts,
        socialLinks: filteredSocialLinks,
        philosophyTitle: F.philosophyTitle,
        dominanceTitle: F.dominanceTitle,
        localTitle: F.localTitle,
        localHubsTitle: F.localHubsTitle,
        contactPhone: F.contactPhone,
        contactMethod: F.contactMethod,
        email: st.user?.email
      };

      const enrichedProfile = await updateCreatorProfile(updatedProfile);

      const isProfileDone = !!(
        F.name && F.bio && (F.instagram || F.youtube) && F.rateMin &&
        F.storyP1 && filteredMilestones.length > 0 && filteredServices.length > 0
      );
      localStorage.setItem('cb_profile_completed', isProfileDone ? 'true' : 'false');
      dsp({ t: 'LOGIN', u: { ...st.user, creatorProfile: enrichedProfile }, role: 'creator' });
      toast('Creator profile synced to database! 🎉', 'success');
    } catch (err) {
      toast('Failed to save profile: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };
  const score = c?.score || 85;

  return (
    <div className="dashboard-page-container">
      <div className="db-page-header">
        <div className="badge-saffron">
           <Shield size={14} fill="#FF9431" /> CREATOR IDENTITY
        </div>
        <h1 className="page-title">Profile Builder</h1>
        <p className="db-sub-text">Build your 6-tab digital portfolio and unlock verified admin vetting status. Complete all tabs to maximize your CB Score.</p>
      </div>

      <div className="db-main-grid">
         {mob ? (
            <MobileTabSelector comp={comp} tab={tab} setTab={setTab} F={F} />
         ) : (
            <SettingsSidebar score={score} comp={comp} tab={tab} setTab={setTab} F={F} />
         )}

         <div className="db-col-right">
            <AnimatePresence mode="wait">
               {tab === 'identity' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="identity">
                    <IdentityTabContent F={F} c={c} st={st} mob={mob} upF={upF} saveProfile={saveProfile} saving={saving} />
                 </motion.div>
               )}
               {tab === 'social' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="social">
                    <SocialTabContent F={F} mob={mob} upF={upF} upGallery={upGallery} upSocialLink={upSocialLink} addSocialLink={addSocialLink} removeSocialLink={removeSocialLink} saveProfile={saveProfile} setTab={setTab} isPro={isPro} navigate={navigate} />
                 </motion.div>
               )}
               {tab === 'story' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="story">
                    <StoryTabContent F={F} mob={mob} upF={upF} upAward={upAward} upCollab={upCollab} upMilestone={upMilestone} saveProfile={saveProfile} setTab={setTab} />
                 </motion.div>
               )}
               {tab === 'packages' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="packages">
                    <PackagesTabContent F={F} mob={mob} upF={upF} upService={upService} upViralContent={upViralContent} upCaseStudy={upCaseStudy} saveProfile={saveProfile} setTab={setTab} />
                 </motion.div>
               )}
               {tab === 'local' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="local">
                    <LocalTabContent F={F} mob={mob} upF={upF} upLocalHub={upLocalHub} saveProfile={saveProfile} setTab={setTab} />
                 </motion.div>
               )}
               {tab === 'sponsored' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="sponsored">
                    <SponsoredTabContent F={F} mob={mob} upSponsoredPost={upSponsoredPost} saveProfile={saveProfile} setTab={setTab} />
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
