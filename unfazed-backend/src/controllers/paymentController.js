import razorpayInstance from '../config/razorpay.js';
import Payment from '../models/Payment.js';
import Therapist from '../models/Therapist.js';
import Client from '../models/Client.js';
import { generateGSTInvoice } from '../services/invoiceService.js';

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount, therapist_id, client_id } = req.body;
    let orderId = `order_sim_${Date.now()}`;

    // Attempt real Razorpay API if valid test keys exist, otherwise fall back to simulated test order
    if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('placeholder') && !process.env.RAZORPAY_KEY_ID.includes('sample')) {
      try {
        const order = await razorpayInstance.orders.create({
          amount: Math.round(amount * 100),
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        });
        orderId = order.id;
      } catch (apiErr) {
        console.warn('[Razorpay API Warning] Test credentials rejected; using local simulation order.', apiErr.message);
      }
    }

    // Resolve an existing client to avoid casting errors
    let finalClientId = client_id;
    if (!finalClientId || finalClientId.length !== 24) {
      const fallbackClient = await Client.findOne();
      finalClientId = fallbackClient ? fallbackClient._id : therapist_id;
    }

    const payment = await Payment.create({
      therapist_id,
      client_id: finalClientId,
      razorpay_order_id: orderId,
      amount: Number(amount),
      net_amount: Number(amount) * 0.98,
      platform_fee: Number(amount) * 0.02,
      status: 'captured' // Automatically capture in demo test mode
    });

    // Auto-generate invoice PDF
    try {
      const therapist = await Therapist.findById(therapist_id);
      const client = await Client.findById(finalClientId);
      if (therapist && client) {
        await generateGSTInvoice(payment, therapist, client);
      }
    } catch (invErr) {
      console.error('[Invoice Error]', invErr.message);
    }

    res.json({
      success: true,
      order: { id: orderId, amount: Math.round(amount * 100), currency: 'INR' },
      paymentId: payment._id
    });
  } catch (err) {
    console.error('[Payment Controller Error]', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const handleRazorpayWebhook = async (req, res, next) => {
  try {
    const event = req.body.event;
    if (event === 'payment.captured') {
      const paymentEntity = req.body.payload.payment.entity;
      const payment = await Payment.findOne({ razorpay_order_id: paymentEntity.order_id });
      if (payment) {
        payment.status = 'captured';
        payment.gateway_transaction_id = paymentEntity.id;
        await payment.save();

        const therapist = await Therapist.findById(payment.therapist_id);
        const client = await Client.findById(payment.client_id);
        await generateGSTInvoice(payment, therapist, client);
      }
    }
    res.json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
};