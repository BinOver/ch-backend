import { Router } from "express";
import { getCart, getCartByCID, postCart, putCart, putCartByCID, deleteCartProductByPID, deleteCartByCID } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get('/', getCart);
cartRouter.get('/:cid', getCartByCID);
cartRouter.post('/:cid/products/:pid', postCart);
cartRouter.put('/:cid/products/:pid', putCart);
cartRouter.put('/:cid', putCartByCID);
cartRouter.delete('/:cid/products/:pid',deleteCartProductByPID );
cartRouter.delete('/:cid',deleteCartByCID);

export default cartRouter;
