// Rutas para auth
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//Controllers
const authController = require('../controllers/authController');
// Auth
const auth = require('../middleware/authMiddleware');

// Autenticar usuario
// URL: api/auth
router.post('/',
 authController.autenticarUsuario

);
//Obtener usuario autenticado
router.get('/',
    auth,
    authController.usuarioAuth
);

module.exports = router;
