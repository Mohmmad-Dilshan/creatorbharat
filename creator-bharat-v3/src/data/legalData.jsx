import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Info, 
  Cookie, 
  IndianRupee, 
  RotateCcw, 
  AlertCircle, 
  Scale, 
  ShieldAlert, 
  CheckCircle2, 
  BadgeCheck, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Briefcase, 
  Shield 
} from 'lucide-react';

export const PRIVACY_POLICY = {
  title: "Privacy Policy",
  description: "How CreatorBharat protects your data, KYC documents, and Escrow transactions.",
  badgeText: "Data Protection",
  badgeIcon: Lock,
  badgeColor: "#22C55E",
  badgeBg: "rgba(34, 197, 94, 0.1)",
  badgeBorder: "rgba(34, 197, 94, 0.2)",
  lastUpdated: "Last Updated: June 27, 2026",
  notice: {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "We do not sell your personal data. Period. As a financial intermediary managing Escrow transactions, your privacy and data security are our highest priorities.",
    bg: "rgba(34, 197, 94, 0.05)",
    border: "#22C55E",
    textColor: "#166534"
  },
  sections: [
    {
      id: "data-collection",
      title: "1. Information We Collect",
      content: (
        <div>
          <p>We collect information directly from you when you register, including your name, email, brand name, social media handles, and engagement metrics. For creators, we dynamically fetch public metrics via official APIs to calculate your CB Score.</p>
        </div>
      )
    },
    {
      id: "kyc-data",
      title: "2. KYC & Identity Data",
      content: (
        <div>
          <p>To prevent fraud and maintain the integrity of our Blue/Orange Ticks, we require KYC verification.</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Government IDs:</strong> Aadhaar, PAN, or GSTIN documents are processed by our secure third-party KYC partners. <em>We do not store raw images of your ID cards on our servers.</em></li>
            <li><strong>Bank Details:</strong> Account numbers and UPI IDs are collected solely for routing your Escrow payouts safely.</li>
          </ul>
        </div>
      )
    },
    {
      id: "data-sharing",
      title: "3. Data Sharing & Partners",
      content: (
        <div>
          <p>We only share data with essential infrastructure partners to make the platform work:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Razorpay:</strong> We share transaction data required to process Escrow payments and creator payouts securely.</li>
            <li><strong>KYC Verification Vendors:</strong> Standard verification checks are routed via encrypted APIs.</li>
            <li><strong>Social Media APIs:</strong> Public stats are fetched to recalculate scores (no account login details are shared).</li>
          </ul>
        </div>
      )
    },
    {
      id: "security",
      title: "4. Data Security",
      content: (
        <div>
          <p>All sensitive information, including bank details and transaction histories, is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We enforce regular vulnerability scans and strictly limit data access to authorized personnel.</p>
        </div>
      )
    },
    {
      id: "user-rights",
      title: "5. Your Privacy Rights",
      content: (
        <div>
          <p>You can manage, correct, or request the deletion of your account and personal details directly from your settings. For compliance under escrow guidelines, transaction record-keeping is retained for 7 years as legally mandated.</p>
        </div>
      )
    },
    {
      id: "grievance",
      title: "6. Grievance Officer (India DPDP Act 2023)",
      content: (
        <div>
          <p>In accordance with the Digital Personal Data Protection Act, 2023 (India), you may reach our designated Grievance Officer for any privacy-related concerns:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Name:</strong> Mohmmad Dilshan</li>
            <li><strong>Role:</strong> Founder &amp; Data Protection Officer</li>
            <li><strong>Email:</strong> privacy@creatorbharat.com</li>
            <li><strong>Address:</strong> CreatorBharat, Bhilwara, Rajasthan — 311001, India</li>
            <li><strong>Response Time:</strong> Within 30 days of receipt of grievance.</li>
          </ul>
        </div>
      )
    }
  ]
};

export const TERMS_OF_SERVICE = {
  title: "Terms of Service",
  description: "CreatorBharat Terms of Service and Escrow Marketplace Rules.",
  badgeText: "Legal Framework",
  badgeIcon: ShieldAlert,
  badgeColor: "#3B82F6",
  badgeBg: "rgba(59, 130, 246, 0.1)",
  badgeBorder: "rgba(59, 130, 246, 0.2)",
  lastUpdated: "Last Updated: June 27, 2026",
  notice: {
    icon: AlertCircle,
    title: "Important Notice",
    desc: "CreatorBharat is an Escrow-backed Marketplace. By using our platform, you agree to our strict zero-tolerance policy against off-platform payments and fake engagement metrics.",
    bg: "rgba(255, 148, 49, 0.1)",
    border: "#FF9431",
    textColor: "#9A3412"
  },
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <div>
          <p>By accessing or using CreatorBharat (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not access the Platform. The Platform connects verified Brands with verified Creators for influencer marketing campaigns.</p>
        </div>
      )
    },
    {
      id: "escrow",
      title: "2. The Escrow Contract",
      content: (
        <div>
          <p>To protect both parties, all campaign payments are processed via our secure Escrow system powered by Razorpay.</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Brand Deposit:</strong> A brand must deposit 100% of the campaign funds into Escrow before a Creator begins work.</li>
            <li><strong>Creator Guarantee:</strong> Once funds are in Escrow, the Creator is guaranteed payment upon successful delivery of the agreed-upon content.</li>
            <li><strong>72-Hour Auto-Approval:</strong> If a Creator submits their deliverable and the Brand does not request a revision or approve it within 72 hours, the Escrow will automatically release funds to the Creator.</li>
          </ul>
        </div>
      )
    },
    {
      id: "fees",
      title: "3. Fees & Zero Commission",
      content: (
        <div>
          <p>We charge creators 0% lifetime commission on their standard deals. We charge a standard platform technology service fee on campaigns to brands, which covers Escrow maintenance, Razorpay processing costs, and verification procedures.</p>
        </div>
      )
    },
    {
      id: "off-platform",
      title: "4. Off-Platform Bans",
      content: (
        <div>
          <p>Any attempt to bypass CreatorBharat by proposing direct payments off-platform will result in an immediate and permanent suspension of both the Brand and Creator accounts. Any pending Escrow funds may be returned to the brand or frozen for dispute resolution.</p>
        </div>
      )
    },
    {
      id: "liability",
      title: "5. Limitation of Liability",
      content: (
        <div>
          <p>CreatorBharat acts as a technological facilitator and escrow intermediary. We are not responsible for the creative quality of deliverables or disputes that arise from custom oral contracts. All agreements must be locked inside our campaign builders to be eligible for mediation.</p>
        </div>
      )
    },
    {
      id: "disputes",
      title: "6. Dispute Resolution",
      content: (
        <div>
          <p>Disputes regarding deliverables must be initiated via the "Request Revision" action before the 72-hour auto-approval window closes. If mediation is needed, the decision of the CreatorBharat dispute board (informed by campaign brief specifications) will be final and binding.</p>
        </div>
      )
    }
  ]
};

export const COOKIE_POLICY = {
  title: "Cookie Policy",
  description: "How CreatorBharat uses cookies to ensure platform security and accurate tracking.",
  badgeText: "Tracking & Analytics",
  badgeIcon: Cookie,
  badgeColor: "#A855F7",
  badgeBg: "rgba(168, 85, 247, 0.1)",
  badgeBorder: "rgba(168, 85, 247, 0.2)",
  lastUpdated: "Last Updated: June 27, 2026",
  notice: {
    icon: Info,
    title: "Transparency First",
    desc: "We do not use intrusive third-party advertising cookies. Our cookies are strictly used to keep your financial session secure and to track real engagement metrics.",
    bg: "rgba(168, 85, 247, 0.05)",
    border: "#A855F7",
    textColor: "#7E22CE"
  },
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What are Cookies?",
      content: (
        <div>
          <p>Cookies are small text files stored on your device when you visit CreatorBharat. They help our platform remember your login session, so you don't have to re-authenticate every time you click a new page inside your dashboard.</p>
        </div>
      )
    },
    {
      id: "how-we-use",
      title: "2. How We Use Them",
      content: (
        <div>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Essential (Auth):</strong> JWT tokens stored securely to maintain your logged-in state. Without these, you cannot access your Wallet or Applications.</li>
            <li><strong>Security:</strong> CSRF protection tokens to ensure your Escrow transactions cannot be hijacked.</li>
            <li><strong>Performance:</strong> Caching heavily-loaded pages (like the Creator Marketplace) so they load instantly on your next visit.</li>
          </ul>
        </div>
      )
    },
    {
      id: "cb-score",
      title: "3. CB Score Analytics",
      content: (
        <div>
          <p>For Creators, we utilize first-party analytics to track profile views and engagement from Brands. This data feeds directly into your CB Score. We do NOT share this tracking data with external data brokers.</p>
        </div>
      )
    },
    {
      id: "managing",
      title: "4. Managing Cookies",
      content: (
        <div>
          <p>You can restrict, block, or delete cookies via your browser settings. However, doing so will log you out of your account and disable active campaign notifications, wallets, and dashboard facilities.</p>
        </div>
      )
    }
  ]
};

export const REFUND_POLICY = {
  title: "Refund & Escrow Policy",
  description: "Understand how our zero-risk Escrow system protects your money.",
  badgeText: "Financial Security",
  badgeIcon: IndianRupee,
  badgeColor: "#FF9431",
  badgeBg: "rgba(255, 148, 49, 0.1)",
  badgeBorder: "rgba(255, 148, 49, 0.2)",
  lastUpdated: "Last Updated: June 27, 2026",
  notice: {
    icon: Scale,
    title: "The Escrow Philosophy",
    desc: "CreatorBharat holds campaign funds in a neutral Razorpay Escrow account. The money is never released to the creator until the brand approves the work, but it is also securely locked away from the brand so the creator knows they will definitely get paid.",
    bg: "rgba(255, 255, 255, 0.95)",
    border: "#e2e8f0",
    textColor: "#475569"
  },
  sections: [
    {
      id: "escrow-mechanics",
      title: "1. How Escrow Works",
      content: (
        <div>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>Brand deposits funds via UPI/Card/NetBanking.</li>
            <li>Funds are held securely by Razorpay Nodal Accounts.</li>
            <li>Creator submits the final deliverable link/video file.</li>
            <li>Brand clicks "Approve".</li>
            <li>Funds are instantly routed to the Creator's bank account via RazorpayX.</li>
          </ul>
        </div>
      )
    },
    {
      id: "brand-refunds",
      title: "2. When Brands Get Refunded",
      badge: {
        text: "REFUND",
        color: "#DC2626",
        bg: "rgba(239, 68, 68, 0.1)",
        icon: RotateCcw
      },
      content: (
        <div>
          <p>Brands are entitled to a full 100% refund of the escrow amount in the following situations:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Non-Delivery:</strong> The creator fails to submit the agreed deliverable within 48 hours after the deadline.</li>
            <li><strong>Ghosting:</strong> The creator fails to respond to brand messages inside the portal for 4 days.</li>
            <li><strong>Incomplete Specs:</strong> The content does not meet major specifications outlined in the campaign brief (e.g. wrong product link used).</li>
          </ul>
        </div>
      )
    },
    {
      id: "creator-guarantee",
      title: "3. When Creators Get Paid",
      badge: {
        text: "GUARANTEE",
        color: "#16A34A",
        bg: "rgba(22, 163, 74, 0.1)",
        icon: CheckCircle2
      },
      content: (
        <div>
          <p>Creators are guaranteed payouts and cannot be defrauded by brands:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><strong>Auto-Approval:</strong> If the content is submitted and the brand does not request revisions or approve it within 72 hours, the platform auto-releases the payment.</li>
            <li><strong>Unreasonable Demands:</strong> Brands cannot ask for infinite revisions. Revisions are capped at 2 rounds unless custom campaigns state otherwise.</li>
          </ul>
        </div>
      )
    },
    {
      id: "disputes",
      title: "4. Dispute Timeline",
      content: (
        <div>
          <p>If a dispute arises, the campaign funds remain locked in Escrow. CreatorBharat will inspect the chat logs and brief specifications. A resolution is delivered within 5 working days, and the escrow funds are disbursed accordingly.</p>
        </div>
      )
    }
  ]
};

export const CREATOR_GUIDELINES = {
  title: "Creator Guidelines",
  description: "Strict rules and guidelines for creators on the CreatorBharat Escrow platform.",
  badgeText: "Creator Rules",
  badgeIcon: BadgeCheck,
  badgeColor: "#3B82F6",
  badgeBg: "rgba(59, 130, 246, 0.1)",
  badgeBorder: "rgba(59, 130, 246, 0.2)",
  lastUpdated: "Last Updated: June 27, 2026",
  notice: {
    icon: AlertTriangle,
    title: "The Strike System",
    desc: "Violating these guidelines results in strikes against your profile. Three strikes lead to a permanent ban and the revocation of your Verified Badge and CB Score.",
    bg: "rgba(239, 68, 68, 0.05)",
    border: "#EF4444",
    textColor: "#991B1B"
  },
  sections: [
    {
      id: "authenticity",
      title: "1. Authenticity & Fake Followers",
      content: (
        <div>
          <p>Your CB Score is built on trust. If our system detects an artificial inflation of followers, likes, or comments (via bots or engagement pods):</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>Your profile will be immediately suspended.</li>
            <li>Any active Escrow funds will be frozen.</li>
            <li>Your CB Score will be permanently reset to 0.</li>
          </ul>
        </div>
      )
    },
    {
      id: "delivery",
      title: "2. The 48-Hour Delivery Rule",
      badge: {
        text: "STRICT",
        color: "#D97706",
        bg: "rgba(245, 158, 11, 0.1)",
        icon: Clock
      },
      content: (
        <div>
          <p>Once a Brand deposits funds into Escrow and you accept the campaign, the clock starts. If you fail to submit the first draft of the deliverable within the agreed timeline (or ghost the brand for 48 hours past the deadline):</p>
          <p><strong>The brand is entitled to a full, automatic refund from Escrow.</strong> You will receive a strike, and your 'Completion Rate' metric will drop, directly affecting your ability to get future deals.</p>
        </div>
      )
    },
    {
      id: "quality",
      title: "3. Content Quality & Revisions",
      content: (
        <div>
          <p>Creators must follow the campaign brief guidelines. Revisions requested by the brand must be addressed within 24 hours. If you refuse to make revisions that were explicitly mentioned in the original campaign brief, the dispute team will side with the brand.</p>
        </div>
      )
    },
    {
      id: "professionalism",
      title: "4. Professional Conduct",
      content: (
        <div>
          <p>Communications must remain professional and respectful. Abusive language, blackmail, or demanding extra payments off-platform will result in an immediate ban from the marketplace.</p>
        </div>
      )
    }
  ]
};

export const BRAND_GUIDELINES = {
  title: "Brand Guidelines",
  description: "Strict rules and guidelines for brands on the CreatorBharat Escrow platform.",
  badgeText: "Brand Rules",
  badgeIcon: Briefcase,
  badgeColor: "#FF9431",
  badgeBg: "rgba(255, 148, 49, 0.1)",
  badgeBorder: "rgba(255, 148, 49, 0.2)",
  lastUpdated: "Last Updated: June 27, 2026",
  notice: {
    icon: Shield,
    title: "Escrow Mandate",
    desc: "CreatorBharat is a secure ecosystem. To protect creator efforts, brands must deposit 100% of the agreed campaign funds into Escrow before work begins.",
    bg: "rgba(255, 148, 49, 0.05)",
    border: "#FF9431",
    textColor: "#9A3412"
  },
  sections: [
    {
      id: "escrow-deposit",
      title: "1. Mandatory Escrow Deposit",
      content: (
        <div>
          <p>Work cannot start on promises. Once a creator accepts your offer, you must fund the Escrow within 48 hours. If the deposit is not completed, the campaign is auto-cancelled, and your Brand Trust rating will decline.</p>
        </div>
      )
    },
    {
      id: "brief-clarity",
      title: "2. Brief Clarity & Revision Caps",
      badge: {
        text: "STRICT CAP",
        color: "#DC2626",
        bg: "rgba(239, 68, 68, 0.1)",
        icon: Zap
      },
      content: (
        <div>
          <p>Outline all specifications (product positioning, banned words, hashtags) clearly in the initial brief. You cannot request revisions on parameters that were not part of the initial brief. <strong>Revisions are strictly capped at 2 rounds</strong> to protect creator time.</p>
        </div>
      )
    },
    {
      id: "fair-evaluation",
      title: "3. Fair Evaluation & Timelines",
      content: (
        <div>
          <p>You have 72 hours from content submission to review deliverables and request revisions. If you do not respond, the system automatically approves the campaign and releases the Escrow funds to the creator. No manual refunds can be processed after funds are released.</p>
        </div>
      )
    },
    {
      id: "conduct",
      title: "4. Professional Conduct & Payment Safety",
      content: (
        <div>
          <p>Negotiations or payments conducted off-platform will trigger an automatic security lock on your account. Any funds currently in Escrow for other campaigns will be locked pending investigation. Support local regional voices with respect and professional clarity.</p>
        </div>
      )
    }
  ]
};
