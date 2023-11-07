import { Router } from "express";
import { passportError, authoritation } from "../utils/messageErrors.js";
import { getCart, getCartByCID } from "../controllers/Cart/getCart.controllers.js";
import { postCart } from "../controllers/Cart/postCart.controllers.js";
import { putCart, putCartByCID} from "../controllers/Cart/putCart.controllers.js";
import { deleteCartProductByPID, deleteCartByCID } from "../controllers/Cart/deleteCart.controllers.js";
import { purchase } from "../controllers/Cart/purchase.controllers.js";

const cartRouter = Router();

cartRouter.get('/', getCart);
cartRouter.get('/:cid', getCartByCID);
cartRouter.post('/:cid/products/:pid', passportError('jwt'), authoritation('user'), postCart);
cartRouter.put('/:cid/products/:pid', passportError('jwt'), authoritation('user'), putCart);
cartRouter.put('/:cid', passportError('jwt'), authoritation('user'), putCartByCID);
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), authoritation('user'), deleteCartProductByPID );
cartRouter.delete('/:cid', passportError('jwt'), authoritation('user'), deleteCartByCID);

cartRouter.get('/:cid/purchase', passportError('jwt'), authoritation('user'), purchase);

export default cartRouter;
