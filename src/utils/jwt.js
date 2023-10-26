import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET,{ expiresIn: '12h' });
    return token;
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.Authorization
    if(!authHeader){
        return res.status(401).send({error: 'Usuario no autorizado'});
    }
    const token = authHeader.split(' ')[1]

    jwt.sign(token, proces.env.JWT_SECRET,(error, credentials)=>{
        if(error) {
            return res.status(403).send({error: 'Usuario no autorizado'});
        }
        req.user = credentials.user;
        next();
    })
};