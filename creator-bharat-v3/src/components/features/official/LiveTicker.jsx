import React from 'react';
import { motion } from 'framer-motion';

const liveFeed = [
  "Node 102 synced in Maharashtra",
  "Protocol v1.0 deployment started",
  "Security audit 100% completed",
  "New brand cluster synced in Delhi",
  "Regional shard update: UP-Node active"
];

export default function LiveTicker() {
  return (
    <div style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
      <div style={{ background: '#0f172a', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 12px', borderRadius: '4px', margin: '0 20px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px' }}>
         <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
         LIVE ACTIVITY
      </div>
      <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} style={{ display: 'flex', gap: '40px' }}>
         {liveFeed.concat(liveFeed).map((item, i) => (
           <span key={`${item}-${i}`} style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{item}</span>
         ))}
      </motion.div>
    </div>
  );
}
