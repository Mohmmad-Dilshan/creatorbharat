import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/common';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ExternalLink,
  Globe2,
  Heart,
  IndianRupee,
  Mail,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

const NAV_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Marketplace', path: '/creators' },
      { label: 'Campaigns', path: '/campaigns' },
      { label: 'Leaderboard', path: '/leaderboard' },
      { label: 'Rate Calculator', path: '/rate-calc' },
      { label: 'Blog & Insights', path: '/blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Help & FAQ', path: '/faq' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Creator Guidelines', path: '/creator-guidelines' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/creatorbharat',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/creatorbharat',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/creatorbharat',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@creatorbharat',
    svg: (
      <svg width="19" height="14" viewBox="0 0 24 17" fill="currentColor">
        <path d="M23.495 2.205a3.04 3.04 0 0 0-2.14-2.154C19.505 0 12 0 12 0S4.495 0 2.645.05a3.04 3.04 0 0 0-2.14 2.154C0 4.06 0 8 0 8s0 3.94.504 5.795a3.04 3.04 0 0 0 2.14 2.154C4.495 16 12 16 12 16s7.505 0 9.355-.05a3.04 3.04 0 0 0 2.14-2.154C24 11.94 24 8 24 8s0-3.94-.505-5.795zM9.607 11.43V4.57l6.264 3.43-6.264 3.43z" />
      </svg>
    ),
  },
];

const TRUST_ITEMS = [
  { icon: BadgeCheck, value: 'Verified', label: 'creator identity layer' },
  { icon: Users, value: 'Tier 2/3', label: 'Bharat-first discovery' },
  { icon: IndianRupee, value: '0%', label: 'creator commission' },
  { icon: TrendingUp, value: 'Growth OS', label: 'for brands and talent' },
];

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <div className="footer-newsletter">
      <div className="newsletter-head">
        <div className="newsletter-icon"><Mail size={16} /></div>
        <div>
          <span>Creator Economy Brief</span>
          <p>Weekly signals, brand demand, and creator growth notes.</p>
        </div>
      </div>
      {done ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="footer-success"
        >
          <Check size={16} /> You are in. Welcome to CreatorBharat.
        </motion.div>
      ) : (
        <form onSubmit={submit} className="footer-form">
          <label className="footer-input-wrap">
            <span>Email address</span>
            <input
              type="email"
              placeholder="you@brand.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="footer-submit"
          >
            Join <ArrowRight size={15} />
          </motion.button>
        </form>
      )}
    </div>
  );
}

function SocialBtn({ s }) {
  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      className="footer-social-btn"
    >
      {s.svg}
    </motion.a>
  );
}

SocialBtn.propTypes = {
  s: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    svg: PropTypes.node.isRequired,
  }).isRequired,
};

function FLink({ label, path, go }) {
  return (
    <li>
      <button type="button" onClick={() => go(path)} className="footer-nav-link">
        <span>{label}</span>
        <ArrowRight size={13} />
      </button>
    </li>
  );
}

FLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default function Footer() {
  const navigate = useNavigate();
  const go = (p) => {
    navigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-line" />

      <div className="footer-shell">
        <section className="footer-hero" aria-label="CreatorBharat footer">
          <div className="footer-hero-copy">
            <div className="footer-status">
              <span className="status-dot" />
              Bharat creator infrastructure is live
            </div>
            <h2>
              Build the next wave of trusted creator commerce.
            </h2>
            <p>
              CreatorBharat connects regional talent, brand teams, and verified creator identity in one premium marketplace.
            </p>
            <div className="footer-actions">
              <button type="button" onClick={() => go('/apply')} className="footer-primary">
                Start as creator <ArrowRight size={16} />
              </button>
              <button type="button" onClick={() => go('/creators')} className="footer-secondary">
                Explore talent
              </button>
            </div>
          </div>

          <div className="footer-command-card" aria-label="CreatorBharat platform snapshot">
            <div className="command-top">
              <span>CB Intelligence</span>
              <span>Live</span>
            </div>
            <div className="command-metric">
              <strong>Digital Pehchan</strong>
              <p>Verified profiles, brand-safe discovery, and direct creator monetization.</p>
            </div>
            <div className="command-stack">
              <div><Globe2 size={16} /> 28 states mapped</div>
              <div><ShieldCheck size={16} /> Secure creator profiles</div>
              <div><TrendingUp size={16} /> Campaign-ready signals</div>
            </div>
          </div>
        </section>

        <section className="footer-trust-grid" aria-label="Platform trust signals">
          {TRUST_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.value} className="footer-trust-item">
                <Icon size={18} />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            );
          })}
        </section>

        <section className="footer-main">
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <Logo light onClick={() => go('/')} />
            </div>
            <p className="footer-tagline">
              Premium infrastructure for India's rising creator economy, built around identity, trust, regional voice, and direct brand access.
            </p>
            <div className="footer-contact-list">
              <a href="mailto:hello@creatorbharat.in" className="footer-contact-link">
                <Mail size={14} /> hello@creatorbharat.in
              </a>
              <a href="mailto:brands@creatorbharat.in" className="footer-contact-link">
                <ExternalLink size={14} /> brands@creatorbharat.in
              </a>
              <div className="footer-contact-text">
                <MapPin size={14} /> India, focused on Tier 2 and Tier 3 cities
              </div>
            </div>
            <div className="footer-socials">
              {SOCIALS.map(s => <SocialBtn key={s.label} s={s} />)}
            </div>
          </div>

          <div className="footer-nav-grid">
            {NAV_COLS.map(col => (
              <nav key={col.heading} className="footer-nav-col" aria-label={col.heading}>
                <h3>{col.heading}</h3>
                <ul>
                  {col.links.map(l => (
                    <FLink key={l.label} label={l.label} path={l.path} go={go} />
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <Newsletter />
        </section>

        <div className="footer-bottom">
          <span className="footer-copy">
            (c) {new Date().getFullYear()} CreatorBharat. All rights reserved.
          </span>
          <span className="footer-love">
            Built with <Heart size={13} fill="#ff9431" color="#ff9431" /> for Bharat
          </span>
          <div className="footer-badges">
            <span><ShieldCheck size={13} /> Secure platform</span>
            <span>Made in India</span>
            <span>DPIIT Startup</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          --footer-bg: #050607;
          --footer-panel: rgba(255, 255, 255, 0.055);
          --footer-panel-strong: rgba(255, 255, 255, 0.09);
          --footer-line: rgba(255, 255, 255, 0.1);
          --footer-text: rgba(255, 255, 255, 0.74);
          --footer-muted: rgba(255, 255, 255, 0.48);
          --footer-dim: rgba(255, 255, 255, 0.28);
          --footer-orange: #ff9431;
          --footer-green: #138808;
          position: relative;
          overflow: hidden;
          color: #fff;
          background:
            radial-gradient(circle at 18% 10%, rgba(255, 148, 49, 0.18), transparent 30%),
            radial-gradient(circle at 85% 22%, rgba(19, 136, 8, 0.14), transparent 28%),
            linear-gradient(180deg, #0c0d0f 0%, var(--footer-bg) 48%, #030404 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .site-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.3;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 72%, transparent);
        }

        .footer-top-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff9431 0%, #fff 50%, #138808 100%);
          opacity: 0.9;
        }

        .footer-shell {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 1;
          padding: 64px 0 48px;
        }

        .footer-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 28px;
          align-items: stretch;
          padding: 32px;
          border: 1px solid var(--footer-line);
          border-radius: 28px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.105), rgba(255,255,255,0.03)),
            linear-gradient(135deg, rgba(255,148,49,0.08), rgba(19,136,8,0.055));
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .footer-status {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,148,49,0.22);
          background: rgba(255,148,49,0.09);
          color: rgba(255,255,255,0.82);
          font-size: 12px;
          font-weight: 800;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 0 5px rgba(34,197,94,0.13);
        }

        .footer-hero h2 {
          margin: 18px 0 14px;
          color: #fff;
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: clamp(32px, 5vw, 64px);
          line-height: 0.96;
          font-weight: 900;
          letter-spacing: 0;
          max-width: 760px;
        }

        .footer-hero-copy p {
          max-width: 620px;
          color: var(--footer-text);
          font-size: 16px;
          line-height: 1.7;
          margin: 0;
        }

        .footer-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .footer-primary,
        .footer-secondary {
          min-height: 48px;
          border-radius: 14px;
          border: 1px solid transparent;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .footer-primary {
          color: #0a0a0a;
          background: linear-gradient(135deg, #fff 0%, #ffe0c3 38%, #ff9431 100%);
          box-shadow: 0 16px 36px rgba(255,148,49,0.22);
        }

        .footer-secondary {
          color: #fff;
          background: rgba(255,255,255,0.065);
          border-color: rgba(255,255,255,0.12);
        }

        .footer-primary:hover,
        .footer-secondary:hover {
          transform: translateY(-2px);
        }

        .footer-command-card {
          align-self: stretch;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.12);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.055)),
            rgba(0,0,0,0.22);
          padding: 20px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          position: relative;
        }

        .footer-command-card::after {
          content: '';
          position: absolute;
          right: -48px;
          bottom: -60px;
          width: 180px;
          height: 180px;
          border-radius: 999px;
          border: 36px solid rgba(255,148,49,0.12);
        }

        .command-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: var(--footer-muted);
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .command-top span:last-child {
          color: #86efac;
        }

        .command-metric {
          position: relative;
          z-index: 1;
          margin: 34px 0;
        }

        .command-metric strong {
          display: block;
          color: #fff;
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1;
          letter-spacing: 0;
        }

        .command-metric p {
          margin-top: 12px;
          color: var(--footer-muted);
          line-height: 1.6;
          font-size: 14px;
          max-width: 330px;
        }

        .command-stack {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 9px;
        }

        .command-stack div {
          min-height: 40px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.065);
          color: rgba(255,255,255,0.78);
          font-size: 13px;
          font-weight: 750;
        }

        .footer-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin: 18px 0 34px;
        }

        .footer-trust-item {
          min-height: 104px;
          display: grid;
          align-content: center;
          gap: 7px;
          padding: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.045);
        }

        .footer-trust-item svg {
          color: var(--footer-orange);
        }

        .footer-trust-item strong {
          color: #fff;
          font-size: 18px;
          font-weight: 900;
        }

        .footer-trust-item span {
          color: var(--footer-muted);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.45;
        }

        .footer-main {
          display: grid;
          grid-template-columns: minmax(250px, 0.9fr) minmax(360px, 1.25fr) minmax(300px, 0.85fr);
          gap: 30px;
          align-items: start;
          padding: 34px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .footer-logo-wrap {
          margin-bottom: 20px;
        }

        .footer-tagline {
          color: var(--footer-text);
          font-size: 14px;
          line-height: 1.7;
          max-width: 330px;
          margin: 0 0 22px;
        }

        .footer-contact-list {
          display: grid;
          gap: 10px;
          margin-bottom: 22px;
        }

        .footer-contact-link,
        .footer-contact-text {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--footer-muted);
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        .footer-contact-link:hover,
        .footer-contact-link:focus {
          color: #fff;
          outline: none;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .footer-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .footer-social-btn:hover,
        .footer-social-btn:focus {
          color: #fff;
          background: rgba(255,148,49,0.13);
          border-color: rgba(255,148,49,0.28);
          outline: none;
        }

        .footer-nav-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .footer-nav-col h3 {
          margin: 0 0 16px;
          color: rgba(255,255,255,0.34);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .footer-nav-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
        }

        .footer-nav-link {
          width: 100%;
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--footer-muted);
          font-family: inherit;
          font-size: 14px;
          font-weight: 750;
          text-align: left;
          cursor: pointer;
          transition: color 0.18s ease, transform 0.18s ease;
        }

        .footer-nav-link svg {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }

        .footer-nav-link:hover,
        .footer-nav-link:focus {
          color: #fff;
          transform: translateX(2px);
          outline: none;
        }

        .footer-nav-link:hover svg,
        .footer-nav-link:focus svg {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-newsletter {
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04)),
            rgba(255,255,255,0.035);
          padding: 18px;
        }

        .newsletter-head {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .newsletter-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--footer-orange);
          background: rgba(255,148,49,0.13);
          border: 1px solid rgba(255,148,49,0.18);
          flex: 0 0 auto;
        }

        .newsletter-head span {
          display: block;
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          margin-bottom: 4px;
        }

        .newsletter-head p {
          color: var(--footer-muted);
          font-size: 13px;
          line-height: 1.55;
          margin: 0;
        }

        .footer-form {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
          align-items: end;
        }

        .footer-input-wrap {
          display: grid;
          gap: 7px;
          min-width: 0;
        }

        .footer-input-wrap span {
          color: var(--footer-dim);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .footer-input-wrap input {
          min-width: 0;
          width: 100%;
          height: 46px;
          border-radius: 13px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.24);
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 650;
          outline: none;
          padding: 0 14px;
        }

        .footer-input-wrap input:focus {
          border-color: rgba(255,148,49,0.52);
          box-shadow: 0 0 0 4px rgba(255,148,49,0.1);
        }

        .footer-submit {
          height: 46px;
          border: 0;
          border-radius: 13px;
          padding: 0 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #fff;
          color: #070707;
          font-family: inherit;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
        }

        .footer-success {
          min-height: 46px;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #86efac;
          font-size: 14px;
          font-weight: 850;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          padding-top: 24px;
        }

        .footer-copy,
        .footer-love,
        .footer-badges span {
          color: var(--footer-dim);
          font-size: 12px;
          font-weight: 750;
        }

        .footer-love {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-badges {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-badges span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        @media (max-width: 1040px) {
          .footer-hero {
            grid-template-columns: 1fr;
          }

          .footer-command-card {
            min-height: 220px;
          }

          .footer-main {
            grid-template-columns: 1fr;
          }

          .footer-nav-grid {
            order: 2;
          }

          .footer-newsletter {
            order: 1;
          }
        }

        @media (max-width: 760px) {
          .footer-shell {
            width: min(100% - 28px, 1180px);
            padding: 38px 0 118px;
          }

          .footer-hero {
            padding: 22px;
            border-radius: 24px;
            gap: 20px;
          }

          .footer-status {
            min-height: 30px;
            font-size: 11px;
            max-width: 100%;
          }

          .footer-hero h2 {
            font-size: clamp(34px, 12vw, 48px);
            line-height: 1;
            margin-top: 16px;
          }

          .footer-hero-copy p {
            font-size: 14px;
          }

          .footer-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .footer-primary,
          .footer-secondary {
            width: 100%;
          }

          .footer-command-card {
            min-height: 0;
            padding: 18px;
            border-radius: 20px;
          }

          .command-metric {
            margin: 24px 0;
          }

          .footer-trust-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 14px 0 26px;
          }

          .footer-trust-item {
            min-height: 96px;
            padding: 14px;
            border-radius: 16px;
          }

          .footer-main {
            gap: 26px;
            padding: 28px 0;
          }

          .footer-nav-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .footer-nav-col {
            padding: 16px;
            border-radius: 18px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.04);
          }

          .footer-nav-col h3 {
            margin-bottom: 10px;
          }

          .footer-nav-link {
            min-height: 38px;
          }

          .footer-nav-link svg {
            opacity: 0.45;
            transform: none;
          }

          .footer-form {
            grid-template-columns: 1fr;
          }

          .footer-submit {
            width: 100%;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 420px) {
          .footer-shell {
            width: min(100% - 20px, 1180px);
          }

          .footer-hero {
            padding: 18px;
          }

          .footer-trust-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-primary,
          .footer-secondary,
          .footer-nav-link,
          .footer-social-btn {
            transition: none;
          }

          .footer-primary:hover,
          .footer-secondary:hover,
          .footer-nav-link:hover {
            transform: none;
          }
        }
      `}</style>
    </footer>
  );
}
