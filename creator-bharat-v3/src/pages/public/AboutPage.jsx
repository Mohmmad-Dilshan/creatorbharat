import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Award,
  ChevronRight,
  TrendingUp,
  Heart,
  Command
} from 'lucide-react';
import { Btn, Card, Bdg } from '../../components/Primitives';

const StatBlock = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{ textAlign: 'center' }}
  >
    <div style={{ fontSize: '48px', fontWeight: 950, color: '#fff', marginBottom: '8px', letterSpacing: '-0.04em' }}>{value}</div>
    <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
  </motion.div>
);

StatBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  delay: PropTypes.number
};

const TimelineStep = ({ year, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    style={{ position: 'relative', paddingLeft: '48px', marginBottom: '64px' }}
  >
    <div style={{ position: 'absolute', left: '0', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: '#FF9431', border: '4px solid #fff', boxShadow: '0 0 0 8px rgba(255, 148, 49, 0.1)', zIndex: 2 }} />
    <div style={{ fontSize: '18px', fontWeight: 950, color: '#FF9431', marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>{year}</div>
    <h4 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{title}</h4>
    <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '500px' }}>{desc}</p>
  </motion.div>
);

TimelineStep.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number
};

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>
      
      {/* Dynamic Hero Section */}
      <section style={{ 
        background: '#050505', 
        padding: '200px 24px 120px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Mesh */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.1), transparent 70%)', opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '10px 20px', 
              borderRadius: '100px',
              marginBottom: '40px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Command size={16} color="#FF9431" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Bhilwara Roots. National Vision.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(56px, 10vw, 120px)', 
              fontWeight: 950, 
              color: '#fff', 
              lineHeight: 0.85, 
              marginBottom: '40px',
              letterSpacing: '-0.06em'
            }}
          >
            Empowering the <br />
            <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bharat Voice.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: '22px', 
              color: 'rgba(255, 255, 255, 0.6)', 
              maxWidth: '800px', 
              margin: '0 auto 80px',
              lineHeight: 1.6,
              fontWeight: 500
            }}
          >
            We are building the digital infrastructure for India's next 100 million creators rising from Tier 2 & 3 cities. No gatekeepers, just growth.
          </motion.p>

          {/* Impact Snapshot */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', paddingTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <StatBlock value="15k+" label="Creators Mapped" delay={0.3} />
            <StatBlock value="250+" label="Cities Reached" delay={0.4} />
            <StatBlock value="₹1.2Cr" label="Monthly Payouts" delay={0.5} />
            <StatBlock value="100%" label="Transparent" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section style={{ padding: '140px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '100px', alignItems: 'start' }}>
            
            {/* Timeline Column */}
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', left: '9px', top: '0', bottom: '64px', width: '2px', background: 'linear-gradient(to bottom, #FF9431, transparent)' }} />
               
               <TimelineStep 
                 year="2024: THE SPARK" 
                 title="Born in Bhilwara" 
                 desc="We saw firsthand the struggle of talented local creators being ignored by metro-centric agencies. The idea for CreatorBharat was born."
               />
               <TimelineStep 
                 year="2025: THE BUILD" 
                 title="Technology First" 
                 desc="Focused on creating the 'Elite Score' and AI Discovery tools to give every creator in Bharat a professional digital identity."
                 delay={0.1}
               />
               <TimelineStep 
                 year="2026: THE MISSION" 
                 title="National Scale" 
                 desc="Expanding to every district in India, ensuring that influence isn't just about English—it's about the real voices of Bharat."
                 delay={0.2}
               />
            </div>

            {/* Narrative Column */}
            <div>
               <Bdg color="orange" sm>THE NARRATIVE</Bdg>
               <h2 style={{ fontSize: '56px', fontWeight: 950, color: '#0f172a', lineHeight: 1, marginTop: '24px', marginBottom: '40px', letterSpacing: '-0.04em' }}>
                 Influence shouldn't have a <span style={{ color: '#FF9431' }}>Pincode.</span>
               </h2>
               <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.8, marginBottom: '24px', fontWeight: 500 }}>
                 Metros represent only 10% of India. The real power, the real purchasing influence, and the most authentic storytelling lies in the streets of Bhilwara, the markets of Indore, and the homes of Guwahati.
               </p>
               <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.8, marginBottom: '48px', fontWeight: 500 }}>
                 CreatorBharat is a movement to decentralize the creator economy. We are giving local superstars the tools, the trust, and the deals they deserve.
               </p>

               <div style={{ padding: '40px', background: '#050505', borderRadius: '40px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Globe size={150} /></div>
                  <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Our Commitment</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <ShieldCheck size={20} color="#10B981" />
                        <span style={{ fontSize: '15px', fontWeight: 700 }}>100% Identity Verification</span>
                     </div>
                     <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Zap size={20} color="#FF9431" />
                        <span style={{ fontSize: '15px', fontWeight: 700 }}>Zero Platform Commission</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ padding: '120px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em' }}>The Bharat Philosophy</h2>
            <p style={{ fontSize: '18px', color: '#64748b', marginTop: '12px', fontWeight: 500 }}>Three pillars that define our professional standard.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Pehchan (Identity)', desc: 'Professionalizing creators with verified portfolios and data-backed trust scores.', icon: Award, color: '#FF9431' },
              { title: 'Paisa (Monetization)', desc: 'Connecting talent directly to national brands with secure, commission-free deals.', icon: Target, color: '#10B981' },
              { title: 'Pragati (Growth)', desc: 'Providing the tools and insights needed to scale from a local star to a national icon.', icon: TrendingUp, color: '#3B82F6' }
            ].map((v) => (
              <Card key={v.title} style={{ padding: '56px 40px', borderRadius: '48px', border: '1px solid #f1f5f9' }}>
                 <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: `${v.color}15`, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                    <v.icon size={32} />
                 </div>
                 <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>{v.title}</h3>
                 <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, fontWeight: 500 }}>{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Voice / Quote */}
      <section style={{ padding: '140px 24px', textAlign: 'center' }}>
         <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px', color: '#FF9431' }}>
               <Heart size={32} fill="#FF9431" />
            </div>
            <p style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 950, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.04em', marginBottom: '48px' }}>
              "We are not just a marketplace. We are the architects of the new Indian Dream."
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ fontWeight: 900, fontSize: '18px', color: '#0f172a' }}>TEAM CREATORBHARAT</div>
               <div style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Bhilwara, Rajasthan</div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '0 24px 120px' }}>
         <motion.div 
           whileHover={{ scale: 0.98 }}
           style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', 
            borderRadius: '56px', 
            padding: '100px 40px', 
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(255, 148, 49, 0.2)'
          }}>
            <h2 style={{ fontSize: '56px', fontWeight: 950, marginBottom: '24px', letterSpacing: '-0.04em' }}>Join the Movement.</h2>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', marginBottom: '56px', maxWidth: '600px', margin: '0 auto 56px', fontWeight: 500 }}>
              Be part of the platform that's rewriting the rules of influence in Bharat.
            </p>
            <Btn lg onClick={() => navigate('/apply')} style={{ padding: '24px 64px', borderRadius: '100px', background: '#fff', color: '#0f172a', fontSize: '18px', fontWeight: 950 }}>
              Get Started Now <ChevronRight size={22} />
            </Btn>
         </motion.div>
      </section>

    </div>
  );
}
