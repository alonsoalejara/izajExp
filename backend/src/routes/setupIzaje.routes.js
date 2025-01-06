"use strict";

import express from "express";
import { SetupIzajeController } from "../controllers/setupIzaje.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", SetupIzajeController.getSetupIzajes);
router.get("/:id", SetupIzajeController.getSetupIzajeById);
router.post("/", SetupIzajeController.createSetupIzaje);
router.put("/:id", SetupIzajeController.updateSetupIzaje);
router.delete("/:id", SetupIzajeController.deleteSetupIzaje);

export default router;
