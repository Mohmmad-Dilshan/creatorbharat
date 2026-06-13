import { TrendingUp, Target, Users, DollarSign, Award, Globe2, ShieldCheck, Zap } from 'lucide-react';

export const ALL_STORIES = [
  {
    id: 'story-1',
    type: 'brand',
    brandName: 'Jaipur Heritage Apparel',
    niche: 'Fashion & Retail',
    location: 'Jaipur, Rajasthan',
    creatorName: 'Aryan Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    title: 'How Jaipur Heritage Apparel grew Sales by 3x in 30 Days 🚀',
    description: 'A traditional fashion brand in Jaipur struggled to reach Gen-Z consumers through social ads, which had high acquisition costs. Partnered with regional creators to curate authentic styling reels.',
    challenge: 'High customer acquisition cost (CAC) and zero regional awareness.',
    solution: 'Launched a hyperlocal styling mission with 3 verified local fashion creators on Instagram.',
    metrics: [
      { label: 'Sales Growth', value: '310%', icon: TrendingUp, color: '#10b981' },
      { label: 'CAC Reduced', value: '-42%', icon: Target, color: '#ef4444' },
      { label: 'Organic Reach', value: '1.2M+', icon: Users, color: '#3b82f6' }
    ],
    actionText: 'Collaborate with Aryan',
    actionPath: '/creators'
  },
  {
    id: 'story-2',
    type: 'creator',
    creatorName: 'Ramesh Dewangan',
    channelName: '@BastarCraftsVlog',
    niche: 'Art & Heritage',
    location: 'Bastar, Chhattisgarh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&q=80',
    title: 'From Bastar Village to National Brand Campaigns 🌟',
    description: 'Ramesh is a terracotta artisan in Chhattisgarh. Before joining CreatorBharat, he had no direct access to national brands. He now collaborates with major home decor brands across India.',
    challenge: 'Lack of brand access, pricing transparency, and modern identity tools.',
    solution: 'Created a verified digital creator profile on CreatorBharat, linking regional crafts to urban home design campaigns.',
    metrics: [
      { label: 'Earnings Secured', value: '₹3.5 Lakhs', icon: DollarSign, color: '#10b981' },
      { label: 'Followers Gained', value: '+180k', icon: Users, color: '#3b82f6' },
      { label: 'Direct Deals', value: '12 Campaigns', icon: Award, color: '#8b5cf6' }
    ],
    actionText: 'View Ramesh\'s Profile',
    actionPath: '/leaderboard'
  },
  {
    id: 'story-3',
    type: 'platform',
    title: 'DPIIT Registered Startup: 15,000+ Regional Identities Verified 🇮🇳',
    location: 'National Coverage',
    niche: 'Ecosystem Growth',
    banner: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    description: 'CreatorBharat has officially mapped and verified over 15,000 regional creators across 28 states in India. Under our Bharat-first outreach program, we have eliminated intermediate brokerage commissions.',
    challenge: 'Fragmented talent registry and high commission brokerages in Tier 2/3 cities.',
    solution: 'Designed the unified "Digital Pehchan" verified trust scores, standard escrow payments, and regional leaderboard hubs.',
    metrics: [
      { label: 'States Mapped', value: '28 States', icon: Globe2, color: '#ff9431' },
      { label: 'Platform Fee', value: '0% Brokerage', icon: ShieldCheck, color: '#10b981' },
      { label: 'Ecosystem Trust', value: '99.4% Secured', icon: Zap, color: '#8b5cf6' }
    ],
    actionText: 'Claim Your Profile Free',
    actionPath: '/join'
  },
  {
    id: 'story-4',
    type: 'brand',
    brandName: 'BharatRide Logistics',
    niche: 'Tech & Mobility',
    location: 'Indore, Madhya Pradesh',
    creatorName: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    title: 'Building Hyperlocal Brand Trust in Madhya Pradesh 🛡️',
    description: 'BharatRide needed rapid driver and passenger registrations across Indore and Bhopal. They launched humorous regional reaction campaigns using local MP creators.',
    challenge: 'High competition with international brands in regional markets.',
    solution: 'CreatorBharat matched the brand with MP-dialect micro-creators, resulting in highly organic, localized YouTube integration.',
    metrics: [
      { label: 'App Installs', value: '45k+', icon: TrendingUp, color: '#10b981' },
      { label: 'Driver Signups', value: '+180%', icon: Target, color: '#f59e0b' },
      { label: 'Regional Views', value: '2.5M+', icon: Users, color: '#8b5cf6' }
    ],
    actionText: 'Collaborate with Priya',
    actionPath: '/creators'
  },
  {
    id: 'story-5',
    type: 'creator',
    creatorName: 'Kabir Negi',
    channelName: '@PahadiVlogger',
    niche: 'Travel & Lifestyle',
    location: 'Dehradun, Uttarakhand',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    title: 'Securing Financial Autonomy in Uttarakhand Hills 🏔️',
    description: 'Kabir represents the travel and eco-tourism voice of Uttarakhand. By leveraging CreatorBharat\'s escrow wallet and zero platform commission structure, he earned corporate sponsorship contracts.',
    challenge: 'Delayed payments and lack of professional brand pitch materials.',
    solution: 'Used CreatorBharat\'s media kit generator and secure escrow milestone features to close deals with eco-tourism resorts.',
    metrics: [
      { label: 'Monthly Earnings', value: '₹85,000+', icon: DollarSign, color: '#10b981' },
      { label: 'Brand Sponsors', value: '8 Partners', icon: Award, color: '#ff9431' },
      { label: 'Engagement Rate', value: '11.8%', icon: TrendingUp, color: '#ef4444' }
    ],
    actionText: 'View Kabir\'s Profile',
    actionPath: '/leaderboard'
  }
];
