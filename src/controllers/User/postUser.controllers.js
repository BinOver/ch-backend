import userModel from "../../models/users.models.js";

export const postUser = async (req, res) => {
    try {
        if(!req.user){
            res.status(400).send({mensaje: 'El usuario ya existe'})
        }
        return res.status(200).send({mensaje: 'Usuario creado'});
    }catch(err) {
        res.status(500).send({mensaje: `Error al crear usuario: ${err}`});
    }
};