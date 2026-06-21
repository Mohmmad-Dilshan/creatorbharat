import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';
import prisma from '../src/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../src/prisma.js', () => {
  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
    }
  };
  return {
    default: mockPrisma
  };
});

describe('AI Pitch & Brief Assistant Endpoint Tests', () => {
  let originalFetch;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'mock-gemini-key';
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const generateTestToken = (userId) => {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'cb_super_secret_jwt_key_2026_production',
      { expiresIn: '1h' }
    );
  };

  it('POST /api/ai/pitch-assistant should return generated pitch (English dialect)', async () => {
    const token = generateTestToken('creator-user-id');

    // Mock auth checks
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 'creator-user-id',
      email: 'creator@creatorbharat.com',
      role: 'CREATOR',
      creator: { id: 'creator-id', name: 'Amit Sharma', niche: ['Travel'] }
    });

    // Mock global fetch for Gemini API
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{
          content: {
            parts: [{ text: 'Respected Brand, I would love to pitch my travel contents.' }]
          }
        }]
      })
    });

    const res = await request(app)
      .post('/api/ai/pitch-assistant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        creatorName: 'Amit Sharma',
        brandName: 'Mamaearth',
        campaignTitle: 'Regional Travels Boost',
        dialect: 'English'
      })
      .expect(200);

    expect(res.body).toHaveProperty('pitch');
    expect(res.body.pitch).toContain('travel contents');
  });

  it('POST /api/ai/pitch-assistant should fallback to mock generation if fetch fails', async () => {
    const token = generateTestToken('creator-user-id');

    prisma.user.findUnique.mockResolvedValueOnce({
      id: 'creator-user-id',
      email: 'creator@creatorbharat.com',
      role: 'CREATOR',
      creator: { id: 'creator-id', name: 'Amit Sharma', niche: ['Travel'] }
    });

    // Mock global fetch to return an error state
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      text: async () => 'Quota exceeded'
    });

    const res = await request(app)
      .post('/api/ai/pitch-assistant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        creatorName: 'Amit Sharma',
        brandName: 'Mamaearth',
        campaignTitle: 'Regional Travels Boost',
        dialect: 'Rajasthani'
      })
      .expect(200); // Fails back to local generation cleanly

    expect(res.body).toHaveProperty('pitch');
    expect(res.body.pitch).toContain('Mamaearth');
  });
});
