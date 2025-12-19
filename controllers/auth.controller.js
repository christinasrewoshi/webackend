import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const register = async (req, res) => {
  try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);
        
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ success: true, message: 'User registered', token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
  try {
        const { identifier, password } = req.body; 
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
