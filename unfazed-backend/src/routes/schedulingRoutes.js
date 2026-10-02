import express from 'express';
import { saveAvailability, getTherapistSlots, bookSession } from '../controllers/schedulingController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.put('/availability', requireAuth, saveAvailability);
router.get('/slots/:therapistId', getTherapistSlots);
router.post('/book', bookSession);

export default router;
