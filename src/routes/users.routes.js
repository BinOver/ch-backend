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

userRouter.post('/', passport.authenticate('register'), async (req, res) => {
    try {
        if(!req.user){
            res.status(400).send({mensaje: 'El usuario ya existe'})
        }
        return res.status(200).send({mensaje: 'Usuario creado'});
    }catch(err) {
        res.status(500).send({mensaje: `Error al crear usuario: ${err}`});
    }
});

export default userRouter;