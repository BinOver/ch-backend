

export const logout = async (req, res) => {
    if (req.session){
        req.session.destroy();
        // res.status(200).send({resutado: 'Sesion terminada'});
        res.clearCookie('jwtCookie');
        res.status(200).send({resutado: 'Login elimienado'});
        // res.redirect('/login',200,{resutado: 'Sesion terminada'});
    }else{
        res.redirect('/login',400,{resutado: 'Sesion no encontrada'});
    }
};