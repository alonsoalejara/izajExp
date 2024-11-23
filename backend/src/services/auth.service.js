"use strict";

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; // Asegúrate de importar correctamente tu modelo
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../config/env.config.js";

async function login({ email, password }) {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return [null, null, "El usuario o contraseña son incorrectos"];
    }

    // Compara la contraseña
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return [null, null, "El usuario o contraseña son incorrectos"];
    }

    // Genera los tokens
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, roles: user.roles },
      ACCESS_JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      REFRESH_JWT_SECRET,
      { expiresIn: "7d" }
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    console.error("Error en el servicio de login:", error);
    return [null, null, "Error al iniciar sesión"];
  }
}

async function refresh(token) {
  try {
    const decoded = jwt.verify(token, REFRESH_JWT_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, roles: decoded.roles },
      ACCESS_JWT_SECRET,
      { expiresIn: "1d" }
    );

    return [accessToken, null];
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return [null, "Token inválido o expirado"];
  }
}

export const authServices = { login, refresh };