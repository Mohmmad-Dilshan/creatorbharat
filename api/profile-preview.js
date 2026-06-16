const fs = require('fs');
const path = require('path');

const SEED_CREATORS = [
  {
    id: 'arjun-kapoor',
    name: 'Arjun Kapoor',
    handle: 'arjun-kapoor',
    niche: ['Automobile', 'Lifestyle', 'Tech'],
    city: 'Mumbai',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'An elite storyteller, lifestyle connoisseur, and automotive reviewer crafting cinematic narratives at the intersection of future technology and daily premium lifestyle across Bharat.'
  },
  {
    id: 'harsh-bene-patel',
    name: 'Harsh Bene Patel',
    handle: 'harsh-bene-patel',
    niche: ['Culinary', 'Food Vlogging', 'Travel'],
    city: 'Indore',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Regional food explorer and culinary storyteller documenting the authentic tastes, local street food gems, and rich cooking heritage of Bharat.'
  },
  {
    id: 'sarah-sen',
    name: 'Sarah Sen',
    handle: 'sarah-sen',
    niche: ['Tech', 'SaaS', 'Marketing'],
    city: 'Delhi',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Tech marketer and growth hacker helping SaaS startups scale through high-conversion content strategies.'
  }
];

// Helper to robustly replace meta tags with custom content in index.html
function replaceTag(html, attr, attrVal, valueAttr, newVal) {
  const cleanNewVal = newVal ? newVal.replace(/"/g, '&quot;') : '';
  
  // Try matching <meta property="og:title" content="..." /> or similar
  const regex1 = new RegExp(`<meta\\s+[^>]*${attr}\\s*=\\s*["']${attrVal}["'][^>]*${valueAttr}\\s*=\\s*["'].*?["'][^>]*>`, 'i');
  if (regex1.test(html)) {
    return html.replace(regex1, (match) => match.replace(new RegExp(`${valueAttr}\\s*=\\s*["'].*?["']`, 'i'), `${valueAttr}="${cleanNewVal}"`));
  }
  
  // Try matching with attributes in reverse order: <meta content="..." property="og:title" />
  const regex2 = new RegExp(`<meta\\s+[^>]*${valueAttr}\\s*=\\s*["'].*?["'][^>]*${attr}\\s*=\\s*["']${attrVal}["'][^>]*>`, 'i');
  if (regex2.test(html)) {
    return html.replace(regex2, (match) => match.replace(new RegExp(`${valueAttr}\\s*=\\s*["'].*?["']`, 'i'), `${valueAttr}="${cleanNewVal}"`));
  }
  
  return html;
}

module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send('Creator ID is required.');
  }

  // Clean the handle/ID (remove leading '@')
  const cleanId = id.startsWith('@') ? id.slice(1) : id;
  let creator = null;

  // 1. Try to fetch from remote API
  const apiUrl = process.env.VITE_API_URL || 'https://creatorbharat-backend.vercel.app';
  try {
    const apiRes = await fetch(`${apiUrl}/creators/${cleanId}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      creator = data.creator || data;
    }
  } catch (err) {
    // Silent ignore: fallback to seed/local
  }

  // 2. Try to find in seed creators
  if (!creator) {
    creator = SEED_CREATORS.find(c => c.id === cleanId || c.handle === cleanId);
  }

  // 3. Fallback to basic template if creator not found at all
  const name = creator ? creator.name : cleanId.charAt(0).toUpperCase() + cleanId.slice(1);
  const city = creator ? (creator.city || 'Bharat') : 'Bharat';
  const niches = creator ? (Array.isArray(creator.niche) ? creator.niche.join(', ') : (creator.niche || 'Digital Creator')) : 'Digital Creator';
  const bio = creator ? (creator.bio || `${name} is an elite verified creator on CreatorBharat.`) : `${name} is a content creator from ${city}.`;
  
  const descText = `${name} is an elite verified content creator specializing in ${niches} from ${city}. View portfolio, reach stats & campaign history on CreatorBharat.`;
  const dpUrl = creator ? (creator.photo || creator.image || creator.profile_pic || creator.avatarUrl) : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF9431&color=fff&size=200`;

  // Read index.html from dist (production) or root (development)
  const htmlPath = path.join(process.cwd(), 'creator-bharat-v3/dist/index.html');
  let html = '';
  
  try {
    html = fs.readFileSync(htmlPath, 'utf8');
  } catch (err) {
    const altHtmlPath = path.join(process.cwd(), 'creator-bharat-v3/index.html');
    try {
      html = fs.readFileSync(altHtmlPath, 'utf8');
    } catch (e) {
      return res.status(500).send('Template index.html not found.');
    }
  }

  // Inject Meta Tags Dynamically
  html = html.replace(/<title>.*?<\/title>/g, `<title>${name} (@${cleanId}) — Verified Profile | CreatorBharat</title>`);
  
  // Replace description tag
  const descRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
  if (descRegex.test(html)) {
    html = html.replace(descRegex, `<meta name="description" content="${descText.replace(/"/g, '&quot;')}" />`);
  }

  // Replace Open Graph Meta Tags
  html = replaceTag(html, 'property', 'og:title', 'content', `${name} (@${cleanId}) — Verified Profile | CreatorBharat`);
  html = replaceTag(html, 'property', 'og:description', 'content', descText);
  html = replaceTag(html, 'property', 'og:image', 'content', dpUrl);
  html = replaceTag(html, 'property', 'og:url', 'content', `https://creatorbharat.com/c/${cleanId}`);
  html = replaceTag(html, 'property', 'og:image:alt', 'content', `${name} (@${cleanId}) — Profile Picture`);

  // Replace Twitter Meta Tags
  html = replaceTag(html, 'name', 'twitter:title', 'content', `${name} (@${cleanId}) — Verified Profile | CreatorBharat`);
  html = replaceTag(html, 'name', 'twitter:description', 'content', descText);
  html = replaceTag(html, 'name', 'twitter:image', 'content', dpUrl);

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
};
