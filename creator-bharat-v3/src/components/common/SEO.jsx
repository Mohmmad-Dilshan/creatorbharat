import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const SEO = ({ title, description, keywords, ogImage, canonicalUrl }) => {
  useEffect(() => {
    // 1. Update Title
    const siteName = "CreatorBharat";
    document.title = title ? `${title} | ${siteName}` : `${siteName} — India's Premier Creator Ecosystem`;

    // 2. Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description || "India's premier creator discovery ecosystem. Connect brands with authentic Bharat talent from Jaipur, Mumbai, Delhi & beyond.");
    }

    // 3. Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords || "creator platform india, influencer marketing india, indian creators, brand collaboration");
    }

    // 4. Update Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title || siteName);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description || "Discover and collaborate with India's top content creators.");

    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute("content", ogImage);
    }

    // 5. Update Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }

    // 6. Update Twitter Meta
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title || siteName);

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null; // This component doesn't render anything
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  canonicalUrl: PropTypes.string
};

export default SEO;
