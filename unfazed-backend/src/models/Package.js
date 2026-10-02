import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    name: { type: String, required: true },
    sessionCount: { type: Number, required: true },
    price: { type: Number, required: true },
    validityDays: { type: Number, default: 90 }
  },
  { timestamps: true }
);

export default mongoose.model('Package', packageSchema);
