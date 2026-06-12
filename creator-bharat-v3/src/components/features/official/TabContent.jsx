import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { OFFICIAL_DATA } from './officialData';
import IntelligenceHub from './IntelligenceHub';
import RoadmapTimeline from './RoadmapTimeline';
import MastermindSection from './MastermindSection';
import ReviewSlider from './ReviewSlider';
import InsightsGrid from './InsightsGrid';

export default function TabContent({ activeTab, mob }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
         {activeTab === 'posts' && (
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: mob ? '3px' : '28px' }}>
              {OFFICIAL_DATA.posts.map(post => {
                const Icon = post.icon;
                return (
                  <div key={post.id} style={{ aspectRatio: '1/1', background: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
                     <Icon size={40} color="#fff" />
                  </div>
                );
              })}
           </div>
         )}
         {activeTab === 'mastermind' && (
            <div>
               <IntelligenceHub mob={mob} />
               <div style={{ borderTop: '1px solid #f1f5f9', margin: '40px 0' }} />
               <RoadmapTimeline />
               <div style={{ borderTop: '1px solid #f1f5f9', margin: '40px 0' }} />
               <MastermindSection mob={mob} />
               <ReviewSlider mob={mob} />
            </div>
         )}
         {activeTab === 'insights' && <InsightsGrid mob={mob} />}
      </motion.div>
    </AnimatePresence>
  );
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  mob: PropTypes.bool.isRequired
};
