import { logger } from "../../utils/logger.js";


export const getLoggerTest = (req, res, next) => {
    // Lanzar un error a propósito para probar el manejo de errores
    const error = [] 
    
    // error.push(logger.fatal(`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Error de nivel "error"`));
    error.push(logger.error(`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Error de nivel "error"`));
    error.push(logger.warning(`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Error de nivel "error"`));
    error.push(logger.info(`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Error de nivel "error"`));
    error.push(logger.debug(`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Error de nivel "error"`));
    next(error);
};