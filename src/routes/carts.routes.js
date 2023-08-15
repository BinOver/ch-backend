import { Router } from "express";
import { CartsManager } from "../controllers/CartsManager.js";

const routerCarts = Router();
const cartsManager = new CartsManager();

routerCarts.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const carts = await cartsManager.getCarts(limit);
  res.status(200).send(carts);
});

routerCarts.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartsManager.getCartById(cid);
  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

routerCarts.post("/", async (req, res) => {
  const confirm = await cartsManager.addCart();
  if(confirm){
    res.status(200).send("Carrito creado");
  } else {
    res.status(400).send("Carrito no creado");
  }
})

routerCarts.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const confirm = await cartsManager.addProdToCart(cid,pid);
  if (confirm) {
    res.status(200).send("Producto agregado correctamente");
  } else {
    res.status(400).send("Producto no existente");
  }
});

export default routerCarts;