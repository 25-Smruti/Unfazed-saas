import mongoose from 'mongoose';

const clientPackageSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    totalSessions: { type: Number, required: true },
    usedSessions: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
    status: { type: String, enum: ['active', 'exhausted', 'expired'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model('ClientPackage', clientPackageSchema);
