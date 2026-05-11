import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

const Section = ({ id, title, icon: Icon, children, mob }) => (
  <motion.div 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{ marginBottom: '60px' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
      <div style={{ width: '40px', height: '40px', background: 'rgba(255, 148, 49, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9431' }}>
        <Icon size={20} />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{title}</h2>
    </div>
    <div style={{ fontSize: mob ? '15px' : '17px', color: '#64748b', lineHeight: '1.8', paddingLeft: mob ? '0' : '56px' }}>
      {children}
    </div>
  </motion.div>
);

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  mob: PropTypes.bool
};

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

export default function PrivacyPage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const sections = [
    { id: 'intro', title: '1. Introduction', icon: FileText },
    { id: 'data', title: '2. Data Collection', icon: Eye },
    { id: 'usage', title: '3. Data Usage', icon: Shield },
    { id: 'security', title: '4. Security', icon: Lock },
  ];

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Header */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 24px 80px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.1), transparent 70%)' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.04em' }}>
            Privacy <span style={{ color: '#FF9431' }}>Policy.</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Last Updated: May 2026. Your trust is our most valuable asset. Learn how we handle your digital identity.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: mob ? '40px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: (!mob && globalThis.innerWidth > 1024) ? '300px 1fr' : '1fr', gap: mob ? '40px' : '80px' }}>
          
          {/* Sidebar Navigation */}
          {(!mob && globalThis.innerWidth > 1024) && (
            <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sections.map(s => (
                  <a 
                    key={s.id} 
                    href={`#${s.id}`}
                    style={{ 
                      padding: '16px 24px', 
                      borderRadius: '12px', 
                      textDecoration: 'none', 
                      color: '#64748b', 
                      fontWeight: 800, 
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {s.title.split('. ')[1]}
                    <ChevronRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Legal Text */}
          <div style={{ maxWidth: '800px' }}>
            <Section id="intro" title="1. Introduction" icon={FileText} mob={mob}>
              <p>At CreatorBharat, we take your privacy seriously. This policy explains how we collect, use, and safeguard your information when you use our platform to build your digital identity or discover talent across Bharat.</p>
              <p style={{ marginTop: '20px' }}>By using our platform, you agree to the collection and use of information in accordance with this policy. We are committed to transparency and the ethical handling of all user data.</p>
            </Section>

            <div style={{ background: 'rgba(255, 148, 49, 0.05)', border: '1px solid rgba(255, 148, 49, 0.1)', borderRadius: '24px', padding: '32px', marginBottom: '60px' }}>
               <div style={{ display: 'flex', gap: '16px', color: '#FF9431', marginBottom: '12px' }}>
                  <Shield size={24} />
                  <span style={{ fontWeight: 900, fontSize: '18px' }}>The "Bharat Promise"</span>
               </div>
               <p style={{ color: '#0f172a', fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                 We NEVER sell your personal data to third-party advertisers. Your contact information is only shared with verified brands once you explicitly agree to a deal.
               </p>
            </div>

            <Section id="data" title="2. Data Collection" icon={Eye} mob={mob}>
              <p>We collect information that you provide directly to us, such as when you create a profile, apply for verification, or communicate with brands. This includes:</p>
              <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '12px' }}>Personal identifiers (Name, Email, Phone Number)</li>
                <li style={{ marginBottom: '12px' }}>Social media handles and public engagement metrics</li>
                <li style={{ marginBottom: '12px' }}>City, language preferences, and content niches</li>
                <li style={{ marginBottom: '12px' }}>Portfolio images and media assets</li>
              </ul>
            </Section>

            <Section id="usage" title="3. Data Usage" icon={Shield} mob={mob}>
              <p>Your data is used to populate your Public Portfolio, provide analytics to brands searching for talent, and improve our discovery algorithms. Specifically:</p>
              <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '12px' }}>To maintain and provide our Service</li>
                <li style={{ marginBottom: '12px' }}>To notify you about brand deal opportunities</li>
                <li style={{ marginBottom: '12px' }}>To monitor the usage of our Service for improvements</li>
                <li style={{ marginBottom: '12px' }}>To detect, prevent and address technical issues</li>
              </ul>
            </Section>

            <Section id="security" title="4. Security" icon={Lock} mob={mob}>
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
              <p style={{ marginTop: '20px' }}>We implement multi-layer encryption and periodic security audits to ensure your "Digital Pehchan" remains safe with us.</p>
            </Section>
          </div>

        </div>
      </section>
    </div>
  );
}
