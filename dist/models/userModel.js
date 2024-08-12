import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { readData, writeData } from "utils/fileUtils";
const usersFilePath = "data/users.json";
// Obtener todos los usuarios
export const getUsers = () => {
    return readData(usersFilePath);
};
// Encontrar un usuario por nombre de usuario
export const findUserByUsername = (username) => {
    const users = getUsers();
    return users.find((user) => user.username === username);
};
// Encontrar un usuario por ID
export const findUserById = (id) => {
    const users = getUsers();
    return users.find((user) => user.id === id);
};
// Crear un nuevo usuario
export const createUser = async (username, password) => {
    const users = getUsers();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), username, password: hashedPassword };
    users.push(newUser);
    writeData(usersFilePath, users);
    return newUser;
};
// Actualizar la contraseña de un usuario
export const updateUserPassword = async (username, newPassword) => {
    const users = getUsers();
    const user = users.find((user) => user.username === username);
    if (user) {
        user.password = await bcrypt.hash(newPassword, 10);
        writeData(usersFilePath, users);
        return user;
    }
    return null;
};
// Actualizar datos de un usuario
export const updateUser = (id, updatedData) => {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        writeData(usersFilePath, users);
        return users[userIndex];
    }
    return null;
};
// Eliminar un usuario
export const deleteUser = (id) => {
    let users = getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users = users.filter((user) => user.id !== id);
        writeData(usersFilePath, users);
        return true;
    }
    return false;
};
