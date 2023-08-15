import { promises as fs } from "fs";

export class ProductManager {
  static path = "./data/products.js";

  constructor() {
    this.products = [];
  }

  static incrementID() {
    if (!this.idIncrement) {
      this.idIncrement = 1;
    } else {
      this.idIncrement++;
    }
    return this.idIncrement;
  }

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
    const codeValid = products.some(
      (existProduct) => existProduct.code === product.code
    );
// Validacion de existencia de campos obligatorios
    if (!('title' in product) || !('description' in product) || !('price' in product) || !('code' in product) || !('category' in product)){
      console.error("Campo obligatorio no existente");
      return false;
    }
// Validacion de campos obligatorios sin datos vacios
    if (product.title==="" || product.description==="" || product.price < 0 || product.code ==="" || product.category===""){
      console.error("Producto con datos vacios");
        return false;
    }
// Seteo de status a true si no existe o es distinto de boolean
    if (!('status' in product) || typeof product.status !== 'boolean'){
      console.log("Default statu true");
      product.status = true;
    }
// Verificar que el valor del campo code no exista
    if (codeValid) {
      console.error(`El código ${product.code} ya existe.`);
      return false;
    }else {
      product.id = ProductManager.incrementID();
      products.push(product);
      await fs.writeFile(ProductManager.path, JSON.stringify(products));
      return true;
    }
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
    const getProduct = products.find((product) => product.id === parseInt(id));
    if (getProduct) {
      return getProduct;
    } else {
      return false;
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock, status, category }
  ) {
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index != -1) {
      products[index].title = title;
      products[index].description = description;
      products[index].price = price;
      products[index].thumbnail = thumbnail;
      products[index].code = code;
      products[index].stock = stock;
      products[index].status = status;
      products[index].category = category;
      await fs.writeFile(ProductManager.path, JSON.stringify(products));
      return true;
    } else {
      console.log("No se encontro el producto");
      return false;
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
    const isID = products.findIndex((product) => product.id === parseInt(id));
    if (isID != -1) {
      const modProducts = products.filter((prod) => prod.id !== parseInt(id));
      await fs.writeFile(ProductManager.path, JSON.stringify(modProducts));
      console.log(modProducts);
      return true;
    } else {
      return false;
    }
  }
}

export default ProductManager
