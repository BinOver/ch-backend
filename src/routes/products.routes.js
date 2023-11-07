import { Router } from "express";
import { getProducts, getProduct } from "../controllers/Product/getProduct.controllers.js";  
import { postProduct } from "../controllers/Product/postProduct.controllers.js"; 
import { putProduct} from "../controllers/Product/putProduct.controllers.js";
import { deleteProduct } from "../controllers/Product/deleteProduct.controllers.js";
import { passportError, authoritation } from "../utils/messageErrors.js";

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', passportError('jwt'), authoritation('admin'), postProduct);
productRouter.put('/:id', passportError('jwt'), authoritation('admin'), putProduct);
productRouter.delete('/:id', passportError('jwt'), authoritation('admin'), deleteProduct);

export default productRouter;