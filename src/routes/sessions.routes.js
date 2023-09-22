import { Router } from "express";
import userModel from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post('/login',async (req, res) => {
    const {email, password} = req.body;

    try {
        if (req.session.login){
            res.status(200).send({resutado: 'Login valido', message: user});
        }
        const user = await userModel.findOne({ email: email})
        if (user) {
            if (user.password === password) {
                req.session.login = true;
                res.redirect('/api/products',200,{resutado: 'Login valido', message: user});
                // res.status(200).send({resutado: 'Login valido', message: user});
            } else {
                res.status(401).send({resultado: 'Unauthorized', message: user});
            }
        } else {
            console.log("no encontrado")
            res.status(404).send({resultado: 'Not Found', message: user});
        }
    }catch (err) {
        res.status(400).send({error: `Erro en login ${err}`});

    }
})

sessionRouter.get('/logout',async (req, res) => {
    if (req.session.login){
        req.session.destroy();
        // res.status(200).send({resutado: 'Sesion terminada'});
        res.redirect('/login',200,{resutado: 'Sesion terminada'});
    }else{
        res.redirect('/login',400,{resutado: 'Sesion no encontrada'});
    }

});

export default sessionRouter;