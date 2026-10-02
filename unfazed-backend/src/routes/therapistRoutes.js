import express from 'express';
import Therapist from '../models/Therapist.js';

const router = express.Router();

// 1. Get all therapists for public directory search
router.get('/all', async (req, res, next) => {
  try {
    const therapists = await Therapist.find({}, 'name slug specialization bio consultationFee');
    res.json({ success: true, therapists });
  } catch (err) {
    next(err);
  }
});

// 2. Get single therapist by slug for booking profile
router.get('/:slug', async (req, res, next) => {
  try {
    const therapist = await Therapist.findOne({ slug: req.params.slug });
    if (!therapist) {
      return res.status(404).json({ success: false, message: 'Therapist not found' });
    }
    res.json({ success: true, therapist });
  } catch (err) {
    next(err);
  }
});

export default router;