const fs = require('fs');
const path = require('path');

// ── Seed creators (public data only — no secrets) ─────────────
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

// ── Security: sanitize any user-supplied string for HTML output ─
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Security: validate handle — only safe chars allowed ────────
function isValidHandle(handle) {
  return /^[a-zA-Z0-9_.-]{1,80}$/.test(handle);
}

// ── Helper: replace meta tag attribute value in HTML ──────────
function replaceTag(html, attr, attrVal, valueAttr, newVal) {
  const cleanNewVal = escapeHtml(newVal);

  // Match: <meta property="og:title" content="..." />
  const regex1 = new RegExp(`<meta\\s+[^>]*${attr}\\s*=\\s*["']${attrVal}["'][^>]*${valueAttr}\\s*=\\s*["'].*?["'][^>]*>`, 'i');
  if (regex1.test(html)) {
    return html.replace(regex1, (match) =>
      match.replace(new RegExp(`${valueAttr}\\s*=\\s*["'].*?["']`, 'i'), `${valueAttr}="${cleanNewVal}"`)
    );
  }

  // Match reversed attribute order: <meta content="..." property="og:title" />
  const regex2 = new RegExp(`<meta\\s+[^>]*${valueAttr}\\s*=\\s*["'].*?["'][^>]*${attr}\\s*=\\s*["']${attrVal}["'][^>]*>`, 'i');
  if (regex2.test(html)) {
    return html.replace(regex2, (match) =>
      match.replace(new RegExp(`${valueAttr}\\s*=\\s*["'].*?["']`, 'i'), `${valueAttr}="${cleanNewVal}"`)
    );
  }

  return html;
}

// ── Serverless handler ────────────────────────────────────────
module.exports = async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).send('Creator ID is required.');
  }

  // Sanitize: strip leading '@' and validate handle
  const cleanId = id.startsWith('@') ? id.slice(1) : id;

  if (!isValidHandle(cleanId)) {
    return res.status(400).send('Invalid creator handle.');
  }

  let creator = null;

  // 1. Try to fetch from remote API (public endpoint — no secrets used here)
  const apiUrl = process.env.VITE_API_URL || 'https://creatorbharat-backend.onrender.com';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4s timeout
    const apiRes = await fetch(`${apiUrl}/api/creators/${encodeURIComponent(cleanId)}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);
    if (apiRes.ok) {
      const data = await apiRes.json();
      creator = data.creator || data;
    }
  } catch (err) {
    // Silent ignore — fallback to seed data
  }

  // 2. Fallback: seed creators
  if (!creator) {
    creator = SEED_CREATORS.find(c => c.id === cleanId || c.handle === cleanId);
  }

  // 3. Build meta content (safely escaped)
  const name     = escapeHtml(creator?.name || (cleanId.charAt(0).toUpperCase() + cleanId.slice(1)));
  const city     = escapeHtml(creator?.city || 'Bharat');
  const niches   = escapeHtml(Array.isArray(creator?.niche) ? creator.niche.join(', ') : (creator?.niche || 'Digital Creator'));
  const bio      = escapeHtml(creator?.bio || `${name} is a content creator from ${city}.`);
  const descText = `${name} is a verified content creator specializing in ${niches} from ${city}. View portfolio, reach stats & campaign history on CreatorBharat.`;
  const dpUrl    = creator?.photo || creator?.image || creator?.profile_pic || creator?.avatarUrl
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator?.name || cleanId)}&background=FF9431&color=fff&size=200`;
  const profileUrl = `https://creatorbharat.in/c/${encodeURIComponent(cleanId)}`;

  // 4. Read index.html template
  const htmlPath = path.join(process.cwd(), 'creator-bharat-v3/dist/index.html');
  let html = '';

  try {
    html = fs.readFileSync(htmlPath, 'utf8');
  } catch (err) {
    try {
      html = fs.readFileSync(path.join(process.cwd(), 'creator-bharat-v3/index.html'), 'utf8');
    } catch (e) {
      return res.status(500).send('Template not found.');
    }
  }

  // 5. Inject meta tags
  const pageTitle = `${name} (@${cleanId}) — Verified Profile | CreatorBharat`;

  html = html.replace(/<title>.*?<\/title>/g, `<title>${pageTitle}</title>`);

  const descRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
  if (descRegex.test(html)) {
    html = html.replace(descRegex, `<meta name="description" content="${escapeHtml(descText)}" />`);
  }

  html = replaceTag(html, 'property', 'og:title',       'content', pageTitle);
  html = replaceTag(html, 'property', 'og:description', 'content', descText);
  html = replaceTag(html, 'property', 'og:image',       'content', dpUrl);
  html = replaceTag(html, 'property', 'og:url',         'content', profileUrl);
  html = replaceTag(html, 'property', 'og:image:alt',   'content', `${name} — Profile Picture`);
  html = replaceTag(html, 'name',     'twitter:title',       'content', pageTitle);
  html = replaceTag(html, 'name',     'twitter:description', 'content', descText);
  html = replaceTag(html, 'name',     'twitter:image',       'content', dpUrl);

  // 6. Set cache headers (cache for 5 min, revalidate after)
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
};
