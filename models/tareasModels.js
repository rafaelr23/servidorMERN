const mongoose = require('mongoose');

// Schema
const TareaSchema = mongoose.Schema({
    nombre:{
        type: String,// Tipo de dato
        required: true,// Campor Obligatorio
        trim: true// Eliminar espacios
    },
    estado: {
        type: Boolean,
        default: false // Valor por defecto
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId, // ID del proyecto
        ref: 'Proyecto' // Nombre que hace referencia al Modelo Proyecto
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);