import { Router } from "express";
import { getMockProducts } from "../controllers/Mock/getMockProducts.controllers.js"
import { passportError, authoritation } from "../utils/messageErrors.js";

const mockRouter = Router()

mockRouter.get('/', passportError('jwt'), authoritation('admin'), getMockProducts);

export default mockRouter;