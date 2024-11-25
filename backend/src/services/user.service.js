"use strict";

import User from "../models/user.model.js";
import { handleError } from "../utils/errorHandler.js";
import { ROLES }  from "../constants/roles.constants.js";

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
    const { username, email, password, roles } = user;

    const userFound = await User.findOne({ email });
    if (userFound) return [null, "El usuario ya existe"];

    // Validar roles ingresados
    const validRoles = roles.filter(role => Object.values(ROLES).includes(role));
    if (validRoles.length === 0) return [null, "El rol no existe"];

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      roles: validRoles, // Asignar roles directamente como cadenas de texto
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

    const { username, email, password, newPassword, roles } = user;

    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    // Validar roles ingresados
    const validRoles = roles.filter(role => Object.values(ROLES).includes(role));
    if (validRoles.length === 0) return [null, "El rol no existe"];

    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: await User.encryptPassword(newPassword || password),
        roles: validRoles, // Actualizar roles directamente como cadenas de texto
      },
      { new: true }
    );

    return [userUpdated, null];
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