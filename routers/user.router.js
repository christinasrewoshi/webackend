import express from 'express';
const router = express.Router();

import { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controller.js'; 
import { protect, admin } from '../middlewares/auth.middleware.js';

router.route('/').get(protect, admin, getUsers);
router.get('/profile', protect, (req, res) => res.json(req.user));
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;