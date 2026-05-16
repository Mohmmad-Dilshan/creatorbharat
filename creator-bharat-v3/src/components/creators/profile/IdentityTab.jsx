import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  MapPin,
  Mic2,
  TrendingUp,
  Play,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { Card } from '@/components/common/Primitives';
import { fmt } from '@/utils/helpers';

// --- SUB-COMPONENTS FOR IDENTITY TAB ---

const HumanStory = ({ mob }) => (
  <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: mob ? 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' : '#fff', position: 'relative', overflow: 'hidden' }}>
     <div style={{ position: 'absolute', top: '0', left: '0', width: '4px', height: '100%', background: '#FF9431' }} />
     <h3 style={{ fontSize: mob ? '20px' : '24px', fontWeight: 950, marginBottom: '24px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Mic2 size={mob ? 20 : 24} color="#FF9431" /> Human-Centric Narrative
     </h3>
     <p style={{ fontSize: mob ? '16px' : '20px', color: '#475569', lineHeight: 1.8, fontWeight: 500, maxWidth: '850px', fontStyle: mob ? 'italic' : 'normal' }}>
        "Every creator has a soul, but only a few know how to show it. I believe in content that doesn't just scroll but stays. My journey began with a simple camera and a complex dream to show the real Bharat."
     </p>
  </Card>
);
HumanStory.propTypes = { mob: PropTypes.bool };

const AIFitInsight = ({ c, mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', background: '#0f172a', color: '#fff', marginBottom: '40px' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Zap size={24} color="#FF9431" fill="#FF9431" />
        <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>AI Brand-Fit Intel</span>
     </div>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '16px' }}>Why {c.name} fits your Brand?</h3>
     <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500, marginBottom: '32px' }}>
        Our Elite Analysis engine confirms a <b>94% match</b> for brands seeking <b>Authenticity, Regional Authority, and High-Retention Storytelling.</b>
     </p>
     <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {[{ l: 'Safety', v: '99%' }, { l: 'Niche Auth', v: 'High' }, { l: 'ROI Potential', v: '4.2x' }].map(i => (
          <div key={i.l}>
             <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>{i.l}</div>
             <div style={{ fontSize: '20px', fontWeight: 950, color: '#fff' }}>{i.v}</div>
          </div>
        ))}
     </div>
  </Card>
);
AIFitInsight.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const ContentPhilosophy = ({ c, mob }) => (
  <div style={{ padding: mob ? '24px' : '48px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '40px', color: '#fff', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
     <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}><Zap size={200} color="#FF9431" /></div>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px', color: '#FF9431' }}>Mera Content Philosophy (The 'Why')</h3>
     <p style={{ fontSize: mob ? '16px' : '20px', fontWeight: 500, lineHeight: 1.7, maxWidth: '850px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>"Main sirf videos nahi banata, main {c.city || 'Bharat'} ki mitti ki kahaniyan sunata hoon. Brands ko emotional connect chahiye, aur meri audience ko authenticity—main in dono ko milata hoon cinematic rawness ke saath."</p>
  </div>
);
ContentPhilosophy.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const EliteSocialPulse = ({ stats, mob }) => (
  <div style={{ marginBottom: '40px' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '32px', color: '#0f172a' }}>Platform Velocity</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
        {[
          { p: 'Instagram', f: stats.followers, er: stats.er + '%', c: '#E4405F' },
          { p: 'YouTube', f: '1.2M', er: '8.4%', c: '#FF0000' },
          { p: 'LinkedIn', f: '45K', er: '12%', c: '#0077B5' }
        ].map(s => (
          <Card key={s.p} style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9' }}>
             <div style={{ fontSize: '11px', fontWeight: 950, color: s.c, textTransform: 'uppercase', marginBottom: '12px' }}>{s.p} Pulse</div>
             <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', lineHeight: 1 }}>{fmt.num(s.f)}</div>
             <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 800, marginTop: '8px' }}>{s.er} Engagement Rate</div>
          </Card>
        ))}
     </div>
  </div>
);
EliteSocialPulse.propTypes = { stats: PropTypes.object.isRequired, mob: PropTypes.bool };

const EliteIntelligenceHub = ({ stats, mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', background: '#f8fafc', border: '1.5px solid #f1f5f9' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '24px', color: '#0f172a' }}>Intelligence Core</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '32px' }}>
        <div>
           <div style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Audience Sentiment</div>
           <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: '92%', height: '100%', background: '#10B981' }} />
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800 }}>
              <span style={{ color: '#10B981' }}>92% Positive</span>
              <span style={{ color: '#94a3b8' }}>Elite Tier</span>
           </div>
        </div>
        <div>
           <div style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Growth Velocity</div>
           <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: '78%', height: '100%', background: '#FF9431' }} />
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800 }}>
              <span style={{ color: '#FF9431' }}>+78% MoM</span>
              <span style={{ color: '#94a3b8' }}>Hyper Growth</span>
           </div>
        </div>
     </div>
  </Card>
);
EliteIntelligenceHub.propTypes = { stats: PropTypes.object.isRequired, mob: PropTypes.bool };

const GeoIntelligence = ({ c, mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', background: '#0f172a', color: '#fff', marginBottom: '40px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 1fr', gap: '40px' }}>
         <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
               <Globe size={24} color="#FF9431" />
               <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Geo-Cultural Intelligence</span>
            </div>
            <h3 style={{ fontSize: mob ? '24px' : '32px', fontWeight: 950, color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>Dominating the <span style={{ color: '#FF9431' }}>Digital Heartland</span> of {c.city || 'Bharat'}</h3>
            <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500, marginBottom: '32px' }}>
               {c.name}'s influence is deeply rooted in regional culture, making them a high-impact choice for brands targeting Tier 2 & Tier 3 markets with premium aspirations.
            </p>
         </div>
         <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '32px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '12px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px' }}>Audience Hubs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               {[{ l: 'Regional Bharat', d: '72% Majority', p: 72 }, { l: 'Metro Tier 1', d: '28% Reach', p: 28 }].map(h => (
                 <div key={h.l}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                       <span style={{ fontSize: '13px', fontWeight: 800 }}>{h.l}</span>
                       <span style={{ fontSize: '13px', fontWeight: 950, color: '#FF9431' }}>{h.d}</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                       <div style={{ width: `${h.p}%`, height: '100%', background: '#FF9431' }} />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
  </Card>
);
GeoIntelligence.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const ExpertiseHub = ({ mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '32px' }}>Technical & Creative Prowess</h3>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
      {[
        { t: 'Production', items: ['4K Rendering', 'Sound Design'], i: Play, c: '#FF9431' },
        { t: 'Creative', items: ['Storytelling', 'Hinglish'], i: ImageIcon, c: '#0ea5e9' },
        { t: 'Strategic', items: ['Viral Hooks', 'Analytics'], i: TrendingUp, c: '#10B981' }
      ].map(g => (
        <div key={g.t} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <g.i size={16} color={g.c} />
            <span style={{ fontSize: '10px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase' }}>{g.t}</span>
          </div>
          {g.items.map(s => <div key={s} style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>• {s}</div>)}
        </div>
      ))}
    </div>
  </Card>
);
ExpertiseHub.propTypes = { mob: PropTypes.bool };

const NationalToLocalBridge = ({ name, mob }) => (
  <div style={{ padding: mob ? '32px 24px' : '60px', background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)', borderRadius: '40px', border: '1.5px solid #e0f2fe', marginBottom: '40px' }}>
    <h2 style={{ fontSize: mob ? '28px' : '48px', fontWeight: 950, color: '#0f172a', marginBottom: '24px' }}>Bridging {name}'s National Impact</h2>
    <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500 }}>"Authentic storytelling for the digital age."</p>
  </div>
);
NationalToLocalBridge.propTypes = { name: PropTypes.string.isRequired, mob: PropTypes.bool };

const TrustBadge = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '40px' }}>
     <ShieldCheck size={24} color="#10B981" />
     <span style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px' }}>CreatorBharat Audit Pass • 100% Brand Safe</span>
  </div>
);

const TheEliteEdge = ({ mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: 'linear-gradient(to bottom, #fff, #f8fafc)' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <ShieldCheck size={24} color="#FF9431" />
        <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>The Elite Edge (Comparison)</h3>
     </div>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
        <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
           <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Average Creator</div>
           <div style={{ fontSize: '24px', fontWeight: 950, color: '#64748b', marginBottom: '8px' }}>2.1% ER</div>
           <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Low Retention</div>
        </div>
        <div style={{ padding: '24px', background: '#0f172a', borderRadius: '24px', color: '#fff', boxShadow: '0 20px 40px rgba(15,23,42,0.1)' }}>
           <div style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', marginBottom: '16px' }}>This Elite Creator</div>
           <div style={{ fontSize: '24px', fontWeight: 950, color: '#fff', marginBottom: '8px' }}>9.4% ER</div>
           <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 800 }}>High Conversion Power</div>
        </div>
     </div>
  </Card>
);
TheEliteEdge.propTypes = { mob: PropTypes.bool };

const LocationDominanceVoice = ({ c, mob }) => (
  <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: mob ? '32px' : '60px' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <MapPin size={24} color="#FF9431" fill="rgba(255,148,49,0.1)" />
              <h3 style={{ fontSize: mob ? '20px' : '28px', fontWeight: 950, color: '#0f172a' }}>Mera Regional Dominance</h3>
           </div>
           <p style={{ fontSize: mob ? '16px' : '20px', color: '#475569', fontWeight: 600, lineHeight: 1.6, marginBottom: '32px' }}>
              "Main sabse zyada <b>{c.city || 'Rajasthan'}</b> mein popular hoon kyunki wahan ki language aur culture meri videos ki soul hai. Brands ko agar is heartland mein ghusna hai, toh mera content sabse tez rasta hai."
           </p>
           <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['Indore', 'Mumbai', 'Bhopal'].map(city => (
                <div key={city} style={{ padding: '8px 20px', background: '#f1f5f9', borderRadius: '100px', fontSize: '12px', fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>
                   {city} Hub
                </div>
              ))}
           </div>
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '32px', padding: '32px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
           <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.05 }}><Globe size={120} /></div>
           <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Local Market Penetration</div>
           <div style={{ fontSize: '48px', fontWeight: 950, color: '#FF9431', lineHeight: 1, marginBottom: '8px' }}>85%</div>
           <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Top Creator in {c.city || 'Madhya Pradesh'}</div>
           <p style={{ fontSize: '12px', color: '#64748b', marginTop: '12px', fontWeight: 500 }}>Higher engagement than national average in regional circuits.</p>
        </div>
     </div>
  </Card>
);
LocationDominanceVoice.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

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
    </div>
  );
};
TabNavigator.propTypes = { activeTab: PropTypes.string.isRequired, setActiveTab: PropTypes.func.isRequired, mob: PropTypes.bool };

export const SocialLinkTree = ({ mob }) => (
  <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', background: '#fff', border: '1.5px solid #f1f5f9' }}>
     <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>The Digital Ecosystem</h3>
        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Connect with me across all professional platforms.</p>
     </div>
     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
        {[
          { l: 'Official Instagram', s: '125K+ Community', i: ImageIcon, c: '#E4405F', url: 'https://instagram.com' },
          { l: 'YouTube Channel', s: 'Daily Vlogs & Stories', i: Play, c: '#FF0000', url: 'https://youtube.com' },
          { l: 'Professional LinkedIn', s: 'Brand Collaborations', i: Briefcase, c: '#0077B5', url: 'https://linkedin.com' },
          { l: 'Twitter (X)', s: 'Real-time Thoughts', i: Globe, c: '#000', url: 'https://twitter.com' },
          { l: 'Official Website', s: 'Portfolio & Media Kit', i: Globe, c: '#FF9431', url: '#' }
        ].map(link => (
          <button 
            key={link.l}
            onClick={() => window.open(link.url, '_blank')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '20px 24px', 
              background: '#f8fafc', 
              border: '1.5px solid #f1f5f9', 
              borderRadius: '24px', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%',
              textAlign: 'left'
            }}
          >
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', background: `${link.c}10`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <link.i size={20} color={link.c} />
                </div>
                <div>
                   <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{link.l}</div>
                   <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>{link.s}</div>
                </div>
             </div>
             <ArrowRight size={18} color="#cbd5e1" />
          </button>
        ))}
     </div>
  </Card>
);
SocialLinkTree.propTypes = { mob: PropTypes.bool };

// --- MAIN IDENTITY TAB COMPONENT ---

export const IdentityTab = ({ c, stats, onRate, mob, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <HumanStory mob={mob} />
    <AIFitInsight c={c} mob={mob} />
    <ContentPhilosophy c={c} mob={mob} />
    <EliteSocialPulse stats={stats} mob={mob} />
    <EliteIntelligenceHub stats={stats} mob={mob} />
    
    <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: mob ? '16px' : '24px', marginBottom: '40px' }}>
       {[
         { l: 'Total Reach', v: fmt.num(stats.followers), sub: '+12K Monthly', c: '#0f172a' }, 
         { l: 'Engagement', v: stats.er+'%', sub: 'Industry High', c: '#FF9431' }, 
         { l: 'Avg Views', v: '82.4K', sub: 'Per Content', c: '#0f172a' }, 
         { l: 'Consistency', v: '98%', sub: 'Velocity', c: '#10B981' }
       ].map(x => (
         <div key={x.l} style={{ padding: mob ? '20px' : '32px', background: '#fff', borderRadius: mob ? '24px' : '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>{x.l}</div>
            <div style={{ fontSize: mob ? '20px' : '28px', fontWeight: 900, color: x.c, lineHeight: 1 }}>{x.v}</div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', marginTop: '8px' }}>{x.sub}</div>
         </div>
       ))}
    </div>
    
    <GeoIntelligence c={c} mob={mob} />
    <ExpertiseHub mob={mob} />
    <NationalToLocalBridge name={c.name} mob={mob} />
    
    <TrustBadge />
    <TheEliteEdge mob={mob} />
    <LocationDominanceVoice c={c} mob={mob} />
    <SocialLinkTree mob={mob} />
    <TabNavigator activeTab="identity" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);

IdentityTab.propTypes = { 
  c: PropTypes.object.isRequired, 
  stats: PropTypes.object.isRequired, 
  onRate: PropTypes.func.isRequired, 
  mob: PropTypes.bool, 
  setActiveTab: PropTypes.func.isRequired 
};
