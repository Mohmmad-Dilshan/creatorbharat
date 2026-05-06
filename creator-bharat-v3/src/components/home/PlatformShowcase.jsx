/**
 * PlatformShowcase.jsx
 *
 * "Our Core Commitment" section.
 * Desktop: 3 hover cards side by side
 * Mobile: 1 card at a time with 3D flip animation + dot navigation
 */

import React, { useState } from 'react';
import { W } from '../../utils/helpers';
import { ShieldCheck, Handshake, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    color: '#FF9431',
    bg: 'rgba(255,148,49,0.08)',
    border: 'rgba(255,148,49,0.2)',
    label: 'Verified Identity',
    title: 'Your Identity, Your Brand',
    desc: 'Every creator gets a premium, verified portfolio page — not just a profile. Your digital identity that brands can instantly trust and discover.',
    badge: 'Pehchan',
  },
  {
    icon: Handshake,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    label: 'Direct Discovery',
    title: 'No Middlemen. Ever.',
    desc: 'We connect creators directly to brands — zero commission, zero gatekeepers. What you earn is 100% yours. We profit only when you grow.',
    badge: '0% Commission',
  },
  {
    icon: Globe,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    label: 'National Recognition',
    title: 'Local Voice, National Stage',
    desc: 'Tier 2 & 3 India has the most authentic stories. We amplify them — through podcasts, articles, and brand campaigns that put local creators on the national map.',
    badge: 'Rashtriya Manch',
  },
];

// Desktop card
function CommitmentCard({ c, hovered, idx, setHovered }) {
  const Icon = c.icon;
  const isHovered = hovered === idx;
  return (
    <div
      onMouseEnter={() => setHovered(idx)}
      onMouseLeave={() => setHovered(null)}
      style={{
        background: '#fff',
        borderRadius: 24,
        padding: '40px 32px',
        border: `1.5px solid ${isHovered ? c.border : '#E2E8F0'}`,
        boxShadow: isHovered ? `0 20px 48px ${c.color}18` : '0 4px 16px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: c.bg, filter: 'blur(40px)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, color: c.color, background: c.bg, padding: '4px 12px', borderRadius: 100, border: `1px solid ${c.border}`, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          {c.badge}
        </span>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: c.color, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 8 }}>{c.label}</div>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: '#0f172a', lineHeight: 1.25, margin: 0 }}>{c.title}</h3>
      </div>

      <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
        <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: 100, opacity: 0.4 }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>0{idx + 1}</span>
      </div>
    </div>
  );
}

// Mobile: single card with 3D flip between cards
function MobileCardCarousel() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'

  const goTo = (nextIdx, dir) => {
    if (flipping) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(nextIdx);
      setFlipping(false);
    }, 160);
  };

  const prev = () => goTo((current - 1 + COMMITMENTS.length) % COMMITMENTS.length, 'prev');
  const next = () => goTo((current + 1) % COMMITMENTS.length, 'next');

  const c = COMMITMENTS[current];
  const Icon = c.icon;

  return (
    <div style={{ width: '100%' }}>
      {/* Card with flip animation */}
      <div style={{ perspective: 1000, marginBottom: 20 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '32px 24px',
            border: `1.5px solid ${c.border}`,
            boxShadow: `0 12px 40px ${c.color}18`,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            animation: flipping
              ? direction === 'next'
                ? 'flipOutLeft 0.16s ease forwards'
                : 'flipOutRight 0.16s ease forwards'
              : direction === 'next'
              ? 'flipInRight 0.18s ease forwards'
              : 'flipInLeft 0.18s ease forwards',
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 800, color: c.color, background: c.bg, padding: '4px 12px', borderRadius: 100, border: `1px solid ${c.border}`, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              {c.badge}
            </span>
          </div>

          {/* Text */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: c.color, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 6 }}>{c.label}</div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 900, color: '#0f172a', lineHeight: 1.25, marginBottom: 12 }}>{c.title}</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
          </div>

          {/* Step indicator line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: 100, opacity: 0.5 }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: c.color }}>0{current + 1} / 0{COMMITMENTS.length}</span>
          </div>
        </div>
      </div>

      {/* Controls: arrows + dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <button
          onClick={prev}
          style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <ChevronLeft size={18} color="#0f172a" />
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          {COMMITMENTS.map((cm, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 100,
                background: i === current ? cm.color : '#E2E8F0',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <ChevronRight size={18} color="#0f172a" />
        </button>
      </div>

      <style>{`
        @keyframes flipOutLeft  { from{opacity:1;transform:rotateY(0deg) scale(1)} to{opacity:0;transform:rotateY(-30deg) scale(0.96)} }
        @keyframes flipOutRight { from{opacity:1;transform:rotateY(0deg) scale(1)} to{opacity:0;transform:rotateY(30deg) scale(0.96)} }
        @keyframes flipInRight  { from{opacity:0;transform:rotateY(20deg) scale(0.96)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
        @keyframes flipInLeft   { from{opacity:0;transform:rotateY(-20deg) scale(0.96)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
      `}</style>
    </div>
  );
}

export default function PlatformShowcase({ mob }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ padding: mob ? '48px 16px' : '80px 24px 96px', background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>

      {/* Ghost watermark */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: mob ? 80 : 200, fontWeight: 900, color: 'rgba(0,0,0,0.018)', letterSpacing: '-0.05em', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
        BHARAT HUB
      </div>

      <div style={{ ...W(), maxWidth: 1200, position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: mob ? 32 : 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 100, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Identity & Growth</span>
          </div>

          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 28 : 52, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 14 }}>
            Our Core{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Commitment.
            </span>
          </h2>
          <p style={{ fontSize: mob ? 13 : 17, color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Three non-negotiable promises we make to every creator who joins CreatorBharat.
          </p>
        </div>

        {/* ── Cards ── */}
        {mob ? (
          /* MOBILE: one card at a time with flip */
          <MobileCardCarousel />
        ) : (
          /* DESKTOP: 3 cards in a row */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 64 }}>
            {COMMITMENTS.map((c, i) => (
              <CommitmentCard key={i} c={c} idx={i} hovered={hovered} setHovered={setHovered} />
            ))}
          </div>
        )}

        {/* ── Mission Quote block ── */}
        <div style={{
          position: 'relative',
          background: '#0f172a',
          borderRadius: 28,
          padding: mob ? '36px 24px' : '56px 72px',
          overflow: 'hidden',
          textAlign: 'center',
          marginTop: mob ? 32 : 0,
        }}>
          <div style={{ position: 'absolute', top: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,153,51,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(19,136,8,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: mob ? 48 : 64, lineHeight: 1, color: 'rgba(255,148,49,0.3)', fontFamily: 'serif', marginBottom: 4 }}>"</div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 18 : 32, fontWeight: 700, color: '#fff', lineHeight: 1.55, maxWidth: 720, margin: '0 auto 28px', letterSpacing: '-0.01em' }}>
              Hum Bharat ke har creator ko unki{' '}
              <span style={{ color: '#FF9431' }}>Pehchan</span>{' '}
              dena chahte hain. Local talent ko direct{' '}
              <span style={{ color: '#10B981' }}>National Recognition</span>{' '}
              aur Growth Hub se jodna hai.
            </p>
            <div style={{ display: 'inline-flex', borderRadius: 100, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              {['#FF9933', '#FFFFFF', '#138808'].map((col, i) => (
                <div key={i} style={{ width: 32, height: 6, background: col }} />
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 14, fontWeight: 500 }}>CreatorBharat Mission Statement</p>
          </div>
        </div>

      </div>
    </section>
  );
}
