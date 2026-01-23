import Shipping from "../models/shipping.model.js";
import { z } from "zod";

const shippingSchema = z.object({
  orderId: z.string(),
  address: z.object({
    fullName: z.string(),
    phone: z.string(),
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  shippingMethod: z.enum(["standard", "express"]).optional(),
});

export const createShipping = async (req, res) => {
  try {
    const parsedData = shippingSchema.parse(req.body);

    const shipping = await Shipping.create({
      userId: req.user.id,
      ...parsedData,
    });

    res.status(201).json(shipping);
  } catch (error) {
    res.status(400).json({
      message: "Invalid shipping data",
      error: error.message,
    });
  }
};

export const getMyShipping = async (req, res) => {
  try {
    const shipping = await Shipping.find({ userId: req.user.id });
    res.json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShippingStatus = async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!shipping) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    res.json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
