import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderStatus,
  getOrders,
  handlePaymentCallback,
  getOrderStatus
} from '../controllers/orderController.js';
import { protect, adminProtect } from '../middleware/auth.js';

const router = express.Router();

// User order routes
router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.route('/payment-callback')
  .post(handlePaymentCallback);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:orderId/status')
  .get(protect, getOrderStatus);

// Admin routes
router.route('/admin/orders')
  .get(adminProtect, getOrders);

router.route('/admin/orders/:id')
  .put(adminProtect, updateOrderStatus);

export default router;
