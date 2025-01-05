"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { AparejosService } from "../services/aparejos.service.js";
import { aparejosBodySchema, aparejosIdSchema } from "../schemas/aparejos.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getAparejos(req, res) {
  try {
    const [aparejos, errorAparejos] = await AparejosService.getAparejos();
    if (errorAparejos) return respondError(req, res, 404, errorAparejos);

    aparejos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, aparejos);
  } catch (error) {
    handleError(error, "aparejos.controller -> getAparejos");
    respondError(req, res, 400, error.message);
  }
}

async function createAparejo(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = aparejosBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const result = await AparejosService.createAparejo(body);
    if (!result) {
      return respondError(req, res, 500, "Error al crear el aparejo");
    }
    
    const [newAparejo, aparejoError] = result;
    if (aparejoError) return respondError(req, res, 400, aparejoError);
    if (!newAparejo) return respondError(req, res, 400, "No se creó el aparejo");

    respondSuccess(req, res, 201, newAparejo);
  } catch (error) {
    handleError(error, "aparejos.controller -> createAparejo");
    respondError(req, res, 500, "No se creó el aparejo");
  }
}

async function getAparejoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = aparejosIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [aparejo, errorAparejo] = await AparejosService.getAparejoById(params.id);

    if (errorAparejo) return respondError(req, res, 404, errorAparejo);

    respondSuccess(req, res, 200, aparejo);
  } catch (error) {
    handleError(error, "aparejos.controller -> getAparejoById");
    respondError(req, res, 500, "No se pudo obtener el aparejo");
  }
}

async function updateAparejo(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = aparejosIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = aparejosBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [aparejo, aparejoError] = await AparejosService.updateAparejo(params.id, body);

    if (aparejoError) return respondError(req, res, 400, aparejoError);

    respondSuccess(req, res, 200, aparejo);
  } catch (error) {
    handleError(error, "aparejos.controller -> updateAparejo");
    respondError(req, res, 500, "No se pudo actualizar el aparejo");
  }
}

async function deleteAparejo(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = aparejosIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const aparejo = await AparejosService.deleteAparejo(params.id);
    !aparejo
      ? respondError(
          req,
          res,
          404,
          "No se encontró el aparejo solicitado",
          "Verifique el id ingresado"
        )
      : respondSuccess(req, res, 200, aparejo);
  } catch (error) {
    handleError(error, "aparejos.controller -> deleteAparejo");
    respondError(req, res, 500, "No se pudo eliminar el aparejo");
  }
}

export const AparejosController = {
  getAparejos,
  createAparejo,
  getAparejoById,
  updateAparejo,
  deleteAparejo,
};
