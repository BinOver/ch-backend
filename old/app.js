import express from "express";
import { ProductManager } from "./ProductManager.js";

async function main() {
  const app = express();
  const PORT = 4000;
  app.use(express.urlencoded({ extended: true })); //para consultas complejas
  const productManager = new ProductManager();

  app.get("/", (req, resp) => {
    resp.status(200).send("Hola Mundo");
  });

  // Devuelve el producto por ID ejem /product/2 devuelve el producto con indice 2, si no lo encuentra muestra "Producto no encontrado"
  app.get("/products/:pid", async (req, resp) => {
    const pid = parseInt(req.params.pid);
    const prod = await productManager.getProductById(pid);
    if (prod) {
      resp.status(200).send(prod);
    } else {
      resp.status(404).send("Producto no encontrado");
    }
  });

  // Devuelve los productos, se puede utilizar limites con ejem /products?limit=10, si se ingresa un valor no permitido o ningun valor devuelve todos los productos
  app.get("/products", async (req, resp) => {
    const limit = parseInt(req.query.limit);
    const productos = await productManager.getProducts(limit);
    resp.status(200).send(productos);
  });

  // Mensaje de error 404 al ingresar a cualquier direccion que no se haya programado
  app.get("*", (req, resp) => {
    resp.status(404).send("Error 404");
  });

  app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
  });
}

main();
