"strict";

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
    // Verificar que req.email esté presente, ya que lo estamos extrayendo del token
    if (!req.email) {
      return respondError(req, res, 401, "No autorizado", "No se encontró el email del usuario en el token");
    }

    // Obtener el usuario a partir del email
    const user = await User.findOne({ email: req.email });

    if (!user) {
      return respondError(req, res, 404, "Usuario no encontrado");
    }

    console.log("Roles del usuario:", user.roles); // Verificar los roles del usuario

    // Verificar si el usuario tiene el rol "admin"
    if (user.roles.includes(ROLES[0])) {  // Usamos ROLES[0] para obtener 'admin'
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

export { isAdmin };
