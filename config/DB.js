const mongoose = require('mongoose');

const conectarBD = async ()=>{
    
    await mongoose.connect('mongodb+srv://merntask:merntask@cluster0.xe0vo.mongodb.net/merntask',(error, res)=>{
        if(error){
            throw error;  
        } 
        console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
    })
}

module.exports =conectarBD