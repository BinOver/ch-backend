

export class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementID();
  }
  static incrementID() {
    if (!this.idIcrement) {
      this.idIcrement = 1;
    } else {
      this.idIcrement++;
    }
    return this.idIcrement;
  }
}
