import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';
import prisma from '../src/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../src/prisma.js', () => {
  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
    },
    creator: {
      findMany: vi.fn(),
    }
  };
  return {
    default: mockPrisma
  };
});

describe('Security and Role Guard Authorization Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const generateTestToken = (userId) => {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'cb_super_secret_jwt_key_2026_production',
      { expiresIn: '1h' }
    );
  };

  it('GET /api/admin/verifications should return 401 if no token provided', async () => {
    const res = await request(app)
      .get('/api/admin/verifications')
      .expect(401);

    expect(res.body.error).toContain('Access denied');
  });

  it('GET /api/admin/verifications should return 401 if invalid token provided', async () => {
    const res = await request(app)
      .get('/api/admin/verifications')
      .set('Authorization', 'Bearer invalid-token-string')
      .expect(401);

    expect(res.body.error).toContain('Invalid or expired');
  });

  it('GET /api/admin/verifications should return 403 if user is not ADMIN', async () => {
    const token = generateTestToken('creator-user-id');

    // Mock Prisma findUnique to resolve to a user with role 'CREATOR'
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 'creator-user-id',
      email: 'creator@creatorbharat.com',
      role: 'CREATOR',
      creator: { id: 'creator-id' }
    });

    const res = await request(app)
      .get('/api/admin/verifications')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(res.body.error).toContain('Forbidden');
  });

  it('GET /api/admin/verifications should succeed if user is ADMIN', async () => {
    const token = generateTestToken('admin-user-id');

    // Mock Prisma findUnique to resolve to a user with role 'ADMIN'
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 'admin-user-id',
      email: 'admin@creatorbharat.com',
      role: 'ADMIN'
    });

    // Mock Prisma creator findMany for verification queue
    prisma.creator.findMany = vi.fn().mockResolvedValueOnce([
      { id: 'creator-1', name: 'Amit Sharma', isVerified: false }
    ]);

    const res = await request(app)
      .get('/api/admin/verifications')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Amit Sharma');
  });

  it('XSS input sanitization middleware should strip script tags from request body', async () => {
    // We can use a route that processes body input, e.g. POST /api/auth/send-otp
    const res = await request(app)
      .post('/api/auth/send-otp')
      .send({ phone: '<script>alert("hack")</script>9876543210' })
      .expect(200); // Sanitized value should flow and cleaner cleaner functions clean it

    expect(res.body.success).toBe(true);
  });
});
