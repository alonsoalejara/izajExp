"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { ProyectoService } from "../services/proyecto.service.js";
import { proyectoBodySchema, proyectoIdSchema } from "../schemas/proyecto.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getProyectos(req, res) {
  try {
    const [proyectos, errorProyectos] = await ProyectoService.getProyectos();
    if (errorProyectos) return respondError(req, res, 404, errorProyectos);

    proyectos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, proyectos);
  } catch (error) {
    handleError(error, "proyecto.controller -> getProyectos");
    respondError(req, res, 400, error.message);
  }
}

async function createProyecto(req, res) {
  try {
    const { body } = req;

    // Validación del body con Joi
    const { error: bodyError } = proyectoBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    // Roles: asegurar que sea array
    const roles = Array.isArray(body.roles) ? body.roles : [];

    // Llamada al servicio
    const [newProyecto, proyectoError] = await ProyectoService.createProyecto({
      ...body,
      roles,
    });

    if (proyectoError) {
      return respondError(req, res, 400, proyectoError);
    }

    if (!newProyecto) {
      return respondError(req, res, 400, "No se creó el proyecto");
    }

    // Respuesta OK
    respondSuccess(req, res, 201, "Proyecto creado correctamente", newProyecto);

  } catch (error) {
    handleError(error, "proyecto.controller -> createProyecto");
    respondError(req, res, 500, "Error inesperado al crear proyecto");
  }
}

async function getProyectoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = proyectoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [proyecto, errorProyecto] = await ProyectoService.getProyectoById(params.id);

    if (errorProyecto) return respondError(req, res, 404, errorProyecto);

    respondSuccess(req, res, 200, proyecto);
  } catch (error) {
    handleError(error, "proyecto.controller -> getProyectoById");
    respondError(req, res, 500, "No se pudo obtener el proyecto");
  }
}

async function updateProyecto(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = proyectoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = proyectoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [proyecto, proyectoError] = await ProyectoService.updateProyecto(params.id, body);

    if (proyectoError) return respondError(req, res, 400, proyectoError);

    respondSuccess(req, res, 200, proyecto);
  } catch (error) {
    handleError(error, "proyecto.controller -> updateProyecto");
    respondError(req, res, 500, "No se pudo actualizar el proyecto");
  }
}

async function deleteProyecto(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = proyectoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const proyecto = await ProyectoService.deleteProyecto(params.id);
    !proyecto
      ? respondError(
          req,
          res,
          404,
          "No se encontro el proyecto solicitado",
          "Verifique el id ingresado"
        )
      : respondSuccess(req, res, 200, proyecto);
  } catch (error) {
    handleError(error, "proyecto.controller -> deleteProyecto");
    respondError(req, res, 500, "No se pudo eliminar el proyecto");
  }
}

export const ProyectoController = {
  getProyectos,
  createProyecto,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
};