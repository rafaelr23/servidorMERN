const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    creador:{
        // Se obtienen los datos del creador del proyecto y de donde provienen
        type: mongoose.Schema.Types.ObjectId,// obtiene el ID del creador(Usuario) del proyecto
        ref:'Usuario' // Referencia que apunta al modelo del creador
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto',ProyectoSchema);