import cartModel from "../../models/carts.model.js";

export const putCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const indexToUpdate = cart.products.findIndex(
                (producto) => producto.id_prod._id.toString() === pid
            );
            cart.products[indexToUpdate].quantity = quantity;
            cart.save();
            res
                .status(200)
                .send({ resultado: "OK", carrito: cart.products[indexToUpdate] });
        } else {
            res
                .status(404)
                .send({ resultado: "Carrito no encontrado", carrito: cart });
        }
    } catch (err) {
        res.status(400).send({ error: `Error al consultar carrito ${err}` });
    }
};

export const putCartByCID = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            products.forEach((nuevoProducto) => {
                const indexOfProduct = cart.products.findIndex(
                    (producto) =>
                        producto.id_prod._id.toString() === nuevoProducto.id_prod
                );
                if (indexOfProduct !== -1) {
                    cart.products[indexOfProduct].quantity = nuevoProducto.quantity;
                } else {
                    cart.products.push(nuevoProducto);
                }
            });
            res.status(200).send({ resultado: "OK", carrito: cart.products });
        } else {
            res
                .status(404)
                .send({ resultado: "Carrito no encontrado", carrito: cart });
        }
        await cart.save();
    } catch (err) {
        res.status(400).send({ error: `Error al consultar carrito ${err}` });
    }
};