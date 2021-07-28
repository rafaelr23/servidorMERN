// Models
const Tarea = require('../models/tareasModels');
const Proyecto = require('../models/proyectoModels');
// Validador
const {validationResult}= require('express-validator');
const router = require('../routes/tareas');

//Crear una nueva tarea
exports.crearTarea = async (req, res) => {
    //Revisar si hay errores en los inputs
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }
   
    
    try {
        //Extraer los datos del proyecto
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) {
            return res.status(400).json({
                msg:'Proyecto no encontrado'
            })
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({
                msg:'No autorizado'
            })
        }

        // Crear la tarea
        const tarea = new Tarea(req.body)
        await tarea.save();
        return res.status(200).json({
            msg: 'Tarea Creada con exito',
            tarea
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al crear una tarea")
    }
}

//Obtener tareas por ID de proyecto
exports.obtenerTareas = async (req, res) => {

    try {
        //Extraer ID del proyecto
        const {proyecto} = req.query;
        console.log(proyecto);

        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) {
            return res.status(400).json({
                msg:'Proyecto no encontrado',
                proyecto
            })
        }
        console.log(existeProyecto.creador);
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({
                msg:'No autorizado'
            })
        }
        // Obtener tareas por ID de proyecto
        const tareas = await Tarea.find({proyecto: proyecto}).sort({fechaCreacion: -1}) // obtiene coleccion de tareas por el ID del proyecto 
        return res.status(200).json({
            tareas
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al obtener tareas por ID de proyecto")
    }

}

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        //Extraer ID del proyecto
        const {proyecto,nombre,estado} = req.body;
        //Buscar proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //Revisar si la tarea existe en el proyecto
        let tareaExiste = await Tarea.findById(req.params.id)
        if(!tareaExiste) {
            return res.status(400).json({
                msg:'No se encontro la tarea'
            })
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({
                msg:'No autorizado'
            })
        }

        // Crear un nuevo objeto de la tarea con la nueva informacion
        const nuevaTarea = {};

            nuevaTarea.nombre = nombre
            nuevaTarea.estado = estado;

      
        // Guardar la nueva tarea
        tareaExiste = await Tarea.findByIdAndUpdate({_id: req.params.id},nuevaTarea,{new: true})

        return res.status(200).json({
            msg:'Tarea actualizada con exito',
            tareaExiste
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("Error al actualizar una tarea")
    }
}

//Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        //Extraer ID del proyecto
        const {proyecto} = req.query;
        //Buscar proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //Revisar si la tarea existe en el proyecto
        let tareaExiste = await Tarea.findById(req.params.id)
        if(!tareaExiste) {
            return res.status(400).json({
                msg:'No se encontro la tarea'
            })
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({
                msg:'No autorizado'
            })
        }
      
        // Eliminar Tarea
        tareaExiste = await Tarea.findByIdAndRemove({_id: req.params.id})

        return res.status(200).json({
            msg:'Tarea eliminada con exito',
            tareaExiste
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Error al eliminar una tarea")
    }
}