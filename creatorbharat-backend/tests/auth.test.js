import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';
import prisma from '../src/prisma.js';
import bcrypt from 'bcryptjs';

vi.mock('../src/prisma.js', () => {
  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    creator: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    brand: {
      findUnique: vi.fn(),
      create: vi.fn(),
    }
  };
  return {
    default: mockPrisma
  };
});

describe('Authentication API Endpoint Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST /api/auth/send-otp should send an OTP successfully', async () => {
    const res = await request(app)
      .post('/api/auth/send-otp')
      .send({ phone: '9876543210' })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('sent successfully');
  });

  it('POST /api/auth/send-otp should fail with invalid phone numbers', async () => {
    const res = await request(app)
      .post('/api/auth/send-otp')
      .send({ phone: '123' })
      .expect(400);

    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/auth/verify-otp should fail with missing OTP', async () => {
    const res = await request(app)
      .post('/api/auth/verify-otp')
      .send({ phone: '9876543210' })
      .expect(400);

    expect(res.body.error).toContain('required');
  });

  it('POST /api/auth/register/creator should fail if email already exists', async () => {
    // Mock prisma user lookup to return an existing user
    prisma.user.findUnique.mockResolvedValueOnce({ id: 'existing-id', email: 'taken@creatorbharat.com' });

    const res = await request(app)
      .post('/api/auth/register/creator')
      .send({
        email: 'taken@creatorbharat.com',
        password: 'password123',
        name: 'Amit Kumar',
        handle: 'amit_kumar_creator'
      })
      .expect(400);

    expect(res.body.error).toContain('registered');
  });
});
