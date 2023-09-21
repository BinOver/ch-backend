import { Router } from "express";
import userModel from "../models/users.models.js";

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users)
    }
    catch (err) {
        res.status(400).send(`Error al consultar el usuario: ${err}`);
    }
})

userRouter.post('/', async (req, res) => {
    const {first_name, last_name, email, password,age,rol} = req.body;

    try {
        const response = await userModel.create({first_name, last_name, email, password, age, rol});
        res.status(200).send({mensaje: 'Usuario creado', respuesta: response});
    }catch (err) {
        res.status(400).send({error:`Error en creacion de usuario: ${err.message}`});
    }
})

// userRouter.post('/', async (req, res) => {
//     try {
//         const { nombre , apellido, edad, password, email} = req.body
//         const resultado = await userModel.create({
//             nombre, apellido, edad, password, email
//         })
//         res.status(200).send(resultado);
//     }
//     catch (err) {
//         res.status(400).send(`Error al crear el usuario: ${err}`);
//     }
// })

export default userRouter;