import Product from "../models/product.model.js";
import { z } from "zod";

const productValidator = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().nonnegative("Price must be 0 or higher").optional().default(0),
  description: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().nonnegative("Quantity must be 0 or higher").optional().default(0),
  image: z.string().optional(),
});

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const parsedData = productValidator.parse(req.body); 
    const newProduct = await Product.create(parsedData);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const parsedData = updateProductValidator.partial().parse(req.body); 
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, parsedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
