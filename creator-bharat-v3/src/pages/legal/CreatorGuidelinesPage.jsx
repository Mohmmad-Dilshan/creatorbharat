import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

export default function CreatorGuidelinesPage() {
  return (
    <div className="page-wrap bg-soft">
      <Seo 
        title="Creator Guidelines"
        description="Review the professional standards and guidelines for creators on the CreatorBharat platform. Build trust and scale your influence."
        keywords="creator guidelines, influencer standards, elite creator policy, brand deal etiquette"
      />
      <div className="article-wrap">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="article-card"
        >
          <Bdg color="green" className="mb-24">PROFESSIONALISM</Bdg>
          <h1 className="article-title">Creator Guidelines</h1>
          
          <div className="article-meta">
            <span className="flex items-center gap-8"><Star size={14} className="text-orange-500" /> Building Trust</span>
            <span className="flex items-center gap-8"><ShieldCheck size={14} className="text-green-500" /> Professional Standards</span>
          </div>

          <div className="article-body">
            <p>
              To maintain the "Elite" status of the CreatorBharat marketplace, we expect all our creators to follow these professional guidelines. High adherence leads to better Elite Scores and more brand opportunities.
            </p>

            <h2>1. Authenticity & Transparency</h2>
            <p>
              Your profile must represent your real identity. We have a zero-tolerance policy for fake followers, bot engagement, or deceptive metrics.
            </p>
            <ul>
              <li>Disclose sponsored content as per ASCI guidelines.</li>
              <li>Keep your follower demographics updated.</li>
              <li>Use only organic methods to grow your reach.</li>
            </ul>

            <h2>2. Communication Excellence</h2>
            <p>
              Brands value fast and clear communication. Respond to deal inquiries within 24-48 hours to maintain your reliability rating.
            </p>

            <h2>3. Quality of Deliverables</h2>
            <p>
              Every mission has specific requirements. Ensure your content meets the brand's aesthetic and technical standards before submitting it for approval.
            </p>

            <h2>4. Commitment to Deadlines</h2>
            <p>
              Missing a deadline without prior notification can lead to a significant drop in your Elite Score and potential removal from the discovery grid.
            </p>

            <div className="p-32 bg-orange-50 rounded-24 border border-orange-100 mt-48">
               <h3 className="text-lg font-black text-orange-900 flex items-center gap-12 mb-12">
                 <AlertTriangle size={20} /> Violations
               </h3>
               <p className="text-orange-800 text-sm font-medium leading-relaxed">
                 Serious violations like payment bypassing, harassment, or fraudulent metrics will result in permanent suspension of your CreatorBharat identity.
               </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-48 text-center opacity-40 flex justify-center gap-24 font-bold text-xs">
           <span className="flex items-center gap-8"><Zap size={12} /> Be Elite</span>
           <span className="flex items-center gap-8"><Star size={12} /> Earn More</span>
        </div>
      </div>
    </div>
  );
}
