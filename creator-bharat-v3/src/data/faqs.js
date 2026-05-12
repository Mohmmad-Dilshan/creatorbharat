import { 
  HelpCircle, 
  Users, 
  Target, 
  Wallet, 
  Lock,
  Zap,
  ShieldCheck,
  Award
} from 'lucide-react';

export const FAQ_CATEGORIES = [
  { id: 'all', name: 'All Questions', icon: HelpCircle },
  { id: 'general', name: 'General', icon: Zap },
  { id: 'creators', name: 'For Creators', icon: Users },
  { id: 'brands', name: 'For Brands', icon: Target },
  { id: 'payments', name: 'Payments', icon: Wallet },
  { id: 'security', name: 'Security & Legal', icon: Lock }
];

export const FAQS = [
  // GENERAL
  {
    cat: 'General',
    q: 'What is CreatorBharat and how does it empower the creator economy?',
    a: 'CreatorBharat is India\'s first elite-grade ecosystem designed to bridge the gap between talented creators and high-growth brands. Unlike traditional agencies, we provide an automated platform where data drives decisions. We empower creators with verified digital identities and brands with hyper-accurate audience insights, ensuring every campaign is a success from Bhilwara to Bangalore.'
  },
  {
    cat: 'General',
    q: 'Is CreatorBharat available in regional languages?',
    a: 'While our platform interface is primarily in English to maintain global standards, our discovery engine is built for Bharat. You can filter creators based on over 12 regional languages including Hindi, Rajasthani, Marathi, Bengali, and Tamil. We believe talent has no language barrier.'
  },
  {
    cat: 'General',
    q: 'How do I get the "Elite Verified" badge?',
    a: 'The Elite Verified badge is not just a status symbol; it\'s a mark of trust. To earn it, you must complete your profile 100%, link your active social media accounts for data verification, and pass our "Identity & Quality" audit. This badge increases your visibility to brands by up to 300%.'
  },

  // CREATORS
  { 
    cat: 'Creators', 
    q: 'What are the benefits of the Pro plan for Creators?', 
    a: 'The Pro plan is designed for creators who are serious about their career. It includes: 1) A Verified Blue Badge, 2) Priority placement in brand searches, 3) Unlimited deal applications, 4) An AI-generated SEO profile article that ranks on Google, and 5) Exclusive access to CreatorBharat networking events.' 
  },
  { 
    cat: 'Creators', 
    q: 'How does the "Elite Score" affect my profile?', 
    a: 'Your Elite Score is a proprietary metric (0-100) calculated based on your engagement rate, audience growth, content consistency, and authenticity. A higher score means more trust from brands. You can improve your score by maintaining a high response rate to brand inquiries and consistently delivering high-quality content.' 
  },
  { 
    cat: 'Creators', 
    q: 'Can I manage multiple social media accounts on one profile?', 
    a: 'Yes! CreatorBharat allows you to link Instagram, YouTube, and LinkedIn to a single unified dashboard. This gives brands a holistic view of your total reach across the entire ecosystem.' 
  },
  { 
    cat: 'Creators', 
    q: 'What happens if a brand doesn\'t pay on time?', 
    a: 'Our platform uses a secure escrow-inspired system. When you start a campaign, the brand\'s budget is verified. If you deliver the work as per the agreement and it\'s approved, your payment is guaranteed. Our support team is always ready to mediate any disputes.' 
  },

  // BRANDS
  {
    cat: 'Brands',
    q: 'How do you verify the authenticity of a creator\'s audience?',
    a: 'We use advanced API integrations and our proprietary "Bot Detection" algorithm to analyze follower growth patterns and engagement quality. We flag any suspicious activity (like sudden spikes in bot followers) to ensure brands only invest in real, human reach.'
  },
  {
    cat: 'Brands',
    q: 'Can we run hyper-local campaigns in specific cities?',
    a: 'Absolutely. Our platform allows you to filter creators by city and state. Whether you want to target the youth of Jaipur or the tech community in Bangalore, you can find the perfect local voices for your brand mission.'
  },
  {
    cat: 'Brands',
    q: 'What are "Enterprise Solutions" on CreatorBharat?',
    a: 'Enterprise solutions are for large-scale brands and agencies. They include dedicated account managers, bulk creator recruitment, API access for your internal tools, and white-labeled performance reports for your clients.'
  },
  {
    cat: 'Brands',
    q: 'How do we track the ROI of our influencer campaigns?',
    a: 'Every campaign on CreatorBharat comes with a detailed analytics dashboard. You can track total impressions, clicks, sentiment analysis, and even conversion data if you use our integrated tracking links.'
  },

  // PAYMENTS
  {
    cat: 'Payments',
    q: 'When do I receive my payment after a campaign ends?',
    a: 'Payments are processed within 7-10 working days after the brand approves the final deliverables. Pro members enjoy "FastTrack Payments," where funds are released within 48 hours of approval.'
  },
  {
    cat: 'Payments',
    q: 'Are there any platform fees for creators?',
    a: 'For basic members, we charge a small 10% facilitation fee on successfully completed deals. Pro members enjoy a reduced fee of just 5%, allowing you to keep more of what you earn.'
  },
  {
    cat: 'Payments',
    q: 'How do brands pay for the campaigns?',
    a: 'Brands can pay via UPI, Credit/Debit cards, or Net Banking. For enterprise clients, we also support bank transfers and monthly invoicing.'
  },

  // SECURITY & LEGAL
  { 
    cat: 'Security & Legal', 
    q: 'Is my personal data safe with CreatorBharat?', 
    a: 'Data security is our top priority. Your personal contact details (Email/Phone) are encrypted and never shared with brands without your permission. We are fully compliant with Indian data protection guidelines.' 
  },
  { 
    cat: 'Security & Legal', 
    q: 'Who owns the content created for a brand campaign?', 
    a: 'Unless otherwise specified in the deal contract, the creator retains the copyright of the content, but the brand is granted a usage license for a specific period. You can negotiate these terms directly in the "Elite Deal Portal".' 
  },
  { 
    cat: 'Security & Legal', 
    q: 'How do you handle fraudulent accounts?', 
    a: 'We have a zero-tolerance policy for fraud. Any account found using fake IDs, bot engagement, or engaging in payment fraud is permanently banned from the platform. We maintain a "Blacklist" shared with our brand partners.' 
  }
];

export const QUICK_GUIDES = [
  { t: 'Security Protocols', icon: ShieldCheck, d: 'How we verify creator identities and protect your data.' },
  { t: 'Monetization 101', icon: Zap, d: 'A step-by-step guide to landing your first major brand deal.' },
  { t: 'Brand Manual', icon: Target, d: 'Strategies for brands to optimize their campaign ROI.' },
  { t: 'Elite Standards', icon: Award, d: 'What it takes to become a top-tier creator on our platform.' }
];
