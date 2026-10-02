/*import express from 'express';
import { createClientIntake, getClients } from '../controllers/clientController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireEntitlement } from '../middleware/entitlementMiddleware.js';

const router = express.Router();
router.post('/intake', createClientIntake);
router.get('/', requireAuth, getClients);
router.post('/add', requireAuth, requireEntitlement('add_client'), createClientIntake);

export default router;*/
import express from 'express';
import { createClientIntake, getClients, deleteClient } from '../controllers/clientController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireEntitlement } from '../middleware/entitlementMiddleware.js';

const router = express.Router();

router.post('/intake', createClientIntake);
router.get('/', requireAuth, getClients);
router.post('/add', requireAuth, requireEntitlement('add_client'), createClientIntake);
router.delete('/:id', requireAuth, deleteClient);

export default router;