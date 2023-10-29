import userModel from "../models/users.models.js";


export const getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users)
    }
    catch (err) {
        res.status(400).send(`Error al consultar el usuario: ${err}`);
    }
};

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

