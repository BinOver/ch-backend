import cartModel from "../../models/carts.model.js";

export const postCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);

        if (cart) {
            cart.products.push({ id_prod: pid, quantity: quantity });
            await cart.save();
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
            res.status(200).send({ resultado: "OK", carrito: respuesta });
        }
    } catch (err) {
        res.status(400).send({ error: `Error al crear carrito ${err}` });
    }
};