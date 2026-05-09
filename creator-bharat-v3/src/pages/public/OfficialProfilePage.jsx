import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Users, 
  Megaphone, 
  ShieldCheck, 
  Globe,
  Fingerprint,
  Zap,
  Star,
  Activity
} from 'lucide-react';
import { useApp } from '../../context';
import { Logo, Btn } from '../../components/Primitives';
import PropTypes from 'prop-types';

const TwitterIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

TwitterIcon.propTypes = { size: PropTypes.number, color: PropTypes.string };

const LinkedinIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

LinkedinIcon.propTypes = { size: PropTypes.number, color: PropTypes.string };

const GlassCard = ({ children, style = {}, delay = 0, mob }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: mob ? '24px' : '32px',
      padding: mob ? '24px' : '40px',
      ...style
    }}
  >
    {children}
  </motion.div>
);

GlassCard.propTypes = { children: PropTypes.node, style: PropTypes.object, delay: PropTypes.number, mob: PropTypes.bool };

const StatGlow = ({ icon: Icon, label, value, mob }) => (
  <div style={{ textAlign: 'center', flex: 1, minWidth: mob ? '140px' : '200px' }}>
    <div style={{ 
      width: mob ? '48px' : '64px', 
      height: mob ? '48px' : '64px', 
      borderRadius: '50%', 
      background: 'rgba(255,148,49,0.1)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      margin: '0 auto 20px',
      border: '1px solid rgba(255,148,49,0.2)',
      boxShadow: '0 0 20px rgba(255,148,49,0.1)'
    }}>
      <Icon size={mob ? 20 : 28} color="#FF9431" />
    </div>
    <div style={{ fontSize: mob ? '24px' : '36px', fontWeight: 900, color: '#fff', marginBottom: '4px', fontFamily: '"Playfair Display", serif' }}>{value}</div>
    <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</div>
  </div>
);

StatGlow.propTypes = { icon: PropTypes.elementType, label: PropTypes.string, value: PropTypes.string, mob: PropTypes.bool };

const HeroSection = ({ mob, scale, opacity, followed, setFollowed }) => (
  <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
    <motion.div style={{ position: 'fixed', inset: 0, scale, opacity, zIndex: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1) 0%, transparent 70%)' }} />
      <img 
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
        alt="Hero" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} 
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #000)' }} />
    </motion.div>

    <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '40px' }}
      >
        <div style={{ 
          width: mob ? '90px' : '120px', 
          height: mob ? '90px' : '120px', 
          background: '#fff', 
          borderRadius: mob ? '24px' : '36px', 
          padding: mob ? '15px' : '20px', 
          margin: '0 auto', 
          boxShadow: '0 0 50px rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Logo sm={mob} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        style={{ fontSize: mob ? '60px' : '100px', fontWeight: 900, letterSpacing: '-4px', lineHeight: 0.9, marginBottom: '32px', fontFamily: '"Playfair Display", serif' }}
      >
        THE <span style={{ color: '#FF9431' }}>BHARAT</span> <br /> ENGINE.
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        style={{ fontSize: mob ? '18px' : '24px', color: 'rgba(255,255,255,0.5)', maxWidth: '700px', margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 500 }}
      >
        Official Identity of India's most powerful creator infrastructure. <br />
        Verified. Audited. Scalable.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
      >
        <Btn 
          onClick={() => setFollowed(!followed)}
          style={{ background: '#fff', color: '#000', padding: '20px 48px', borderRadius: '100px', fontWeight: 900, fontSize: '18px' }}
        >
          {followed ? 'IDENTITY FOLLOWED' : 'FOLLOW OFFICIAL'}
        </Btn>
      </motion.div>
    </div>
  </section>
);

HeroSection.propTypes = {
  mob: PropTypes.bool,
  scale: PropTypes.object,
  opacity: PropTypes.object,
  followed: PropTypes.bool,
  setFollowed: PropTypes.func
};

const StatsSection = ({ mob }) => (
  <section style={{ position: 'relative', marginTop: mob ? '-5vh' : '-10vh', padding: '0 24px', zIndex: 2 }}>
    <GlassCard 
      mob={mob}
      style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: mob ? '24px' : '40px' 
      }}
    >
      <StatGlow icon={Users} label="Trusted Creators" value="50,000+" mob={mob} />
      <StatGlow icon={Megaphone} label="Brand Missions" value="1,200+" mob={mob} />
      <StatGlow icon={ShieldCheck} label="Verified Identity" value="100%" mob={mob} />
      <StatGlow icon={Globe} label="Bharat Nodes" value="28 States" mob={mob} />
    </GlassCard>
  </section>
);

StatsSection.propTypes = { mob: PropTypes.bool };

const BrandMarquee = ({ brands }) => (
  <section style={{ padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '60px' }}>Trusted By Global Giants</p>
    <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', gap: '100px', opacity: 0.3 }}>
       <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex', gap: '100px', alignItems: 'center' }}
       >
         {[...brands.map(b => ({u:b, id:'a'+b})), ...brands.map(b => ({u:b, id:'b'+b})), ...brands.map(b => ({u:b, id:'c'+b}))].map((b) => (
           <img key={b.id} src={b.u} alt="brand" style={{ height: '40px', filter: 'grayscale(1) invert(1)' }} />
         ))}
       </motion.div>
    </div>
  </section>
);

BrandMarquee.propTypes = { brands: PropTypes.array };

const IdentitySection = ({ mob }) => (
  <section style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 24px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '48px' : '80px', alignItems: 'center' }}>
      <div>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FF9431', fontWeight: 900, textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px', marginBottom: '20px' }}>
            <ShieldCheck size={20} /> VERIFIED INFRASTRUCTURE
          </div>
          <h2 style={{ fontSize: mob ? '40px' : '64px', fontWeight: 900, lineHeight: 1.1, marginBottom: '32px', fontFamily: '"Playfair Display", serif' }}>
            Built for the <br /> Next Billion.
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '40px' }}>
            CreatorBharat isn't just a platform; it's a protocol for trust. We've built an identity layer that ensures every interaction between a brand and a creator is backed by real-world data and verified digital footprints.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,148,49,0.1)', padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255,148,49,0.2)' }}>
              <Activity size={18} color="#FF9431" /> <span style={{ fontWeight: 800, fontSize: '14px' }}>Real-time Audit</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Zap size={18} color="#fff" /> <span style={{ fontWeight: 800, fontSize: '14px' }}>Instant Verification</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: '#FF9431', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%' }} />
        <GlassCard mob={mob} style={{ textAlign: 'center', padding: '60px 40px' }}>
           <Fingerprint size={80} color="#FF9431" style={{ marginBottom: '32px' }} />
           <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Digital Seal of Authenticity</h3>
           <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
             Every creator on our platform undergoes a 4-tier biometric and social verification process.
           </p>
           <div style={{ background: '#000', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
               <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.3)' }}>ID_STATUS</span>
               <span style={{ fontSize: '12px', fontWeight: 900, color: '#10B981' }}>ENCRYPTED</span>
             </div>
             <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
               <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 2 }} style={{ height: '100%', background: '#FF9431' }} />
             </div>
           </div>
        </GlassCard>
      </motion.div>
    </div>
  </section>
);

IdentitySection.propTypes = { mob: PropTypes.bool };

const FounderSection = ({ mob }) => (
  <section style={{ maxWidth: '1200px', margin: '160px auto 0', padding: '0 24px' }}>
    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
       <Bdg label="The Collective" />
       <h2 style={{ fontSize: mob ? '40px' : '56px', fontWeight: 900, fontFamily: '"Playfair Display", serif', marginTop: '20px' }}>Command Center.</h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '32px' }}>
       {[
         { name: 'The Architect', role: 'Chief Executive Officer', bio: 'Pioneering the data-first approach to regional influencer marketing. Engineering the future of Bharat.', icon: 'A' },
         { name: 'The Strategist', role: 'Chief Operating Officer', bio: 'Scaling operations from 0 to 50,000+ verified creators across 28 Indian states.', icon: 'S' }
       ].map((f) => (
         <GlassCard key={f.name} mob={mob} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{ width: '80px', height: '80px', background: '#FF9431', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 900, color: '#000' }}>
                  {f.icon}
               </div>
               <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><TwitterIcon size={18} color="rgba(255,255,255,0.4)" /></button>
                  <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><LinkedinIcon size={18} color="rgba(255,255,255,0.4)" /></button>
               </div>
            </div>
            <div>
               <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>{f.name}</h4>
               <p style={{ color: '#FF9431', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>{f.role}</p>
               <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6 }}>{f.bio}</p>
            </div>
         </GlassCard>
       ))}
    </div>
  </section>
);

FounderSection.propTypes = { mob: PropTypes.bool };

const CtaSection = ({ mob }) => (
  <section style={{ maxWidth: '1200px', margin: '160px auto 0', padding: '0 24px', textAlign: 'center' }}>
    <motion.div 
      whileHover={{ scale: 1.01 }}
      style={{ 
        background: 'linear-gradient(135deg, rgba(255,148,49,0.2) 0%, rgba(0,0,0,0) 100%)', 
        padding: mob ? '60px 24px' : '120px 40px', 
        borderRadius: mob ? '32px' : '60px', 
        border: '1px solid rgba(255,148,49,0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(255,148,49,0.1) 0%, transparent 70%)' }} />
      <h2 style={{ fontSize: mob ? '40px' : '72px', fontWeight: 900, marginBottom: '24px', fontFamily: '"Playfair Display", serif' }}>Join the Movement.</h2>
      <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 56px' }}>
        Whether you are a global brand or a regional creator, the future of commerce in Bharat starts here.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
         <Btn lg style={{ background: '#fff', color: '#000', borderRadius: '100px', fontWeight: 900, padding: '20px 48px' }}>Apply for Verification</Btn>
         <Btn variant="outline" lg style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '100px', padding: '20px 48px' }}>Contact Official HQ</Btn>
      </div>
    </motion.div>
  </section>
);

CtaSection.propTypes = { mob: PropTypes.bool };

export default function OfficialProfilePage() {
  const { mob } = useApp();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brands = [
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg'
  ];

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', paddingBottom: '120px', overflowX: 'hidden' }}>
      <HeroSection mob={mob} scale={scale} opacity={opacity} followed={followed} setFollowed={setFollowed} />
      <StatsSection mob={mob} />
      <BrandMarquee brands={brands} />
      <IdentitySection mob={mob} />
      <FounderSection mob={mob} />
      <CtaSection mob={mob} />
    </div>
  );
}

const Bdg = ({ label }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,148,49,0.1)', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(255,148,49,0.2)' }}>
    <Star size={14} color="#FF9431" fill="#FF9431" />
    <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</span>
  </div>
);

Bdg.propTypes = { label: PropTypes.string };
