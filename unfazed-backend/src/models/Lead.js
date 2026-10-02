import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    preferredSpecialization: { type: String, default: '' },
    assignedTherapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', default: null },
    status: { type: String, enum: ['unassigned', 'assigned', 'contacted'], default: 'unassigned' }
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
