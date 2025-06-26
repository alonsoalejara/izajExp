"use strict";

import SetupIzaje from "../models/setupIzaje.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getSetupIzajes() {
  try {
    const setups = await SetupIzaje.find()
      .populate('capataz', 'username nombre apellido')
      .populate('supervisor', 'username nombre apellido')
      .populate('jefeArea', 'username nombre apellido')
      .populate('grua', 'nombre modelo')
      .exec();
    if (!setups) return [null, "No se encontraron configuraciones de izaje"];
    return [setups, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> getSetupIzajes");
    return [null, error.message];
  }
}

async function createSetupIzaje(setupIzajeData) {
  try {
    const {
      nombreProyecto,
      aparejos,
      datos,
      cargas,
      centroGravedad,
      capataz,
      supervisor,
      jefeArea,
      grua
    } = setupIzajeData;

    // Al crear, revisionCount se establece en 0 por defecto en el modelo
    const newSetupIzaje = new SetupIzaje({
      nombreProyecto,
      aparejos,
      datos,
      cargas,
      centroGravedad,
      capataz,
      supervisor,
      jefeArea,
      grua
    });

    await newSetupIzaje.save();
    return [newSetupIzaje, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> createSetupIzaje");
    return [null, error.message];
  }
}

async function getSetupIzajeById(id) {
  try {
    const setupIzaje = await SetupIzaje.findById(id)
      .populate('capataz', 'username nombre apellido')
      .populate('supervisor', 'username nombre apellido')
      .populate('jefeArea', 'username nombre apellido')
      .populate('grua', 'nombre modelo')
      .exec();
    if (!setupIzaje) return [null, "La configuración de izaje no existe"];
    return [setupIzaje, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> getSetupIzajeById");
    return [null, error.message];
  }
}

async function updateSetupIzaje(id, setupIzajeData, userId) {
  try {
    const setupIzajeFound = await SetupIzaje.findById(id);
    if (!setupIzajeFound) return [null, "La configuración de izaje no existe"];

    // Verificar si se ha alcanzado el límite de revisiones
    if (setupIzajeFound.revisionCount >= 3) {
      return [null, "Este plan de izaje ya alcanzó el número máximo de revisiones (3)."];
    }

    // Incrementar el contador de revisiones
    setupIzajeData.revisionCount = (setupIzajeFound.revisionCount || 0) + 1;

    // Agregar entrada al historial de revisiones
    const revisionEntry = {
      revisionDate: new Date(),
      modifiedBy: userId, // Usamos el userId pasado desde el controlador
    };

    // Usar $push para añadir al array sin sobrescribir
    const updatedSetupIzaje = await SetupIzaje.findByIdAndUpdate(
      id,
      {
        ...setupIzajeData, // Incluye todos los campos de setupIzajeData
        $push: { revisionHistory: revisionEntry }, // Agrega la nueva entrada al historial
      },
      { new: true, runValidators: true }
    );

    return [updatedSetupIzaje, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> updateSetupIzaje");
    return [null, error.message];
  }
}

async function deleteSetupIzaje(id) {
  try {
    const deletedSetup = await SetupIzaje.findByIdAndDelete(id);
    return [deletedSetup, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> deleteSetupIzaje");
    return [null, error.message];
  }
}

export const SetupIzajeService = {
  getSetupIzajes,
  createSetupIzaje,
  getSetupIzajeById,
  updateSetupIzaje,
  deleteSetupIzaje,
};