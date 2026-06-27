// 🇮🇳 CreatorBharat SaaS — Onboarding Email Drip System
// Sends timed welcome sequences to new creators and brands:
//   Day 1  → Welcome + Profile Setup guide
//   Day 3  → Tips for getting your first campaign
//   Day 7  → Verification + Pro upgrade nudge
//
// Usage: Run as a cron job (every 6 hours recommended):
//   node src/drip/onboardingDrip.js
// Or trigger via: POST /api/admin/drip/run (admin-only route in admin.js)

import prisma from '../prisma.js';
import { sendEmail } from '../utils/mailer.js';

// ─── Email Templates ──────────────────────────────────────────────────────────

function creatorDay1Email(name) {
  return {
    subject: `Welcome to CreatorBharat, ${name}! 🇮🇳 Let's build your story`,
    html: `
<div style="font-family: 'Outfit', sans-serif; background: #0f172a; color: #f8fafc; padding: 0; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="background: linear-gradient(135deg, #FF9431, #f97316); display: inline-block; padding: 12px 24px; border-radius: 100px; font-weight: 900; font-size: 20px; color: #fff; letter-spacing: -0.5px;">
        🇮🇳 CreatorBharat
      </div>
    </div>

    <h1 style="font-size: 28px; font-weight: 900; color: #fff; margin: 0 0 8px; text-align: center;">
      Welcome, ${name}! 🎉
    </h1>
    <p style="text-align: center; color: #94a3b8; font-size: 15px; margin: 0 0 32px;">
      India's premier influencer platform just got stronger — with you.
    </p>

    <div style="background: rgba(255,148,49,0.08); border: 1px solid rgba(255,148,49,0.2); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 17px; font-weight: 800; color: #FF9431; margin: 0 0 16px;">
        🚀 Your First 3 Steps
      </h2>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="background: #FF9431; color: #fff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0;">1</span>
          <div>
            <div style="font-weight: 700; color: #f8fafc; font-size: 14px;">Complete Your Profile</div>
            <div style="color: #94a3b8; font-size: 13px;">Add your bio, niche, portfolio links, and city — brands love detail.</div>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="background: #FF9431; color: #fff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0;">2</span>
          <div>
            <div style="font-weight: 700; color: #f8fafc; font-size: 14px;">Set Your Creator Rates</div>
            <div style="color: #94a3b8; font-size: 13px;">Use our Rate Calculator to price your posts, Reels, and reviews fairly.</div>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="background: #FF9431; color: #fff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0;">3</span>
          <div>
            <div style="font-weight: 700; color: #f8fafc; font-size: 14px;">Browse Live Campaigns</div>
            <div style="color: #94a3b8; font-size: 13px;">Apply to campaigns that match your niche and regional audience.</div>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/dashboard" 
         style="background: linear-gradient(135deg, #FF9431, #f97316); color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 15px; display: inline-block; box-shadow: 0 8px 24px rgba(255,148,49,0.3);">
        Go to My Dashboard →
      </a>
    </div>

    <p style="color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 24px; margin: 0;">
      You're receiving this because you just joined CreatorBharat. <br>
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/unsubscribe" style="color: #FF9431;">Unsubscribe</a>
    </p>
  </div>
</div>`
  };
}

function creatorDay3Email(name) {
  return {
    subject: `${name}, your first brand deal is closer than you think 💼`,
    html: `
<div style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="background: linear-gradient(135deg, #FF9431, #f97316); display: inline-block; padding: 10px 22px; border-radius: 100px; font-weight: 900; font-size: 18px; color: #fff;">
        🇮🇳 CreatorBharat
      </div>
    </div>

    <h1 style="font-size: 26px; font-weight: 900; color: #fff; text-align: center; margin: 0 0 8px;">
      3 Tips to Land Your First Brand Deal
    </h1>
    <p style="text-align: center; color: #94a3b8; font-size: 14px; margin: 0 0 28px;">
      Hi ${name}, it's Day 3! Here's what top creators on our platform do differently.
    </p>

    <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
      <h3 style="font-size: 15px; font-weight: 800; color: #22d3ee; margin: 0 0 8px;">💡 Tip 1: Niche > Numbers</h3>
      <p style="color: #cbd5e1; font-size: 13px; margin: 0;">Brands on CreatorBharat want hyper-local creators. A 5K Rajasthani food creator beats a 50K generic page. Mention your city and niche clearly.</p>
    </div>

    <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
      <h3 style="font-size: 15px; font-weight: 800; color: #a78bfa; margin: 0 0 8px;">🎯 Tip 2: Apply Fast, Apply Right</h3>
      <p style="color: #cbd5e1; font-size: 13px; margin: 0;">Campaigns fill up quickly. When you pitch, write a 2-line custom message about why you're the right creator for that specific campaign — don't use a generic pitch.</p>
    </div>

    <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 28px;">
      <h3 style="font-size: 15px; font-weight: 800; color: #4ade80; margin: 0 0 8px;">🏆 Tip 3: Build Your CB Score</h3>
      <p style="color: #cbd5e1; font-size: 13px; margin: 0;">Your CB Score (out of 100) determines your visibility to brands. Complete your profile, get reviews, and apply to campaigns to boost it fast.</p>
    </div>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/campaigns" 
         style="background: linear-gradient(135deg, #FF9431, #f97316); color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 15px; display: inline-block;">
        Browse Live Campaigns →
      </a>
    </div>

    <p style="color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin: 0;">
      CreatorBharat · India's Creator Economy · <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/unsubscribe" style="color: #FF9431;">Unsubscribe</a>
    </p>
  </div>
</div>`
  };
}

function creatorDay7Email(name) {
  return {
    subject: `${name}, unlock your Elite Badge this week 🏅`,
    html: `
<div style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">

    <div style="text-align: center; margin-bottom: 24px;">
      <div style="background: linear-gradient(135deg, #FF9431, #f97316); display: inline-block; padding: 10px 22px; border-radius: 100px; font-weight: 900; font-size: 18px; color: #fff;">
        🇮🇳 CreatorBharat
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 64px;">🏅</div>
      <h1 style="font-size: 26px; font-weight: 900; color: #fff; margin: 8px 0;">
        Get Verified. Stand Out.
      </h1>
      <p style="color: #94a3b8; font-size: 14px; margin: 0;">
        Hi ${name}! You've been with us a week. It's time to level up.
      </p>
    </div>

    <div style="background: linear-gradient(135deg, rgba(255,148,49,0.1), rgba(234,88,12,0.1)); border: 1px solid rgba(255,148,49,0.25); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 16px; font-weight: 800; color: #FF9431; margin: 0 0 12px;">
        🌟 Why Get Verified?
      </h2>
      <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.8; padding-left: 20px; margin: 0;">
        <li><strong style="color: #f8fafc;">Elite Badge</strong> on your profile — stands out in brand searches</li>
        <li><strong style="color: #f8fafc;">Priority placement</strong> in campaign discovery results</li>
        <li><strong style="color: #f8fafc;">Higher CB Score</strong> (+20 points for verified creators)</li>
        <li><strong style="color: #f8fafc;">Access to exclusive</strong> high-budget brand campaigns</li>
        <li><strong style="color: #f8fafc;">Faster escrow payouts</strong> with verified bank details</li>
      </ul>
    </div>

    <div style="background: rgba(255,255,255,0.04); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="font-size: 13px; font-weight: 700; color: #94a3b8; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">What you'll need:</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="color: #f8fafc; font-size: 13px;">✅ Aadhaar or PAN card (for KYC)</div>
        <div style="color: #f8fafc; font-size: 13px;">✅ At least 1 linked social media account</div>
        <div style="color: #f8fafc; font-size: 13px;">✅ Bank account details (for payouts)</div>
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/creator/verification" 
         style="background: linear-gradient(135deg, #FF9431, #f97316); color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 15px; display: inline-block; box-shadow: 0 8px 24px rgba(255,148,49,0.3);">
        Start Verification Now →
      </a>
    </div>

    <p style="color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin: 0;">
      CreatorBharat · India's Creator Economy · <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/unsubscribe" style="color: #FF9431;">Unsubscribe</a>
    </p>
  </div>
</div>`
  };
}

function brandDay1Email(companyName) {
  return {
    subject: `Welcome to CreatorBharat, ${companyName}! 🚀 Your first campaign awaits`,
    html: `
<div style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">

    <div style="text-align: center; margin-bottom: 32px;">
      <div style="background: linear-gradient(135deg, #FF9431, #f97316); display: inline-block; padding: 12px 24px; border-radius: 100px; font-weight: 900; font-size: 20px; color: #fff;">
        🇮🇳 CreatorBharat for Brands
      </div>
    </div>

    <h1 style="font-size: 26px; font-weight: 900; color: #fff; text-align: center; margin: 0 0 12px;">
      Welcome, ${companyName}! 🎯
    </h1>
    <p style="text-align: center; color: #94a3b8; font-size: 14px; margin: 0 0 32px;">
      You now have access to India's largest network of verified regional creators.
    </p>

    <div style="background: rgba(255,148,49,0.08); border: 1px solid rgba(255,148,49,0.2); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 16px; font-weight: 800; color: #FF9431; margin: 0 0 14px;">🎬 Post Your First Campaign in 3 Steps</h2>
      <ol style="color: #cbd5e1; font-size: 13px; line-height: 2; padding-left: 20px; margin: 0;">
        <li><strong style="color: #fff;">Go to Campaign Builder</strong> — Set your goal, budget, and content type</li>
        <li><strong style="color: #fff;">Set geographic filters</strong> — Target creators by city, state, or language</li>
        <li><strong style="color: #fff;">Review applications</strong> — Creators will pitch to you directly within 24hrs</li>
      </ol>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/brand/campaigns/new" 
         style="background: linear-gradient(135deg, #FF9431, #f97316); color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 15px; display: inline-block;">
        Create My First Campaign →
      </a>
    </div>

    <p style="color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin: 0;">
      CreatorBharat · India's Creator Economy · <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/unsubscribe" style="color: #FF9431;">Unsubscribe</a>
    </p>
  </div>
</div>`
  };
}

function brandDay3Email(companyName) {
  return {
    subject: `${companyName}, 50,000+ regional creators are waiting for your campaign 🌍`,
    html: `
<div style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="background: linear-gradient(135deg, #FF9431, #f97316); display: inline-block; padding: 10px 22px; border-radius: 100px; font-weight: 900; font-size: 18px; color: #fff;">🇮🇳 CreatorBharat</div>
    </div>
    <h1 style="font-size: 24px; font-weight: 900; color: #fff; text-align: center; margin: 0 0 12px;">Why Regional Creators Win</h1>
    <p style="text-align: center; color: #94a3b8; font-size: 14px; margin: 0 0 28px;">Hi ${companyName}! Here's the data behind India's fastest growing marketing channel.</p>

    <div style="display: grid; gap: 12px; margin-bottom: 28px;">
      <div style="background: rgba(255,255,255,0.04); border-radius: 12px; padding: 18px; border-left: 3px solid #FF9431;">
        <div style="font-size: 24px; font-weight: 900; color: #FF9431;">4.2x</div>
        <div style="color: #cbd5e1; font-size: 13px;">Higher engagement rate vs metro influencers</div>
      </div>
      <div style="background: rgba(255,255,255,0.04); border-radius: 12px; padding: 18px; border-left: 3px solid #22d3ee;">
        <div style="font-size: 24px; font-weight: 900; color: #22d3ee;">₹12-50/click</div>
        <div style="color: #cbd5e1; font-size: 13px;">Average cost per action for Tier-2 creator campaigns</div>
      </div>
      <div style="background: rgba(255,255,255,0.04); border-radius: 12px; padding: 18px; border-left: 3px solid #4ade80;">
        <div style="font-size: 24px; font-weight: 900; color: #4ade80;">87%</div>
        <div style="color: #cbd5e1; font-size: 13px;">Brands report higher trust from regional creator content</div>
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 28px;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/brand/campaigns/new" style="background: linear-gradient(135deg, #FF9431, #f97316); color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 15px; display: inline-block;">Post a Campaign Now →</a>
    </div>
    <p style="color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin: 0;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/unsubscribe" style="color: #FF9431;">Unsubscribe</a>
    </p>
  </div>
</div>`
  };
}

function brandDay7Email(companyName) {
  return {
    subject: `${companyName}, your campaign results are in the escrow system 🔐`,
    html: `
<div style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="background: linear-gradient(135deg, #FF9431, #f97316); display: inline-block; padding: 10px 22px; border-radius: 100px; font-weight: 900; font-size: 18px; color: #fff;">🇮🇳 CreatorBharat</div>
    </div>
    <h1 style="font-size: 24px; font-weight: 900; color: #fff; text-align: center; margin: 0 0 12px;">How Our Escrow Protects You 🔐</h1>
    <p style="text-align: center; color: #94a3b8; font-size: 14px; margin: 0 0 28px;">Hi ${companyName}! A week in — let us explain how payments work safely.</p>

    <div style="background: rgba(255,148,49,0.08); border: 1px solid rgba(255,148,49,0.2); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <div style="font-size: 14px; font-weight: 700; color: #FF9431; margin-bottom: 16px;">How CreatorBharat Escrow Works:</div>
      <div style="color: #cbd5e1; font-size: 13px; line-height: 2;">
        1️⃣ You deposit campaign budget into secure escrow<br>
        2️⃣ Creator delivers content — you review and approve<br>
        3️⃣ Payment auto-releases to creator upon your approval<br>
        4️⃣ If content is unsatisfactory — full refund to you<br>
        5️⃣ Platform fee: only 2.5% of campaign value
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 28px;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/brand/dashboard" style="background: linear-gradient(135deg, #FF9431, #f97316); color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 15px; display: inline-block;">View My Dashboard →</a>
    </div>
    <p style="color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin: 0;">
      <a href="${process.env.FRONTEND_URL || 'https://creatorbharat.com'}/unsubscribe" style="color: #FF9431;">Unsubscribe</a>
    </p>
  </div>
</div>`
  };
}

// ─── Drip Runner ──────────────────────────────────────────────────────────────

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Get users created N days ago (within a 6-hour window to catch them on cron runs)
function daysAgo(n) {
  const target = new Date(Date.now() - n * DAY_IN_MS);
  const windowStart = new Date(target.getTime() - 3 * 60 * 60 * 1000); // -3hrs
  const windowEnd = new Date(target.getTime() + 3 * 60 * 60 * 1000);   // +3hrs
  return { gte: windowStart, lte: windowEnd };
}

export async function runOnboardingDrip() {
  console.log('[Drip] Starting onboarding drip run at', new Date().toISOString());
  
  let sent = 0;
  let errors = 0;

  try {
    // ── Day 1: Creators ─────────────────────────────────────────────────────
    const day1Creators = await prisma.user.findMany({
      where: { role: 'CREATOR', createdAt: daysAgo(1) },
      include: { creator: true }
    });

    for (const user of day1Creators) {
      const name = user.creator?.name || 'Creator';
      const { subject, html } = creatorDay1Email(name);
      const result = await sendEmail({ to: user.email, subject, html });
      if (result.success) { sent++; console.log(`[Drip] Day1 Creator → ${user.email}`); }
      else { errors++; console.error(`[Drip] Day1 Creator FAILED → ${user.email}`); }
    }

    // ── Day 1: Brands ───────────────────────────────────────────────────────
    const day1Brands = await prisma.user.findMany({
      where: { role: 'BRAND', createdAt: daysAgo(1) },
      include: { brand: true }
    });

    for (const user of day1Brands) {
      const companyName = user.brand?.companyName || 'Brand Partner';
      const { subject, html } = brandDay1Email(companyName);
      const result = await sendEmail({ to: user.email, subject, html });
      if (result.success) { sent++; console.log(`[Drip] Day1 Brand → ${user.email}`); }
      else { errors++; }
    }

    // ── Day 3: Creators ─────────────────────────────────────────────────────
    const day3Creators = await prisma.user.findMany({
      where: { role: 'CREATOR', createdAt: daysAgo(3) },
      include: { creator: true }
    });

    for (const user of day3Creators) {
      const name = user.creator?.name || 'Creator';
      const { subject, html } = creatorDay3Email(name);
      const result = await sendEmail({ to: user.email, subject, html });
      if (result.success) { sent++; console.log(`[Drip] Day3 Creator → ${user.email}`); }
      else { errors++; }
    }

    // ── Day 3: Brands ───────────────────────────────────────────────────────
    const day3Brands = await prisma.user.findMany({
      where: { role: 'BRAND', createdAt: daysAgo(3) },
      include: { brand: true }
    });

    for (const user of day3Brands) {
      const companyName = user.brand?.companyName || 'Brand Partner';
      const { subject, html } = brandDay3Email(companyName);
      const result = await sendEmail({ to: user.email, subject, html });
      if (result.success) { sent++; console.log(`[Drip] Day3 Brand → ${user.email}`); }
      else { errors++; }
    }

    // ── Day 7: Creators ─────────────────────────────────────────────────────
    const day7Creators = await prisma.user.findMany({
      where: { role: 'CREATOR', createdAt: daysAgo(7) },
      include: { creator: true }
    });

    for (const user of day7Creators) {
      const name = user.creator?.name || 'Creator';
      const { subject, html } = creatorDay7Email(name);
      const result = await sendEmail({ to: user.email, subject, html });
      if (result.success) { sent++; console.log(`[Drip] Day7 Creator → ${user.email}`); }
      else { errors++; }
    }

    // ── Day 7: Brands ───────────────────────────────────────────────────────
    const day7Brands = await prisma.user.findMany({
      where: { role: 'BRAND', createdAt: daysAgo(7) },
      include: { brand: true }
    });

    for (const user of day7Brands) {
      const companyName = user.brand?.companyName || 'Brand Partner';
      const { subject, html } = brandDay7Email(companyName);
      const result = await sendEmail({ to: user.email, subject, html });
      if (result.success) { sent++; console.log(`[Drip] Day7 Brand → ${user.email}`); }
      else { errors++; }
    }

  } catch (err) {
    console.error('[Drip] Fatal error:', err.message);
    errors++;
  }

  console.log(`[Drip] Done. Sent: ${sent}, Errors: ${errors}`);
  return { sent, errors };
}
