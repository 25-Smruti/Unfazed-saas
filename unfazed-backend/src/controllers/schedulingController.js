import Availability from '../models/Availability.js';
import Session from '../models/Session.js';

export const saveAvailability = async (req, res, next) => {
  try {
    const availability = await Availability.findOneAndUpdate(
      { therapist_id: req.user.id },
      { ...req.body, therapist_id: req.user.id },
      { upsert: true, new: true }
    );
    res.json({ success: true, availability });
  } catch (err) {
    next(err);
  }
};

export const getTherapistSlots = async (req, res, next) => {
  try {
    const { therapistId } = req.params;
    const availability = await Availability.findOne({ therapist_id: therapistId });
    res.json({ success: true, availability: availability || {} });
  } catch (err) {
    next(err);
  }
};

export const bookSession = async (req, res, next) => {
  try {
    const { therapist_id, client_id, startTime, endTime, durationMinutes, timezone } = req.body;

    const clash = await Session.findOne({
      therapist_id,
      status: { $ne: 'cancelled' },
      $or: [
        { startTime: { $lt: new Date(endTime), $gte: new Date(startTime) } },
        { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } }
      ]
    });

    if (clash) {
      return res.status(409).json({ success: false, message: 'This slot is already booked.' });
    }

    const session = await Session.create({
      therapist_id,
      client_id,
      startTime,
      endTime,
      durationMinutes,
      timezone
    });

    res.status(201).json({ success: true, session });
  } catch (err) {
    next(err);
  }
};
