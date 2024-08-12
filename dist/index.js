import express from "express";
import authRoutes from "routes/authRoutes";
import userRoutes from "routes/userRoutes";
import { errorHandler } from "middlewares/errorHandler";
const app = express();
app.use(express.json());
// Rutas de autenticación
app.use("/auth", authRoutes);
// Rutas de usuarios
app.use("/users", userRoutes);
// Manejo de errores
app.use(errorHandler);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
