const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email : {type:String, required:true},
    password: {type: String, required: true, minlength: 6},
    role : {type: String, maxlength:8}
},{ timestamps: true })

// Crear el modelo a partir del esquema

module.exports = mongoose.model("User", userSchema)

// ! OJO QUE ESTO MAGICAMENTE ASOCIA "User" con el nombre "users" en MONGODB Atlas. 
// ! Estoy mayor para estas mie... features.