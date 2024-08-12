import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByUsername, createUser, updateUserPassword } from "models/userModel";
const secretKey = "tu_secreto";
export const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = findUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: "Usuario ya registrado" });
            return;
        }
        const newUser = await createUser(username, password);
        res
            .status(201)
            .json({ message: "Usuario registrado con éxito", user: newUser });
    }
    catch (err) {
        next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const { username, password, code } = req.body;
        const user = findUserByUsername(username);
        if (!user) {
            res.status(400).json({ message: "Credenciales incorrectas" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Credenciales incorrectas" });
            return;
        }
        if (code !== "123456") {
            res.status(400).json({ message: "Código de autenticación incorrecto" });
            return;
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (err) {
        next(err);
    }
};
export const recoverPassword = async (req, res, next) => {
    try {
        const { username, newPassword } = req.body;
        const user = await updateUserPassword(username, newPassword);
        if (!user) {
            res.status(400).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json({ message: "Contraseña actualizada con éxito" });
    }
    catch (err) {
        next(err);
    }
};
