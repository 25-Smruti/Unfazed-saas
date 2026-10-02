import Client from '../models/Client.js';

export const createClientIntake = async (req, res, next) => {
  try {
    const { therapist_id, name, email, phone, intakeData, consentAgreed } = req.body;
    const client = await Client.create({
      therapist_id,
      name,
      email,
      phone,
      intakeData,
      consentAgreed,
      consentTimestamp: consentAgreed ? new Date() : null
    });
    res.status(201).json({ success: true, client });
  } catch (err) {
    next(err);
  }
};

export const getClients = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = { therapist_id: req.user.id };
    if (status) query.status = status;
    if (search) query.name = { $regex: search, $options: 'i' };

    const clients = await Client.find(query).sort({ updatedAt: -1 });
    res.json({ success: true, clients });
  } catch (err) {
    next(err);
  }
};
export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findOneAndDelete({
      _id: id,
      therapist_id: req.user.id
    });

    if (!deletedClient) {
      return res.status(404).json({ success: false, message: 'Client not found or unauthorized' });
    }

    res.json({ success: true, message: 'Client removed successfully' });
  } catch (err) {
    next(err);
  }
};
