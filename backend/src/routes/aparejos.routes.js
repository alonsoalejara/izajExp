"use strict";

import express from "express";
import { AparejosController } from "../controllers/aparejos.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", AparejosController.getAparejos);
router.get("/:id", AparejosController.getAparejoById);
router.post("/", AparejosController.createAparejo);
router.put("/:id", AparejosController.updateAparejo);
router.delete("/:id", AparejosController.deleteAparejo);

export default router;