// Rutas para crear usuario
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//Controllers
const usuarioController = require('../controllers/usuarioController');

// Crear un usuario
// URL: api/usuarios
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').not().isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').not().isLength({min:6})
],
    usuarioController.crearUsuario
);

module.exports = router;
