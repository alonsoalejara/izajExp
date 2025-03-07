import { PORT, HOST } from "./src/config/env.config.js";
import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./src/routes/index.routes.js";
import { setupDB } from "./src/config/db.config.js";
import { handleFatalError, handleError } from "./src/utils/errorHandler.js";
import { createUsers } from "./src/config/initialSetup.js";


async function setupServer() {
  try {
    const server = express();
    server.use(json());
    server.use(cors({ origin: '*', credentials: true }));    
    server.use(cookieParser());
    server.use(morgan("dev"));
    server.use(urlencoded({ extended: true }));
    server.use("/api", indexRoutes);
    server.use((req, res, next) => {
      console.log(`Request received in ${req.method} ${req.url}`);
      next();
    });
    

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`=> Server running in ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

setupAPI()
  .then(() => console.log("=> API Successfully started"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
  