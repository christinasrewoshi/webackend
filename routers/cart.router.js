import express from "express";
import { getCarts, getCart, createCart, updateCart, deleteCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/carts", getCarts);          
router.get("/cart/:id", getCart); 
router.post("/cart", createCart);        
router.put("/cart/:id", updateCart);     
router.delete("/cart/:id", deleteCart);  

export default router;
