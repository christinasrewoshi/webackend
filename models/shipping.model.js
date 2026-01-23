import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "express"],
      default: "standard",
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shipping", shippingSchema);
