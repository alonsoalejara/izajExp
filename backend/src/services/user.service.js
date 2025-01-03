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
    const { nombre, apellido, rut, phone, specialty, email, roles } = user;

    const userFound = await User.findOne({ email });
    if (userFound) return [null, "El usuario ya existe"];

    // Validar roles ingresados
    const validRoles = roles.filter(role => Object.values(ROLES).includes(role));
    if (validRoles.length === 0) return [null, "El rol no existe"];

    // Generación automática de contraseña
    const password = `${nombre.charAt(0)}${rut.slice(0, 4)}`;

    const newUser = new User({
      nombre,
      apellido,
      rut,
      phone,
      specialty,
      email,
      password: await User.encryptPassword(password),
      roles: validRoles,
    });
    
    await newUser.save();

    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
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

    const { nombre, apellido, rut, email, roles } = user;

    const validRoles = roles.filter(role => Object.values(ROLES).includes(role));
    if (validRoles.length === 0) return [null, "El rol no existe"];

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nombre, apellido, rut, email, roles: validRoles },
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

export const UserService = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
