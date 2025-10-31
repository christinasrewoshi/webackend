import express from "express";
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/user/:id", getUser);

router.post("/user", createUser);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

export default router;
