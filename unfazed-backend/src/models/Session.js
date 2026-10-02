import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMinutes: { type: Number, default: 60 },
    timezone: { type: String, default: 'Asia/Kolkata' },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid'
    },
    clientPackage_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientPackage', default: null }
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
