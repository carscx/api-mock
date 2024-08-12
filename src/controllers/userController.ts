import { Request, Response, NextFunction } from "express";
import {
  getUsers,
  findUserById,
  updateUser,
  deleteUser,
  User
} from "models/userModel";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const users: User[] = getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user: User | undefined = findUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const updatedUser: User | null = updateUser(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const deleted: boolean = deleteUser(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
