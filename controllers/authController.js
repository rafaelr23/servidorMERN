// json web token
const jwt = require('jsonwebtoken');
const SEED = require('../config/VariablesEntorno').SEED;

// bcryptjs para hashear un password
const bcryptjs = require('bcryptjs');

// validationResult para validar los inputs del body
const {validationResult} = require('express-validator');
// Models
const Usuario = require('../models/UsuarioModels');


exports.autenticarUsuario = async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }

    //extraer datos del body
    const { email, password}= req.body;
    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario no existe'
            })
        }
        //Revisar si es correcto el password del usuario que intenta autenticarse
        const passValidacion = await bcryptjs.compare(password,usuario.password)
        if(!passValidacion){
            return res.status(400).json({
                msg:'Password incorrecto'
            })
        }

        //Si los datos son correcto crear y firmar json web token
        const payload = {
            usuario:{
                id: usuario.id
            }
        };
        // firmar el jwt
       jwt.sign(payload,SEED,{
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmacion
            return  res.status(200).json({
                token
            })
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("hubo un error en la autenticacion")
    }
}

//Obtener usuario autenticado
exports.usuarioAuth = async ( req, res)=> {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).json({
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error al intentar obtener usuario autenticado"
        })
    }
}