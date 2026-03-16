const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email : {type:String, required:true},
    password: {type: String, required: true, minlength: 6},
    role : {type: String, required: true, maxlength:1}
},{ timestamps: true })

// Crear el modelo a partir del esquema

module.exports = mongoose.model("User", userSchema)