"use strict";

import { handleError } from "../utils/errorHandler.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { authServices } from "../services/auth.service.js";
import { authLoginBodySchema } from "../schemas/auth.schema.js";

async function login(req, res) {
  try {
    console.log("Login request received"); // Log para verificar que se recibe la solicitud
    const { body } = req;
    const { error: bodyError } = authLoginBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    // Llama al servicio de login
    const [accessToken, refreshToken, errorToken] = await authServices.login(body);

    // Maneja posibles errores del servicio de login
    if (errorToken) return respondError(req, res, 400, errorToken);

    // Configura la cookie con el refreshToken
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Asegura que sea seguro en producción
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    // Responde con éxito, incluyendo el accessToken
    respondSuccess(req, res, 200, {
      message: "Inicio de sesión exitoso",
      accessToken,
    });
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");
    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, { message: "Sesión cerrada correctamente" });
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");

    // Llama al servicio de refresh
    const [accessToken, errorToken] = await authServices.refresh(cookies.jwt);

    if (errorToken) return respondError(req, res, 400, errorToken);

    // Responde con el nuevo accessToken
    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> refresh");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

export const authController = { login, logout, refresh };