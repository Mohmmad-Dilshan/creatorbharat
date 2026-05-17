/**
 * seedData.js
 * 
 * High-quality fallback data for the platform when the API is unavailable.
 * Ensures the 'Elite' aesthetics are maintained even during backend downtime.
 */

export const SEED_CREATORS = [
  {
    id: 'arjun-kapoor',
    name: 'Arjun Kapoor',
    handle: 'arjun-kapoor',
    slug: 'arjun-kapoor',
    followers: 1200000,
    niche: ['Automobile', 'Lifestyle', 'Tech'],
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'An elite storyteller, lifestyle connoisseur, and automotive reviewer crafting cinematic narratives at the intersection of future technology and daily premium lifestyle across Bharat.',
    likes: 14582,
    tagline: 'Bridging elite luxury automobiles, futuristic tech, and authentic Indian storytelling.',
    philosophy: "Content creation isn't just about demonstrating silicon specifications or horsepower; it's about building a desire and connecting with the heart of every tech and auto lover in Bharat.",
    ai_intel: {
      match: '98%',
      summary: 'Vibrant Cinematic Editing, Luxury Niche Authority, and High Conversion ROI Potential',
      stats: [
        { l: 'Brand Safety', v: '99% Secure' },
        { l: 'Retention Score', v: 'Excellent' },
        { l: 'ROI Potential', v: '5.2x' }
      ]
    },
    audience_desc: 'Arjun dominates premium urban demographics with a strong affinity for automobile upgrades, smartphone launches, and premium lifestyle acquisitions.',
    audience_hubs: [
      { l: 'Mumbai Metro', d: '48% Majority', p: 48 },
      { l: 'Delhi NCR', d: '32% Strong', p: 32 },
      { l: 'Pune & Bangalore', d: '20% Reach', p: 20 }
    ],
    expertise: [
      { t: 'Cinematography', items: ['Anamorphic Capture', 'Automotive Color Correction'], c: '#FF9431' },
      { t: 'Creative Writing', items: ['Hinglish Hooks', 'Engagement Retention Loops'], c: '#0ea5e9' },
      { t: 'Strategic Analytics', items: ['ROI Benchmarking', 'Conversion Campaign Paths'], c: '#10B981' }
    ],
    local_voice: "Being based in Mumbai gives me direct access to India's premium creative heart. My local hub presence connects brands natively to India's most affluent urban and regional demographics.",
    local_hubs: ['Mumbai', 'Delhi NCR', 'Pune'],
    local_penetration: '94%',
    local_collab: true,
    viral_content: [
      { views: '2.4M', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400' },
      { views: '1.8M', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400' },
      { views: '3.1M', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400' }
    ],
    case_studies: [
      { title: 'BMW India Premium X5 Launch', brand: 'BMW India', results: [{ l: 'Reach', v: '3.2M' }, { l: 'ROI', v: '5.2x' }] },
      { title: 'OnePlus 12 Launch Campaign', brand: 'OnePlus Bharat', results: [{ l: 'Clicks', v: '120K' }, { l: 'Sales Hub', v: '22K+' }] },
      { title: 'Premium Audio Drop', brand: 'Pioneer Gear', results: [{ l: 'Views', v: '2.1M' }, { l: 'Shares', v: '28K' }] }
    ],
    services: [
      { t: 'Cinematic Car Reviews', d: 'Custom-graded anamorphic 4K cinematic video reels featuring high-conversion visual storytelling.', c: '#FF9431' },
      { t: 'High-Retention Tech Placements', d: 'Premium native product integration in regular daily lifestyle segments.', c: '#0ea5e9' },
      { t: 'Strategic Collaborations', d: 'Consultations on targeting tier-1 urban tech-consumers and premium lifestyle buyers.', c: '#10b981' }
    ],
    packages: [
      { l: 'Premium Reel Launch', v: '₹45,000', pop: false, items: ['1 Premium 4K Reel', '3 Sequential Stories', 'Link in Bio (48 hours)', 'Full Color Grading'] },
      { l: 'Elite Impact Hub Campaign', v: '₹95,000', pop: true, items: ['3 Premium Reels', '5 Instagram Stories', 'Professional Scriptwriting', 'Audience Analytics Report', 'Usage Rights (3mo)'] },
      { l: 'Official Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Appearances'] }
    ],
    reviews: [
      { b: 'BMW India', r: 5, t: 'Absolutely elite execution. The premium X5 launch campaign delivered outstanding demographic retention.', u: 'Marketing Director', d: '1 week ago', type: 'brand', id: 'bmw' },
      { b: 'OnePlus Bharat', r: 5, t: 'The cinematic technology review reel was highly artistic and authentic. Outstanding conversion results!', u: 'Brand Lead', d: '3 weeks ago', type: 'brand', id: 'oneplus' },
      { b: 'Pioneer Gear', r: 5, t: 'Very cooperative, punctual, and strictly professional with creative revisions. Perfect alignment.', u: 'PR Manager', d: '2 months ago', type: 'brand', id: 'pioneer' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { id: 's1', name: 'Aman Deep', handle: 'amandeep', followers: 125000, niche: ['Tech', 'Lifestyle'], city: 'Mumbai', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 's2', name: 'Priya Sharma', handle: 'priya_vlogs', followers: 85000, niche: ['Travel', 'Fashion'], city: 'Delhi', state: 'Delhi', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 's3', name: 'Rohan Mehta', handle: 'rohanfit', followers: 210000, niche: ['Fitness', 'Health'], city: 'Bangalore', state: 'Karnataka', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 's4', name: 'Sanya Gupta', handle: 'sanya_cooks', followers: 45000, niche: ['Food', 'Culture'], city: 'Jaipur', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { id: 's5', name: 'Vikram Singh', handle: 'vik_tech', followers: 320000, niche: ['Tech', 'Gaming'], city: 'Hyderabad', state: 'Telangana', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' }
];

export const SEED_CAMPAIGNS = [
  { id: 'c1', title: 'Summer Collection Launch', brand: 'Nykaa', budget: 500000, targetCity: 'Mumbai', status: 'active' },
  { id: 'c2', title: 'Tech Review Series', brand: 'Samsung', budget: 1200000, targetCity: 'Bangalore', status: 'active' },
  { id: 'c3', title: 'Fitness Challenge 2024', brand: 'Cult.fit', budget: 300000, targetCity: 'Delhi', status: 'completed' }
];
