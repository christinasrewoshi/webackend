import express from "express";
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/orders", getOrders);           
router.get("/order/:id", getOrder);         
router.post("/order", createOrder);          
router.put("/order/:id", updateOrder);      
router.delete("/order/:id", deleteOrder);    

export default router;
