import { canAccess } from '../services/entitlementService.js';

export const requireEntitlement = (featureKey) => {
  return async (req, res, next) => {
    try {
      const therapistId = req.user?.id;
      const allowed = await canAccess(therapistId, featureKey);
      if (!allowed) {
        return res.status(403).json({
          success: false,
          error: 'FEATURE_GATED',
          message: `Your current subscription tier does not allow: ${featureKey}`
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
