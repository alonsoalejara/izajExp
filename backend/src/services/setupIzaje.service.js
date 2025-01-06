"use strict";

import SetupIzaje from "../models/setupIzaje.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getSetupIzajes() {
  try {
    const setups = await SetupIzaje.find().populate('usuario', 'nombre apellido email').exec();
    if (!setups) return [null, "No se encontraron configuraciones de izaje"];
    return [setups, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> getSetupIzajes");
  }
}

async function createSetupIzaje(setupIzajeData) {
    try {
      const { usuario, aparejos, datos, cargas } = setupIzajeData;
  
      const newSetupIzaje = new SetupIzaje({
        usuario,
        aparejos,
        datos,
        cargas,
      });
  
      await newSetupIzaje.save();
      return [newSetupIzaje, null];
    } catch (error) {
      handleError(error, "setupIzaje.service -> createSetupIzaje");
    }
  }
  

async function getSetupIzajeById(id) {
  try {
    const setupIzaje = await SetupIzaje.findById(id).populate('usuario', 'nombre apellido email').exec();
    if (!setupIzaje) return [null, "La configuración de izaje no existe"];
    return [setupIzaje, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> getSetupIzajeById");
  }
}

async function updateSetupIzaje(id, setupIzajeData) {
  try {
    const setupIzajeFound = await SetupIzaje.findById(id);
    if (!setupIzajeFound) return [null, "La configuración de izaje no existe"];

    const { usuario, aparejos, datos, cargas } = setupIzajeData;

    // Actualizar la configuración de izaje
    const updatedSetupIzaje = await SetupIzaje.findByIdAndUpdate(
      id,
      { usuario, aparejos, datos, cargas },
      { new: true }
    );

    return [updatedSetupIzaje, null];
  } catch (error) {
    handleError(error, "setupIzaje.service -> updateSetupIzaje");
  }
}

async function deleteSetupIzaje(id) {
  try {
    return await SetupIzaje.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "setupIzaje.service -> deleteSetupIzaje");
  }
}

export const SetupIzajeService = {
  getSetupIzajes,
  createSetupIzaje,
  getSetupIzajeById,
  updateSetupIzaje,
  deleteSetupIzaje,
};
