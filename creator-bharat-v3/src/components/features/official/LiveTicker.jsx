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
    <div style={{ 
      background: 'rgba(9, 13, 22, 0.6)', 
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
      padding: '10px 0', 
      overflow: 'hidden', 
      whiteSpace: 'nowrap', 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', 
        color: '#fff', 
        fontSize: '10px', 
        fontWeight: 900, 
        padding: '5px 12px', 
        borderRadius: '100px', 
        margin: '0 20px', 
        zIndex: 10, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px',
        boxShadow: '0 0 15px rgba(255, 148, 49, 0.3)'
      }}>
         <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px #fff' }} />
         LIVE ACTIVITY
      </div>
      <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} style={{ display: 'flex', gap: '40px' }}>
         {liveFeed.concat(liveFeed).map((item, i) => (
           <span key={`${item}-${i}`} style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.3px' }}>{item}</span>
         ))}
      </motion.div>
    </div>
  );
}
