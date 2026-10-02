import Therapist from '../models/Therapist.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateSlug } from '../utils/generateSlug.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, bio, specializations, languages } = req.body;
    const existing = await Therapist.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    let slug = generateSlug(name);
    let count = 1;
    while (await Therapist.findOne({ slug })) {
      slug = `${generateSlug(name)}-${count++}`;
    }

    const therapist = await Therapist.create({
      name,
      email,
      password_hash: password,
      slug,
      bio,
      specializations,
      languages
    });

    const token = jwt.sign({ id: therapist._id, email: therapist.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      token,
      therapist: { id: therapist._id, name: therapist.name, slug: therapist.slug, email: therapist.email }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const therapist = await Therapist.findOne({ email });
    if (!therapist) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, therapist.password_hash);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: therapist._id, email: therapist.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      token,
      therapist: { id: therapist._id, name: therapist.name, slug: therapist.slug, email: therapist.email, tier: therapist.tier }
    });
  } catch (err) {
    next(err);
  }
};
