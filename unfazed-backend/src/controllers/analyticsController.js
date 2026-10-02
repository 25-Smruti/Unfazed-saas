import mongoose from 'mongoose';
import Session from '../models/Session.js';
import Payment from '../models/Payment.js';

export const getTherapistMetrics = async (req, res, next) => {
  try {
    const therapistId = new mongoose.Types.ObjectId(req.user.id);

    const revenueTrend = await Payment.aggregate([
      { $match: { therapist_id: therapistId, status: 'captured' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalRevenue: { $sum: '$net_amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const sessionStats = await Session.aggregate([
      { $match: { therapist_id: therapistId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ success: true, data: { revenueTrend, sessionStats } });
  } catch (err) {
    next(err);
  }
};
