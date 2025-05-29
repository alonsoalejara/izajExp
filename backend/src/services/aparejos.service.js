"use strict";

import Aparejo from "../models/aparejos.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getAparejos() {
  try {
    const aparejos = await Aparejo.find().exec();
    if (!aparejos) return [null, "No hay aparejos disponibles"];
    return [aparejos, null];
  } catch (error) {
    handleError(error, "aparejo.service -> getAparejos");
    return [null, error.message];
  }
}

async function createAparejo(aparejo) {
  try {
    const { descripcion, cantidad, pesoUnitario, pesoTotal, largo, grillete, pesoGrillete, tension } = aparejo;

    const aparejoFound = await Aparejo.findOne({ descripcion });
    if (aparejoFound) return [null, "El aparejo ya existe"];

    const newAparejo = new Aparejo({
      descripcion,
      cantidad,
      pesoUnitario,
      pesoTotal,
      largo,
      grillete,
      pesoGrillete,
      tension
    });

    await newAparejo.save();

    return [newAparejo, null];
  } catch (error) {
    handleError(error, "aparejo.service -> createAparejo");
    return [null, error.message];
  }
}

async function getAparejoById(id) {
  try {
    const aparejo = await Aparejo.findById(id).exec();
    if (!aparejo) return [null, "El aparejo no existe"];
    return [aparejo, null];
  } catch (error) {
    handleError(error, "aparejo.service -> getAparejoById");
    return [null, error.message];
  }
}

async function updateAparejo(id, aparejo) {
  try {
    const { descripcion, cantidad, pesoUnitario, pesoTotal, largo, grillete, pesoGrillete, tension } = aparejo; // Desestructuramos los nuevos campos

    const aparejoFound = await Aparejo.findById(id);
    if (!aparejoFound) {
      console.log(`Aparejo no encontrado con ID: ${id}`);
      return [null, "El aparejo no existe"];
    }

    const aparejoUpdated = await Aparejo.findByIdAndUpdate(
      id,
      {
        descripcion,
        cantidad,
        pesoUnitario,
        pesoTotal,
        largo,
        grillete,
        pesoGrillete,
        tension
      },
      { new: true, runValidators: true }
    );

    if (!aparejoUpdated) {
      return [null, "No se pudo actualizar el aparejo"];
    }

    return [aparejoUpdated, null];
  } catch (error) {
    console.error(`Error en updateAparejo: ${error.message}`);
    return [null, error.message];
  }
}


async function deleteAparejo(id) {
  try {
    const aparejo = await Aparejo.findByIdAndDelete(id);
    if (!aparejo) return [null, "No se encontró el aparejo"];
    return [aparejo, null];
  } catch (error) {
    handleError(error, "aparejo.service -> deleteAparejo");
    return [null, error.message];
  }
}

export const AparejosService = {
  getAparejos,
  createAparejo,
  getAparejoById,
  updateAparejo,
  deleteAparejo,
};