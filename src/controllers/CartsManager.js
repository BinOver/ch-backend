import { promises as fs } from "fs";

export class CartsManager {
  static path = "./data/carts.js"

  constructor() {
      this.carts = [];
  }
  static incrementID() {
    if (!this.idIncrement) {
      this.idIncrement = 1;
    } else {
      this.idIncrement++;
    }
    return this.idIncrement;
  }

  async getCarts(limit) {
    const carts = JSON.parse(await fs.readFile(CartsManager.path, "utf8"));
    if (isNaN(limit)) {
      return carts;
    } else {
      return carts.slice(0, limit);
    }
  }

  async getCartById(id) {
    const carts = JSON.parse(await fs.readFile(CartsManager.path, "utf8"));
    const getCart = carts.find((cart) => cart.id === parseInt(id));
    if (getCart) {
      return getCart;
    } else {
      return false;
    }
  }

  async addCart(){
    const carts = JSON.parse(await fs.readFile(CartsManager.path, "utf8"))
    const cart = {
      "id": CartsManager.incrementID(),
      "products": [],
      "quantity": 0
    }
    carts.push(cart)
    await fs.writeFile(CartsManager.path, JSON.stringify(carts));
    return true;
  }

  async addProdToCart(cid,pid) {
    const carts = JSON.parse(await fs.readFile(CartsManager.path, "utf8"))
    const index = carts.findIndex((cart) => cart.id === parseInt(cid));
    if (index != -1){
      carts[index].products.push(pid);
      carts[index].quantity += 1;
      await fs.writeFile(CartsManager.path, JSON.stringify(carts));
      return true;
    }else{
      console.log("Carrito no existe")
      return false
    }
  }
}

export default CartsManager;