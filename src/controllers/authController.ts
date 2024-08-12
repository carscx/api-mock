import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";
import {
  findUserByUsername,
  createUser,
  updateUserPassword,
  User,
  findUserById
} from "models/userModel";

const secretKey = "tu_secreto";
const refreshSecretKey = "tu_refresh_secreto";

const refreshTokens: string[] = []; // En producción, almacenar esto en una base de datos.

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "15m" });
};

const generateRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign({ userId }, refreshSecretKey, {
    expiresIn: "7d"
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    const existingUser: User | undefined = findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ message: "Usuario ya registrado" });
      return;
    }

    const newUser: User = await createUser(username, password);
    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    const user: User | undefined = findUserByUsername(username);
    if (!user) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({ accessToken, refreshToken, user });
  } catch (err) {
    next(err);
  }
};

export const validateCode = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { code } = req.body as { code: string };

    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(code)) {
      res.status(400).json({
        message: "Código no válido. Debe ser un número de 6 dígitos."
      });
      return;
    }

    // Simula obtener el usuario del token (en producción, deberías validar el token)
    const user = {
      id: "user_id_placeholder",
      username: "username_placeholder"
    };

    res.status(200).json({ message: "Código validado con éxito", user });
  } catch (err) {
    next(err);
  }
};

export const recoverPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, newPassword } = req.body as {
      username: string;
      newPassword: string;
    };

    const user: User | null = await updateUserPassword(username, newPassword);
    if (!user) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { refreshToken } = req.body as { refreshToken: string };

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh Token no proporcionado" });
      return;
    }

    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).json({ message: "Refresh Token no válido" });
      return;
    }

    jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Refresh Token no válido" });
        return;
      }

      const { userId } = user as { userId: string };
      const currentUser = findUserById(userId);

      if (!currentUser) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      const newAccessToken = generateAccessToken(userId);
      const newRefreshToken = generateRefreshToken(userId);

      refreshTokens.splice(refreshTokens.indexOf(refreshToken), 1);
      refreshTokens.push(newRefreshToken);

      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: currentUser
      });
    });
  } catch (err) {
    next(err);
  }
};
