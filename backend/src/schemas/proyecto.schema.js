"use strict";

import Joi from "joi";

const proyectoBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del proyecto no puede estar vacío.",
    "any.required": "El nombre del proyecto es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  cliente: Joi.string().required().messages({
    "string.empty": "El cliente no puede estar vacío.",
    "any.required": "El cliente es obligatorio.",
    "string.base": "El cliente debe ser de tipo string.",
  }),
  ubicacion: Joi.string().required().messages({
    "string.empty": "La ubicación no puede estar vacía.",
    "any.required": "La ubicación es obligatoria.",
    "string.base": "La ubicación debe ser de tipo string.",
  }),
  descripcion: Joi.string().optional().messages({
    "string.base": "La descripción debe ser de tipo string.",
  }),
  fechaInicio: Joi.date().optional().messages({
    "date.base": "La fecha de inicio debe ser de tipo fecha.",
  }),
  fechaFin: Joi.date().optional().messages({
    "date.base": "La fecha de fin debe ser de tipo fecha.",
  }),
  estado: Joi.string()
    .valid("En curso", "Completado", "Pausado", "Cancelado")
    .default("En curso")
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado debe ser uno de: En curso, Completado, Pausado, Cancelado.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const proyectoIdSchema = Joi.object({
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

export { proyectoBodySchema, proyectoIdSchema };
