import express from 'express';
const router = express.Router();
import {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,

} from '../controllers/groupController.js';
import { 
    protect, 
    admin 
} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(protect, getGroups);
router.route('/').post(protect, createGroup);
router
  .route('/:id')
  .get(protect, checkObjectId, getGroupById)
  .put(protect, checkObjectId, updateGroup)
  .delete(protect, checkObjectId, deleteGroup);

export default router;
