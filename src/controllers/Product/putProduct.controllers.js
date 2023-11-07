import productModel from '../../models/products.models.js'

export const putProduct = async(req, res) => {
    const {id} = req.params;
    const { title, description, code, price, stock, category } = req.body;
    try {
        const product = await productModel.findByIdAndUpdate(id,{title, description, code, price, stock, category});
        
        if(product){
            return res.status(200).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
        
    } catch(error) {
        res.status(500).send({error: `Error al actualizar producto: ${error}`})
    }
}