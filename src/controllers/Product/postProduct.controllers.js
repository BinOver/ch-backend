import productModel from '../../models/products.models.js'


export const postProduct = async(req, res) => {
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
            res.status(500).send({error: `Error al consultar producto: ${error}`})
        }
    }
}