import express from 'express';
import { getTherapistMetrics } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireEntitlement } from '../middleware/entitlementMiddleware.js';

const router = express.Router();
router.get('/', requireAuth, requireEntitlement('advanced_analytics'), getTherapistMetrics);

export default router;
