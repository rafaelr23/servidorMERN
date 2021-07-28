const mongoose = require('mongoose');

//Creando esquema/schema de usuario

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String, // Tipo de dato
        required: true,// Habilitar campo obligatorio
        trim: true // Habilitar eliminar espacios
    },
    email: {
        type: String, 
        required: true,
        trim: true, 
        unique: true // Habilitar que el email sea unico
    },
    password: {
        type: String, 
        required: true,
        trim: true, 
    },
    fechaRegistro: {
        type: Date, 
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario',UsuariosSchema)