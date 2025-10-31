import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  description: { type: String },
  category: { type: String },
  quantity: { type: Number, required: true, default: 0 },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
