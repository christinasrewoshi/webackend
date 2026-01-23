import Product from "../models/product.model.js";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().nonnegative("Price must be 0 or higher").optional().default(0),
  description: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().nonnegative("Quantity must be 0 or higher").optional().default(0),
  image: z.string().optional(),
});

const updateProductSchema = productSchema.partial();

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort = "latest",
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "price_high") sortOption = { price: -1 };
    else if (sort === "price_low") sortOption = { price: 1 };
    else if (sort === "name_asc") sortOption = { name: 1 };
    else if (sort === "name_desc") sortOption = { name: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const parsedData = productSchema.parse(req.body);

    const product = await Product.create(parsedData);

    res.status(201).json(product);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const parsedData = updateProductSchema.parse(req.body);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      parsedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json(updatedProduct);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};
