import Therapist from '../models/Therapist.js';
import SubscriptionTierConfig from '../models/SubscriptionTierConfig.js';
import Client from '../models/Client.js';

export const canAccess = async (therapistId, featureKey) => {
  const therapist = await Therapist.findById(therapistId);
  if (!therapist) return false;

  let config = await SubscriptionTierConfig.findOne({ tierName: therapist.tier });
  if (!config) {
    const defaults = {
      starter: { maxActiveClients: 5, allowsSOAPTemplates: false, advancedAnalytics: false },
      pro: { maxActiveClients: 30, allowsSOAPTemplates: true, advancedAnalytics: true },
      clinic: { maxActiveClients: 1000, allowsSOAPTemplates: true, advancedAnalytics: true }
    };
    config = defaults[therapist.tier] || defaults.starter;
  }

  if (featureKey === 'add_client') {
    const activeCount = await Client.countDocuments({ therapist_id: therapistId, status: 'active' });
    return activeCount < config.maxActiveClients;
  }

  if (featureKey === 'soap_templates') return !!config.allowsSOAPTemplates;
  if (featureKey === 'advanced_analytics') return !!config.advancedAnalytics;

  return false;
};
