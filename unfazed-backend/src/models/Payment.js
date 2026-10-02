import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    gateway_transaction_id: { type: String, default: '' },
    razorpay_order_id: { type: String, default: '' },
    amount: { type: Number, required: true },
    platform_fee: { type: Number, default: 0 },
    net_amount: { type: Number, required: true },
    status: { type: String, enum: ['created', 'captured', 'failed', 'refunded'], default: 'created' },
    invoiceNumber: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
