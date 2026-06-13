export const CREATOR_PRICING = {
  '1m': { price: '₹499', period: 'month' },
  '6m': { price: '₹2,499', period: '6 months' },
  '1y': { price: '₹4,499', period: 'year' }
};

export const BRAND_PRICING = {
  '1m': { price: '₹4,999', period: 'month' },
  '6m': { price: '₹24,999', period: '6 months' },
  '1y': { price: '₹44,999', period: 'year' }
};

export const getCreatorPlans = (duration) => {
  const pricing = CREATOR_PRICING[duration] || CREATOR_PRICING['1m'];
  return [
    { 
      id: 'free', 
      name: 'Starter', 
      price: 'Free', 
      period: 'lifetime', 
      desc: 'Create your elite profile, access basic tools & view your dashboard.', 
      features: ['Basic Creator Dashboard', 'Smart Profile Builder', 'Standard Discovery Grid', 'View Campaigns Catalog', 'Public profile handle'], 
      cta: 'Start Free'
    },
    {
      id: 'pro', 
      name: 'Creator Pro', 
      price: pricing.price, 
      period: pricing.period, 
      desc: 'Unlock A4 resumes, verified badges, search prioritization, and brand pitching.', 
      promo: 'SPECIAL PROMO: 100% Free for first 100 Elite Creators (1 Month Trial!)',
      features: [
        'Cinematic Elite Portfolio', 
        'Dynamic A4 Media Kit PDF', 
        'Verified Blue Elite Badge', 
        'Top-Tier Search Priority (Top 1%)', 
        'Unlimited Campaign Applications', 
        'AI-Powered Profile SEO', 
        'Direct Chat with Verified Brands'
      ], 
      cta: 'Claim Pro Access'
    }
  ];
};

export const getBrandPlans = (duration) => {
  const pricing = BRAND_PRICING[duration] || BRAND_PRICING['1m'];
  return [
    { 
      id: 'brand_free', 
      name: 'Launchpad', 
      price: 'Free', 
      period: 'lifetime', 
      desc: 'Register your company and view standard creator catalog.', 
      features: ['Register Company Profile', 'Explore Creator Catalog', 'Filter & Save Favorites', 'Access Community Forums', 'Standard Dashboard View'], 
      cta: 'Start Scouting'
    },
    {
      id: 'brand_pro', 
      name: 'Enterprise', 
      price: pricing.price, 
      period: pricing.period, 
      desc: 'Launch unlimited active campaigns, outreach pitches & advanced smart indexing.', 
      promo: 'SPECIAL PROMO: Early Bird rate for first 100 Brands only! (Price rises by 50% after!)',
      features: [
        'Launch Unlimited Campaigns', 
        'Direct Outreach Pitch Console', 
        'Full A4 Creator Resume Access', 
        'Verified Gold Brand Badge', 
        'AI Smart Talent Matches', 
        'Advanced Analytics Dashboard', 
        '24/7 Premium Priority Support'
      ], 
      cta: 'Scale Your Brand'
    }
  ];
};

export const PRICING_FAQS = [
  { q: "Do you take any commission from brand deals?", a: "No, CreatorBharat is 100% commission-free. We do not take any cuts from your sponsorships, deals, or payouts. What you earn is entirely yours." },
  { q: "Can I cancel my subscription anytime?", a: "Yes, absolutely! You can cancel, upgrade, or downgrade your brand subscription at any point directly from your Settings dashboard. No questions asked." },
  { q: "What payment methods do you support?", a: "We support all major Indian credit/debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and corporate wallets through our highly secure payment gateway." },
  { q: "Is the Creator Pro badge permanent?", a: "Yes! Creator Pro unlocks your premium status immediately, giving you top discovery spots and the verified elite badge to boost your personal branding." }
];
