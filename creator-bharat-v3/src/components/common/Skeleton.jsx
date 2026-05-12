import React from 'react';
import PropTypes from 'prop-types';

export function Skeleton(props) {
  const { width = '100%', height = 20, borderRadius = 12, style = {} } = props;
  return (
    <div 
      className="skeleton-pulse"
      style={{ 
        width, 
        height, 
        borderRadius, 
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', 
        backgroundSize: '200% 100%', 
        ...style 
      }} 
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object
};

export function SkeletonCard({ mob }) {
  return (
    <div style={{ 
      background: '#fff', borderRadius: mob ? 24 : 32, overflow: 'hidden', 
      border: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%' 
    }}>
      {/* HERO AREA */}
      <Skeleton height={mob ? 80 : 150} borderRadius={0} />
      
      <div style={{ padding: mob ? '0 12px 16px' : '0 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AVATAR & SCORE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: mob ? -24 : -48, marginBottom: 16 }}>
           <Skeleton width={mob ? 48 : 96} height={mob ? 48 : 96} borderRadius={mob ? 16 : 28} style={{ border: '4px solid #fff' }} />
           <Skeleton width={mob ? 40 : 60} height={mob ? 20 : 28} borderRadius={12} />
        </div>

        {/* BIO */}
        <Skeleton width="80%" height={mob ? 20 : 28} borderRadius={8} style={{ marginBottom: 8 }} />
        <Skeleton width="40%" height={mob ? 14 : 18} borderRadius={6} style={{ marginBottom: 20 }} />

        {/* TAGS */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
           <Skeleton width={60} height={24} borderRadius={100} />
           <Skeleton width={80} height={24} borderRadius={100} />
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, paddingTop: 16, borderTop: '1px dashed #f1f5f9', marginTop: 'auto' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Skeleton width="100%" height={16} />
              <Skeleton width="60%" height={10} />
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Skeleton width="100%" height={16} />
              <Skeleton width="60%" height={10} />
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Skeleton width="100%" height={16} />
              <Skeleton width="60%" height={10} />
           </div>
        </div>
      </div>

      <style>{`
        .skeleton-pulse {
          animation: skeleton-shimmer 1.5s infinite;
        }
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

SkeletonCard.propTypes = {
  mob: PropTypes.bool
};

export default Skeleton;
