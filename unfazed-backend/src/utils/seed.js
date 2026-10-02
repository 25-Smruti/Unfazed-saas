import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Therapist from '../models/Therapist.js';
import Client from '../models/Client.js';
import SubscriptionTierConfig from '../models/SubscriptionTierConfig.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Clearing database...');
  await Therapist.deleteMany({});
  await Client.deleteMany({});
  await SubscriptionTierConfig.deleteMany({});

  console.log('Seeding Tier Configurations...');
  await SubscriptionTierConfig.create([
    { tierName: 'starter', maxActiveClients: 5, allowsSOAPTemplates: false, advancedAnalytics: false },
    { tierName: 'pro', maxActiveClients: 30, allowsSOAPTemplates: true, advancedAnalytics: true },
    { tierName: 'clinic', maxActiveClients: 1000, allowsSOAPTemplates: true, advancedAnalytics: true }
  ]);

  console.log('Seeding Sample Therapist...');
  const therapist = await Therapist.create({
    name: 'Dr. Sharma',
    email: 'dr.sharma@example.com',
    password_hash: 'Password123!',
    slug: 'dr-sharma',
    bio: 'Licensed Clinical Psychologist with 8+ years specializing in Anxiety & CBT.',
    specializations: ['CBT', 'Anxiety Management', 'Depression'],
    languages: ['English', 'Hindi'],
    tier: 'pro',
    sessionPrice: 2000
  });

  console.log('Seeding Sample Client...');
  await Client.create({
    therapist_id: therapist._id,
    name: 'Aarav Patel',
    email: 'aarav@example.com',
    phone: '+91 9876543210',
    tags: ['Anxiety', 'Active'],
    status: 'active',
    consentAgreed: true,
    consentTimestamp: new Date(),
    intakeData: {
      demographics: { age: 29, location: 'Bengaluru' },
      presentingConcern: 'Workplace stress and panic attacks.'
    }
  });

  console.log('Database successfully seeded!');
  process.exit(0);
}

seed();
