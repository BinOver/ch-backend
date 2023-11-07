import cartModel from "../../models/carts.model.js";

export const purchase = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            await cart.save();
            const respuesta = await cartModel.find();
            res.status(200).send({ resultado: 'OK', carrito: respuesta });
        }
    }
    catch (err) {
        res.status(400).send({ error: `Error al crear carrito ${err}` });
    }
};
