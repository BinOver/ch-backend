import { Router } from "express";
import userModel from "../models/users.models.js";
import { createHash } from "../config/bcrypt.js"; 
import passport from "passport";

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

*userRouter.post('/', passport.authenticate('register'), async (req, res) => {
    try {
        if(!req.user){
            res.status(400).send({mensaje: 'El usuario ya existe'})
        }
        return res.status(200).send({mensaje: 'Usuario creado'});
    }catch(err) {
        res.status(500).send({mensaje: `Error al crear usuario: ${err}`});
    }
});

/*userRouter.post('/', async (req, res) => {
    const {first_name, last_name, email, password,age,rol} = req.body;

    try {
        const hashPassword=createHash(password)
        const response = await userModel.create({
            first_name:first_name, 
            last_name:last_name,  
            email:email,  
            password:hashPassword, 
            age:age, 
            rol:rol
        });
        res.status(200).send({mensaje: 'Usuario creado', respuesta: response});
    }catch (err) {
        res.status(400).send({error:`Error en creacion de usuario: ${err.message}`});
    }
})*/

/*userRouter.post('/', async (req, res) => {
    try {
        const { nombre , apellido, edad, password, email} = req.body
        const resultado = await userModel.create({
            nombre, apellido, edad, password, email
        })
        res.status(200).send(resultado);
    }
    catch (err) {
        res.status(400).send(`Error al crear el usuario: ${err}`);
    }
})*/

export default userRouter;