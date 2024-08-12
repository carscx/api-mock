import { getUsers, findUserById, updateUser, deleteUser } from "models/userModel";
export const getAllUsers = (req, res, next) => {
    try {
        const users = getUsers();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
};
export const getUserById = (req, res, next) => {
    try {
        const user = findUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
export const updateUserById = (req, res, next) => {
    try {
        const updatedUser = updateUser(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        next(err);
    }
};
export const deleteUserById = (req, res, next) => {
    try {
        const deleted = deleteUser(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
