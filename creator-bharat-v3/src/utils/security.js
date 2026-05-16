/**
 * Security Utility
 * 
 * Functions to protect the platform from common attacks like XSS.
 */

/**
 * Basic Sanitization to prevent XSS.
 * Removes <script> tags and other malicious attributes.
 * 
 * @param {string} str - The raw string input from user
 * @returns {string} - Cleaned string
 */
export const sanitize = (str) => {
  if (!str || typeof str !== 'string') return str;
  
  // Replace potentially dangerous characters
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates if a role is authentic (basic client-side check)
 * 
 * @param {string} role - The role to check
 * @returns {boolean}
 */
export const isValidRole = (role) => {
  return ['creator', 'brand', 'admin'].includes(role);
};
