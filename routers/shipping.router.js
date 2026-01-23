import express from "express";
import {
  createShipping,
  getMyShipping,
  updateShippingStatus,
} from "../controllers/shipping.controller.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createShipping);
router.get("/my", protect, admin, getMyShipping);
router.patch("/:id/status", protect, admin, updateShippingStatus);

export default router;
