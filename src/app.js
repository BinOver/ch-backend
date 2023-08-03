import express from "express";
import { ProductManager } from "./ProductManager.js";

async function main() {

  const app = express();
  const PORT = 4000;
  app.use(express.urlencoded({ extended: true })); //para consultas complejas
  const path = "./data/products.js";
  const productManager = new ProductManager(path);

  const productos = await productManager.getProducts();

  app.get("/", (req, resp) => {
    console.log(productos);
    resp.send("Hola Mundo");
  });

// Devuelve el producto por ID ejem /product/2 devuelve el producto con indice 2, si no lo encuentra muestra "Producto no encontrado"
  app.get("/products/:pid", (req, resp) => {
    const prod = productos.find((prod) => prod.id === parseInt(req.params.pid));
    if (prod) {
      resp.send(prod);
    } else {
      resp.send("Producto no encontrado");
    }

  });

  // Devuelve los productos, se puede utilizar limites con ejem /products?limit=10, si se ingresa un valor no permitido o ningun valor devuelve todos los productos
  app.get("/products", (req, resp) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0){
      resp.send(productos.slice(0,limit))
    }else{
      resp.send(productos);
    }
  });

  // Mensaje de error 404 al ingresar a cualquier direccion que no se haya programado
  app.get("*", (req, resp) => {
    resp.send("Error 404");
  });

  app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
  });
}

main();
