import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { LS, fmt } from '../../utils/helpers';
import { Btn, Card, Bdg, Bar, Empty, Ring, Logo } from '../../components/Primitives';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Zap, 
  Briefcase, 
  ChevronRight,
  Wallet,
  Star,
  Sparkles
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    style={{
      background: '#fff',
      padding: '28px',
      borderRadius: '32px',
      border: '1px solid #f1f5f9',
      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#10B981', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
       {trend} <TrendingUp size={12} />
    </div>
    <div style={{ 
      width: '44px', 
      height: '44px', 
      background: color + '10', 
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: color,
      marginBottom: '20px'
    }}>
       <Icon size={20} />
    </div>
    <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
  </motion.div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number
};

const MatchingCampaign = ({ title, brand, budget, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    style={{
      minWidth: '280px',
      background: '#fff',
      padding: '24px',
      borderRadius: '24px',
      border: '1px solid #f1f5f9',
      cursor: 'pointer'
    }}
    whileHover={{ y: -5, borderColor: '#FF9431' }}
  >
    <div style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', marginBottom: '8px', textTransform: 'uppercase' }}>NEW MATCH</div>
    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{title}</h4>
    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '16px' }}>by {brand}</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <div style={{ fontSize: '14px', fontWeight: 900, color: '#10B981' }}>₹{budget}</div>
       <Btn sm variant="ghost">Apply Now</Btn>
    </div>
  </motion.div>
);

MatchingCampaign.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  delay: PropTypes.number
};

export default function DashboardPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const c = st.creatorProfile;

  if (!st.user || st.role !== 'creator') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', background: '#fcfcfc', position: 'relative', overflow: 'hidden' }}>
        {/* Cinematic Background Elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: '#FF9431', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '-5%', width: '40%', height: '40%', background: '#10B981', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />
        
        {/* Mock Blurred Dashboard Content */}
        <div style={{ 
          position: 'absolute', inset: '40px', opacity: 0.1, filter: 'blur(12px)', 
          display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '40px', pointerEvents: 'none'
        }}>
           {[1,2,3,4,5,6].map(i => (
             <div key={i} style={{ background: '#fff', borderRadius: '40px', border: '1px solid #e2e8f0', padding: '40px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#f1f5f9', marginBottom: '24px' }} />
                <div style={{ height: '28px', width: '70%', background: '#f1f5f9', borderRadius: '8px', marginBottom: '16px' }} />
                <div style={{ height: '18px', width: '45%', background: '#f1f5f9', borderRadius: '8px' }} />
             </div>
           ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            position: 'relative', zIndex: 10, maxWidth: '640px', width: '100%', 
            background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
            borderRadius: '56px', padding: mob ? '48px 24px' : '72px 56px', 
            textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.12)'
          }}
        >
           {/* Pulsing Logo Container */}
           <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, background: '#FF9431', borderRadius: '50%', filter: 'blur(28px)' }}
              />
              <div style={{ 
                position: 'relative', width: '80px', height: '80px', background: '#fff', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.03)', zIndex: 2
              }}>
                 <Logo iconOnly />
              </div>
           </div>

           <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,148,49,0.1)', padding: '6px 14px', borderRadius: '100px', marginBottom: '16px' }}>
                 <Sparkles size={14} color="#FF9431" />
                 <span style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>India's Largest Creator Network</span>
              </div>
              <h2 style={{ fontSize: mob ? '32px' : '40px', fontWeight: 950, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.05em', lineHeight: 1.1 }}>
                Bharat Ke Har <span style={{ color: '#FF9431' }}>Local Creator</span> Ki Pehchan!
              </h2>
              <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.6, fontWeight: 500, maxWidth: '560px', margin: '0 auto' }}>
                Apna **Web Portfolio** banayein, **Articles & Podcasts** host karein aur Bharat ke har kone se **Local Brand Identity** payein. Dashboard se hi apne **Events** showcase karein aur India ke sabse bade discovery network ka hissa banein.
              </p>
           </div>

           <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }}>
              <Btn full lg onClick={() => dsp({ t: 'UI', v: { authModal: true, authView: 'login' } })} style={{ height: '68px', borderRadius: '24px', background: '#0f172a', color: '#fff', fontSize: '17px', fontWeight: 900, boxShadow: '0 12px 35px rgba(15,23,42,0.25)' }}>
                Apna Dashboard Open Karein <ChevronRight size={20} style={{ marginLeft: '8px' }} />
              </Btn>
              <Btn full lg variant="outline" onClick={() => dsp({ t: 'UI', v: { authModal: true, authView: 'register' } })} style={{ height: '68px', borderRadius: '24px', fontSize: '17px', fontWeight: 800, border: '2px solid #e2e8f0' }}>
                Apply as Verified Creator
              </Btn>
           </div>

           <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '32px', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>
                 <Zap size={16} color="#FF9431" fill="#FF9431" /> Verified Opportunities
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>
                 <Users size={16} color="#10B981" fill="#10B981" /> 10k+ Creators
              </div>
           </div>
        </motion.div>
      </div>
    );
  }

  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const score = c ? (c.score || fmt.score(c)) : 0;
  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: mob ? '100px 20px 100px' : '120px 40px 100px' }}>
      
      {/* Top Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                 <Zap size={14} fill="#FF9431" /> CREATOR HUB
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>
                Namaste, {c?.name?.split(' ')[0] || st.user.name.split(' ')[0]}!
              </h1>
           </div>
           <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => navigate(`/creator/${c?.handle || 'me'}`)}
                style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ExternalLink size={16} /> Public Profile
              </button>
              <button 
                onClick={() => navigate('/campaigns')}
                style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}
              >
                Explore Deals
              </button>
           </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
         {/* Stats Grid */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <StatCard label="Active Deals" value={myApps.filter(a => a.status === 'selected').length} trend="+12%" icon={Briefcase} color="#10B981" delay={0.1} />
            <StatCard label="Followers" value={fmt.num(c?.followers || 0)} trend="+5.4%" icon={Users} color="#7C3AED" delay={0.2} />
            <StatCard label="Elite Score" value={score} trend="Top 2%" icon={ShieldCheck} color="#FF9431" delay={0.3} />
            <StatCard label="Wallet" value="₹2,450" trend="+₹850" icon={Wallet} color="#3B82F6" delay={0.4} />
         </div>

         {/* Matching Campaigns Scroller */}
         <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>Matching Campaigns</h3>
               <button style={{ color: '#FF9431', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                  See all <ChevronRight size={16} />
               </button>
            </div>
            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }}>
               <MatchingCampaign title="Tech Review Series" brand="Boat Audio" budget="15,000" delay={0.5} />
               <MatchingCampaign title="Regional Lifestyle" brand="Myntra" budget="8,000" delay={0.6} />
               <MatchingCampaign title="Gaming Shorts" brand="Redbull" budget="12,500" delay={0.7} />
               <MatchingCampaign title="Financial Literacy" brand="Groww" budget="20,000" delay={0.8} />
            </div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.8fr', gap: '48px' }}>
            {/* Profile Strength & Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <Card style={{ padding: '40px', borderRadius: '40px', background: '#fff', border: '1px solid #f1f5f9' }}>
                  <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                     <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Digital Pehchan Score</h3>
                     <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                        <Ring score={score} size={160} strokeWidth={14} color="#FF9431" />
                     </div>
                     <Bdg color="saffron" lg>Elite Creator</Bdg>
                  </div>
                  
                  <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#64748b' }}>Profile Completeness</span>
                        <span style={{ fontSize: '16px', fontWeight: 950, color: '#FF9431' }}>{comp.pct}%</span>
                     </div>
                     <Bar value={comp.pct} color="#FF9431" height={8} />
                  </div>

                  {comp.missing.length > 0 && (
                     <div style={{ marginTop: '32px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Priority Tasks</p>
                        {comp.missing.slice(0, 2).map((m) => (
                           <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', marginBottom: '8px' }}>
                              <span style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>{m}</span>
                              <ChevronRight size={16} color="#FF9431" />
                           </div>
                        ))}
                     </div>
                  )}
               </Card>

               {/* Shortcuts */}
               <Card style={{ padding: '32px', borderRadius: '32px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '20px' }}>Elite Tools</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                     <button onClick={() => navigate('/rate-calc')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ width: '32px', height: '32px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🧮</div>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Rate Calculator</span>
                     </button>
                     <button onClick={() => navigate('/leaderboard')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ width: '32px', height: '32px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏆</div>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Leaderboard</span>
                     </button>
                  </div>
               </Card>
            </div>

            {/* Recent Activity & Smart Media Kit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <Card style={{ padding: '40px', borderRadius: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                     <h3 style={{ fontSize: '20px', fontWeight: 900 }}>Application Pulse</h3>
                     <Btn sm variant="ghost" onClick={() => navigate('/applications')}>View Pulse</Btn>
                  </div>
                  
                  {myApps.length === 0 ? (
                    <Empty 
                      icon="📊" 
                      title="No Pulse Yet" 
                      sub="Once you apply to campaigns, you will see real-time status updates here." 
                      ctaLabel="Find Campaigns" 
                      onCta={() => navigate('/campaigns')} 
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       {myApps.slice(0, 5).map(a => (
                         <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: '#fcfcfc', border: '1px solid #f1f5f9', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                               <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Briefcase size={20} color="#64748b" />
                               </div>
                               <div>
                                  <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>{a.campaignTitle}</h5>
                                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</p>
                               </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <Bdg color={(() => {
                                  if (a.status === 'selected') return 'green';
                                  if (a.status === 'shortlisted') return 'purple';
                                  return 'blue';
                               })()}>
                                  {a.status?.toUpperCase() || 'SENT'}
                               </Bdg>
                               <p style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 900, marginTop: '4px' }}>{fmt.date(a.date)}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </Card>

               {/* Share Identity Card */}
               <motion.div
                 whileHover={{ y: -5 }}
                 style={{ 
                   padding: '48px', 
                   background: '#050505', 
                   borderRadius: '40px', 
                   color: '#fff', 
                   position: 'relative', 
                   overflow: 'hidden',
                   cursor: 'pointer'
                 }}
               >
                  <div style={{ position: 'absolute', top: -40, right: -40, width: '160px', height: '160px', background: '#FF9431', borderRadius: '50%', opacity: 0.2, filter: 'blur(60px)' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Star size={24} fill="#FF9431" color="#FF9431" />
                        <h3 style={{ fontSize: '24px', fontWeight: 950, letterSpacing: '-0.02em' }}>Elite Media Kit</h3>
                     </div>
                     <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '32px' }}>
                        Your professional portfolio is ready. Share this cinematic link with brands to showcase your worth.
                     </p>
                     <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                           creatorbharat.in/c/{c?.handle || 'user'}
                        </div>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.in/c/${c?.handle}`); toast('Link Copied!', 'success'); }}
                          style={{ background: '#fff', color: '#0f172a', border: 'none', padding: '0 24px', borderRadius: '100px', fontWeight: 900, fontSize: '13px' }}
                        >
                           COPY
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
    </div>
  );
}

