import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import gruaRoutes from "./grua.routes.js";
import proyectoRoutes from "./proyecto.routes.js";
import setupIzajeRoutes from "./setupIzaje.routes.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Ruta básica para la raíz de la API
router.get("/", (req, res) => {
  res.send("Bienvenido a la API de IzajExp");
});

router.use("/user", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);
router.use("/grua", gruaRoutes);
router.use("/proyecto", proyectoRoutes);
router.use("/setupIzaje", setupIzajeRoutes);

export default router;