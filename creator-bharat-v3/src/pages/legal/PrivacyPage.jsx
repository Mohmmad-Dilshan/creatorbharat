import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Eye } from 'lucide-react';
import { Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

export default function PrivacyPage() {
  return (
    <div className="page-wrap bg-soft">
      <Seo 
        title="Privacy Policy"
        description="Learn how CreatorBharat protects your data and privacy. We are committed to transparency and security for all users."
        keywords="privacy policy, data protection, creator bharat security"
      />
      <div className="article-wrap">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="article-card"
        >
          <Bdg color="orange" className="mb-24">COMPLIANCE</Bdg>
          <h1 className="article-title">Privacy Policy</h1>
          
          <div className="article-meta">
            <span className="flex items-center gap-8"><Clock size={14} /> Last Updated: May 2026</span>
            <span className="flex items-center gap-8"><Shield size={14} /> Encrypted Storage</span>
          </div>

          <div className="article-body">
            <p>
              At CreatorBharat, we are committed to protecting your personal data and your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you create an account, complete your profile, or communicate with other users:
            </p>
            <ul>
              <li><strong>Identity Data:</strong> Name, age, and social media handles.</li>
              <li><strong>Verification Data:</strong> Identity documents for the Elite Badge process (highly encrypted).</li>
              <li><strong>Usage Data:</strong> How you interact with our discovery grid and dashboard.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              Your data is primarily used to provide and improve our talent discovery services:
            </p>
            <ul>
              <li>To calculate and display your Elite Score.</li>
              <li>To facilitate secure communication between creators and brands.</li>
              <li>To protect against fraudulent activities and bot followers.</li>
            </ul>

            <h2>3. Data Sharing and Transparency</h2>
            <p>
              We do not sell your personal data to third parties. Your profile information is visible to brands for discovery purposes, but your private contact details remain hidden until you choose to share them during a deal negotiation.
            </p>

            <h2>4. Security Measures</h2>
            <p>
              We implement enterprise-grade security protocols to ensure your data is safe. All sensitive information is encrypted at rest and in transit.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time through your account settings. For complex requests, you can reach out to our DPO (Data Protection Officer).
            </p>
          </div>
        </motion.div>

        <div className="mt-48 text-center opacity-40 flex justify-center gap-24 font-bold text-xs">
           <span className="flex items-center gap-8"><Eye size={12} /> Transparent Logic</span>
           <span className="flex items-center gap-8"><Shield size={12} /> Indian DPDP Act Compliant</span>
        </div>
      </div>
    </div>
  );
}
