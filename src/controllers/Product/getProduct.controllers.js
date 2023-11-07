import productModel from '../../models/products.models.js'

export const getProducts = async(req, res) => {
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
        res.status(500).send({error: `Error al consultar productos: ${error}`})
    }
}

export const getProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.findById(id);
        if(product){
            return res.status(200).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
    } catch(error) {
        res.status(500).send({error: `Error al consultar producto: ${error}`})
    }
}