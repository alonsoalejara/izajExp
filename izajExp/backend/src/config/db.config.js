"use strict";

import mongoose from "mongoose";
import { DB_URL } from "./env.config.js";
import { handleError } from "../utils/errorHandler.js";

export async function setupDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}