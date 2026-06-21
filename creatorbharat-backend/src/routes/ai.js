import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Helper to make request to Gemini API
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API Key missing');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Empty response from Gemini');
  }
  return text;
}

// ─── 1. AI CAMPAIGN BRIEF ASSISTANT ──────────────────────────────────────────
router.post('/brief-assistant', authMiddleware, async (req, res) => {
  const { brandName, productName, niche, targetAudience, goal } = req.body;

  if (!brandName || !productName) {
    return res.status(400).json({ error: 'Brand Name and Product Name are required' });
  }

  // 1. Prepare prompt for structured JSON
  const prompt = `You are a professional SaaS marketing copywriter. Generate a marketing campaign brief in JSON format.
Inputs:
- Brand Name: "${brandName}"
- Product Name: "${productName}"
- Niche/Category: "${niche || 'Lifestyle & Tech'}"
- Target Audience: "${targetAudience || 'General audience in India'}"
- Campaign Goal: "${goal || 'Raise product awareness and drive direct bookings'}"

The JSON response must have EXACTLY these keys:
{
  "title": "A catchy, short campaign title",
  "description": "A detailed brief describing the product USP, creator requirements, deliverable guidelines (e.g. reels/stories), and brand alignment show notes",
  "budget": "Estimated campaign budget in INR as a clean string/number (e.g. '75000')",
  "platforms": "Comma-separated recommended platforms (e.g. 'Instagram, YouTube')",
  "niches": "Comma-separated matching niches/categories (e.g. 'Skincare, Wellness')"
}
Do NOT include any markdown code blocks, backticks, or text other than the JSON string. Return only valid JSON.`;

  try {
    let resultJson = {};
    if (process.env.GEMINI_API_KEY) {
      try {
        const rawResponse = await callGemini(prompt);
        // Clean markdown backticks if any
        const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        resultJson = JSON.parse(cleanJson);
      } catch (err) {
        console.warn('Gemini request failed, falling back to local builder:', err.message);
        resultJson = generateLocalBriefFallback(brandName, productName, niche, targetAudience, goal);
      }
    } else {
      resultJson = generateLocalBriefFallback(brandName, productName, niche, targetAudience, goal);
    }

    return res.json(resultJson);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── 2. AI CREATOR PITCH ASSISTANT ───────────────────────────────────────────
router.post('/pitch-assistant', authMiddleware, async (req, res) => {
  const { creatorName, creatorNiches, brandName, campaignTitle, campaignBrief, dialect } = req.body;

  if (!creatorName || !brandName || !campaignTitle) {
    return res.status(400).json({ error: 'Creator Name, Brand Name, and Campaign Title are required' });
  }

  let dialectPromptRule = '';
  if (dialect === 'Hinglish') {
    dialectPromptRule = `Write the pitch in conversational Hinglish (a casual blend of Hindi written in Latin/English script and English, like 'Aapki campaign bohot acchi lagi'). Make it sound natural, energetic, and culturally resonant.`;
  } else if (dialect === 'Hindi') {
    dialectPromptRule = `Write the pitch in clean, professional Hindi language (using Devanagari script). Use warm and polite Indian greetings (like 'नमस्ते').`;
  } else if (dialect === 'Rajasthani') {
    dialectPromptRule = `Write the pitch in warm Rajasthani style (using Devanagari script, incorporating classic Rajasthani greetings like 'खम्मा घणी सा' and terms of respect).`;
  } else {
    dialectPromptRule = `Write the pitch in professional, high-standard English.`;
  }

  const prompt = `Write a personalized, high-converting brand collaboration pitch email from creator "${creatorName}" to brand "${brandName}".
Creator Details:
- Name: "${creatorName}"
- Niches: "${creatorNiches || 'Digital Content'}"
Campaign Details:
- Campaign: "${campaignTitle}"
- Brief Context: "${campaignBrief || 'Direct collaboration campaign'}"

Language & Dialect Rule:
${dialectPromptRule}

Format it as a professional pitch message. Keep it to 2-3 short paragraphs. Highlight audience alignment, storytelling capability, and propose a collaboration to create high-quality content. Do not include subject lines or placeholders.`;

  try {
    let pitchText = '';
    if (process.env.GEMINI_API_KEY) {
      try {
        pitchText = await callGemini(prompt);
      } catch (err) {
        console.warn('Gemini pitch request failed, falling back to local builder:', err.message);
        pitchText = generateLocalPitchFallback(creatorName, creatorNiches, brandName, campaignTitle, campaignBrief);
      }
    } else {
      pitchText = generateLocalPitchFallback(creatorName, creatorNiches, brandName, campaignTitle, campaignBrief);
    }

    return res.json({ pitch: pitchText.trim() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Helper for Mock Briefs
function generateLocalBriefFallback(brandName, productName, niche, targetAudience, goal) {
  const nicheClean = niche || 'Lifestyle & Tech';
  const goalClean = goal || 'Raise product awareness and drive direct bookings';
  const audienceClean = targetAudience || 'General audience in India';
  
  return {
    title: `${brandName} x ${productName} Launch Campaign`,
    description: `Join us in launching the new ${productName} by ${brandName}! We are seeking elite creators in the "${nicheClean}" niche to craft engaging, high-fidelity stories and vertical video reviews. 

The goal of this campaign is: "${goalClean}". 
Target Audience: "${audienceClean}".

Deliverables:
- 1 Instagram Reel (showcasing product application & texture)
- 2 Story slides with a custom swipe-up discount code link
- High-resolution static photo for brand reuse.`,
    budget: "45000",
    platforms: "Instagram, YouTube Shorts",
    niches: nicheClean
  };
}

// Helper for Mock Pitches
function generateLocalPitchFallback(creatorName, creatorNiches, brandName, campaignTitle, campaignBrief) {
  return `Hi ${brandName} Team,

I hope this message finds you well! My name is ${creatorName}, and I am a digital storyteller specializing in ${creatorNiches || 'lifestyle content creation'}. I've been following your brand journey and love the authentic quality you bring to the market.

I noticed your campaign "${campaignTitle}" and feel my audience would align perfectly with it. My content focuses on high-engagement storytelling and honest reviews, which drives a very active community of followers who trust my recommendations.

I would love to collaborate with you on this campaign to create high-fidelity visual assets (reels, stories, or videos) highlighting the unique USPs. Let me know if we can connect to discuss details!

Best regards,
${creatorName}`;
}

export default router;
