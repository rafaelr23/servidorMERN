//models
const Proyecto = require('../models/proyectoModels');

//Express validator
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //Revisar si hay errores en los inputs
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }


    try {
        // Crear el proyecto
        const nuevoProyecto = new Proyecto(req.body)

        // Guardar el creador en el proyecto via JWT
        nuevoProyecto.creador = req.usuario.id;

        //Guardar proyecto en base de datos
        await nuevoProyecto.save();
         //Mensaje de confirmacion
         return  res.status(200).json({
             msg: 'Proyecto Creado con exito',
             nuevoProyecto
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("hubo un error en la creacion del proyecto")
    }
}

// Obtener todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        console.log(req.usuario);
        //obtener proyectos
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({fechaCreacion: -1})
        return res.status(200).json({
            proyectos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Hubo un error al obtener proyectos",error})
    }
}

//Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
    //Revisar si hay errores en los inputs
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }

    // Extraer la informacion modificada del proyecto
    const {nombre} = req.body;
    
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        
        //Revisar el ID del proyecto
        let proyecto = await Proyecto.findById(req.params.id);
        // si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({
                msg:'Proyecto no encontrado'
            })
        }
        // verificar que ID del que modifica sea igual al ID del creador

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({
                msg:'No autorizado'
            })
        }
        //Actualizar proyecto
        proyecto = await Proyecto.findOneAndUpdate({_id:req.params.id},{$set: nuevoProyecto},{new:true});
        return res.status(200).json({
            proyecto
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error al actualizar proyecto"
        })
    }

}

//Elimina un proyecto por ID
exports.eliminarProyecto = async (req, res) => {

    try {
         //Revisar el ID del proyecto
         let proyecto = await Proyecto.findById(req.params.id);
         // si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({
                msg:'Proyecto no encontrado'
            })
        }
        // verificar que ID del que modifica sea igual al ID del creador
 
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({
                msg:'No autorizado'
            })
        }
        //Eliminar proyecto
        await Proyecto.findOneAndRemove({_id:req.params.id}) ;
        return res.status(200).json({
            msg:'Proyecto Eliminado'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error al eliminar un proyecto"
        })
    }
}