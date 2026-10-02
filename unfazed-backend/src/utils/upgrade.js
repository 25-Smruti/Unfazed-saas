import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Therapist from '../models/Therapist.js';

dotenv.config();

async function upgradeAll() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unfazed');
  const result = await Therapist.updateMany({}, { $set: { tier: 'pro' } });
  console.log(`Updated ${result.modifiedCount} therapist(s) to PRO tier successfully!`);
  process.exit(0);
}

upgradeAll();