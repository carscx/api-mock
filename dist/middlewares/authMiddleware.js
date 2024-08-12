import jwt from "jsonwebtoken";
const secretKey = "tu_secreto";
export const authenticate = (req, res, next) => {
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
    }
    catch (err) {
        res.status(401).json({ message: "Token no válido" });
    }
};
