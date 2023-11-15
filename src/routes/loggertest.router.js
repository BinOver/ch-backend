import { Router } from "express";
import { getLoggerTest } from "../controllers/LoggerTest/getLoggerTest.controller.js";

const loggerTestRouter = Router();

loggerTestRouter.get('/', getLoggerTest);

export default loggerTestRouter;