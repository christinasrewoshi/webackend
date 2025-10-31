import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getProducts);          
router.get("/product/:id", getProduct);       
router.post("/product", createProduct);       
router.put("/product/:id", updateProduct);    
router.delete("/product/:id", deleteProduct); 

export default router;
