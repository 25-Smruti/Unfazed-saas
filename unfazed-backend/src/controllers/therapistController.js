import Therapist from '../models/Therapist.js';

export const getPublicProfileBySlug = async (req, res, next) => {
  try {
    const therapist = await Therapist.findOne({ slug: req.params.slug }).select('-password_hash');
    if (!therapist) return res.status(404).json({ success: false, message: 'Therapist profile not found' });
    res.json({ success: true, therapist });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const therapist = await Therapist.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password_hash');
    res.json({ success: true, therapist });
  } catch (err) {
    next(err);
  }
};
