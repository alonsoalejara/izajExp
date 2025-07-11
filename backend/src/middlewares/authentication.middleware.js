"use strict";

import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "../config/env.config.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Verifica el token de acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return respondError(
        req,
        res,
        401,
        "No autorizado",
        "No hay token valido"
      );
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) return respondError(req, res, 403, "No autorizado", err.message);

      req.user = { _id: decoded.id, email: decoded.email, roles: decoded.roles || [] };
      console.log("✅ req.user cargado desde token:", req.user);

      next();
    });

  } catch (error) {
    handleError(error, "authentication.middleware -> verifyJWT");
  }
};

export default verifyJWT;