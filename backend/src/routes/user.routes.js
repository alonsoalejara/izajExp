"use strict";
import express from "express";
import { UserController } from "../controllers/user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Aplica el middleware de autenticación solo a las rutas que lo necesiten
router.use(authenticationMiddleware);

// Rutas públicas (que no necesitan verificar el rol de admin)
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);

// Rutas que requieren rol de administrador
router.post("/", isAdmin, UserController.createUser);
router.put("/:id", isAdmin, UserController.updateUser);
router.delete("/:id", isAdmin, UserController.deleteUser);

// Rutas para manejar la firma
router.post('/:id/signature', UserController.saveSignature);
router.delete('/:id/signature', UserController.deleteSignature);

export default router;