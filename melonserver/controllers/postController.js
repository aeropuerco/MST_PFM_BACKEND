// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const Post = require('../models/PostModel')


// Crear un post - Create - POST - /
const createPost = async (req,res, next)=> {
    try{
        
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
     
        res.status(201).json(savedPost);
    }
    catch (err) {
        //manejo del error de la petición
        res.status(400).json({error: err.message}) // 400: Bad request

    }
}



// EXPORTACIONES

module.exports  = { 
    createPost
}