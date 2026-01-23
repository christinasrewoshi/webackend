import express from "express";
import {
  createPayment,
  getMyPayments,
  updatePaymentStatus,
} from "../controllers/payment.controller.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPayment);
router.get("/my", protect, getMyPayments);
router.patch("/:id/status", protect, admin, updatePaymentStatus);

export default router;
