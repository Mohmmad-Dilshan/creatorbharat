// 🇮🇳 CreatorBharat SaaS Contact Messages Router
import express from 'express';
import prisma from '../prisma.js';
import { z } from 'zod';

const router = express.Router();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters long.')
});

// POST /api/contacts — public contact form submission
router.post('/', async (req, res) => {
  try {
    const parse = contactSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.errors[0].message });
    }

    const { name, email, subject, message } = parse.data;

    const contact = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: (subject || 'Public Inquiry').trim(),
        message: message.trim()
      }
    });

    res.status(201).json({ success: true, message: 'Message recorded successfully. Our team will contact you shortly.', contact });
  } catch (err) {
    console.error('[POST /api/contacts] Error:', err.message);
    res.status(500).json({ error: 'Failed to record contact message.' });
  }
});

export default router;
