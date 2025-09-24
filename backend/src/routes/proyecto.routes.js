"use strict";

import express from "express";
import { ProyectoController } from "../controllers/proyecto.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Aplica el middleware de autenticación solo a las rutas que lo necesiten
router.use(authenticationMiddleware);

// Rutas públicas (que no necesitan verificar el rol de admin)
router.get("/", ProyectoController.getProyectos);
router.get("/:id", ProyectoController.getProyectoById);

// Rutas que requieren rol de administrador
router.post("/", isAdmin, ProyectoController.createProyecto);
router.put("/:id", isAdmin, ProyectoController.updateProyecto);
router.delete("/:id", isAdmin, ProyectoController.deleteProyecto);

export default router;