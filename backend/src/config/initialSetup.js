"use strict";
// Importa el modelo de datos 'User'
import User from "../models/user.model.js";
import { ROLES } from "../constants/roles.constants.js";

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    // Verifica si ya existen usuarios en la base de datos
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    // Crea usuarios predeterminados con roles como cadenas de texto
    await Promise.all([
      new User({
        username: "user",
        email: "user@email.com",
        password: await User.encryptPassword("user123"),
        roles: [ROLES.USER], // Asigna el rol 'user' directamente
      }).save(),
      new User({
        username: "admin",
        email: "admin@email.com",
        password: await User.encryptPassword("admin123"),
        roles: [ROLES.ADMIN], // Asigna el rol 'admin' directamente
      }).save(),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

export { createUsers };