import { Router } from "express";
import passport from "passport";
import { passportError, authoritation } from "../utils/messageErrors.js";
import { login } from "../controllers/Session/login.controllers.js"
import { register } from "../controllers/Session/register.controllers.js"
import { logout } from "../controllers/Session/logout.controllers.js";

const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register)
sessionRouter.get('/logout', logout)
sessionRouter.get('/current', passportError('jwt'), authoritation('user'), (req, res) => {
    res.send(req.user);
});
sessionRouter.get('/github', passport.authenticate('github',{scope:['username:email']}), async(req,res)=>{
    res.status(200).send({mensaje: 'Usuario creado'});
})
sessionRouter.get('/githubSession', passport.authenticate('github'), async(req,res)=>{
    req.session.user = req.user;
    res.status(200).send({mensaje:'Sesion creada'});
})

export default sessionRouter