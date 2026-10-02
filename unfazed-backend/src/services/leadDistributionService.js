import Therapist from '../models/Therapist.js';
import Lead from '../models/Lead.js';

export const distributeLead = async (leadId) => {
  const lead = await Lead.findById(leadId);
  if (!lead) return null;

  const therapist = await Therapist.findOne(
    lead.preferredSpecialization ? { specializations: lead.preferredSpecialization } : {}
  );

  if (therapist) {
    lead.assignedTherapist_id = therapist._id;
    lead.status = 'assigned';
    await lead.save();
  }
  return lead;
};
