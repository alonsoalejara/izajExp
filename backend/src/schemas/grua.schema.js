"use strict";

import Joi from "joi";

const gruaBodySchema = Joi.object({
  nombre: Joi.string().trim().required().messages({
    "string.empty": "El nombre de la grúa no puede estar vacío.",
    "any.required": "El nombre de la grúa es obligatorio.",
    "string.base": "El nombre de la grúa debe ser de tipo string.",
  }),
  contrapeso: Joi.number().min(0).required().messages({
    "number.base": "El contrapeso debe ser un número.",
    "number.min": "El contrapeso no puede ser negativo.",
    "any.required": "El contrapeso es obligatorio.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const gruaIdSchema = Joi.object({
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

export { gruaBodySchema, gruaIdSchema };