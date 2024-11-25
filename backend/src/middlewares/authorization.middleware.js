"use strict";
// Autorización - Comprobar el rol del usuario
import { User } from "../models/user.model.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import { ROLES } from "../constants/roles.constants.js";

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    // Obtener el usuario a partir del email
    const user = await User.findOne({ email: req.email });

    if (!user) {
      return respondError(req, res, 404, "Usuario no encontrado");
    }

    // Verificar si el usuario tiene el rol "admin"
    if (user.roles.includes(ROLES.ADMIN)) {
      return next();
    }

    // Si no tiene rol de admin, denegar acceso
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

/**
 * Middleware de acceso común para roles específicos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function commonAccessMiddleware(req, res, next) {
  try {
    // Obtener el usuario a partir del email
    const user = await User.findOne({ email: req.email });

    if (!user) {
      return respondError(req, res, 404, "Usuario no encontrado");
    }

    // Verificar si el usuario tiene un rol permitido
    const allowedRoles = [ROLES.ADMIN]; // Agrega aquí más roles si es necesario
    const hasAccess = user.roles.some((role) => allowedRoles.includes(role));

    if (hasAccess) {
      return next();
    }

    // Si no tiene acceso, denegar
    return respondError(
      req,
      res,
      401,
      "No tienes permiso para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> commonAccessMiddleware");
  }
}

export { isAdmin, commonAccessMiddleware };