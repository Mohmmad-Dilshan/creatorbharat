import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { W } from '../../utils/helpers';
import { Check, Sparkles } from 'lucide-react';

export default function Manifesto({ mob }) {
  const promises = [
    {
      title: "Identity First",
      desc: "Every regional creator gets a premium verified profile and custom portfolio page to showcase capability directly to global brands."
    },
    {
      title: "100% Freedom",
      desc: "Zero commission partnerships, milestone-based escrow payouts, and formal Creator Union mediation for complete payment safety."
    },
    {
      title: "National Legacy",
      desc: "Get featured on national spotlight podcasts, monthly creator magazines, and get VIP invites to our offline Creator Summit."
    }
  ];

  return (
    <section style={{ 
      padding: mob ? '24px 0 32px' : '40px 24px 40px', 
      background: '#f8fafc', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Dot grid background */}
      <div style={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', 
        backgroundSize: '32px 32px', opacity: 0.3, pointerEvents: 'none' 
      }} />
      
      {/* Decorative gradient blur blobs */}
      <div style={{ 
        position: 'absolute', top: '10%', left: '-5%', width: 400, height: 400, 
        background: 'radial-gradient(circle, rgba(255,148,49,0.04) 0%, transparent 70%)', 
        filter: 'blur(90px)', pointerEvents: 'none' 
      }} />
      <div style={{ 
        position: 'absolute', bottom: '10%', right: '-5%', width: 400, height: 400, 
        background: 'radial-gradient(circle, rgba(19,136,8,0.03) 0%, transparent 70%)', 
        filter: 'blur(90px)', pointerEvents: 'none' 
      }} />

      <div style={{ 
        ...W(), 
        maxWidth: 1240, 
        position: 'relative', 
        zIndex: 1,
        padding: mob ? '0 16px' : '0 20px'
      }}>
        
        {/* Main Billboard Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: mob ? 'none' : '1.5px solid #e2e8f0',
            borderTop: mob ? '1px solid #e2e8f0' : 'none',
            borderBottom: mob ? '1px solid #e2e8f0' : 'none',
            borderRadius: mob ? 0 : 32,
            boxShadow: '0 30px 60px rgba(15, 23, 42, 0.05)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : '1.15fr 0.85fr',
            alignItems: 'stretch',
            margin: mob ? '0 -16px 32px' : '0 0 48px'
          }}
        >
          
          {/* Left Column: Heading, Checklist, Narrative */}
          <div style={{
            padding: mob ? '36px 20px' : '56px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#ffffff'
          }}>
            {/* Pill Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              background: 'rgba(255, 148, 49, 0.08)', border: '1px solid rgba(255, 148, 49, 0.25)', 
              borderRadius: 100, marginBottom: 24, width: 'fit-content'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431' }} />
              <span style={{ fontSize: 10, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Our Manifesto
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: mob ? 28 : 46,
              fontWeight: 950,
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 20
            }}>
              India’s Next <span style={{ color: '#FF9431' }}>100 Million</span> <br />
              Creators are <span style={{ background: 'linear-gradient(135deg, #FF9431, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rising from Bharat.</span>
            </h2>

            {/* Narrative text */}
            <p style={{
              fontSize: mob ? 14 : 16,
              color: '#475569',
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 580
            }}>
              For too long, the creator economy spotlight was locked in metro boardrooms. 
              But the real stories, authentic voices, and hyper-engaged communities are born in Tier 2 & 3 towns. 
              We are building the trust infra to connect regional talent directly to global opportunities.
            </p>

            {/* Core Promises Checklist */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              textAlign: 'left'
            }}>
              {promises.map((p, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2
                  }}>
                    <Check size={12} color="#10B981" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>{p.title}</h4>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b', margin: 0, lineHeight: 1.4 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Blended Visual Network Graphic */}
          <div style={{
            position: 'relative',
            height: mob ? 280 : 'auto',
            minHeight: mob ? 'auto' : 500,
            overflow: 'hidden',
            background: '#ffffff',
            borderLeft: mob ? 'none' : '1px solid #e2e8f0',
            borderTop: mob ? '1px solid #e2e8f0' : 'none'
          }}>
            {/* Blended Network Image */}
            <img 
              src="/cb_saas_collage.webp" 
              alt="Regional Creator Network Grid mapping Bharat influencers" 
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.97) contrast(1.02)'
              }}
            />

            {/* CSS Linear-Gradient Mask to blend the image border */}
            {!mob ? (
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 140, height: '100%',
                background: 'linear-gradient(to right, #ffffff 10%, transparent 100%)',
                zIndex: 2, pointerEvents: 'none'
              }} />
            ) : (
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: 80,
                background: 'linear-gradient(to bottom, #ffffff 10%, transparent 100%)',
                zIndex: 2, pointerEvents: 'none'
              }} />
            )}

            {/* Card Overlay Shade */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.06) 0%, transparent 40%)',
              pointerEvents: 'none', zIndex: 3
            }} />

            {/* Floating Visual Badges */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
              
              {/* Badge 1: Active Creators Network */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: mob ? '8%' : '12%',
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid #FF9431',
                borderRadius: 14,
                padding: '10px 14px',
                boxShadow: '0 10px 30px rgba(255,148,49,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <Sparkles size={13} color="#FF9431" fill="#FF9431" />
                <span style={{ fontSize: 11, fontWeight: 900, color: '#0f172a' }}>10,000+ Bharat Creators</span>
              </div>

              {/* Badge 2: Spotlight Location */}
              <div style={{
                position: 'absolute',
                bottom: '25%',
                right: '12%',
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid #138808',
                borderRadius: 14,
                padding: '10px 14px',
                boxShadow: '0 10px 30px rgba(19,136,8,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: 11, fontWeight: 900, color: '#0f172a' }}>Rajasthan Spotlight Hub</span>
              </div>

            </div>

          </div>

        </motion.div>

        {/* Bottom Core Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
          gap: 16,
          width: '100%'
        }}>
          {[
            { label: 'Verified Trust', val: 'No Agency Middlemen' },
            { label: 'Zero Commission', val: 'Keep 100% sponsorships' },
            { label: 'Regional First', val: 'Reach Millions in Bharat' }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: 20,
                padding: '20px 24px',
                textAlign: mob ? 'left' : 'center',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </span>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>
                {stat.val}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

Manifesto.propTypes = {
  mob: PropTypes.bool
};
