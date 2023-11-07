import { generateToken } from "../../utils/jwt.js";

export const login = async (req, res) => {
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
        const token = generateToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        })
        res.status(200).send({ payload: req.user });
    }catch (err) {
        res.status(500).send({mensaje: `Error al iniciar sesion ${err}`})
    }
};