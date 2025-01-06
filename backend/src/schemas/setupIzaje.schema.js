"use strict";

import Joi from "joi";

const cargaSchema = Joi.object({
  pesoEquipo: Joi.number().required().messages({
    "number.base": "El peso del equipo debe ser un número.",
    "any.required": "El peso del equipo es obligatorio.",
  }),
  pesoAparejos: Joi.number().required().messages({
    "number.base": "El peso de los aparejos debe ser un número.",
    "any.required": "El peso de los aparejos es obligatorio.",
  }),
  pesoGancho: Joi.number().required().messages({
    "number.base": "El peso del gancho debe ser un número.",
    "any.required": "El peso del gancho es obligatorio.",
  }),
  pesoTotal: Joi.number().required().messages({
    "number.base": "El peso total debe ser un número.",
    "any.required": "El peso total es obligatorio.",
  }),
  radioTrabajoMax: Joi.number().required().messages({
    "number.base": "El radio de trabajo máximo debe ser un número.",
    "any.required": "El radio de trabajo máximo es obligatorio.",
  }),
  capacidadLevante: Joi.number().required().messages({
    "number.base": "La capacidad de levantamiento debe ser un número.",
    "any.required": "La capacidad de levantamiento es obligatoria.",
  }),
  porcentajeUtilizacion: Joi.number().required().messages({
    "number.base": "El porcentaje de utilización debe ser un número.",
    "any.required": "El porcentaje de utilización es obligatorio.",
  }),
});

const aparejoSchema = Joi.object({
  descripcion: Joi.string().required().messages({
    "string.empty": "La descripción no puede estar vacía.",
    "any.required": "La descripción es obligatoria.",
  }),
  cantidad: Joi.number().required().messages({
    "number.base": "La cantidad debe ser un número.",
    "any.required": "La cantidad es obligatoria.",
  }),
  pesoUnitario: Joi.number().required().messages({
    "number.base": "El peso unitario debe ser un número.",
    "any.required": "El peso unitario es obligatorio.",
  }),
  pesoTotal: Joi.number().required().messages({
    "number.base": "El peso total debe ser un número.",
    "any.required": "El peso total es obligatorio.",
  }),
});

const setupIzajeIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID del plan de izaje no puede estar vacío.",
      "any.required": "El ID del plan de izaje es obligatorio.",
      "string.pattern.base": "El ID del plan de izaje debe ser un ObjectId válido.",
    }),
});

const setupIzajeBodySchema = Joi.object({
  usuario: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
    "string.empty": "El ID del usuario no puede estar vacío.",
    "any.required": "El ID del usuario es obligatorio.",
    "string.pattern.base": "El ID del usuario debe ser un ObjectId válido.",
  }),
  aparejos: Joi.array().items(aparejoSchema).required().messages({
    "array.base": "Los aparejos deben ser un array.",
    "any.required": "Los aparejos son obligatorios.",
  }),
  datos: Joi.object({
    largoPluma: Joi.number().required().messages({
      "number.base": "El largo de la pluma debe ser un número.",
      "any.required": "El largo de la pluma es obligatorio.",
    }),
    contrapeso: Joi.number().required().messages({
      "number.base": "El contrapeso debe ser un número.",
      "any.required": "El contrapeso es obligatorio.",
    }),
  }).required().messages({
    "object.base": "Los datos deben ser un objeto válido.",
    "any.required": "Los datos del plan de izaje son obligatorios.",
  }),
  cargas: cargaSchema.required().messages({
    "object.base": "Las cargas deben ser un objeto válido.",
    "any.required": "Las cargas son obligatorias.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export { setupIzajeBodySchema, setupIzajeIdSchema };
