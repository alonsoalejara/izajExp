"use strict";

import Joi from "joi";

const aparejosBodySchema = Joi.object({
  descripcion: Joi.string().trim().required().messages({
    "string.empty": "La descripción del aparejo no puede estar vacía.",
    "any.required": "La descripción del aparejo es obligatoria.",
    "string.base": "La descripción del aparejo debe ser de tipo string.",
  }),
  cantidad: Joi.number().min(1).required().messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad no puede ser menor a 1.",
    "any.required": "La cantidad es obligatoria.",
  }),
  pesoUnitario: Joi.number().min(0).required().messages({
    "number.base": "El peso unitario debe ser un número.",
    "number.min": "El peso unitario no puede ser negativo.",
    "any.required": "El peso unitario es obligatorio.",
  }),
  pesoTotal: Joi.number().min(0).required().messages({
    "number.base": "El peso total debe ser un número.",
    "number.min": "El peso total no puede ser negativo.",
    "any.required": "El peso total es obligatorio.",
  }),
  largo: Joi.number().min(0).required().messages({
    "number.base": "El largo debe ser un número.",
    "number.min": "El largo no puede ser negativo.",
    "any.required": "El largo es obligatorio.",
  }),
  grillete: Joi.string().trim().required().messages({
    "string.empty": "El grillete no puede estar vacío.",
    "any.required": "El grillete es obligatorio.",
    "string.base": "El grillete debe ser de tipo string.",
  }),
  pesoGrillete: Joi.number().min(0).required().messages({
    "number.base": "El peso del grillete debe ser un número.",
    "number.min": "El peso del grillete no puede ser negativo.",
    "any.required": "El peso del grillete es obligatorio.",
  }),
  tension: Joi.string().trim().required().messages({
    "string.empty": "La tensión no puede estar vacía.",
    "any.required": "La tensión es obligatoria.",
    "string.base": "La tensión debe ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const aparejosIdSchema = Joi.object({
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

export { aparejosBodySchema, aparejosIdSchema };