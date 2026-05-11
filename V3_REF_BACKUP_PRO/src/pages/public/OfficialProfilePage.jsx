// V3 Production Ready - Build Trigger 2026-05-10
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck,
  Globe,
  CheckCircle2,
  Zap,
  Activity,
  Cpu,
  Rocket,
  Code2,
  Grid,
  MoreHorizontal,
  ExternalLink,
  FileText,
  BarChart3,
  Lock,
  Languages,
  X,
  History,
  TrendingUp,
  Award,
  Database,
  ChevronRight,
  Server,
  BarChart,
  Shield,
  MapPin,
  Mail
} from 'lucide-react';
import PropTypes from 'prop-types';
import { LinkedinIcon } from '../../components/icons/SocialIcons';

// Importing Founder Photo
// import DilshanImg from '../../assets/dilshan.png';
const DilshanImg = "https://ui-avatars.com/api/?name=Mohmmad+Dilshan&background=0f172a&color=fff&size=512";

// --- DATA ---
const OFFICIAL_DATA = {
  en: {
    username: 'creatorbharat',
    displayName: 'CreatorBharat Official',
    category: 'Science & Tech • Protocol Node 001',
    bio: "Building the Mastermind of Bharat's Creator Economy. 🇮🇳\nInfrastructure of Trust for 1.4B Voices.",
    website: 'www.creatorbharat.com',
  },
  hi: {
    username: 'creatorbharat',
    displayName: 'क्रिएटरभारत ऑफिशियल',
    category: 'विज्ञान और तकनीक • प्रोटोकॉल नोड 001',
    bio: "भारत की क्रिएटर इकोनॉमी का मास्टरमाइंड बनाना। 🇮🇳\n1.4B आवाजों के लिए विश्वास का बुनियादी ढांचा।",
    website: 'www.creatorbharat.com',
  },
  baseStats: { posts: 1240, followers: '58.4K', following: 128 },
  highlights: [
    { id: 'v3', label: 'V3 Core', icon: Code2, color: '#0f172a', stories: [{ title: 'The V3 Vision', text: 'Migrating 50,000+ nodes to a decentralized ledger.', date: 'Live' }] },
    { id: 'updates', label: 'Updates', icon: Zap, color: '#FF9431', stories: [{ title: 'New UI Live', text: 'Brand dashboards feature real-time sentiment analysis.', date: '2h ago' }] },
    { id: 'roadmap', label: 'Roadmap', icon: Rocket, color: '#3B82F6', stories: [{ title: 'Phase 2', text: 'Onboarding Tier-2 regional aggregators.', date: 'Next' }] },
    { id: 'founders', label: 'Founders', icon: Users, color: '#10B981', stories: [{ title: 'Leadership', text: 'Mohmmad Dilshan on the future of Bharat.', date: 'Official' }] }
  ],
  posts: [
    { id: 1, title: 'V3_PROTOCOL', icon: Code2, color: '#0f172a' },
    { id: 2, title: 'ROADMAP_Q3', icon: Rocket, color: '#FF9431' },
    { id: 3, title: 'REGION_SYNC', icon: Globe, color: '#3B82F6' },
    { id: 4, title: 'AUTH_NODE', icon: ShieldCheck, color: '#10B981' },
    { id: 5, title: 'SCORE_V2', icon: Activity, color: '#7C3AED' },
    { id: 6, title: 'DATA_LEDGER', icon: Cpu, color: '#000' }
  ],
  liveFeed: [
    "Node 102 synced in Maharashtra",
    "Protocol V3.2 deployment started",
    "Security audit 100% completed",
    "New brand cluster synced in Delhi",
    "Regional shard update: UP-Node active"
  ],
  founder: {
    name: 'Mohmmad Dilshan',
    role: 'Founder & Chief Architect',
    location: 'Bhilwara, Rajasthan',
    vision: 'Democratizing the digital economy for the next billion users through decentralized intelligence.',
    achievements: ['50K+ Nodes Scaled', 'Creator Economy Pioneer', 'Bharat Protocol Visionary']
  },
  shards: [
    { id: 'S1', region: 'North Shard', status: 'Active', latency: '12ms', load: '64%' },
    { id: 'S2', region: 'South Shard', status: 'Syncing', latency: '45ms', load: '12%' },
    { id: 'S3', region: 'West Shard', status: 'Active', latency: '18ms', load: '82%' },
    { id: 'S4', region: 'East Shard', status: 'Active', latency: '22ms', load: '41%' }
  ],
  analytics: {
    growth: [45, 52, 48, 70, 65, 85, 92],
    regions: [
      { name: 'Maharashtra', count: '12.4K', trend: '+12%' },
      { name: 'Delhi NCR', count: '8.9K', trend: '+8%' },
      { name: 'Karnataka', count: '7.5K', trend: '+15%' }
    ]
  }
};


// --- COMPONENTS ---

const IntelligenceHub = ({ mob }) => (
  <div style={{ padding: '40px 0' }}>
     <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px', color: '#0f172a' }}>PROTOCOL ARCHITECTURE</h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Decentralized node distribution & regional sharding status.</p>
     </div>
     
     {/* Shard Directory */}
     <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '32px', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
           <div style={{ fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}><Server size={18} color="#3B82F6" /> ACTIVE SHARD DIRECTORY</div>
           <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>REFRESHING IN 12s...</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
           {OFFICIAL_DATA.shards.map((shard) => (
             <div key={shard.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: shard.status === 'Active' ? '#10B98110' : '#FF943110', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Database size={20} color={shard.status === 'Active' ? '#10B981' : '#FF9431'} />
                   </div>
                   <div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{shard.region}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Node ID: {shard.id}_PROT_001</div>
                   </div>
                </div>
                <div style={{ textAlign: 'right', display: mob ? 'none' : 'block' }}>
                   <div style={{ fontSize: '12px', fontWeight: 700, color: shard.status === 'Active' ? '#10B981' : '#FF9431' }}>{shard.status.toUpperCase()}</div>
                   <div style={{ fontSize: '11px', color: '#64748b' }}>Latency: {shard.latency}</div>
                </div>
                <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>STATS</button>
             </div>
           ))}
        </div>
     </div>

     {/* Protocol CTA */}
     <div style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div>
           <div style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Protocol V3.2 Technical Whitepaper</div>
           <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' }}>Explore the consensus logic and trust-score algorithms.</div>
        </div>
        <button style={{ background: '#3B82F6', color: '#fff', padding: '14px 28px', borderRadius: '14px', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
           VIEW DOCS <ExternalLink size={16} />
        </button>
     </div>
  </div>
);
IntelligenceHub.propTypes = { mob: PropTypes.bool.isRequired };

const InsightsGrid = ({ mob }) => (
  <div style={{ padding: '40px 0' }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
       {[
         { l: 'Network Reach', v: '85.4M', i: Globe, c: '#3B82F6', t: '+4.2%' },
         { l: 'Trust Handshakes', v: '12.4M', i: Shield, c: '#10B981', t: '+12.1%' },
         { l: 'Protocol Revenue', v: '₹4.8Cr', i: Zap, c: '#7C3AED', t: '+8.4%' }
       ].map((s) => (
         <div key={s.l} style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
               <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${s.c}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.i size={22} color={s.c} /></div>
               <div style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', background: '#10B98110', padding: '4px 8px', borderRadius: '6px' }}>{s.t}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a' }}>{s.v}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>{s.l.toUpperCase()}</div>
         </div>
       ))}
    </div>

    {/* Regional Growth Table */}
    <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '32px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart size={20} color="#3B82F6" /> REGIONAL PERFORMANCE</div>
          <button style={{ color: '#3B82F6', fontSize: '13px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View Detailed Report</button>
       </div>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {OFFICIAL_DATA.analytics.regions.map((reg) => (
            <div key={reg.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{reg.name}</div>
               </div>
               <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: '14px', fontWeight: 700 }}>{reg.count}</div>
                     <div style={{ fontSize: '10px', color: '#64748b' }}>CREATORS</div>
                  </div>
                  <div style={{ color: '#10B981', fontSize: '13px', fontWeight: 800 }}>{reg.trend}</div>
                  <ChevronRight size={18} color="#cbd5e1" />
               </div>
            </div>
          ))}
       </div>
    </div>
  </div>
);
InsightsGrid.propTypes = { mob: PropTypes.bool.isRequired };

const MastermindSection = ({ mob }) => (
  <div style={{ padding: '40px 0' }}>
     {/* Elite Founder Card - Updated for Mohmmad Dilshan */}
     <div style={{ 
        background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: '32px', 
        padding: mob ? '32px 24px' : '48px', 
        color: '#fff', 
        marginBottom: '40px', 
        position: 'relative', 
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(15,23,42,0.4)',
        border: '1px solid rgba(255,255,255,0.05)'
     }}>
        {/* Background Decor */}
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', opacity: 0.15, zIndex: 0 }} />
        <div style={{ position: 'absolute', left: '-20px', bottom: '-20px', opacity: 0.03 }}><ShieldCheck size={200} /></div>

        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: '40px', alignItems: mob ? 'center' : 'flex-start', position: 'relative', zIndex: 1 }}>
           {/* Founder Photo */}
           <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '4px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}>
                 <img src={DilshanImg} alt="Mohmmad Dilshan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ 
                position: 'absolute', 
                bottom: '-10px', 
                right: '-10px', 
                background: '#3B82F6', 
                color: '#fff', 
                padding: '6px 12px', 
                borderRadius: '100px', 
                fontSize: '10px', 
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 4px 12px rgba(59,130,246,0.5)'
              }}>
                 <CheckCircle2 size={12} fill="#fff" color="#3B82F6" /> VERIFIED FOUNDER
              </div>
           </div>

           {/* Founder Info */}
           <div style={{ flex: 1, textAlign: mob ? 'center' : 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                 <h4 style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-0.03em' }}>{OFFICIAL_DATA.founder.name}</h4>
                 <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 800, letterSpacing: '1px' }}>{OFFICIAL_DATA.founder.role.toUpperCase()}</div>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', gap: '6px', color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                    <MapPin size={14} /> {OFFICIAL_DATA.founder.location}
                 </div>
              </div>
              <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.7, marginBottom: '28px', maxWidth: '500px', fontWeight: 500 }}>
                 "{OFFICIAL_DATA.founder.vision}"
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start', gap: '12px', marginBottom: '32px' }}>
                 {OFFICIAL_DATA.founder.achievements.map((a) => (
                   <div key={a} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Award size={16} color="#FFD700" /> {a}
                   </div>
                 ))}
              </div>

              <div style={{ display: 'flex', justifyContent: mob ? 'center' : 'flex-start', gap: '16px' }}>
                 <button style={{ background: '#fff', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LinkedinIcon size={18} /> Connect
                 </button>
                 <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> Contact
                 </button>
              </div>
           </div>
        </div>
     </div>

     {/* Updates Grid */}
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
           <History size={24} color="#64748b" style={{ marginBottom: '16px' }} />
           <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>PAST UPDATES</div>
           <div style={{ fontSize: '12px', color: '#64748b' }}>• Migration to V3.0 (April)<br/>• Security Audit V2 (Jan)<br/>• Global Shard Beta (Dec)</div>
        </div>
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
           <TrendingUp size={24} color="#3B82F6" style={{ marginBottom: '16px' }} />
           <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>FUTURE FEATURES</div>
           <div style={{ fontSize: '12px', color: '#64748b' }}>• AI Reputation Score<br/>• Real-time Settlement<br/>• Node Marketplace</div>
        </div>
     </div>
  </div>
);
MastermindSection.propTypes = { mob: PropTypes.bool.isRequired };

const LiveTicker = () => (
  <div style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
    <div style={{ background: '#0f172a', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 12px', borderRadius: '4px', margin: '0 20px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px' }}>
       <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
       LIVE ACTIVITY
    </div>
    <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} style={{ display: 'flex', gap: '40px' }}>
       {OFFICIAL_DATA.liveFeed.concat(OFFICIAL_DATA.liveFeed).map((item, i) => (
         <span key={`${item}-${i}`} style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{item}</span>
       ))}
    </motion.div>
  </div>
);

const RoadmapTimeline = () => (
  <div style={{ padding: '40px 0', maxWidth: '600px', margin: '0 auto' }}>
    {[
      { id: 'v3', t: 'V3.0 Core Sync', d: 'Q2 2024', s: 'COMPLETE', c: '#10B981', icon: Code2 },
      { id: 'ai', t: 'AI Matching Engine', d: 'Q3 2024', s: 'BETA', c: '#FF9431', icon: Cpu },
      { id: 'sync', t: 'Global Sync Node', d: 'Q4 2024', s: 'PENDING', c: '#3B82F6', icon: Globe },
      { id: 'v4', t: 'Protocol V4 Launch', d: '2025', s: 'PLANNED', c: '#7C3AED', icon: Rocket }
    ].map((item, i, arr) => (
      <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative' }}>
         {i < arr.length - 1 && <div style={{ position: 'absolute', left: '20px', top: '40px', bottom: '-32px', width: '2px', background: '#f1f5f9' }} />}
         <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${item.c}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' , zIndex: 1, border: `1px solid ${item.c}20` }}>
            <item.icon size={20} color={item.c} />
         </div>
         <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: item.c }}>{item.d} • {item.s}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{item.t}</div>
         </div>
      </div>
    ))}
  </div>
);

const AuthRequiredModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: 'relative', background: '#fff', padding: '40px 32px', borderRadius: '28px', maxWidth: '360px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
           <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid #f1f5f9' }}><Lock size={32} color="#0f172a" /></div>
           <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '12px', color: '#0f172a' }}>Direct Connection</h3>
           <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>Login to start a secure direct session with the Official CreatorBharat Node.</p>
           <button onClick={() => { globalThis.location.href='/login'; }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#0f172a', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', marginBottom: '12px', fontSize: '16px' }}>Login to Chat</button>
           <button onClick={onClose} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'transparent', color: '#64748b', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Maybe later</button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
AuthRequiredModal.propTypes = { isOpen: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired };

const StoryViewer = ({ highlight, onClose }) => {
  const Icon = highlight.icon;
  const story = highlight.stories[0];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '40px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} aria-label="Close story"><X size={32} /></button>
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center', color: '#fff', padding: '20px' }}>
         <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: highlight.color, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={40} /></div>
         <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>{story.title}</h2>
         <p style={{ fontSize: '16px', opacity: 0.8 }}>{story.text}</p>
         <div style={{ marginTop: '20px', opacity: 0.5 }}>{story.date}</div>
      </div>
    </motion.div>
  );
};
StoryViewer.propTypes = { 
  highlight: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
    stories: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })).isRequired
  }).isRequired, 
  onClose: PropTypes.func.isRequired 
};

// --- MAIN PAGE ---

export default function OfficialProfilePage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('posts');
  const [activeStory, setActiveStory] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [lang, setLang] = useState('en');

  const handleInteraction = (target) => {
    const isLoggedIn = false; // Replace with real auth state
    if (isLoggedIn) {
      navigate(target);
    } else {
      setShowAuthModal(true);
    }
  };

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    scrollToTop();
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const content = OFFICIAL_DATA[lang];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#262626', paddingBottom: '100px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      <LiveTicker />

      <div style={{ maxWidth: '935px', margin: '0 auto', padding: mob ? '24px 16px' : '60px 20px 0' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', gap: mob ? '28px' : '100px', alignItems: 'center', marginBottom: mob ? '24px' : '44px' }}>
          <div style={{ flexShrink: 0 }}>
             <div style={{ width: mob ? '77px' : '150px', height: mob ? '77px' : '150px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '3px' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', padding: '3px' }}>
                   <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={mob ? 40 : 80} color="#fff" />
                   </div>
                </div>
             </div>
          </div>
          <div style={{ flex: 1 }}>
             <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: mob ? 'flex-start' : 'center', gap: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><h1 style={{ fontSize: '20px', fontWeight: 600 }}>{content.username}</h1><CheckCircle2 size={18} color="#3897f0" fill="#3897f0" /></div>
                <div style={{ display: 'flex', gap: '8px', width: mob ? '100%' : 'auto' }}>
                   <button onClick={() => handleInteraction('/follow/creatorbharat')} style={{ flex: 1, padding: '7px 16px', background: '#0095f6', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Follow</button>
                   <button onClick={() => handleInteraction('/chat/creatorbharat')} style={{ flex: 1, padding: '7px 16px', background: '#efefef', border: 'none', color: '#262626', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Message</button>
                   <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} style={{ padding: '7px 12px', background: '#efefef', border: 'none', color: '#262626', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Languages size={16} /> {lang.toUpperCase()}</button>
                </div>
                {mob ? null : <MoreHorizontal size={24} style={{ cursor: 'pointer' }} />}
             </div>
             {!mob && (
               <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                  <span><strong>{OFFICIAL_DATA.baseStats.posts}</strong> posts</span>
                  <span><strong>{OFFICIAL_DATA.baseStats.followers}</strong> followers</span>
                  <span><strong>{OFFICIAL_DATA.baseStats.following}</strong> following</span>
               </div>
             )}
             <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600 }}>{content.displayName}</div>
                <div style={{ color: '#8e8e8e' }}>{content.category}</div>
                <div style={{ whiteSpace: 'pre-line' }}>{content.bio}</div>
                <div style={{ color: '#00376b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><ExternalLink size={12} /> {content.website}</div>
             </div>
          </div>
        </div>

        {/* Mobile Stats Row */}
        {mob && (
           <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: '1px solid #dbdbdb', borderBottom: '1px solid #dbdbdb', marginBottom: '24px', fontSize: '14px', textAlign: 'center' }}>
              <div style={{ flex: 1 }}><strong>{OFFICIAL_DATA.baseStats.posts}</strong><div style={{ color: '#8e8e8e' }}>posts</div></div>
              <div style={{ flex: 1 }}><strong>{OFFICIAL_DATA.baseStats.followers}</strong><div style={{ color: '#8e8e8e' }}>followers</div></div>
              <div style={{ flex: 1 }}><strong>{OFFICIAL_DATA.baseStats.following}</strong><div style={{ color: '#8e8e8e' }}>following</div></div>
           </div>
        )}

        {/* Highlights */}
        <div style={{ display: 'flex', gap: mob ? '16px' : '44px', marginBottom: '52px', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 4px' }}>
           {OFFICIAL_DATA.highlights.map(h => (
             <button key={h.id} onClick={() => setActiveStory(h)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'center', outline: 'none', fontFamily: 'inherit', color: 'inherit' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '1px solid #dbdbdb', padding: '3px', background: '#fff', marginBottom: '8px' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h.icon size={28} color={h.color} /></div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{h.label}</span>
             </button>
           ))}
        </div>

        {/* Tabs Selection */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: mob ? '24px' : '60px', borderTop: '1px solid #dbdbdb' }}>
           {[
             { id: 'posts', icon: Grid, label: 'POSTS' },
             { id: 'mastermind', icon: FileText, label: 'PROTOCOL' },
             { id: 'insights', icon: BarChart3, label: 'INSIGHTS' }
           ].map(tab => (
             <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '18px 0', borderTop: activeTab === tab.id ? '1px solid #262626' : 'none', marginTop: '-1px', color: activeTab === tab.id ? '#262626' : '#8e8e8e', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', outline: 'none', fontFamily: 'inherit' }}>
                <tab.icon size={12} /> {tab.label}
             </button>
           ))}
        </div>

        {/* Tab Content Rendering */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
             {activeTab === 'posts' && (
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: mob ? '3px' : '28px' }}>
                  {OFFICIAL_DATA.posts.map(post => {
                    const Icon = post.icon;
                    return (
                      <div key={post.id} style={{ aspectRatio: '1/1', background: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
                         <Icon size={40} color="#fff" />
                      </div>
                    );
                  })}
               </div>
             )}
             {activeTab === 'mastermind' && (
                <div>
                   <IntelligenceHub mob={mob} />
                   <div style={{ borderTop: '1px solid #f1f5f9', margin: '40px 0' }} />
                   <RoadmapTimeline />
                   <div style={{ borderTop: '1px solid #f1f5f9', margin: '40px 0' }} />
                   <MastermindSection mob={mob} />
                </div>
             )}
             {activeTab === 'insights' && <InsightsGrid mob={mob} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <AnimatePresence>{activeStory && <StoryViewer highlight={activeStory} onClose={() => setActiveStory(null)} />}</AnimatePresence>

      {/* Mobile Sticky Footer */}
      {mob && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#fff', borderTop: '1px solid #dbdbdb', padding: '12px 0', display: 'flex', justifyContent: 'space-around', zIndex: 100 }}>
           <Grid size={24} style={{ cursor: 'pointer' }} onClick={() => setActiveTab('posts')} />
           <Rocket size={24} style={{ cursor: 'pointer' }} onClick={() => setActiveTab('mastermind')} />
           <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={14} color="#fff" /></div>
        </div>
      )}
    </div>
  );
}
