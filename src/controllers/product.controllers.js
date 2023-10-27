import productModel from '../models/products.models.js'

export const getProducts = async() => {
    const {limit, page, filter, sort} = req.query;
    const pag = page != undefined ? page : 1;
    const lim = limit ? limit : 10;
    const ord = sort == 'asc' ? 1 : - 1;

    try {
        const products = await productModel.paginate({ filter: filter }, { limit:lim, page:pag, sort: {price:ord}});
        
        if(products){
            return res.status(200).send(products);
        }
        res.status(404).send({ error: 'Productos no encontrados' });
        
    } catch(error) {
        resizeBy.status(500).send({error: `Error al consultar productos: ${error}`})
    }
}

export const getProduct = async() => {
    const {id} = req.params;

    try {
        const product = await productModel.findById(id);
        
        if(product){
            return res.status(200).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
        
    } catch(error) {
        resizeBy.status(500).send({error: `Error al consultar producto: ${error}`})
    }
}

export const postProduct = async() => {
    const { title, description, code, price, stock, category } = req.body;

    try {
        const product = await productModel.create({ title, description, code, price, stock, category })
        
        if(product){
            return res.status(201).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
        
    } catch(error) {
        if(error.code == 11000){
            return res.status(400).send({error: `Llave duplicada`})
        } else {
            resizeBy.status(500).send({error: `Error al consultar producto: ${error}`})
        }
    }
}

export const putProduct = async() => {
    const {id} = req.params;
    const { title, description, code, price, stock, category } = req.body;

    try {
        const product = await productModel.findByIdAndUpdate(id,{title, description, code, price, stock, category});
        
        if(product){
            return res.status(200).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
        
    } catch(error) {
        resizeBy.status(500).send({error: `Error al actualizar producto: ${error}`})
    }
}

export const deleteProduct = async() => {
    const {id} = req.params;

    try {
        const product = await productModel.findByIdAndDelete(id);
        
        if(product){
            return res.status(200).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
        
    } catch(error) {
        resizeBy.status(500).send({error: `Error al eliminar producto: ${error}`})
    }
}

/*productSchema.plugin(paginate);

export const orderModel = model('order', orderSchema);

export default productModel;*/