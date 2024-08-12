import express from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById } from "controllers/userController";
import { authenticate } from "middlewares/authMiddleware";
const router = express.Router();
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUserById);
router.delete("/:id", authenticate, deleteUserById);
export default router;
