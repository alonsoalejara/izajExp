"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { SetupIzajeService } from "../services/setupIzaje.service.js";
import { setupIzajeBodySchema, setupIzajeIdSchema } from "../schemas/setupIzaje.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getSetupIzajes(req, res) {
  try {
    const [setupIzajes, errorSetupIzajes] = await SetupIzajeService.getSetupIzajes();
    if (errorSetupIzajes) return respondError(req, res, 404, errorSetupIzajes);

    setupIzajes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, setupIzajes);
  } catch (error) {
    handleError(error, "setupIzaje.controller -> getSetupIzajes");
    respondError(req, res, 400, error.message);
  }
}

async function createSetupIzaje(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = setupIzajeBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newSetupIzaje, setupIzajeError] = await SetupIzajeService.createSetupIzaje(body);

    if (setupIzajeError) return respondError(req, res, 400, setupIzajeError);
    if (!newSetupIzaje) {
      return respondError(req, res, 400, "No se pudo crear el setup de izaje");
    }

    respondSuccess(req, res, 201, newSetupIzaje);
  } catch (error) {
    handleError(error, "setupIzaje.controller -> createSetupIzaje");
    respondError(req, res, 500, "No se pudo crear el setup de izaje");
  }
}

async function getSetupIzajeById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = setupIzajeIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [setupIzaje, errorSetupIzaje] = await SetupIzajeService.getSetupIzajeById(params.id);

    if (errorSetupIzaje) return respondError(req, res, 404, errorSetupIzaje);

    respondSuccess(req, res, 200, setupIzaje);
  } catch (error) {
    handleError(error, "setupIzaje.controller -> getSetupIzajeById");
    respondError(req, res, 500, "No se pudo obtener el setup de izaje");
  }
}

async function updateSetupIzaje(req, res) {
  try {
    const { params, body, user } = req;
    const { error: paramsError } = setupIzajeIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = setupIzajeBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    console.log("🪪 req.user recibido en updateSetupIzaje:", user);
    const userId = user._id;

    const [updatedSetupIzaje, setupIzajeError] = await SetupIzajeService.updateSetupIzaje(
      params.id,
      body,
      userId
    );

    if (setupIzajeError) return respondError(req, res, 400, setupIzajeError);

    respondSuccess(req, res, 200, updatedSetupIzaje);
  } catch (error) {
    handleError(error, "setupIzaje.controller -> updateSetupIzaje");
    respondError(req, res, 500, "No se pudo actualizar el setup de izaje");
  }
}

async function deleteSetupIzaje(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = setupIzajeIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const setupIzaje = await SetupIzajeService.deleteSetupIzaje(params.id);
    !setupIzaje
      ? respondError(
          req,
          res,
          404,
          "No se encontró el setup de izaje solicitado",
          "Verifique el ID ingresado"
        )
      : respondSuccess(req, res, 200, setupIzaje);
  } catch (error) {
    handleError(error, "setupIzaje.controller -> deleteSetupIzaje");
    respondError(req, res, 500, "No se pudo eliminar el setup de izaje");
  }
}

export const SetupIzajeController = {
  getSetupIzajes,
  createSetupIzaje,
  getSetupIzajeById,
  updateSetupIzaje,
  deleteSetupIzaje,
};