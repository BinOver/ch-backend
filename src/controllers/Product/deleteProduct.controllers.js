import productModel from '../../models/products.models.js'

export const deleteProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.findByIdAndDelete(id);
        
        if(product){
            return res.status(200).send(product);
        }
        res.status(404).send({ error: 'Producto no encontrado' });
        
    } catch(error) {
        res.status(500).send({error: `Error al eliminar producto: ${error}`})
    }
}