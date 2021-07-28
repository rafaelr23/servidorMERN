const express = require('express');
const conectarBD = require('./config/DB');// Forma 1
// const mongoose = require('mongoose'); //Forma 2
const cors = require('cors')


// Creando el servidor
const app = express();

// PORT creando puerto de la app
const PORT = process.env.PORT || 4000;

//Definiendo la pagina principal
app.get('/',(req, res) => {
    res.send("Hola Rafa");
})

// Conexion a la base de datos MONGODB
conectarBD(); //Forma 1

// Forma 2 de conectarse a MongoDB
// mongoose.connection.openUri('mongodb://localhost:27017/MERNTASK', (error, res) => {
//     if (error) throw error;
//     console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
// });


// Habilitar express.json para poder leer datos que el usuario envia
app.use(express.json({ extended: true}))

//=================================
//          CORS
//=================================
app.use( cors());



// importar rutas
const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');
const proyectos = require('./routes/proyectos');
const tareas = require('./routes/tareas');


//Utilizar rutas
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/proyectos', proyectos);
app.use('/api/tareas', tareas);

// Arranque de app
app.listen(PORT,() => {
    console.log('El servidor esta funcionando en el puerto ' + PORT)
});