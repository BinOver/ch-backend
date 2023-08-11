import { promises as fs } from "fs";

export class ProductManager {
  static path = "./data/products.js";
  constructor() {}

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
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

  async getProducts(limit) {
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
    if (isNaN(limit)) {
      return products;
    } else {
      return products.slice(0, limit);
    }
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
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
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
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
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
    const modProducts = products.filter((prod) => prod.id !== id);
    await fs.writeFile(path, JSON.stringify(modProducts));
  }
}
