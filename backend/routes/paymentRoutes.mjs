import express from "express";
import { createPayment } from "../controllers/paymentController.mjs";
import { paymentSuccess } from "../controllers/successController.mjs";
import { paymentFail } from "../controllers/failController.mjs";

const router = express.Router();

// Payment routes
router.post("/create", createPayment);        // /api/payments/create
router.post("/success", paymentSuccess);      // /api/payments/success
router.post("/fail", paymentFail);            // /api/payments/fail

export default router;
