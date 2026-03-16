const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author : {type:String, required:true},
    title: {type:String, required: true},
    date : {type:Date, required:true, default:Date.now},
    // se le puede pasar array para un numero indefinido de bloques. mola
    content_blocks : [{
            tipo:  {type:String, required:true},
            valor: {type:String, required:true}
        }
        ]
},{ timestamps: true })

// Crear el modelo a partir del esquema

module.exports = mongoose.model("User", userSchema)