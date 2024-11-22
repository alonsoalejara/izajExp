import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = express.Router();

router.use("/user", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);

export default router;