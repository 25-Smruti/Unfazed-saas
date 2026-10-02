import mongoose from 'mongoose';

const subscriptionTierConfigSchema = new mongoose.Schema(
  {
    tierName: { type: String, required: true, unique: true },
    maxActiveClients: { type: Number, required: true },
    allowsSOAPTemplates: { type: Boolean, default: false },
    advancedAnalytics: { type: Boolean, default: false },
    chatRetentionDays: { type: Number, default: 30 }
  },
  { timestamps: true }
);

export default mongoose.model('SubscriptionTierConfig', subscriptionTierConfigSchema);
