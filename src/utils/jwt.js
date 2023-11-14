import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const { jwtSecret } = config;


export const generateToken = (user) => {
    const token = jwt.sign({user}, jwtSecret,{ expiresIn: '12h' });
    return token;
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.Authorization
    if(!authHeader){
        return res.status(401).send({error: 'Usuario no autorizado'});
    }
    const token = authHeader.split(' ')[1]

    jwt.sign(token, jwtSecret,(error, credentials)=>{
        if(error) {
            return res.status(403).send({error: 'Usuario no autorizado'});
        }
        req.user = credentials.user;
        next();
    })
};