import { promises as fs } from "fs";

const path = "../data/products.js";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(this.path, "utf8"));
    const codeValid = products.some(
      (existProduct) => existProduct.code === product.code
    );
    if (codeValid) {
      console.error(`El código ${product.code} ya existe.`);
      return;
    }
    if (product.code != "" || product.stock >= 0) {
      products.push(product);
    } else {
      console.log("No se pueden agregar productos vacios");
    }
    await fs.writeFile(path, JSON.stringify(products));
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf8"));
    return products;
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf8"));
    const getProduct = products.find((product) => product.id === id);
    if (getProduct) {
      return getProduct;
    } else {
      return null;
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const products = JSON.parse(await fs.readFile(this.path, "utf8"));
    const index = products.findIndex((product) => product.id === id);
    if (index != -1) {
      products[index].title = title;
      products[index].description = description;
      products[index].price = price;
      products[index].thumbnail = thumbnail;
      products[index].code = code;
      products[index].stock = stock;
      await fs.writeFile(path, JSON.stringify(products));

      console.log(index);
    } else {
      console.log("No se encontro el producto");
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf8"));
    const modProducts = products.filter((prod) => prod.id !== id);
    await fs.writeFile(path, JSON.stringify(modProducts));
  }
}

// async function main() {
//   // Crea una instancia de la clase ProductManager
//   const productManager = new ProductManager(path);

//   // Agrega algunos productos con sus propiedades
//   const product1 = new Product(
//     "Producto 1",
//     "Descripción del producto 1",
//     10,
//     "ruta1.jpg",
//     "asdas",
//     50
//   );
//   const product2 = new Product(
//     "Producto 2",
//     "Descripción del producto 2",
//     20,
//     "ruta2.jpg",
//     "dfgdf",
//     30
//   );
//   const product3 = new Product(
//     "Producto 3",
//     "Descripción del producto 3",
//     15,
//     "ruta3.jpg",
//     "hghgw",
//     20
//   );
//   const product4 = new Product(
//     "Producto 4",
//     "Descripción del producto 4",
//     15,
//     "ruta3.jpg",
//     "hghgw", // Duplicado
//     20
//   );

//   // Agrega productos a product.js
//   await productManager.addProduct(product1);
//   await productManager.addProduct(product2);
//   await productManager.addProduct(product3);
//   await productManager.addProduct(product4);

//   // Muestra todos los productos en product.js

//   const allproducts = await productManager.getProducts();
//   console.log(allproducts);

// Buscar un producto por su id y lo muestra en la consola
//   const foundProduct = await productManager.getProductById(2);
// if (foundProduct === null){
//   console.log("Producto no encontrado")
// }else{
//    console.log("Producto encontrado:", foundProduct);
// }

//   // Intenta buscar un producto con un id inexistente y muestra el mensaje de "Not Found"
//   const notFoundProduct = await productManager.getProductById(5);
//   console.log(notFoundProduct);

//   // Modificacion de un producto
//   await productManager.updateProduct(1,{
//     title:"Producto 1 modificado",
//     description:"Descripción del producto 1 modificado",
//     price:15,
//     thumbnail:"ruta1-1.jpg",
//     code:"asdassda",
//     stock:10
//   })

//   //Borrar el producto con id 3
//   await productManager.deleteProduct(3);
// }

// main();
