import { Router } from "express";
import { getProducts, getProduct, postProduct, putProduct, deleteProduct } from "../controllers/product.controllers.js";
import { passportError, authoritation } from "../utils/messageErrors.js";
//import productModel from "../models/products.models.js";

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', passportError('jwt'), authoritation('admin'), postProduct);
productRouter.put('/:id', passportError('jwt'), authoritation('admin'), putProduct);
productRouter.delete('/:id', passportError('jwt'), authoritation('admin'), deleteProduct);

export default productRouter;

