import { PORT, HOST } from "./src/config/env.config.js";
// Importa el módulo 'cors' para agregar los cors
import cors from "cors";
// Importa el módulo 'express' para crear la aplicacion web
import express, { json, urlencoded } from "express";
// Importamos morgan para ver las peticiones que se hacen al servidor
import morgan from "morgan";
// Importa el módulo 'cookie-parser' para manejar las cookies
import cookieParser from "cookie-parser";
/** El enrutador principal */
import indexRoutes from "./src/routes/index.routes.js";
// Importa el archivo 'db.config.js' para crear la conexión a la base de datos
import { setupDB } from "./src/config/db.config.js";
// Importa el handler de errores
import { handleFatalError, handleError } from "./src/utils/errorHandler.js";
import { createRoles, createUsers } from "./src/config/initialSetup.js";

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    /** Instancia de la aplicacion */
    const server = express();
    // Agrega el middleware para el manejo de datos en formato JSON
    server.use(json());
    // Agregamos los cors
    server.use(cors({ origin: "http://localhost:3000", credentials: true }));
    // Agregamos el middleware para el manejo de cookies
    server.use(cookieParser());
    // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(morgan("dev"));
    // Agrega el middleware para el manejo de datos en formato URL
    server.use(urlencoded({ extended: true }));
    // Agrega el enrutador principal al servidor
    server.use("/api", indexRoutes);

    // Inicia el servidor en el puerto especificado
    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
    // Inicia la creación de los roles
    await createRoles();
    // Inicia la creación del usuario admin y user
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));