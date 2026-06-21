import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';

describe('Health & Base API Checks', () => {
  it('GET / should return welcome message', async () => {
    const res = await request(app)
      .get('/')
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('CreatorBharat');
    expect(res.body.status).toBe('online');
  });

  it('GET /api/health should return system status details', async () => {
    const res = await request(app)
      .get('/api/health')
      .expect(200);

    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /api should return api message', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body.message).toContain('REST API Engine');
  });

  it('GET /non-existent-route should return 404', async () => {
    const res = await request(app)
      .get('/non-existent-route')
      .expect(404);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('not found');
  });
});
