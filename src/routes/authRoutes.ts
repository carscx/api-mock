import express from "express";
import {
  register,
  login,
  validateCode,
  recoverPassword,
  refreshToken // Nuevo endpoint
} from "controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/validate-code", validateCode);
router.post("/recover", recoverPassword);
router.post("/refresh", refreshToken); // Nuevo endpoint

export default router;
