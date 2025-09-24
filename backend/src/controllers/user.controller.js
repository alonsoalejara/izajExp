"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { UserService } from "../services/user.service.js";
import { userBodySchema, userIdSchema } from "../schemas/user.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getUsers(req, res) {
  try {
    const [usuarios, errorUsuarios] = await UserService.getUsers();
    if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    respondError(req, res, 400, error.message);
  }
}

async function createUser(req, res) {
  try {
    const { body } = req;

    // Validación del body con Joi
    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    // Roles: asegurar que sea array
    const roles = Array.isArray(body.roles) ? body.roles : [];

    // Llamada al servicio
    const [newUser, userError] = await UserService.createUser({
      ...body,
      roles,
    });

    if (userError) {
      return respondError(req, res, 400, userError);
    }

    if (!newUser) {
      return respondError(req, res, 400, "No se creó el usuario");
    }

    // Respuesta OK
    respondSuccess(req, res, 201, "Usuario creado correctamente", newUser);

  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "Error inesperado al crear usuario");
  }
}

async function getUserById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [user, errorUser] = await UserService.getUserById(params.id);

    if (errorUser) return respondError(req, res, 404, errorUser);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

async function updateUser(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] = await UserService.updateUser(params.id, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

async function deleteUser(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const user = await UserService.deleteUser(params.id);
    !user
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Verifique el id ingresado"
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

async function saveFirma(req, res) {
  try {
    const userId = req.params.id;
    const { firma } = req.body;
    if (!firma) return respondError(req, res, 400, 'Se requiere la firma');

    const [updatedUser, err] = await UserService.updateFirma(userId, firma);
    if (err) return respondError(req, res, 400, err);

    respondSuccess(req, res, 200, updatedUser);
  } catch (error) {
    handleError(error, 'user.controller -> saveFirma');
    respondError(req, res, 500, 'No se pudo guardar la firma');
  }
}

async function deleteFirma(req, res) {
  try {
    const userId = req.params.id;
    const [updatedUser, err] = await UserService.updateFirma(userId, null);
    if (err) return respondError(req, res, 400, err);

    respondSuccess(req, res, 200, updatedUser);
  } catch (error) {
    handleError(error, 'user.controller -> deleteFirma');
    respondError(req, res, 500, 'No se pudo eliminar la firma');
  }
}

export const UserController = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  saveFirma,
  deleteFirma,
};