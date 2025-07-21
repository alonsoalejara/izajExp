"use strict";

import Joi from "joi";

const aparejoSchema = Joi.object({
  descripcion: Joi.string().trim().required().messages({
    "string.empty": "La descripción del aparejo no puede estar vacía.",
    "any.required": "La descripción del aparejo es obligatoria.",
    "string.base": "La descripción del aparejo debe ser de tipo string.",
  }),
  cantidad: Joi.number().min(1).required().messages({
    "number.base": "La cantidad de aparejos debe ser un número.",
    "number.min": "La cantidad de aparejos no puede ser menor a 1.",
    "any.required": "La cantidad de aparejos es obligatoria.",
  }),
  pesoUnitario: Joi.number().min(0).required().messages({
    "number.base": "El peso unitario del aparejo debe ser un número.",
    "number.min": "El peso unitario del aparejo no puede ser negativo.",
    "any.required": "El peso unitario del aparejo es obligatorio.",
  }),
  pesoTotal: Joi.number().min(0).required().messages({
    "number.base": "El peso total del aparejo debe ser un número.",
    "number.min": "El peso total del aparejo no puede ser negativo.",
    "any.required": "El peso total del aparejo es obligatorio.",
  }),
  largo: Joi.number().min(0).required().messages({
    "number.base": "El largo del aparejo debe ser un número.",
    "number.min": "El largo del aparejo no puede ser negativo.",
    "any.required": "El largo del aparejo es obligatorio.",
  }),
  grillete: Joi.string().trim().required().messages({
    "string.empty": "El grillete del aparejo no puede estar vacío.",
    "any.required": "El grillete del aparejo es obligatorio.",
    "string.base": "El grillete del aparejo debe ser de tipo string.",
  }),
  pesoGrillete: Joi.number().min(0).required().messages({
    "number.base": "El peso del grillete debe ser un número.",
    "number.min": "El peso del grillete no puede ser negativo.",
    "any.required": "El peso del grillete es obligatorio.",
  }),
  tension: Joi.string().trim().required().messages({
    "string.empty": "La tensión del aparejo no puede estar vacía.",
    "any.required": "La tensión del aparejo es obligatoria.",
    "string.base": "La tensión del aparejo debe ser de tipo string.",
  }),
  altura: Joi.string().trim().required().messages({
    "string.empty": "La altura del enganche no puede estar vacía.",
    "any.required": "La altura del enganche es obligatoria.",
    "string.base": "La altura del enganche debe ser de tipo string.",
  }),
});

const datosSchema = Joi.object({
  largoPluma: Joi.number().required().messages({
    "number.base": "El largo de la pluma debe ser un número.",
    "any.required": "El largo de la pluma es obligatorio.",
  }),
  contrapeso: Joi.number().required().messages({
    "number.base": "El contrapeso debe ser un número.",
    "any.required": "El contrapeso es obligatorio.",
  }),
  gradoInclinacion: Joi.string().trim().required().messages({
    "string.empty": "El grado de inclinación no puede estar vacío.",
    "any.required": "El grado de inclinación es obligatorio.",
    "string.base": "El grado de inclinación debe ser de tipo string.",
  }),
});

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
  pesoCable: Joi.number().required().messages({
    "number.base": "El peso del cable debe ser un número.",
    "any.required": "El peso del cable es obligatorio.",
  }),
  pesoTotal: Joi.number().required().messages({
    "number.base": "El peso total debe ser un número.",
    "any.required": "El peso total es obligatorio.",
  }),
  radioTrabajoMax: Joi.number().required().messages({
    "number.base": "El radio de trabajo máximo debe ser un número.",
    "any.required": "El radio de trabajo máximo es obligatorio.",
  }),
  anguloTrabajo: Joi.string().trim().required().messages({
    "string.empty": "El ángulo de trabajo no puede estar vacío.",
    "any.required": "El ángulo de trabajo es obligatorio.",
    "string.base": "El ángulo de trabajo debe ser de tipo string.",
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

const centroGravedadSchema = Joi.object({
  xAncho: Joi.number().required().messages({
    "number.base": "La coordenada X (ancho) debe ser un número.",
    "any.required": "La coordenada X (ancho) es obligatoria.",
  }),
  yLargo: Joi.number().required().messages({
    "number.base": "La coordenada Y (largo) debe ser un número.",
    "any.required": "La coordenada Y (largo) es obligatoria.",
  }),
  zAlto: Joi.number().required().messages({
    "number.base": "La coordenada Z (alto) debe ser un número.",
    "any.required": "La coordenada Z (alto) es obligatoria.",
  }),
  xCG: Joi.number().required().messages({
    "number.base": "La coordenada X del CG debe ser un número.",
    "any.required": "La coordenada X del CG es obligatoria.",
  }),
  yCG: Joi.number().required().messages({
    "number.base": "La coordenada Y del CG debe ser un número.",
    "any.required": "La coordenada Y del CG es obligatoria.",
  }),
  zCG: Joi.number().required().messages({
    "number.base": "La coordenada Z del CG debe ser un número.",
    "any.required": "La coordenada Z del CG es obligatoria.",
  }),
  xPR: Joi.number().required().messages({
    "number.base": "La coordenada X del PR debe ser un número.",
    "any.required": "La coordenada X del PR es obligatoria.",
  }),
  yPR: Joi.number().required().messages({
    "number.base": "La coordenada Y del PR debe ser un número.",
    "any.required": "La coordenada Y del PR es obligatoria.",
  }),
  zPR: Joi.number().required().messages({
    "number.base": "La coordenada Z del PR debe ser un número.",
    "any.required": "La coordenada Z del PR es obligatoria.",
  }),
});

const setupIzajeBodySchema = Joi.object({
  nombreProyecto: Joi.string().trim().required().messages({
    "string.empty": "El nombre del proyecto no puede estar vacío.",
    "any.required": "El nombre del proyecto es obligatorio.",
    "string.base": "El nombre del proyecto debe ser de tipo string.",
  }),
  aparejos: Joi.array().items(aparejoSchema).required().messages({
    "array.base": "Los aparejos deben ser un array.",
    "array.empty": "El array de aparejos no puede estar vacío.",
    "any.required": "Los aparejos son obligatorios.",
  }),
  datos: datosSchema.required().messages({
    "object.base": "Los datos deben ser un objeto válido.",
    "any.required": "Los datos del plan de izaje son obligatorios.",
  }),
  cargas: cargaSchema.required().messages({
    "object.base": "Las cargas deben ser un objeto válido.",
    "any.required": "Las cargas son obligatorias.",
  }),
  centroGravedad: centroGravedadSchema.required().messages({
    "object.base": "El centro de gravedad debe ser un objeto válido.",
    "any.required": "El centro de gravedad es obligatorio.",
  }),
  capataz: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
    "string.empty": "El ID del capataz no puede estar vacío.",
    "any.required": "El ID del capataz es obligatorio.",
    "string.pattern.base": "El ID del capataz debe ser un ObjectId válido.",
  }),
  supervisor: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
    "string.empty": "El ID del supervisor no puede estar vacío.",
    "any.required": "El ID del supervisor es obligatorio.",
    "string.pattern.base": "El ID del supervisor debe ser un ObjectId válido.",
  }),
  jefeArea: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
    "string.empty": "El ID del jefe de área no puede estar vacío.",
    "any.required": "El ID del jefe de área es obligatorio.",
    "string.pattern.base": "El ID del jefe de área debe ser un ObjectId válido.",
  }),
  firmaSupervisor: Joi.string().trim().required().messages({
    "string.empty": "La firma del supervisor no puede estar vacía.",
    "any.required": "La firma del supervisor es obligatoria.",
    "string.base": "La firma del supervisor debe ser de tipo string.",
  }),
  firmaJefeArea: Joi.string().trim().required().messages({
    "string.empty": "La firma del jefe de área no puede estar vacía.",
    "any.required": "La firma del jefe de área es obligatoria.",
    "string.base": "La firma del jefe de área debe ser de tipo string.",
  }),
  grua: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
    "string.empty": "El ID de la grúa no puede estar vacío.",
    "any.required": "El ID de la grúa es obligatorio.",
    "string.pattern.base": "El ID de la grúa debe ser un ObjectId válido.",
  }),
  version: Joi.number().valid(0, 1, 2, 3).required().messages({
    "number.base": "La versión debe ser un número.",
    "any.required": "La versión es obligatoria.",
    "number.allowOnly": "La versión solo puede ser 0, 1, 2 o 3.",
  }),
})
.unknown(true)
.messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const setupIzajeIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID del plan de izaje no puede estar vacío.",
      "any.required": "El ID del plan de izaje es obligatorio.",
      "string.base": "El ID del plan de izaje debe ser de tipo string.",
      "string.pattern.base": "El ID del plan de izaje debe ser un ObjectId válido.",
    }),
});

export { setupIzajeBodySchema, setupIzajeIdSchema };