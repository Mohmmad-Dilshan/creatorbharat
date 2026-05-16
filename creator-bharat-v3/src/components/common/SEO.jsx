import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component: Handles dynamic meta tags for every page.
 * 
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} image - Social share image URL
 * @param {string} url - Canonical URL
 */
const SEO = ({ title, description, image, url }) => {
  const siteTitle = 'CreatorBharat';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDesc = "India's premier creator discovery ecosystem. Connecting brands with authentic Bharat talent.";
  const defaultImage = '/og-image.jpg'; // Path to your default OG image
  const canonicalUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEO;
