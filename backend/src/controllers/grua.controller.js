"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { GruaService } from "../services/grua.service.js";
import { gruaBodySchema, gruaIdSchema } from "../schemas/grua.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getGruas(req, res) {
  try {
    const [gruas, errorGruas] = await GruaService.getGruas();
    if (errorGruas) return respondError(req, res, 404, errorGruas);

    gruas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, gruas);
  } catch (error) {
    handleError(error, "grua.controller -> getGruas");
    respondError(req, res, 400, error.message);
  }
}

async function createGrua(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = gruaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const result = await GruaService.createGrua(body);
    if (!result) {
      return respondError(req, res, 500, "Error al crear la grúa");
    }
    
    const [newGrua, gruaError] = result;
    if (gruaError) return respondError(req, res, 400, gruaError);
    if (!newGrua) return respondError(req, res, 400, "No se creó la grúa");

    respondSuccess(req, res, 201, newGrua);
  } catch (error) {
    handleError(error, "grua.controller -> createGrua");
    respondError(req, res, 500, "No se creó la grúa");
  }
}

async function getGruaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = gruaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [grua, errorGrua] = await GruaService.getGruaById(params.id);

    if (errorGrua) return respondError(req, res, 404, errorGrua);

    respondSuccess(req, res, 200, grua);
  } catch (error) {
    handleError(error, "grua.controller -> getGruaById");
    respondError(req, res, 500, "No se pudo obtener la grúa");
  }
}

async function updateGrua(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = gruaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = gruaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [grua, gruaError] = await GruaService.updateGrua(params.id, body);

    if (gruaError) return respondError(req, res, 400, gruaError);

    respondSuccess(req, res, 200, grua);
  } catch (error) {
    handleError(error, "grua.controller -> updateGrua");
    respondError(req, res, 500, "No se pudo actualizar la grúa");
  }
}

async function deleteGrua(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = gruaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const grua = await GruaService.deleteGrua(params.id);
    !grua
      ? respondError(
          req,
          res,
          404,
          "No se encontró la grúa solicitada",
          "Verifique el id ingresado"
        )
      : respondSuccess(req, res, 200, grua);
  } catch (error) {
    handleError(error, "grua.controller -> deleteGrua");
    respondError(req, res, 500, "No se pudo eliminar la grúa");
  }
}

export const GruaController = {
  getGruas,
  createGrua,
  getGruaById,
  updateGrua,
  deleteGrua,
};
