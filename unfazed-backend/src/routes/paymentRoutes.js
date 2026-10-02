import express from 'express';
import { createRazorpayOrder, handleRazorpayWebhook } from '../controllers/paymentController.js';

const router = express.Router();
router.post('/create-order', createRazorpayOrder);
router.post('/webhook', handleRazorpayWebhook);

export default router;
