import { User } from "../models/user.model.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import { ROLES } from "../constants/roles.constants.js";

/**
 * Comprueba si el usuario es Jefe de Área (rol administrador)
 */
async function isAdmin(req, res, next) {
  try {
    if (!req.email) {
      return respondError(req, res, 401, "No autorizado", "No se encontró el email del usuario en el token");
    }

    const user = await User.findOne({ email: req.email });

    if (!user) {
      return respondError(req, res, 404, "Usuario no encontrado");
    }

    console.log("Roles del usuario:", user.roles);

    // ✅ Cambiar validación para que 'jefe' sea el único rol con privilegios de admin
    if (user.roles.includes(ROLES.JEFE)) {
      return next();
    }

    return respondError(
      req,
      res,
      401,
      "Acceso denegado",
      "Se requiere rol de Jefe de Área para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

export { isAdmin };
