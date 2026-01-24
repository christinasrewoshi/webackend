import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import cookieParser from 'cookie-parser';
import authRouters from './routers/auth.router.js';
import userRouters from "./routers/user.router.js";
import productRouters from "./routers/product.router.js";
import orderRouters from "./routers/order.router.js";
import cartRouters from "./routers/cart.router.js";
import shippingRouters from "./routers/shipping.router.js";
import paymentRouters from "./routers/payment.router.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouters);
app.use("/api/users",userRouters);
app.use("/api/products",productRouters);
app.use("/api/shippings",shippingRouters);
app.use("/api/payments",paymentRouters);
app.use("/api/",orderRouters);
app.use("/api/",cartRouters);

app.get("/",(req,res)=>{
    res.send("Backend is Running!")
})

connectDB();

app.listen(port,()=>{
    console.log(`Server is running in http://localhost:${port}`)

})