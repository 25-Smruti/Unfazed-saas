import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    tags: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive', 'lead'], default: 'active' },
    intakeData: {
      demographics: { type: Object, default: {} },
      presentingConcern: { type: String, default: '' },
      medicalHistory: { type: String, default: '' }
    },
    consentAgreed: { type: Boolean, default: false },
    consentTimestamp: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('Client', clientSchema);
