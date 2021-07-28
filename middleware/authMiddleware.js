const jwt  = require('jsonwebtoken');
const SEED = require('../config/VariablesEntorno').SEED;

module.exports = (req, res, next) => {
    // Leer el token del Header
    const token = req.header('x-auth-token');
    console.log(token);

    //Revisar si hay token
    if(!token){
        return res.status(401).json({
            msg: 'No hay token, permiso denegado'
        })
    }

    //Validar token
    try {
        const cifrado = jwt.verify(token,SEED)
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}