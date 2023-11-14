import cartModel from "../../models/carts.model.js";
import { logger } from "../../utils/logger.js";

export const getCart = async (req, res) => {
    logger.info('Test de log, consola');
    const { limit } = req.query;
    try {
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ resultado: "OK", carts: carts });
    } catch (err) {
        logger.error(`[ERROR][${new Date().toLocalDateString} - ${new Date().toLocaleTimeString()}] Ha ocurrido un error: ${err.message} `);
        res.status(400).send({ error: `Error al consultar carrito ${err}` });
    }
};

export const getCartByCID = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            res.status(200).send({ resultado: "OK", carrito: cart });
        } else {
            res
                .status(404)
                .send({ resultado: "Carrito no encontrado", carrito: cart });
        }
    } catch (err) {
        res.status(400).send({ error: `Error al consultar carrito ${err}` });
    }
};