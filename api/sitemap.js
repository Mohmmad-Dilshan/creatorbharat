// Dynamic sitemap generator serverless function for CreatorBharat
module.exports = async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const staticUrls = [
    { loc: 'https://creatorbharat.com/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://creatorbharat.com/about', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/creators', priority: '0.95', changefreq: 'daily' },
    { loc: 'https://creatorbharat.com/campaigns', priority: '0.9', changefreq: 'daily' },
    { loc: 'https://creatorbharat.com/pricing', priority: '0.85', changefreq: 'weekly' },
    { loc: 'https://creatorbharat.com/contact', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/faq', priority: '0.75', changefreq: 'weekly' },
    { loc: 'https://creatorbharat.com/brand', priority: '0.88', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/creator-hub', priority: '0.88', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/leaderboard', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://creatorbharat.com/stories', priority: '0.78', changefreq: 'weekly' },
    { loc: 'https://creatorbharat.com/events', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://creatorbharat.com/blog', priority: '0.82', changefreq: 'daily' },
    { loc: 'https://creatorbharat.com/verify-guide', priority: '0.72', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/rate-calc', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/ai-knowledge', priority: '0.65', changefreq: 'monthly' },
    { loc: 'https://creatorbharat.com/privacy', priority: '0.5', changefreq: 'yearly' },
    { loc: 'https://creatorbharat.com/terms', priority: '0.5', changefreq: 'yearly' },
    { loc: 'https://creatorbharat.com/creator-guidelines', priority: '0.5', changefreq: 'yearly' },
    { loc: 'https://creatorbharat.com/brand-guidelines', priority: '0.5', changefreq: 'yearly' },
    { loc: 'https://creatorbharat.com/cookies', priority: '0.4', changefreq: 'yearly' },
    { loc: 'https://creatorbharat.com/refunds', priority: '0.4', changefreq: 'yearly' }
  ];

  let creatorUrls = [];
  const apiUrl = process.env.VITE_API_URL || 'https://creatorbharat-backend.onrender.com';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout
    const apiRes = await fetch(`${apiUrl}/api/creators?limit=2000`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);
    
    if (apiRes.ok) {
      const data = await apiRes.json();
      const list = data.creators || [];
      creatorUrls = list.map(c => {
        const handleOrId = c.handle || c.id;
        return {
          loc: `https://creatorbharat.com/c/${encodeURIComponent(handleOrId)}`,
          priority: '0.8',
          changefreq: 'daily',
          lastmod: c.updatedAt ? c.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]
        };
      });
    }
  } catch (err) {
    console.error('Sitemap creator fetch error:', err.message);
  }

  const allUrls = [...staticUrls, ...creatorUrls];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Cache-Control', 'public, max-age=14400, stale-while-revalidate=600'); // Cache for 4 hours
  res.setHeader('Content-Type', 'application/xml');
  return res.status(200).send(xmlContent);
};
