import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const therapistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    bio: { type: String, default: '' },
    specializations: [{ type: String }],
    languages: [{ type: String }],
    tier: { type: String, default: 'pro' },
    sessionPrice: { type: Number, default: 1500 }
  },
  { timestamps: true }
);

therapistSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

export default mongoose.model('Therapist', therapistSchema);
