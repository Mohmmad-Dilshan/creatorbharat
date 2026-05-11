import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { apiCall } from '../../utils/api';
import { W, scrollToTop, fmt, LS } from '../../utils/helpers';
import { Btn, Bdg, Ring, Empty, Modal, Fld, Card } from '@/components/common/Primitives';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  MapPin, 
  Camera, 
  ArrowLeft, 
  Download, 
  Zap, 
  Star, 
  Users, 
  TrendingUp,
  Briefcase,
  Info
} from 'lucide-react';

const StatBlock = ({ label, value, icon: Icon, color }) => (
  <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
    <div style={{ color: color, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
       <Icon size={18} />
       <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
    </div>
    <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em' }}>{value}</div>
  </div>
);

StatBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

export default function CreatorProfilePage() {
  const { id } = useParams();
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [c, setC] = useState(st?.sel?.creator || null);
  const [ld, setLd] = useState(!c);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [showCollab, setShowCollab] = useState(false);
  const [collabMsg, setCollabMsg] = useState('');

  const goBack = () => {
    navigate('/creators');
    scrollToTop();
  };

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (st?.sel?.creator) {
      setC(st.sel.creator);
      setLd(false);
      return;
    }
    if (!id) return;

    const localList = LS.get('cb_creators', []);
    const found = localList.find(x => String(x.id) === id || x.slug === id || x.handle === id);
    if (found) {
      setC(found);
      setLd(false);
    } else {
      setLd(true);
      apiCall(`/creators/${id}`).then(res => {
        setC(res.creator || res);
        setLd(false);
      }).catch(() => setLd(false));
    }
  }, [id, st.sel.creator]);

  if (ld) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}><Ring score={85} size={60} strokeWidth={6} /></div>;
  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty icon="👤" title="Profile Not Found" sub="Aap jo creator dhoond rahe hain wo shayad abhi platform par nahi hai." ctaLabel="Back to Marketplace" onCta={goBack} /></div>;

  const score = c?.score || 88;
  const img = c?.profile_pic || c?.photo || c?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'C')}&background=FF9431&color=fff&size=200`;
  const niches = Array.isArray(c?.niche) ? c.niche : [c?.niche || 'Digital Creator'].filter(Boolean);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Cinematic Hero Cover */}
      <section style={{ height: mob ? '250px' : '400px', background: '#050505', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#ffffff 1.2px, transparent 1.2px)', backgroundSize: '32px 32px' }} />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #fff)' }} />
         
         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 1 }}>
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={goBack}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(10px)' }}
            >
              <ArrowLeft size={16} /> BACK TO HUB
            </motion.button>
         </div>
      </section>

      {/* Profile Identity Card */}
      <section style={{ maxWidth: '1200px', margin: '-100px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
         <div style={{ background: '#fff', borderRadius: '40px', padding: mob ? '32px' : '60px', boxShadow: '0 40px 80px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: '48px', alignItems: mob ? 'center' : 'flex-end', textAlign: mob ? 'center' : 'left' }}>
               
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 style={{ width: mob ? '160px' : '220px', height: mob ? '160px' : '220px', borderRadius: '48px', padding: '4px', background: 'linear-gradient(135deg, #FF9431, #FFC187)', flexShrink: 0, boxShadow: '0 20px 40px rgba(255,148,49,0.2)' }}
               >
                  <img src={img} alt={c.name} style={{ width: '100%', height: '100%', borderRadius: '44px', objectFit: 'cover', border: '6px solid #fff' }} />
               </motion.div>

               <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: mob ? 'center' : 'flex-start', marginBottom: '16px' }}>
                     <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={14} fill="#10B981" color="#fff" /> VERIFIED CREATOR
                     </div>
                     <div style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 900 }}>ELITE TIER</div>
                  </div>
                  <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '12px' }}>{c.name}</h1>
                  <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 600, marginBottom: '24px' }}>@{c.handle || 'creator'}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: mob ? 'center' : 'flex-start', color: '#94a3b8', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {c.city || 'Bharat'}</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={16} /> {niches.slice(0, 2).join(' • ')}</div>
                  </div>
               </div>

               <div style={{ display: 'flex', gap: '12px', width: mob ? '100%' : 'auto' }}>
                  <button 
                    onClick={() => setShowCollab(true)}
                    style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', padding: '18px 40px', borderRadius: '100px', fontSize: '15px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}
                  >
                    <Briefcase size={18} /> BOOK COLLAB
                  </button>
               </div>
            </div>

            {/* Smart Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px', marginTop: '60px', paddingTop: '60px', borderTop: '1px solid #f1f5f9' }}>
               <StatBlock label="Followers" value={fmt.num(c.followers || 50000)} icon={Users} color="#7C3AED" />
               <StatBlock label="Avg Engagement" value={(c.er || 4.5).toFixed(1) + '%'} icon={TrendingUp} color="#10B981" />
               <StatBlock label="Creator Score" value={score} icon={ShieldCheck} color="#FF9431" />
               <StatBlock label="Elite Badge" value="Gold" icon={Star} color="#F59E0B" />
            </div>
         </div>
      </section>

      {/* Main Portfolio Content */}
      <section style={{ padding: '80px 24px' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: '60px' }}>
            
            {/* Left Content: Bio & Content */}
            <div>
               <Card style={{ padding: '48px', borderRadius: '40px', marginBottom: '48px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     Mission & Story <Zap size={20} color="#FF9431" fill="#FF9431" />
                  </h3>
                  <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>
                    {c.bio || "Building an authentic community in the heartlands of Bharat. I focus on storytelling that resonates with real people, creating meaningful impact for brands I truly believe in."}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
                     {niches.map(n => <Bdg key={n} color="blue">{n}</Bdg>)}
                     <Bdg color="gray">HINDI</Bdg>
                     <Bdg color="gray">ENGLISH</Bdg>
                  </div>
               </Card>

               <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Featured Content</h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      style={{ aspectRatio: '1/1', background: '#f1f5f9', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}
                    >
                       <img src={`https://picsum.photos/seed/${c.id}${i}/400/400`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                       <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                          <Camera size={20} color="#fff" />
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Right Sidebar: Analytics & Pricing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               
               {/* Pricing Tiers */}
               <Card style={{ padding: '40px', borderRadius: '40px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px' }}>Collaboration Tiers</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     {[
                       { l: 'Standard Post', v: '₹8,500', d: '1 Static Post + 2 Stories', pop: false },
                       { l: 'Professional Reel', v: '₹15,000', d: 'High production 60s Reel', pop: true },
                       { l: 'Managed Campaign', v: '₹35,000', d: '3 Reels + Unlimited Stories', pop: false }
                     ].map(p => (
                       <div key={p.l} style={{ padding: '24px', borderRadius: '24px', border: `2px solid ${p.pop ? '#FF9431' : '#f1f5f9'}`, background: p.pop ? 'rgba(255, 148, 49, 0.05)' : 'transparent', position: 'relative' }}>
                          {p.pop && <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#FF9431', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px' }}>BEST VALUE</div>}
                          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>{p.l}</div>
                          <div style={{ fontSize: '24px', fontWeight: 950, color: p.pop ? '#FF9431' : '#0f172a' }}>{p.v}</div>
                          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px', fontWeight: 600 }}>{p.d}</p>
                       </div>
                     ))}
                  </div>
                  <button style={{ width: '100%', padding: '18px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '100px', marginTop: '24px', fontWeight: 900, fontSize: '14px', cursor: 'pointer' }}>
                     REQUEST CUSTOM BRIEF
                  </button>
               </Card>

               {/* Audience Pulse */}
               <Card style={{ padding: '40px', borderRadius: '40px', background: '#0f172a', color: '#fff' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Audience Pulse <Info size={16} color="rgba(255,255,255,0.4)" />
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                     <Ring score={85} size={120} strokeWidth={10} light />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Tier 2 & 3 Bharat</span>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: '#FF9431' }}>72%</span>
                     </div>
                     <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: '72%', height: '100%', background: '#FF9431' }} />
                     </div>
                     
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Metro (Tier 1)</span>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>28%</span>
                     </div>
                     <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: '28%', height: '100%', background: '#fff' }} />
                     </div>
                  </div>
               </Card>

               {/* Download Kit CTA */}
               <button style={{ width: '100%', padding: '18px', background: 'rgba(255, 148, 49, 0.05)', color: '#FF9431', border: '1.5px dashed rgba(255, 148, 49, 0.3)', borderRadius: '100px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <Download size={18} /> DOWNLOAD FULL MEDIA KIT (PDF)
               </button>
            </div>

         </div>
      </section>

      {/* Contact Modal */}
      <Modal open={showCollab} title={'Enquire with ' + c.name} onClose={() => setShowCollab(false)}>
        <div style={{ padding: '10px' }}>
           <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Brands will receive your brief and profile instantly.</p>
           <Fld label="Campaign Objective" value={collabMsg} onChange={e => setCollabMsg(e.target.value)} rows={4} placeholder="e.g. 2 Reels for our new product launch in Jaipur market." />
           <Btn full lg style={{ marginTop: '20px', borderRadius: '100px' }} onClick={() => { dsp({ t: 'TOAST', d: { type: 'success', msg: 'Enquiry sent successfully!' } }); setShowCollab(false); }}>
              SEND PROPOSAL
           </Btn>
        </div>
      </Modal>
    </div>
  );
}
