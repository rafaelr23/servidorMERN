// json web token
const jwt = require('jsonwebtoken');
const SEED = require('../config/VariablesEntorno').SEED;

// bcryptjs para hashear un password
const bcryptjs = require('bcryptjs');

// validationResult para validar los inputs del body
const {validationResult} = require('express-validator');
// Models
const Usuario = require('../models/UsuarioModels');

// Funciones del usuario
exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }

    // Extraer datos enviados del body
    const {email,password} = req.body;


    try{
        //Validar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
           return res.status(400).json({
                msg:'El usuario ya existe'
            })
        }

        //Crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // Guardar el nuevo usuario
        await usuario.save();

        // crear y firmar json web token
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
        

    }catch(error){
        console.log(error)
        res.status(400).send("hubo un error")
    }


}