const router = require('express').Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_SECRET || 'secret_placeholder',
});

// POST /api/payments/create-order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { type } = req.body; // PRO_LISTING, CAMPAIGN_BOOST, FEATURED_SLOT
    const amounts = { PRO_LISTING: 4900, CAMPAIGN_BOOST: 9900, FEATURED_SLOT: 19900 };
    const amount = amounts[type];
    if (!amount) return res.status(400).json({ error: 'Invalid payment type' });

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `cb_${Date.now()}`,
      notes: { type, userId: req.user.id }
    });

    await prisma.payment.create({
      data: {
        amount,
        type,
        status: 'PENDING',
        razorpayOrderId: order.id,
        creatorId: req.user.role === 'CREATOR' ? req.user.creator?.id : null,
        brandId: req.user.role === 'BRAND' ? req.user.brand?.id : null,
      }
    });

    res.json({ orderId: order.id, amount, currency: 'INR', key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payments/verify
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET || 'secret_placeholder')
      .update(sign).digest('hex');

    if (expected !== razorpay_signature)
      return res.status(400).json({ error: 'Invalid signature' });

    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: { status: 'PAID', razorpayId: razorpay_payment_id }
    });

    // Activate Pro if PRO_LISTING
    if (payment.type === 'PRO_LISTING' && payment.creatorId) {
      await prisma.creator.update({
        where: { id: payment.creatorId },
        data: { pro: true }
      });
    }

    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
