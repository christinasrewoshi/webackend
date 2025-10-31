import Cart from "../models/cart.model.js"
import { z } from "zod";

const cartValidator = z.object({
   userId: z.string(),
   items: z.array(z.object({
     productId: z.string(),
     quantity: z.number().int().positive(),
   })),

  orderStatus: z.enum(["active", "ordered", "cancelled"]).optional(),
});


export const getCarts = async(req, res) => {
    try {
            const carts = await Cart.find({});
            res.status(200).json(carts);    
    } catch (error) {
            res.status(500).json({message: error.message});
    }
}

export const getCart = async (req, res) => {
    try {
            const {id} = req.params;
            const cart = await Cart.findById(id);
            res.status(200).json(cart);
    } catch (error) {
            res.status(500).json({message: error.message});
    }
}

export const createCart = async (req, res) => {
    try {
            const cart = await Cart.create(req.body);
            res.status(200).json(cart);
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}

export const updateCart = async (req, res) => {
    try {
            const {id} = req.params;
    
            const cart = await Cart.findByIdAndUpdate(id, req.body);
    
            if(!cart){
                return res.status(404).json({message: "Cart product not found"});
            }
    
            const updatedCart = await Cart.findById(id);
            res.status(200).json(updatedCart);
    
    } catch (error) {
            res.status(500).json({message: error.message});
    }
}

export const deleteCart = async (req, res) => {
    try {
            const {id} = req.params;
    
            const cart = await Cart.findByIdAndDelete(id);
    
            if(!cart) {
                return res.status(404).json({message: "Cart product not found"});
            }
    
            res.status(200).json({message: "Cart product deleted successfully."});
    } catch (error) {
            res.status(500).json({message: error.message});
    }
}