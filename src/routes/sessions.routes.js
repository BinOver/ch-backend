import { Router } from "express";
import userModel from "../models/users.models.js";
import { validatePassword } from "../config/bcrypt.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post('/',passport.authenticate('login'),async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).send({mensaje: `Password invalido`})
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }

        res.status(200).send({ payload: req.user });
    }catch (err) {
        res.status(500).send({mensaje: `Error al iniciar sesion ${err}`})
    }
})


sessionRouter.get('/github', passport.authenticate('github',{scope:['username:email']}), async(req,res)=>{
    res.status(200).send({mensaje: 'Usuario creado'});
})
sessionRouter.get('/githubSession', passport.authenticate('github'), async(req,res)=>{
    req.session.user = req.user;
    res.status(200).send({mensaje:'Sesion creada'});
})

sessionRouter.get('/',async (req, res) => {
    if (req.session.login){
        req.session.destroy();
        // res.status(200).send({resutado: 'Sesion terminada'});
        res.redirect('/login',200,{resutado: 'Sesion terminada'});
    }else{
        res.redirect('/login',400,{resutado: 'Sesion no encontrada'});
    }

});

export default sessionRouter;