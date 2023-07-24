
class ProductManager {
    constructor(){
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const codeValid = this.products.some(product => product.code === code);
        if (codeValid) {
            console.error(`El código ${code} ya existe.`);
            return;
        }
        const product = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,            
        }
        this.products.push(product);
        this.nextId++;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id){
        const getProduct = this.products.find(product => product.id === id);
        if (getProduct) {
            return getProduct
        }
        else {
            return "Not found"
        }
    }
}

// Crea una instancia de la clase ProductManager
const productManager = new ProductManager();

// Agrega algunos productos con sus propiedades
productManager.addProduct("Producto 1", "Descripción del producto 1", 10, "ruta1.jpg", "asdas", 50);
productManager.addProduct("Producto 2", "Descripción del producto 2", 20, "ruta2.jpg", "dfgdf", 30);
productManager.addProduct("Producto 3", "Descripción del producto 3", 15, "ruta3.jpg", "hghgw", 20);
productManager.addProduct("Producto 4", "Descripción del producto 4", 15, "ruta3.jpg", "hghgw", 20);

// Obtiene una la lista de productos y la muestra en la consola
console.log(productManager.getProducts());

// Buscar un producto por su id y lo muestra en la consola
const foundProduct = productManager.getProductById(2);
console.log("Producto encontrado:", foundProduct);

// Intenta buscar un producto con un id inexistente y muestra el mensaje de "Not Found"
const notFoundProduct = productManager.getProductById(5);
console.log(notFoundProduct);