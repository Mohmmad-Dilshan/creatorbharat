import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';

// ─── Page Header ─────────────────────────────────────────────────────────────
// Unified pro SaaS page header used across all creator pages
export const CreatorPageHeader = ({ badge, title, subtitle, icon: Icon, action }) => (
  <div className="db-page-header">
    <div className="db-page-header-info">
      <div className="badge-saffron">
        {Icon && <Icon size={11} />}
        {badge}
      </div>
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="db-sub-text">{subtitle}</p>}
    </div>
    {action && <div style={{ flexShrink: 0 }}>{action}</div>}
  </div>
);

CreatorPageHeader.propTypes = {
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  action: PropTypes.node
};

// ─── Feature Grid ─────────────────────────────────────────────────────────────
export const CreatorFeatureGrid = ({ items }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
    {items.map((item, index) => {
      const Icon = item.icon;
      return (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
        >
          <Card style={{ padding: 24, height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: item.color || 'rgba(255,148,49,0.1)',
                color: item.iconColor || '#FF9431',
                display: 'grid', placeItems: 'center', flexShrink: 0
              }}>
                {Icon && <Icon size={20} />}
              </div>
              {item.status && <Bdg color={item.statusColor || 'saffron'}>{item.status}</Bdg>}
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{item.title}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: 13.5, lineHeight: 1.6, fontWeight: 500 }}>{item.description}</p>
            {item.onClick && (
              <Btn sm onClick={item.onClick} style={{ marginTop: 18, background: '#0f172a', color: '#fff', borderRadius: 10 }}>
                Open <ArrowRight size={13} />
              </Btn>
            )}
          </Card>
        </motion.div>
      );
    })}
  </div>
);

CreatorFeatureGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};
