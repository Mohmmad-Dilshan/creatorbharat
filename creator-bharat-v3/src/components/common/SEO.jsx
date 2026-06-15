import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component: Handles dynamic meta tags for every page.
 *
 * @param {string} title        - Page title (will be appended with | CreatorBharat)
 * @param {string} description  - Meta description (max 160 chars recommended)
 * @param {string} keywords     - Comma-separated keywords for meta keywords tag
 * @param {string} image        - Absolute URL to social share / OG image
 * @param {string} url          - Canonical URL for this page
 * @param {string} type         - OG type: 'website' | 'article' | 'profile' (default: 'website')
 * @param {object} jsonLd       - Optional JSON-LD structured data object (schema.org)
 */
const SEO = ({ title, description, keywords, image, url, type, jsonLd }) => {
  const SITE_NAME   = 'CreatorBharat';
  const SITE_HANDLE = '@CreatorBharat';
  const SITE_URL    = 'https://creatorbharat.com';
  const OG_IMAGE    = `${SITE_URL}/og-image.jpg`;

  const fullTitle    = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — India Ka Creator Platform`;
  const metaDesc     = description || "India's premier creator discovery ecosystem. Connecting brands with authentic Bharat talent.";
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  const ogImage      = image || OG_IMAGE;
  const ogType       = type || 'website';

  return (
    <Helmet>
      {/* ── Core ──────────────────────────────────────────── */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description"          content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots"               content="index, follow" />
      <meta name="author"               content="CreatorBharat" />
      <link rel="canonical"             href={canonicalUrl} />

      {/* ── Open Graph ────────────────────────────────────── */}
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:type"         content={ogType} />
      <meta property="og:url"          content={canonicalUrl} />
      <meta property="og:title"        content={fullTitle} />
      <meta property="og:description"  content={metaDesc} />
      <meta property="og:image"        content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"       content="en_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_CA" />
      <meta property="og:locale:alternate" content="en_AU" />

      {/* ── Twitter Card ──────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={SITE_HANDLE} />
      <meta name="twitter:creator"     content={SITE_HANDLE} />
      <meta name="twitter:url"         content={canonicalUrl} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD Structured Data ───────────────────────── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {/* ── Global & Pan-India Geo-Targeting ─────────────── */}
      <meta name="geo.region"    content="IN" />
      <meta name="geo.placename" content="India" />
    </Helmet>
  );
};

SEO.propTypes = {
  title:       PropTypes.string,
  description: PropTypes.string,
  keywords:    PropTypes.string,
  image:       PropTypes.string,
  url:         PropTypes.string,
  type:        PropTypes.oneOf(['website', 'article', 'profile']),
  jsonLd:      PropTypes.object,
};

export default SEO;
