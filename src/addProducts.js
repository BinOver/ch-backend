// Se ejecuta con node

import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";

const path = "../data/products.js";
const productManager = new ProductManager(path);

// Agrega algunos productos con sus propiedades
const product1 = new Product(
    "Producto 1",
    "Descripción del producto 1",
    10,
    "ruta1.jpg",
    "asdas",
    50
  );
  const product2 = new Product(
    "Producto 2",
    "Descripción del producto 2",
    20,
    "ruta2.jpg",
    "dfgdf",
    30
  );
  const product3 = new Product(
    "Producto 3",
    "Descripción del producto 3",
    15,
    "ruta3.jpg",
    "hghgw",
    20
  );

  // Agrega productos a product.js
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);