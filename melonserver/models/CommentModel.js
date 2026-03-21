const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',                          
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    }

},{ timestamps: true })

// Crear el modelo a partir del esquema

module.exports = mongoose.model("Comment", commentSchema)