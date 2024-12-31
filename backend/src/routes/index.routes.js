import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import gruaRoutes from "./grua.routes.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = express.Router();

router.use("/user", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);
router.use("/grua", gruaRoutes);

export default router;