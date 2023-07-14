import express from 'express';
const router = express.Router();
import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,

} from '../controllers/planController.js';
import { 
    protect, 
    admin 
} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(protect, getPlans);
router.route('/').post(protect, createPlan);
router
  .route('/:id')
  .get(protect, checkObjectId, getPlanById)
  .put(protect, checkObjectId, updatePlan)
  .delete(protect, checkObjectId, deletePlan);

export default router;
