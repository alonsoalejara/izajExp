"use strict";

import express from "express";
import { GruaController } from "../controllers/grua.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Aplica el middleware de autenticación solo a las rutas que lo necesiten
router.use(authenticationMiddleware);

// Rutas públicas (que no necesitan verificar el rol de admin)
router.get("/", GruaController.getGruas);
router.get("/:id", GruaController.getGruaById);

// Rutas que requieren rol de administrador
router.post("/", isAdmin, GruaController.createGrua);
router.put("/:id", isAdmin, GruaController.updateGrua);
router.delete("/:id", isAdmin, GruaController.deleteGrua);

export default router;