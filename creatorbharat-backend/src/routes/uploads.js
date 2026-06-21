// 🇮🇳 CreatorBharat SaaS File Upload Router
import express from 'express';
import { upload, uploadVideo, uploadFileToCloud } from '../utils/uploader.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/uploads/image - Secure image/document upload
router.post('/image', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided. Please attach a file.' });
    }

    // Determine folder structure based on user role
    const folder = req.user.role === 'ADMIN'
      ? `creatorbharat/admin/images`
      : req.user.role === 'CREATOR' 
      ? `creatorbharat/creators/${req.user.id}`
      : `creatorbharat/brands/${req.user.id}`;

    // Upload to Cloud (or local fallback)
    const fileUrl = await uploadFileToCloud(req.file.buffer, req.file.originalname, folder);

    res.json({
      success: true,
      url: fileUrl,
      fileName: req.file.originalname
    });
  } catch (err) {
    console.error('[uploads/image] Error:', err.message);
    res.status(500).json({ error: err.message || 'File upload failed.' });
  }
});

// POST /api/uploads/video - Secure video/large file upload
router.post('/video', authMiddleware, uploadVideo.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided. Please attach a file.' });
    }

    const folder = req.user.role === 'ADMIN'
      ? `creatorbharat/admin/gallery`
      : req.user.role === 'CREATOR'
      ? `creatorbharat/creators/${req.user.id}/videos`
      : `creatorbharat/brands/${req.user.id}/videos`;

    // Upload to Cloud (or local fallback)
    const fileUrl = await uploadFileToCloud(req.file.buffer, req.file.originalname, folder);

    res.json({
      success: true,
      url: fileUrl,
      fileName: req.file.originalname
    });
  } catch (err) {
    console.error('[uploads/video] Error:', err.message);
    res.status(500).json({ error: err.message || 'File upload failed.' });
  }
});

export default router;
