import User from "../models/user.model.js";
import { ROLES } from "../constants/roles.constants.js";

async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    await Promise.all([
      new User({
        nombre: "Juan",
        apellido: "Capataz",
        rut: "12345678-9",
        email: "capataz@email.com",
        position: "Capataz",
        specialty: "Piping",
        phone: "+56912345678",
        password: await User.encryptPassword("capataz123"),
        roles: [ROLES.CAPATAZ],
      }).save(),
      new User({
        nombre: "Laura",
        apellido: "Jefe",
        rut: "98765432-1",
        email: "jefe@email.com",
        position: "Jefe Área",
        specialty: "Obras Civiles",
        phone: "+56987654321",
        password: await User.encryptPassword("jefe123"),
        roles: [ROLES.JEFE],
      }).save(),
      new User({
        nombre: "Carlos",
        apellido: "Supervisor",
        rut: "19283746-5",
        email: "supervisor@email.com",
        position: "Supervisor",
        specialty: "Estructura",
        phone: "+56919283746",
        password: await User.encryptPassword("supervisor123"),
        roles: [ROLES.SUPERVISOR],
      }).save(),
    ]);
    console.log("* => Usuarios jefe, capataz y supervisor creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios iniciales:", error);
  }
}

export { createUsers };
