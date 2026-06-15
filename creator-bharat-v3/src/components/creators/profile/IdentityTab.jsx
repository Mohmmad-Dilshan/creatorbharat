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
import { SocialLinkTree, TrustBadge, TabNavigator } from './ProfileShared';

const EmptyState = ({ title }) => null;
EmptyState.propTypes = { title: PropTypes.string.isRequired };

// --- SUB-COMPONENTS FOR IDENTITY TAB ---

const HumanStory = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.bio && !isDummy) return null;
  const text = c.bio || "Every creator has a soul, but only a few know how to show it. I believe in content that doesn't just scroll but stays. My journey began with a simple camera and a complex dream to show the real Bharat.";
  
  return (
    <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: mob ? 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' : '#fff', position: 'relative', overflow: 'hidden' }}>
       <div style={{ position: 'absolute', top: '0', left: '0', width: '4px', height: '100%', background: '#FF9431' }} />
       <h3 style={{ fontSize: mob ? '20px' : '24px', fontWeight: 950, marginBottom: '24px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Mic2 size={mob ? 20 : 24} color="#FF9431" /> Human-Centric Narrative
       </h3>
       <p style={{ fontSize: mob ? '16px' : '20px', color: '#475569', lineHeight: 1.8, fontWeight: 500, maxWidth: '850px', fontStyle: mob ? 'italic' : 'normal' }}>
          "{text}"
       </p>
    </Card>
  );
};
HumanStory.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const AIFitInsight = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.ai_intel?.summary && !isDummy) return null;
  const match = c.ai_intel?.match || "94%";
  const summary = c.ai_intel?.summary || "Authenticity, Regional Authority, and High-Retention Storytelling.";
  const stats = c.ai_intel?.stats || [{ l: 'Safety', v: '99%' }, { l: 'Niche Auth', v: 'High' }, { l: 'ROI Potential', v: '4.2x' }];

  return (
    <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: mob ? 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' : '#fff', position: 'relative', overflow: 'hidden' }}>
       <div style={{ position: 'absolute', top: '0', left: '0', width: '4px', height: '100%', background: '#FF9431' }} />
       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Zap size={24} color="#FF9431" fill="#FF9431" />
          <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>AI Brand-Fit Intel</span>
       </div>
       <h3 style={{ fontSize: mob ? '20px' : '24px', fontWeight: 950, marginBottom: '16px', color: '#0f172a' }}>Why {c.name} fits your Brand?</h3>
       <p style={{ fontSize: mob ? '15px' : '17px', color: '#475569', lineHeight: 1.8, fontWeight: 500, marginBottom: '32px', maxWidth: '850px' }}>
          Our Elite Analysis engine confirms a <strong style={{ color: '#FF9431' }}>{match} match</strong> for brands seeking <strong style={{ color: '#0f172a' }}>{summary}</strong>
       </p>
       <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {stats.map(i => (
            <div key={i.l} style={{ padding: '16px 24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', minWidth: '140px' }}>
               <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 900, textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>{i.l}</div>
               <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>{i.v}</div>
            </div>
          ))}
       </div>
    </Card>
  );
};
AIFitInsight.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const ContentPhilosophy = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.philosophy && !isDummy) return null;
  const text = c.philosophy || "Mera content philosophy simple hai: content sirf screen par chalne ke liye nahi, balki viewer ke dil mein basne ke liye hona chahiye. Storytelling aisi ho jo real ho, raw ho, aur Bharat ki mitti se judi ho.";

  return (
    <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: mob ? 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' : '#fff', position: 'relative', overflow: 'hidden' }}>
       <div style={{ position: 'absolute', top: '0', left: '0', width: '4px', height: '100%', background: '#FF9431' }} />
       <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.03, pointerEvents: 'none' }}><Zap size={200} color="#FF9431" /></div>
       <h3 style={{ fontSize: mob ? '20px' : '24px', fontWeight: 950, marginBottom: '24px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={24} color="#FF9431" /> Mera Content Philosophy (The 'Why')
       </h3>
       <p style={{ fontSize: mob ? '16px' : '20px', color: '#475569', lineHeight: 1.8, fontWeight: 500, maxWidth: '850px', fontStyle: mob ? 'italic' : 'normal', margin: 0 }}>
          "{text}"
       </p>
    </Card>
  );
};
ContentPhilosophy.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const GeoIntelligence = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.audience_hubs && !isDummy) return null;
  const text = c.audience_desc || `${c.name}'s influence is deeply rooted in regional culture, making them a high-impact choice for brands targeting Tier 2 & Tier 3 markets with premium aspirations.`;
  const hubs = c.audience_hubs || [{ l: 'Regional Bharat', d: '72% Majority', p: 72 }, { l: 'Metro Tier 1', d: '28% Reach', p: 28 }];

  return (
    <Card style={{ 
      padding: mob ? '28px' : '48px', 
      borderRadius: '40px', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
      color: '#0f172a', 
      border: '1.5px solid rgba(226, 232, 240, 0.8)',
      boxShadow: '0 20px 40px rgba(15,23,42,0.03)',
      marginBottom: '40px', 
      overflow: 'hidden', 
      position: 'relative' 
    }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 1fr', gap: '40px' }}>
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                 <Globe size={24} color="#FF9431" />
                 <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Geo-Cultural Intelligence</span>
              </div>
              <h3 style={{ fontSize: mob ? '24px' : '32px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', lineHeight: 1.2 }}>Dominating the <span style={{ color: '#FF9431' }}>Digital Heartland</span> of {c.city || 'Bharat'}</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, fontWeight: 550, marginBottom: '32px' }}>
                 {text}
              </p>
           </div>
           <div style={{ background: '#fff', borderRadius: '32px', padding: '32px', border: '1.5px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 8px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#0f172a', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px' }}>Audience Hubs</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 {hubs.map(h => (
                    <div key={h.l}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>{h.l}</span>
                          <span style={{ fontSize: '13px', fontWeight: 950, color: '#FF9431' }}>{h.d}</span>
                       </div>
                       <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                          <div style={{ width: `${h.p}%`, height: '100%', background: 'linear-gradient(90deg, #FF9431 0%, #f97316 100%)' }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
    </Card>
  );
};
GeoIntelligence.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const ExpertiseHub = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.expertise && !isDummy) return null;
  const groups = c.expertise || [
    { t: 'Production', items: ['4K Rendering', 'Sound Design'], i: Play, c: '#FF9431' },
    { t: 'Creative', items: ['Storytelling', 'Hinglish'], i: ImageIcon, c: '#0ea5e9' },
    { t: 'Strategic', items: ['Viral Hooks', 'Analytics'], i: TrendingUp, c: '#10B981' }
  ];

  return (
    <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '32px' }}>Technical & Creative Prowess</h3>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
        {groups.map(g => {
          const Icon = g.i || Zap;
          return (
            <div key={g.t} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon size={16} color={g.c} />
                <span style={{ fontSize: '10px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase' }}>{g.t}</span>
              </div>
              {g.items.map(s => <div key={s} style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>• {s}</div>)}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
ExpertiseHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const NationalToLocalBridge = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.tagline && !isDummy) return null;
  const text = c.tagline || `"Authentic storytelling for the digital age."`;

  return (
    <div style={{ padding: mob ? '32px 24px' : '60px', background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)', borderRadius: '40px', border: '1.5px solid #e0f2fe', marginBottom: '40px' }}>
      <h2 style={{ fontSize: mob ? '28px' : '48px', fontWeight: 950, color: '#0f172a', marginBottom: '24px' }}>Bridging {c.name}'s National Impact</h2>
      <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500 }}>{text}</p>
    </div>
  );
};
NationalToLocalBridge.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const TheEliteEdge = ({ c, mob }) => (
  <Card style={{ padding: mob ? '28px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid rgba(226, 232, 240, 0.8)', background: 'linear-gradient(to bottom, #fff, #f8fafc)', boxShadow: '0 20px 40px rgba(15,23,42,0.02)' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <ShieldCheck size={24} color="#FF9431" />
        <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>The Elite Edge (Comparison)</h3>
      </div>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
        <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1.5px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
           <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Average Creator</div>
           <div style={{ fontSize: '24px', fontWeight: 950, color: '#64748b', marginBottom: '8px' }}>2.1% ER</div>
           <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Low Retention</div>
        </div>
        <div style={{ padding: '24px', background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', borderRadius: '24px', color: '#fff', boxShadow: '0 12px 30px rgba(234, 88, 12, 0.25)' }}>
           <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.9 }}>This Elite Creator</div>
           <div style={{ fontSize: '24px', fontWeight: 950, color: '#fff', marginBottom: '8px' }}>{c?.er || 9.4}% ER</div>
           <div style={{ fontSize: '12px', color: '#fff', fontWeight: 900 }}>High Conversion Power</div>
        </div>
     </div>
  </Card>
);
TheEliteEdge.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const LocationDominanceVoice = ({ c, mob }) => {
  const isDummy = c.id === 'fallback';
  if (!c.local_voice && !isDummy) return null;
  const text = c.local_voice || `"Main sabse zyada <b>${c.city || 'Rajasthan'}</b> mein popular hoon kyunki wahan ki language aur culture meri videos ki soul hai. Brands ko agar is heartland mein ghusna hai, toh mera content sabse tez rasta hai."`;
  const hubs = c.local_hubs || ['Indore', 'Mumbai', 'Bhopal'];
  const pen = c.local_penetration || '85%';

  return (
    <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: mob ? '32px' : '60px' }}>
          <div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <MapPin size={24} color="#FF9431" fill="rgba(255,148,49,0.1)" />
                <h3 style={{ fontSize: mob ? '20px' : '28px', fontWeight: 950, color: '#0f172a' }}>Mera Regional Dominance</h3>
             </div>
             <p style={{ fontSize: mob ? '16px' : '20px', color: '#475569', fontWeight: 600, lineHeight: 1.6, marginBottom: '32px' }} dangerouslySetInnerHTML={{__html: text}} />
             <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {hubs.map(city => (
                  <div key={city} style={{ padding: '8px 20px', background: '#f1f5f9', borderRadius: '100px', fontSize: '12px', fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>
                     {city} Hub
                  </div>
                ))}
             </div>
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '32px', padding: '32px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.05 }}><Globe size={120} /></div>
             <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Local Market Penetration</div>
             <div style={{ fontSize: '48px', fontWeight: 950, color: '#FF9431', lineHeight: 1, marginBottom: '8px' }}>{pen}</div>
             <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Top Creator in {c.city || 'Madhya Pradesh'}</div>
             <p style={{ fontSize: '12px', color: '#64748b', marginTop: '12px', fontWeight: 500 }}>Higher engagement than national average in regional circuits.</p>
          </div>
       </div>
    </Card>
  );
};
LocationDominanceVoice.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

// --- MAIN IDENTITY TAB COMPONENT ---

export const IdentityTab = ({ c, stats, onRate, mob, setActiveTab }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <HumanStory c={c} mob={mob} />
    <AIFitInsight c={c} mob={mob} />
    <ContentPhilosophy c={c} mob={mob} />
    
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
    <ExpertiseHub c={c} mob={mob} />
    <NationalToLocalBridge c={c} mob={mob} />
    
    <TrustBadge />
    <TheEliteEdge c={c} mob={mob} />
    <LocationDominanceVoice c={c} mob={mob} />
    <SocialLinkTree links={c?.links} mob={mob} />
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
