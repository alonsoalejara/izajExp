"use strict";

import User from "../models/user.model.js";
import { handleError } from "../utils/errorHandler.js";
import { ROLES } from "../constants/roles.constants.js";

async function getUsers() {
  try {
    const users = await User.find().select("-password").exec();
    if (!users) return [null, "No hay usuarios"];
    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

async function createUser(user) {
  try {
    const { nombre, apellido, rut, telefono, cargo, especialidad, email, roles, password } = user;

    // Validar que no exista ya un usuario con ese email
    const userFound = await User.findOne({ email });
    if (userFound) return [null, "El usuario ya existe"];

    // Validar roles
    const validRoles = roles.filter(role => Object.values(ROLES).includes(role));
    if (validRoles.length === 0) return [null, "El rol no existe"];

    // Validar password
    if (!password) return [null, "La contraseña es obligatoria"];

    // Encriptar password
    const encryptedPassword = await User.encryptPassword(password);

    // Crear nuevo usuario
    const newUser = new User({
      nombre,
      apellido,
      rut,
      email,
      telefono,
      cargo,
      especialidad,
      password: encryptedPassword,
      roles: validRoles, 
    });

    await newUser.save();
    return [newUser, null];

  } catch (error) {
    // Capturar error de índice duplicado (Mongo code 11000)
    if (error.code === 11000) {
      if (error.keyPattern?.rut) {
        return [null, `El RUT ya está registrado: ${error.keyValue.rut}`];
      }
      if (error.keyPattern?.email) {
        return [null, `El email ya está registrado: ${error.keyValue.email}`];
      }
    }

    handleError(error, "user.service -> createUser");
    return [null, "Error inesperado al crear usuario"];
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).select("-password").exec();
    if (!user) return [null, "El usuario no existe"];
    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

async function updateUser(id, user) {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return [null, "El usuario no existe"];

    const { nombre, apellido, rut, email, roles, telefono, cargo, especialidad } = user;

    const validRoles = roles.filter(role => Object.values(ROLES).includes(role));
    if (validRoles.length === 0) return [null, "El rol no existe"];

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nombre, apellido, rut, email, telefono, cargo, especialidad, roles: validRoles },
      { new: true }
    );

    return [updatedUser, null];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

async function updateFirma(id, firma) {
  try {
    const user = await User.findById(id);
    if (!user) return [null, 'Usuario no existe'];

    user.firma = firma;          // puede ser string o null
    await user.save();
    // Excluimos password
    const { password, ...safe } = user.toObject();
    return [safe, null];
  } catch (error) {
    handleError(error, 'user.service -> updateFirma');
    return [null, 'Error actualizando la firma'];
  }
}

export const UserService = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateFirma,
};
