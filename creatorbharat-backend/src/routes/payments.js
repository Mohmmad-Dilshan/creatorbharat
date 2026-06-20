// 🇮🇳 CreatorBharat SaaS Payments Router
import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SOCWA3SKd7e4VW',
  key_secret: process.env.RAZORPAY_SECRET || 'Rjr5lbVI802qbWuSHfjwkjAf',
});

// POST /api/payments/create-order — start Razorpay checkout transaction
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { type } = req.body; // PRO_LISTING, CAMPAIGN_BOOST, FEATURED_SLOT
    const amounts = { PRO_LISTING: 4900, CAMPAIGN_BOOST: 9900, FEATURED_SLOT: 19900 };
    const amount = amounts[type];

    if (!amount) {
      return res.status(400).json({ error: 'Invalid checkout payment tier.' });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `cb_receipt_${Date.now()}`,
      notes: { type, userId: req.user.id }
    });

    const creator = req.user.role === 'CREATOR' ? req.user.creator : null;
    const brand = req.user.role === 'BRAND' ? req.user.brand : null;

    const payment = await prisma.payment.create({
      data: {
        amount,
        type,
        status: 'PENDING',
        razorpayOrderId: order.id,
        creatorId: creator?.id || null,
        brandId: brand?.id || null
      }
    });

    res.json({
      orderId: order.id,
      amount,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_SOCWA3SKd7e4VW'
    });
  } catch (err) {
    console.error('[POST /api/payments/create-order] Error:', err.message);
    res.status(500).json({ error: 'Failed to create payment gateway transaction.' });
  }
});

// POST /api/payments/verify — verify webhook signature and complete transaction
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing checkout validation parameters.' });
    }

    const keySecret = process.env.RAZORPAY_SECRET || 'Rjr5lbVI802qbWuSHfjwkjAf';
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto.createHmac('sha256', keySecret).update(sign).digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: 'Security signature mismatch validation failed.' });
    }

    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: 'PAID',
        razorpayId: razorpay_payment_id
      }
    });

    // If payment is for PRO membership, activate isPro on Creator model
    if (payment.type === 'PRO_LISTING' && payment.creatorId) {
      await prisma.creator.update({
        where: { id: payment.creatorId },
        data: { isPro: true }
      });
    }

    res.json({ success: true, payment });
  } catch (err) {
    console.error('[POST /api/payments/verify] Error:', err.message);
    res.status(500).json({ error: 'Checkout confirmation failed.' });
  }
});

export default router;
