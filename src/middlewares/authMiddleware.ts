import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "tu_secreto";

interface AuthenticatedRequest extends Request {
  user?: string | object; // Puedes ajustar el tipo según lo que contenga el token decodificado
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token no válido" });
  }
};
