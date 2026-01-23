import User from "../models/user.model.js";
import { z } from "zod";

const userValidator = z.object({
  name: z.string().min(2, "Name is too short."),
  email: z.string().email("Invalid email address."),
  age: z.number().int().positive("Age must be a positive integer."),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  role: z.enum(["user", "admin"]).default("user"),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).optional(),
});

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};