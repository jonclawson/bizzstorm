import express from 'express';
const router = express.Router();
import {
  getIdeas,
  createIdea,
  deleteIdea,

} from '../controllers/ideaController.js';
import { 
    protect, 
    admin 
} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(protect, getIdeas);
router.route('/').post(protect, createIdea);
router
  .route('/:id')
  .delete(protect, checkObjectId, deleteIdea);

export default router;
