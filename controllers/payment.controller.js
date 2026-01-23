import Payment from "../models/payment.model.js";
import { z } from "zod";

const paymentSchema = z.object({
  orderId: z.string(),
  paymentMethod: z.enum(["card", "cod", "paypal"]),
  amount: z.number().positive(),
});

export const createPayment = async (req, res) => {
  try {
    const parsedData = paymentSchema.parse(req.body);

    const payment = await Payment.create({
      userId: req.user.id,
      paymentStatus: parsedData.paymentMethod === "cod" ? "paid" : "pending",
      ...parsedData,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({
      message: "Invalid payment data",
      error: error.message,
    });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: req.body.status,
        transactionId: req.body.transactionId,
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
