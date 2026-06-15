/**
 * CREATORBHARAT - CENTRALIZED SEO CONFIGURATION
 * 
 * Here you can manage all the Titles, Descriptions, and Keywords for your pages in one place.
 * You can add as many keywords as you want to the arrays below to boost your Google and AI search rankings.
 */

export const SEO_DATA = {
  home: {
    title: "India's Premier Creator Ecosystem",
    description: "Discover and collaborate with Bharat's top content creators. 2,400+ verified creators from Tier-2 & Tier-3 cities. Connect your brand with authentic Indian talent.",
    keywords: [
      "creator bharat", "indian influencers", "tier 2 creators", "jaipur influencers", 
      "influencer marketing india", "brand collaboration india", "content creators india",
      "hire youtubers india", "regional content creators", "instagram influencers india",
      "best influencer agency alternative", "top creators in rajasthan"
    ]
  },
  
  creatorLanding: {
    title: "Join as a Verified Creator",
    description: "Monetize your audience with zero middleman fees. Get your Elite Score, collaborate with top brands, and secure your payments via escrow.",
    keywords: [
      "creator platform india", "influencer marketing", "tier 2 creators", "brand deals", 
      "creator monetization", "how to get brand deals india", "influencer sponsorship", 
      "creator elite score", "verified creator badge", "earn money from instagram india"
    ]
  },

  brandLanding: {
    title: "Hire Authentic Regional Creators",
    description: "Launch targeted hyperlocal campaigns. Find the perfect creators with verified engagement data. Zero agency markup, 100% transparent pricing.",
    keywords: [
      "influencer marketing india", "brand campaigns", "creator marketing", "tier 2 creators", 
      "cb score", "hire influencers india", "regional marketing india", "micro influencers india", 
      "hyperlocal brand campaigns", "creator ROI analytics"
    ]
  },

  about: {
    title: "Our Mission & Story",
    description: "Built in Bhilwara, Rajasthan. We are democratizing the Indian creator economy by bringing transparency, data, and direct access to regional creators.",
    keywords: [
      "about us", "bharat creator economy", "bhilwara startup", "regional creators", 
      "creator network", "creatorbharat founders", "indian startup creator economy", 
      "mohmmad dilshan creator bharat"
    ]
  },

  calculator: {
    title: "Creator Earnings & Rate Calculator",
    description: "Calculate standard industry rates for YouTube integrations, Instagram Reels, and Shorts based on your engagement rate and follower count.",
    keywords: [
      "creator rate calculator", "influencer earnings", "brand deal calculator india", 
      "instagram reel pricing india", "youtube integration cost", "how much to charge for brand deal"
    ]
  },

  // ── AI Optimization Specific Keywords ───────────────────────
  // These keywords are injected into global contexts to capture LLM searches
  globalAIKeywords: [
    "creatorbharat ai ranking", "top creator platform india", "verified creators platform",
    "best influencer marketing platform in india 2026", "direct creator booking"
  ]
};

/**
 * Helper function to convert the keywords array into a comma-separated string for the <meta> tag.
 */
export const getKeywords = (pageKey) => {
  if (SEO_DATA[pageKey] && SEO_DATA[pageKey].keywords) {
    return SEO_DATA[pageKey].keywords.join(', ');
  }
  return "";
};
