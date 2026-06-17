import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function StoryViewer({ highlight, onClose }) {
  const Icon = highlight.icon;
  const story = highlight.stories[0];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '40px', right: '20px', background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer' }} aria-label="Close story"><X size={32} /></button>
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center', color: '#0f172a', padding: '20px' }}>
         <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: highlight.color, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}><Icon size={40} /></div>
         <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>{story.title}</h2>
         <p style={{ fontSize: '16px', color: '#334155' }}>{story.text}</p>
         <div style={{ marginTop: '20px', color: '#64748b' }}>{story.date}</div>
      </div>
    </motion.div>
  );
}

StoryViewer.propTypes = { 
  highlight: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
    stories: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })).isRequired
  }).isRequired, 
  onClose: PropTypes.func.isRequired 
};
