import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Trophy, ShieldCheck, ArrowRight } from 'lucide-react';
import { W } from '../../utils/helpers';
import { useApp } from '@/core/context';
import { Btn } from '../common/Primitives';

const PLAY_BUTTONS = [
  {
    id: 'rising',
    title: 'Rising Bharat Award',
    threshold: '10K+ Followers',
    desc: 'For emerging creators who are making their mark in regional niches.',
    icon: Award,
    color: '#FF9431',
    bg: 'rgba(255,148,49,0.1)',
  },
  {
    id: 'star',
    title: 'Bharat Star Trophy',
    threshold: '100K+ Followers',
    desc: 'For established voices representing their states on a national level.',
    icon: Trophy,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    id: 'icon',
    title: 'CreatorBharat Icon',
    threshold: '1M+ Followers',
    desc: 'The ultimate milestone for creators who have built a digital empire.',
    icon: ShieldCheck,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.1)',
  }
];

export default function PlayButtonsShowcase({ mob }) {
  const navigate = useNavigate();
  const { st } = useApp();

  const handleCta = () => {
    if (st?.user && st?.role === 'creator') {
      navigate('/creator/score'); // Show their score + milestones
    } else {
      navigate('/apply'); // Join as creator
    }
  };
  return (
    <section style={{ padding: mob ? '32px 20px 60px' : '48px 24px 100px', background: '#fff', position: 'relative', overflow: 'visible' }}>
      <div style={{ ...W(), maxWidth: 1200, position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: mob ? 40 : 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: 100, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Creator Milestones</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Unlock Real <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #EF4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trophies.</span>
          </h2>
          <p style={{ fontSize: mob ? 15 : 18, color: '#64748b', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Just like YouTube Play Buttons, CreatorBharat rewards your growth with physical, premium trophies delivered to your doorstep.
          </p>
        </div>

        <div style={{
          display: mob ? 'flex' : 'grid',
          flexDirection: mob ? 'column' : undefined,
          gridTemplateColumns: mob ? undefined : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          paddingBottom: mob ? '100px' : '0px'
        }}>
          {PLAY_BUTTONS.map((pb, i) => (
            <div
              key={pb.id}
              style={{
                position: mob ? 'sticky' : 'relative',
                top: mob ? `${80 + i * 24}px` : 'auto',
                zIndex: i + 1,
                width: '100%'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#f8fafc',
                  borderRadius: mob ? 24 : 32,
                  padding: mob ? '32px 20px' : '48px 32px',
                  border: '1px solid #f1f5f9',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: mob ? '0 -10px 30px rgba(0,0,0,0.06), 0 20px 40px rgba(0,0,0,0.04)' : '0 10px 30px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
                className="pb-card"
              >
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: pb.bg, filter: 'blur(30px)', pointerEvents: 'none' }} />
                
                <div style={{ width: mob ? 70 : 80, height: mob ? 70 : 80, borderRadius: 20, background: pb.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: pb.color, marginBottom: 24, boxShadow: `0 12px 24px ${pb.color}20` }}>
                  <pb.icon size={mob ? 30 : 36} strokeWidth={2} />
                </div>

                <div style={{ fontSize: 13, fontWeight: 800, color: pb.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
                  {pb.threshold}
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 20 : 24, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>
                  {pb.title}
                </h3>
                <p style={{ fontSize: mob ? 14 : 15, color: '#64748b', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {pb.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: mob ? 40 : 60 }}>
          <Btn lg onClick={handleCta} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, padding: mob ? '14px 32px' : '18px 48px', fontSize: mob ? 14 : 16, fontWeight: 950, boxShadow: '0 15px 30px rgba(255,148,49,0.25)' }}>
            {st?.user && st?.role === 'creator' ? 'Check My Milestones →' : 'Start Your Journey Free →'}
          </Btn>
          <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, marginTop: 12 }}>
            CB Score 50+ required for Rising Trophy · Earn by growing on CreatorBharat
          </p>
        </div>

      </div>
      <style>{`
        .pb-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important; border-color: rgba(0,0,0,0.05) !important; }
      `}</style>
    </section>
  );
}

PlayButtonsShowcase.propTypes = {
  mob: PropTypes.bool
};
