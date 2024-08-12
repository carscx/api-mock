import express from "express";
import { register, login, recoverPassword } from "controllers/authController";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/recover", recoverPassword);
export default router;
