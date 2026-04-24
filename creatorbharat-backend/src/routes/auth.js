const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

// POST /api/auth/register/creator
router.post('/register/creator', async (req, res) => {
  try {
    const { email, password, name, handle, city, state } = req.body;
    if (!email || !password || !name || !handle)
      return res.status(400).json({ error: 'Required fields missing' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const handleExists = await prisma.creator.findUnique({ where: { handle } });
    if (handleExists) return res.status(400).json({ error: 'Handle already taken' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email, password: hash, role: 'CREATOR',
        creator: {
          create: { handle, name, city, state }
        }
      },
      include: { creator: true }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, creator: user.creator } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/register/brand
router.post('/register/brand', async (req, res) => {
  try {
    const { email, password, companyName, contactName, industry } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email, password: hash, role: 'BRAND',
        brand: { create: { companyName, contactName, industry } }
      },
      include: { brand: true }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, brand: user.brand } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { creator: true, brand: true }
    });

    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').auth, async (req, res) => {
  const { password, ...safeUser } = req.user;
  res.json(safeUser);
});

module.exports = router;
