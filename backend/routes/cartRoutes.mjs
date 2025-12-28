import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cartController.mjs';
import { protect } from '../middleware/auth.mjs';
import { designUpload } from '../config/cloudinary.mjs';

const router = express.Router();

// Cart routes
router.route('/')
  .get(protect, getCart)
  .post(protect, designUpload.single('design'), addToCart);

router.route('/:itemId')
  .put(protect, designUpload.single('design'), updateCartItem)
  .delete(protect, removeFromCart);

export default router;
