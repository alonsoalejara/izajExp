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
        nombre: "user",
        apellido: "role",
        rut: "00000000-0",
        email: "user@email.com",
        position: "Supervisor",
        specialty: "Estructura",
        phone: "+56900000000",
        password: await User.encryptPassword("user123"),
        roles: [ROLES.USER], // Asigna el rol 'user' directamente
      }).save(),
      new User({
        nombre: "admin",
        apellido: "role",
        rut: "11111111-1",
        email: "admin@email.com",
        position: "Jefe Área",
        specialty: "Obras Civiles",
        phone: "+56911111111",
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