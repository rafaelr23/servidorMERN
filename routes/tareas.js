const express = require('express');

const router = express.Router();

// Controllers
const TareaController = require('../controllers/tareaController')

//Middleware
const auth = require('../middleware/authMiddleware');

// Validaciones - Check
const {check} = require('express-validator');

//Crear Tarea
// URL: api/tareas

router.post('/',
    auth, // Validar token de usuario
    [
        // validaciones de inputs
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    // Funcion Crear Tarea
    TareaController.crearTarea
) 

//Obtener tareas por ID de proyecto
router.get('/',
    auth,
    TareaController.obtenerTareas
)

// Actualizar Tarea
router.put('/:id',
    auth,
    TareaController.actualizarTarea    
)

//Eliminar una tarea
router.delete('/:id',
    auth,
    TareaController.eliminarTarea
)

module.exports = router;