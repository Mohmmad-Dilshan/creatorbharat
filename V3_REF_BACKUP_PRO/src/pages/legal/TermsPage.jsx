import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Gavel, Users, Briefcase, Zap, ChevronRight, Scale } from 'lucide-react';

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

export default function TermsPage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const sections = [
    { id: 'acceptance', title: '1. Acceptance', icon: Gavel },
    { id: 'identity', title: '2. Creator Identity', icon: Users },
    { id: 'conduct', title: '3. Brand Conduct', icon: Briefcase },
    { id: 'fees', title: '4. Platform Fees', icon: Zap },
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
            Terms of <span style={{ color: '#FF9431' }}>Service.</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Last Updated: May 2026. The rules of engagement for Bharat's largest and most trusted creator ecosystem.
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
            <Section id="acceptance" title="1. Acceptance of Terms" icon={Gavel}>
              <p>By accessing or using the CreatorBharat platform, you agree to be bound by these Terms of Service. These rules are designed to ensure a fair, professional, and authentic environment for both creators and brands in India's digital heartlands.</p>
              <p style={{ marginTop: '20px' }}>If you do not agree with any part of these terms, you must not use our service. We reserve the right to update these terms at any time with notice to our active users.</p>
            </Section>

            <div style={{ background: 'rgba(15, 23, 42, 0.03)', border: '1px solid rgba(15, 23, 42, 0.05)', borderRadius: '24px', padding: '32px', marginBottom: '60px' }}>
               <div style={{ display: 'flex', gap: '16px', color: '#0f172a', marginBottom: '12px' }}>
                  <Scale size={24} />
                  <span style={{ fontWeight: 900, fontSize: '18px' }}>Fair Use & Professionalism</span>
               </div>
               <p style={{ color: '#475569', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
                 Our platform thrives on mutual respect. We moderate all communications to ensure that the "Elite" standard of Bharat's creators is maintained at all times.
               </p>
            </div>

            <Section id="identity" title="2. Creator Identity & Authenticity" icon={Users}>
              <p>As a creator on CreatorBharat, you are responsible for the accuracy of the information provided in your portfolio. This includes:</p>
              <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '12px' }}>Genuine follower counts and engagement metrics.</li>
                <li style={{ marginBottom: '12px' }}>Ownership of all media assets uploaded to your profile.</li>
                <li style={{ marginBottom: '12px' }}>Maintaining professional communication with brand partners.</li>
              </ul>
              <p style={{ marginTop: '20px' }}>Misrepresentation of reach or using "botted" engagement will result in instant and permanent suspension from the platform.</p>
            </Section>

            <Section id="conduct" title="3. Brand Conduct & Obligations" icon={Briefcase}>
              <p>Brands must engage with creators in a professional manner. Any form of harassment, discrimination, or attempt to bypass agreed-upon payments will not be tolerated.</p>
              <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '12px' }}>Timely payments as per agreed campaign terms.</li>
                <li style={{ marginBottom: '12px' }}>Clear creative briefs and realistic deadlines.</li>
                <li style={{ marginBottom: '12px' }}>Respect for the creator's creative freedom and regional voice.</li>
              </ul>
            </Section>

            <Section id="fees" title="4. Platform Model & Fees" icon={Zap}>
              <p>CreatorBharat maintains a 0% commission model for standard deals initiated through our discovery platform. We do not act as a financial intermediary for payments unless a brand explicitly uses our "Managed Service" or "Escrow" features.</p>
              <p style={{ marginTop: '20px' }}>Our goal is to provide the infrastructure, allowing creators to keep 100% of their hard-earned money from brands.</p>
            </Section>
          </div>

        </div>
      </section>
    </div>
  );
}
