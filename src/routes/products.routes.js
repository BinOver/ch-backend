import { Router } from "express";
import productModel from "../models/products.models.js";
// import { ProductManager } from "../controllers/ProductManager.js";


const productRouter = Router();

productRouter.get('/',async (req,res) => {
    let { limit, page, sort, category, status} = req.query;

    if (!limit) limit = 10;
    if (!page) page = 1;

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
    };
    if (sort) options.sort = { price: sort };

    let query = {};
    if (category) query = {...query,category: category};
    if (status) query = {...query, status: status};

    try {
        // const prods =  await productModel.find().limit(limit);
        const prods =  await productModel.paginate(query,options);
        res.status(200).send({ resultado: 'OK', products: prods });
    }
    catch (err) {
        res.status(400).send({error: `Error al consultar productos ${err}`});
    }
})

productRouter.get('/:id',async (req,res) => {
    const { id } = req.params;
    try {
        const prod =  await productModel.findById(id);
        if (prod){
            res.status(200).send({ resultado: 'OK', product: prod });
        }else{
            res.status(404).send({ resultado: 'Producto no encontrado', product: prod });
        }
    }
    catch (err) {
        res.status(400).send({error: `Error al consultar producto ${err}`});
    }
})

productRouter.post('/',async (req,res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const respuesta =  await productModel.create({
            title, description, stock, code, price, category
        });
        res.status(200).send({ resultado: 'OK', product: respuesta });
    }
    catch (err) {
        res.status(400).send({error: `Error al crear producto ${err}`});
    }
})

productRouter.put('/:id',async (req,res) => {
    const { id } = req.params;
    const { title, description, stock, code, price, category, status } = req.body;
    try {
        const respuesta =  await productModel.findByIdAndUpdate(id, {
            title, description, stock, code, price, category, status
        });
        if (respuesta){
            res.status(200).send({ resultado: 'OK', product: respuesta });
        }else{
            res.status(404).send({ resultado: 'Producto no encontrado', product: respuesta });
        }
    }
    catch (err) {
        res.status(400).send({error: `Error al actualizar producto ${err}`});
    }
})

productRouter.delete('/:id',async (req,res) => {
    const { id } = req.params;
    const { title, description, stock, code, price, category, status } = req.body;
    try {
        const respuesta =  await productModel.findByIdAndDelete(id, {
            title, description, stock, code, price, category, status
        });
        if (respuesta){
            res.status(200).send({ resultado: 'OK', product: respuesta });
        }else{
            res.status(404).send({ resultado: 'Producto no encontrado', product: respuesta });
        }
    }
    catch (err) {
        res.status(400).send({error: `Error al eliminar producto ${err}`});
    }
})

export default productRouter;

// const routerProd = Router();
// const productManager = new ProductManager();

// routerProd.get("/", async (req, res) => {
//   const limit = parseInt(req.query.limit);
//   const productos = await productManager.getProducts(limit);
//   res.status(200).send(productos);
// });
// routerProd.get("/:pid", async (req, res) => {
//   const pid = parseInt(req.params.pid);
//   const prod = await productManager.getProductById(pid);
//   if (prod) {
//     res.status(200).send(prod);
//   } else {
//     res.status(404).send("Producto no encontrado");
//   }
// });
// routerProd.post("/", async (req, res) => {
//   const confirm = await productManager.addProduct(req.body);
//   if (confirm) {
//     res.status(200).send("Producto creado correctamente");
//   } else {
//     res.status(400).send("Producto ya existente o campos obligatorios no enviados");
//   }
// });
// routerProd.put("/:id", async (req, res) => {
//   const confirm = await productManager.updateProduct(req.params.id, req.body);
//   if (confirm) {
//     res.status(200).send("Producto actualizado correctamente");
//   } else {
//     res.status(404).send("Producto no encontrado");
//   }
// });
// routerProd.delete("/:id", async (req, res) => {
//   const confirm = await productManager.deleteProduct(req.params.id);
//   if (confirm) {
//     res.status(200).send("Producto eliminado correctamente");
//   } else {
//     res.status(404).send("Producto no encontrado");
//   }
// });

// export default routerProd;
