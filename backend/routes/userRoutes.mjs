import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
