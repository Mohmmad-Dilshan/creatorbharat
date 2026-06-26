// 🇮🇳 CreatorBharat SaaS Auth Middleware
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cb_super_secret_jwt_key_2026_production');
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { creator: true, brand: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Session expired. User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authorization token.' });
  }
};

// Middleware to restrict access based on User Role
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden. Access restricted.' });
    }
    next();
  };
};

// Middleware to verify Admin Team Members and check Role-Based Access Control (RBAC)
export const requireTeamRoles = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
      }
      const member = await prisma.teamMember.findUnique({
        where: { userId: req.user.id }
      });
      if (!member || !allowedRoles.includes(member.role) || member.status !== 'ACTIVE') {
        return res.status(403).json({ error: 'Forbidden. Insufficient permissions for this operation.' });
      }
      req.teamMember = member;
      next();
    } catch (err) {
      console.error('[requireTeamRoles] Error:', err);
      res.status(500).json({ error: 'RBAC verification failed.' });
    }
  };
};

