// backend/routes/productRoutes.mjs
import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  setPrimaryImage
} from '../controllers/productController.mjs';
import { protect, adminProtect } from '../middleware/auth.mjs';
import { upload } from '../config/cloudinary.mjs';

const router = express.Router();

// Public Routes
router.route('/')
  .get(getProducts);

router.route('/:id')
  .get(getProductById);

// Admin Routes with multiple image upload
router.route('/')
  .post(adminProtect, upload.array('images', 10), createProduct);

router.route('/:id')
  .put(adminProtect, upload.array('images', 10), updateProduct)
  .delete(adminProtect, deleteProduct);

// Image management routes
router.route('/:id/images/:imageId')
  .delete(adminProtect, deleteProductImage);

router.route('/:id/images/:imageId/primary')
  .patch(adminProtect, setPrimaryImage);

export default router;
