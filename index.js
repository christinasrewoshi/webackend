import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';

import userRouters from "./routers/user.router.js"
import productRouters from "./routers/product.router.js"
import orderRouters from "./routers/order.router.js"
import cartRouters from "./routers/cart.router.js"

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get("/",(req,res)=>{
    res.send("Backend is Running!")
})

mongoose.connect(process.env.MONGO_URI).then(
    ()=>{console.log("MongoDB is Connected.")})
    .catch((error)=>{console.log(error)})

app.use("/api",userRouters);
app.use("/api",productRouters);
app.use("/api",orderRouters);
app.use("/api",cartRouters);

app.listen(port,()=>{
    console.log(`Server is running in http://localhost:${port}`)

})
