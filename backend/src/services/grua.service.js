"use strict";

import Grua from "../models/grua.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getGruas() {
  try {
    const gruas = await Grua.find().exec();
    if (!gruas) return [null, "No hay grúas"];
    return [gruas, null];
  } catch (error) {
    handleError(error, "grua.service -> getGruas");
  }
}

async function createGrua(grua) {
  try {
    const { nombre, capacidad, tipo } = grua;

    const gruaFound = await Grua.findOne({ nombre });
    if (gruaFound) return [null, "La grúa ya existe"];

    const newGrua = new Grua({ nombre, capacidad, tipo });
    await newGrua.save();

    return [newGrua, null];
  } catch (error) {
    handleError(error, "grua.service -> createGrua");
  }
}

async function getGruaById(id) {
  try {
    const grua = await Grua.findById(id).exec();
    if (!grua) return [null, "La grúa no existe"];
    return [grua, null];
  } catch (error) {
    handleError(error, "grua.service -> getGruaById");
  }
}

async function updateGrua(id, grua) {
  try {
    const gruaFound = await Grua.findById(id);
    if (!gruaFound) return [null, "La grúa no existe"];

    const { nombre, capacidad, tipo } = grua;

    const gruaUpdated = await Grua.findByIdAndUpdate(
      id,
      { nombre, capacidad, tipo },
      { new: true }
    );

    return [gruaUpdated, null];
  } catch (error) {
    handleError(error, "grua.service -> updateGrua");
  }
}

async function deleteGrua(id) {
  try {
    return await Grua.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "grua.service -> deleteGrua");
  }
}

export const GruaService = {
  getGruas,
  createGrua,
  getGruaById,
  updateGrua,
  deleteGrua,
};