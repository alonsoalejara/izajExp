"use strict";

import Proyecto from "../models/proyecto.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getProyectos() {
  try {
    const proyectos = await Proyecto.find().exec();
    if (!proyectos || proyectos.length === 0) return [null, "No hay proyectos"];
    return [proyectos, null];
  } catch (error) {
    handleError(error, "proyecto.service -> getProyectos");
    return [null, "Error al obtener proyectos"];
  }
}

async function createProyecto(proyecto) {
  try {
    const { nombre, cliente, ubicacion, descripcion, fechaInicio, fechaFin, estado } = proyecto;

    // Validar que no exista ya un proyecto con ese nombre
    const proyectoFound = await Proyecto.findOne({ nombre });
    if (proyectoFound) return [null, "El proyecto ya existe"];

    const newProyecto = new Proyecto({
      nombre,
      cliente,
      ubicacion,
      descripcion,
      fechaInicio,
      fechaFin,
      estado,
    });

    await newProyecto.save();
    return [newProyecto, null];

  } catch (error) {
    // Capturar error de índice duplicado (Mongo code 11000)
    if (error.code === 11000) {
      if (error.keyPattern?.nombre) {
        return [null, `El nombre ya está registrado: ${error.keyValue.nombre}`];
      }
    }

    handleError(error, "proyecto.service -> createProyecto");
    return [null, "Error inesperado al crear proyecto"];
  }
}

async function getProyectoById(id) {
  try {
    const proyecto = await Proyecto.findById(id).exec();
    if (!proyecto) return [null, "El proyecto no existe"];
    return [proyecto, null];
  } catch (error) {
    handleError(error, "proyecto.service -> getProyectoById");
    return [null, "Error al obtener proyecto"];
  }
}

async function updateProyecto(id, proyecto) {
  try {
    const proyectoFound = await Proyecto.findById(id);
    if (!proyectoFound) return [null, "El proyecto no existe"];

    const { nombre, cliente, ubicacion, descripcion, fechaInicio, fechaFin, estado } = proyecto;

    const updatedProyecto = await Proyecto.findByIdAndUpdate(
      id,
      { nombre, cliente, ubicacion, descripcion, fechaInicio, fechaFin, estado },
      { new: true }
    );

    return [updatedProyecto, null];
  } catch (error) {
    handleError(error, "proyecto.service -> updateProyecto");
    return [null, "Error al actualizar proyecto"];
  }
}

async function deleteProyecto(id) {
  try {
    const deleted = await Proyecto.findByIdAndDelete(id);
    if (!deleted) return [null, "El proyecto no existe"];
    return [deleted, null];
  } catch (error) {
    handleError(error, "proyecto.service -> deleteProyecto");
    return [null, "Error al eliminar proyecto"];
  }
}

export const ProyectoService = {
  getProyectos,
  createProyecto,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
};
