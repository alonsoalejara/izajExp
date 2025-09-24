"use strict";

import Joi from "joi";
import { ROLES } from "../constants/roles.constants.js";

// Verifica si ROLES es un array antes de usarlo
const validRoles = Array.isArray(ROLES) ? ROLES : [];

const userBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacío.",
    "any.required": "El apellido es obligatorio.",
    "string.base": "El apellido debe ser de tipo string.",
  }),
  rut: Joi.string().required().messages({
    "string.empty": "El RUT no puede estar vacío.",
    "any.required": "El RUT es obligatorio.",
    "string.base": "El RUT debe ser de tipo string.",
  }),
  telefono: Joi.string().required().messages({
    "string.empty": "El teléfono no puede estar vacío.",
    "any.required": "El teléfono es obligatorio.",
    "string.base": "El teléfono debe ser de tipo string.",
  }),
  cargo: Joi.string().required().messages({
    "string.empty": "El cargo no puede estar vacío.",
    "any.required": "El cargo es obligatorio.",
    "string.base": "El cargo debe ser de tipo string.",
  }),
  especialidad: Joi.string().required().messages({
    "string.empty": "La especialidad no puede estar vacía.",
    "any.required": "La especialidad es obligatoria.",
    "string.base": "La especialidad debe ser de tipo string.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  roles: Joi.array()
    .items(Joi.string().valid(...validRoles))
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
    }),
  password: Joi.string().min(5).messages({
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

export { userBodySchema, userIdSchema };