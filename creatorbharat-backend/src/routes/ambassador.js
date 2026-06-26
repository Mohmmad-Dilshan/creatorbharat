// 🇮🇳 CreatorBharat College Ambassador Applications Router
import express from 'express';
import prisma from '../prisma.js';
import { z } from 'zod';

const router = express.Router();

const ambassadorSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  city: z.string().min(1, 'City is required.'),
  college: z.string().min(1, 'College name is required.'),
  year: z.string().optional(),
  social: z.string().optional(),
  reason: z.string().min(10, 'Reason must be at least 10 characters long.')
});

// POST /api/ambassador — Submit an ambassador application
router.post('/', async (req, res) => {
  try {
    let requestData = req.body;
    if (typeof requestData === 'string') {
      try {
        requestData = JSON.parse(requestData);
      } catch (e) {
        // Not a JSON string, ignore and keep as is
      }
    }

    const parse = ambassadorSchema.safeParse(requestData);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.errors[0].message });
    }

    const { name, email, phone, city, college, year, social, reason } = parse.data;
    const pitch = `[Year: ${year || 'N/A'}] ${reason}`;
    const instagram = social || null;

    const application = await prisma.ambassadorApplication.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        instagram: instagram ? instagram.trim() : null,
        college: college.trim(),
        city: city.trim(),
        pitch: pitch.trim()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Ambassador application submitted successfully! Our campus coordinator will reach out to you.',
      application
    });
  } catch (err) {
    console.error('[POST /api/ambassador] Error:', err.message);
    res.status(500).json({ error: 'Failed to record ambassador application.' });
  }
});

export default router;
