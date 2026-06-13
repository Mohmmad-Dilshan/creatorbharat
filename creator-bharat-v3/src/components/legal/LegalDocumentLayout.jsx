import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Seo from '@/components/common/SEO';

export default function LegalDocumentLayout({ doc }) {
  const mob = window.innerWidth < 768;
  const BadgeIcon = doc.badgeIcon;
  const NoticeIcon = doc.notice?.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100, fontFamily: "'Inter', sans-serif" }}>
      <Seo title={`${doc.title} | CreatorBharat`} description={doc.description} />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 110 : 150, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            padding: '8px 16px', 
            background: doc.badgeBg || 'rgba(59, 130, 246, 0.1)', 
            borderRadius: 100, 
            marginBottom: 24, 
            border: `1px solid ${doc.badgeBorder || 'rgba(59,130,246,0.2)'}` 
          }}>
            {BadgeIcon && <BadgeIcon size={16} color={doc.badgeColor} />}
            <span style={{ fontSize: 13, fontWeight: 800, color: doc.badgeColor, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: "'Outfit', sans-serif" }}>
              {doc.badgeText}
            </span>
          </div>
          <h1 style={{ 
            fontSize: mob ? '36px' : '56px', 
            fontWeight: 950, 
            color: '#fff', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0 0 20px 0',
            fontFamily: "'Outfit', sans-serif"
          }}>
            {doc.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>
            {doc.lastUpdated}
          </p>
        </div>
      </div>

      {/* CONTENT LAYOUT */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px', display: 'flex', gap: 60, flexDirection: mob ? 'column' : 'row' }}>
        
        {/* SIDEBAR */}
        {!mob && (
          <div style={{ width: 260, flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: 120 }}>
              <h4 style={{ 
                fontSize: 12, 
                fontWeight: 900, 
                color: '#94a3b8', 
                textTransform: 'uppercase', 
                letterSpacing: 1, 
                marginBottom: 16,
                fontFamily: "'Outfit', sans-serif"
              }}>Contents</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {doc.sections.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      textAlign: 'left', 
                      padding: 0, 
                      fontSize: 15, 
                      fontWeight: 700, 
                      color: '#64748b', 
                      cursor: 'pointer', 
                      transition: 'color 0.2s',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF9431'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                  >
                    {s.sidebarTitle || s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN TEXT */}
        <div style={{ flex: 1, fontSize: '16px', color: '#334155', lineHeight: 1.8 }}>
          
          {/* NOTICE BOX */}
          {doc.notice && (
            <div style={{ 
              background: doc.notice.bg, 
              borderLeft: `4px solid ${doc.notice.border}`, 
              padding: 24, 
              borderRadius: '0 16px 16px 0', 
              marginBottom: 40 
            }}>
              <h4 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                fontSize: 18, 
                fontWeight: 900, 
                color: doc.notice.textColor, 
                margin: '0 0 8px 0',
                fontFamily: "'Outfit', sans-serif"
              }}>
                {NoticeIcon && <NoticeIcon size={20} />} {doc.notice.title}
              </h4>
              <p style={{ margin: 0, color: doc.notice.textColor, fontSize: 15, fontWeight: 500 }}>
                {doc.notice.desc}
              </p>
            </div>
          )}

          {/* DOCUMENT SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {doc.sections.map(section => (
              <section key={section.id} id={section.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 900, 
                    color: '#0f172a', 
                    margin: 0,
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {section.title}
                  </h2>
                  {section.badge && (
                    <div style={{ 
                      background: section.badge.bg, 
                      color: section.badge.color, 
                      padding: '4px 12px', 
                      borderRadius: 100, 
                      fontSize: 12, 
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      {section.badge.icon && <section.badge.icon size={13} />}
                      {section.badge.text}
                    </div>
                  )}
                </div>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

LegalDocumentLayout.propTypes = {
  doc: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    badgeText: PropTypes.string.isRequired,
    badgeIcon: PropTypes.elementType,
    badgeColor: PropTypes.string.isRequired,
    badgeBg: PropTypes.string,
    badgeBorder: PropTypes.string,
    lastUpdated: PropTypes.string.isRequired,
    notice: PropTypes.shape({
      icon: PropTypes.elementType,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      bg: PropTypes.string.isRequired,
      border: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired
    }),
    sections: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      sidebarTitle: PropTypes.string,
      badge: PropTypes.shape({
        text: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        bg: PropTypes.string.isRequired,
        icon: PropTypes.elementType
      }),
      content: PropTypes.node.isRequired
    })).isRequired
  }).isRequired
};
