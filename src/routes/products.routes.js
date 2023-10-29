import { Router } from "express";
import { getProducts, getProduct, postProduct, putProduct, deleteProduct } from "../controllers/product.controllers.js";
import { passportError, authoritation } from "../utils/messageErrors.js";
//import productModel from "../models/products.models.js";

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', passportError('jwt'), authoritation('admin'), postProduct);
productRouter.put('/:id', passportError('jwt'), authoritation('admin'), putProduct);
productRouter.delete('/:id', passportError('jwt'), authoritation('admin'), deleteProduct);

/*
productRouter.get('/',async (req,res) => {
    let { limit, page, sort, category, status} = req.query;

    if (!limit) limit = 10;
    if (!page) page = 1;

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
    };
    if (sort === 'asc'|| sort === 'desc') options.sort = { price: sort };

    let query = {};
    if (category) query = {...query,category: category};
    if (status) query = {...query, status: status};

    try {
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
*/

export default productRouter;

