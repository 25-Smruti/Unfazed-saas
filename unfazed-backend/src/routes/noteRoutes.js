import express from 'express';
import { createOrUpdateNote, getNotesByClient } from '../controllers/noteController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', requireAuth, createOrUpdateNote);
router.get('/client/:clientId', requireAuth, getNotesByClient);

export default router;
