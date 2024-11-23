"use strict";

/**
 * Manejador de errores fatales
 * @param {Object} error Objeto con las especificaciones del error
 * @param {String} msg Mensaje para dar contexto al error
 */
function handleFatalError(error, msg) {
  console.log("[FATAL ERROR] Apagando servidor \n", msg);
  console.error(error);
  process.exit(1);
}

/**
 * Manejador de errores
 * @param {Object} error Objeto con las especificaciones del error
 * @param {String} msg Mensaje para dar contexto al error
 */
function handleError(error, msg) {
  console.log("❌ [ERROR] Ha ocurrido un error en: \n📁", msg);
  console.error("🗯  " + error.message);
}

export { handleFatalError, handleError };