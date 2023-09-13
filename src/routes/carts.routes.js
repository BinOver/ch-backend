import { Router } from "express";
import cartModel from "../models/carts.model.js";
// import { CartsManager } from "../controllers/CartsManager.js";

const cartRouter = Router();

cartRouter.get('/',async (req,res) => {
  const { limit } = req.query;
  try {
    const carts =  await cartModel.find().limit(limit);
    res.status(200).send({ resultado: 'OK', carts: carts });
  }
  catch (err) {
    res.status(400).send({error: `Error al consultar carrito ${err}`});
  }
});

cartRouter.get('/:cid',async (req,res) => {
  const { cid } = req.params;
  try {
    const cart =  await cartModel.findById(cid);
    if (cart){
      res.status(200).send({ resultado: 'OK', carrito: cart });
    }else{
      res.status(404).send({ resultado: 'Carrito no encontrado', carrito: cart });
    }
  }
  catch (err) {
      res.status(400).send({error: `Error al consultar carrito ${err}`});
  }
})

cartRouter.post('/:cid/products/:pid',async (req,res) => {
  const { cid, pid }  = req.params;
  const { quantity } = req.body;
  try {
    const cart =  await cartModel.findById(cid);
    if (cart) {
      cart.products.push({ id_prod:pid, quantity:quantity});
      const respuesta = await cartModel.findByIdAndUpdate(cid,cart);
      res.status(200).send({ resultado: 'OK', carrito: respuesta });
    }
  }
  catch (err) {
      res.status(400).send({error: `Error al crear carrito ${err}`});
  }
})

cartRouter.delete('/:cid',async (req,res) => {
  const { cid }  = req.params;
  try {
    const respuesta = await cartModel.findByIdAndDelete(cid);
    if(respuesta){
      res.status(200).send({ resultado: 'OK', carrito: respuesta });
    }else{
      res.status(404).send({ resultado: 'Carrito no encontrado', carrito: cart });
    }
  }
  catch (err) {
      res.status(400).send({error: `Error al crear carrito ${err}`});
  }
})


export default cartRouter;

// const routerCarts = Router();
// const cartsManager = new CartsManager();

// routerCarts.get("/", async (req, res) => {
//   const limit = parseInt(req.query.limit);
//   const carts = await cartsManager.getCarts(limit);
//   res.status(200).send(carts);
// });

// routerCarts.get("/:cid", async (req, res) => {
//   const cid = parseInt(req.params.cid);
//   const cart = await cartsManager.getCartById(cid);
//   if (cart) {
//     res.status(200).send(cart);
//   } else {
//     res.status(404).send("Carrito no encontrado");
//   }
// });

// routerCarts.post("/", async (req, res) => {
//   const confirm = await cartsManager.addCart();
//   if(confirm){
//     res.status(200).send("Carrito creado");
//   } else {
//     res.status(400).send("Carrito no creado");
//   }
// })

// routerCarts.post("/:cid/product/:pid", async (req, res) => {
//   const cid = parseInt(req.params.cid);
//   const pid = parseInt(req.params.pid);
//   const confirm = await cartsManager.addProdToCart(cid,pid);
//   if (confirm) {
//     res.status(200).send("Producto agregado correctamente");
//   } else {
//     res.status(400).send("Producto no existente");
//   }
// });

// export default routerCarts;