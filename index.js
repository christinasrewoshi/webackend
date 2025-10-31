import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routers/user.router.js"
import productRouters from "./routers/product.router.js"
import orderRouters from "./routers/order.router.js"
import cartRouters from "./routers/cart.router.js"

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json())

dotenv.config()

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