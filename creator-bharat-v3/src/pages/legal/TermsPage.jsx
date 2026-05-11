import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Scale } from 'lucide-react';
import { Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

export default function TermsPage() {
  return (
    <div className="page-wrap bg-soft">
      <Seo 
        title="Terms of Service"
        description="Review the terms and conditions for using the CreatorBharat platform. Our policies ensure a fair and secure ecosystem for creators and brands."
        keywords="terms of service, user agreement, creator bharat policies"
      />
      <div className="article-wrap">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="article-card"
        >
          <Bdg color="orange" className="mb-24">AGREEMENT</Bdg>
          <h1 className="article-title">Terms of Service</h1>
          
          <div className="article-meta">
            <span className="flex items-center gap-8"><Clock size={14} /> Last Updated: May 2026</span>
            <span className="flex items-center gap-8"><Scale size={14} /> Legal Jurisdiction: Bhilwara</span>
          </div>

          <div className="article-body">
            <p>
              Welcome to CreatorBharat. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2>1. Platform Role</h2>
            <p>
              CreatorBharat is a decentralized talent discovery platform. We act as a facilitator between Creators and Brands. We do not act as an employer or agent for either party.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h2>3. Elite Score & Verification</h2>
            <p>
              The "Elite Score" is an AI-generated metric based on public data and internal audits. While we strive for 100% accuracy, this score is an estimate of influence and not a guarantee of campaign performance.
            </p>

            <h2>4. Payouts and Escrow</h2>
            <p>
              Payments for brand deals are managed through our secure Deal Desk. Funds are released to creators only after the brand confirms the receipt and approval of the agreed-upon deliverables.
            </p>

            <h2>5. Zero Commission Policy</h2>
            <p>
              We do not take a percentage cut from your deals. Our revenue is generated solely through transparent subscription plans. Brands and Creators are responsible for any applicable taxes (GST, TDS) as per Indian law.
            </p>

            <h2>6. Content Guidelines</h2>
            <p>
              Users must not post content that is illegal, harmful, or violates the intellectual property rights of others. We reserve the right to suspend any account that violates these standards.
            </p>
          </div>
        </motion.div>

        <div className="mt-48 text-center opacity-40 flex justify-center gap-24 font-bold text-xs">
           <span className="flex items-center gap-8"><FileText size={12} /> Binding Agreement</span>
           <span className="flex items-center gap-8"><Scale size={12} /> Indian IT Act 2000</span>
        </div>
      </div>
    </div>
  );
}
