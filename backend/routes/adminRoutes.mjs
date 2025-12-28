import express from 'express';
import {
  authAdmin,
  getCustomers,
  getCustomerById,
  registerAdmin
} from '../controllers/adminController.js';
import { adminProtect } from '../middleware/auth.js';

const router = express.Router();

// Admin routes
router.route('/register').post(registerAdmin);
router.route('/login').post(authAdmin);
router.route('/customers').get(adminProtect, getCustomers);
router.route('/customers/:id').get(adminProtect, getCustomerById);

export default router;
