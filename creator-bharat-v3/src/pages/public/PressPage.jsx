import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Copy, Download, Calendar, Mail, FileText, Check, ChevronRight, ExternalLink } from 'lucide-react';
import Seo from '@/components/common/SEO';
import { Btn, Bdg } from '@/components/common/Primitives';
import { BRAND_COLORS, BRAND_ASSETS, PRESS_RELEASES, CORPORATE_FACTS } from '@/data/pressData';

export default function PressPage() {
  const [mob, setMob] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const checkSize = () => setMob(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleDownload = (title) => {
    setDownloading(title);
    setTimeout(() => {
      setDownloading(null);
      alert(`Asset "${title}" download started (mock).`);
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('press@creatorbharat.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div style={{ background: '#fcfcfc', color: '#475569', minHeight: '100vh', overflow: 'hidden' }}>
      <Seo 
        title="Press & Brand Assets | CreatorBharat" 
        description="Official press releases, media kits, corporate stats, and high-resolution downloadable brand assets of CreatorBharat." 
      />

      {/* Hero Section */}
      <style>{`
        .press-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .press-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ 
        padding: mob ? '90px 20px 60px' : '130px 24px 100px', 
        position: 'relative', 
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04), transparent 70%)', 
          opacity: 0.9 
        }} />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(90deg, #10B981, #e2e8f0, #FF9431)' 
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="press-landing-grid">
            {/* Left side: content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(16, 185, 129, 0.06)', 
                  padding: '10px 20px', 
                  borderRadius: '100px', 
                  marginBottom: '28px', 
                  border: '1px solid rgba(16, 185, 129, 0.15)', 
                  backdropFilter: 'blur(10px)',
                  color: '#0f172a'
                }}
              >
                <FileText size={14} color="#10B981" />
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Brand Guidelines & Press Room</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ 
                  fontSize: mob ? '40px' : '68px', 
                  fontWeight: 950, 
                  letterSpacing: '-0.04em', 
                  lineHeight: 1.05, 
                  marginBottom: '24px',
                  fontFamily: "'Outfit', sans-serif",
                  color: '#0f172a',
                  textAlign: mob ? 'center' : 'left'
                }}
              >
                Press, Media Kit & <br />
                <span style={{ background: 'linear-gradient(90deg, #10B981, #065f46)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Branding Assets.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                style={{ 
                  fontSize: mob ? '15px' : '18px', 
                  color: '#475569', 
                  maxWidth: '600px', 
                  margin: mob ? '0 auto 32px' : '0 0 32px 0', 
                  lineHeight: 1.6, 
                  fontWeight: 500,
                  textAlign: mob ? 'center' : 'left'
                }}
              >
                Explore official color configurations, corporate profiles, milestones, and download our complete high-resolution media asset package.
              </motion.p>
            </div>

            {/* Right side: Canva Visual Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 24,
                padding: 12,
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '75%', // 4:3 Aspect Ratio
                background: '#f8fafc'
              }}>
                <img
                  src="/press_hero.png"
                  alt="Branding Guidelines & Press Assets"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 12, padding: '0 8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} className="animate-pulse" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Assets Updated</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>Live Sync</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Corporate Facts Grid */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Bdg color="green" sm>CB OVERVIEW</Bdg>
          <h2 style={{ fontSize: mob ? '32px' : '44px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>Corporate Profile</h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', 
          gap: '20px' 
        }}>
          {CORPORATE_FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                {fact.label}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
                {fact.value}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Color System */}
      <section style={{ 
        padding: '80px 24px', 
        background: '#f8fafc', 
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Bdg color="orange" sm>STYLE SYSTEM</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '44px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>Official Colors</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>Our brand colors reflect regional vibrancy paired with digital transparency.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px' 
          }}>
            {BRAND_COLORS.map((color, i) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Color block */}
                <div style={{ 
                  height: '140px', 
                  borderRadius: '16px', 
                  backgroundColor: color.hex, 
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}>
                  <button 
                    onClick={() => handleCopyColor(color.hex)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      bottom: '12px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: '0.2s'
                    }}
                  >
                    {copiedColor === color.hex ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                  </button>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: '#0f172a', margin: '0 0 4px' }}>{color.name}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', fontSize: '13px', color: '#64748b', marginBottom: '12px', fontFamily: 'monospace' }}>
                    <span>HEX: {color.hex}</span>
                    <span>HSL: {color.hex === '#050607' ? '210, 17%, 2%' : color.hex === '#FF9431' ? '28, 100%, 59%' : color.hex === '#10B981' ? '160, 84%, 39%' : '0, 0%, 100%'}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{color.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets Download */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Bdg color="green" sm>MEDIA KITS</Bdg>
          <h2 style={{ fontSize: mob ? '32px' : '44px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>Downloadable Resources</h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>Official vector graphics, logomarks, and identity materials.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {BRAND_ASSETS.map((asset, i) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', fontFamily: "'Outfit', sans-serif" }}>{asset.title}</h3>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '12px' }}>{asset.desc}</p>
                <div style={{ display: 'inline-flex', gap: '8px', fontSize: '11px', color: '#FF9431', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>{asset.type}</span>
                  <span>•</span>
                  <span>{asset.size}</span>
                </div>
              </div>
              <button 
                onClick={() => handleDownload(asset.title)}
                disabled={downloading === asset.title}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: downloading === asset.title ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9',
                  border: 'none',
                  color: downloading === asset.title ? '#10B981' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: '0.2s'
                }}
              >
                {downloading === asset.title ? <Check size={20} /> : <Download size={20} />}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section style={{ 
        padding: '80px 24px', 
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Bdg color="orange" sm>NEWSROOM</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '44px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginTop: '12px' }}>Press Releases</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {PRESS_RELEASES.map((pr, i) => (
              <motion.div
                key={pr.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontSize: '13px', fontWeight: 800 }}>
                  <Calendar size={14} />
                  <span>{pr.date}</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: "'Outfit', sans-serif", lineHeight: 1.4 }}>{pr.title}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{pr.excerpt}</p>
                <button 
                  onClick={() => alert(`Redirecting to: ${pr.title} (mock)`)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#FF9431',
                    fontSize: '14px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    width: 'fit-content'
                  }}
                >
                  Read Release <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto 100px', textAlign: 'center' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.03)',
          borderRadius: '32px',
          padding: mob ? '32px 20px' : '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            background: 'rgba(255, 148, 49, 0.1)',
            color: '#FF9431',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Mail size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>Press Inquiries</h3>
            <p style={{ color: '#475569', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Are you a journalist, researcher, or media representative covering India's creator economy? Connect with our communications desk directly.
            </p>
          </div>

          <button
            onClick={handleCopyEmail}
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '100px',
              padding: '14px 28px',
              color: '#0f172a',
              fontSize: '15px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            press@creatorbharat.com
            {copiedEmail ? <Check size={16} color="#10B981" /> : <Copy size={15} color="#FF9431" />}
          </button>
        </div>
      </section>
    </div>
  );
}
