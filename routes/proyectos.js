const express = require('express');
const router = express.Router();
//Check
const {check} =require('express-validator');
// Json web token
const auth = require('../middleware/authMiddleware');
//controllers
const proyectoController = require('../controllers/proyectoController');
// Crear proyecto
// URL: api/proyectos
router.post('/',
            // middleware
            auth,
            // Checks
            [
                check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
            ],
            //controllers/JWT
            proyectoController.crearProyecto
)

//Obtener todos los proyectos
router.get('/',
            // middleware
           // auth,
            //controllers
            proyectoController.obtenerProyectos
)

// Actualizar un proyecto via ID
router.put('/:id',
            // middleware
            auth,
            // Checks
            [
                check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
            ],
            //controllers
            proyectoController.actualizarProyecto
)

//Eliminar un proyecto
router.delete('/:id',
            // middleware
            auth,
            //controllers
            proyectoController.eliminarProyecto
)
module.exports = router;