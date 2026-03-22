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


// TRAER TODOS LOS POSTS A MODO DE RESUMEN (PREVIA EN HOME) - Read - GET - /home
const getAllPosts = async (req,res) => {
    const allPosts = await Post.find({},{title:1, author:1, date:1, content_blocks:{ $slice:2} })
    // * esto filtra unicamente los campos title, author y date; y solamente los X primeros bloques del contenido.
    // * Post.find().select('title author date') tambien funciona pero no funcionaba lo de cortar parte de los bloques


    res.status(200).json(allPosts)
}

// Abrir un post completo - Read - GET - /:id
const getPostById = async (req,res) => {
    try {
        const { id } = req.params; //path variable con params
        const post = await Post.findById(id)
        
        if(!post){
            return res.status(404).json({ error: "Post no encontado"}) // not found
        }

        return res.status(200).json(post) // 200 : OK
    } catch (error) {
        return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido

    }

}


// Actualizar un post - Update - PUT - /:id

const updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const updatePost = await Post.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) 
        
        if (!updatePost) {
            return res.status(404).json({error: "Post no encontrado"})
            
        }

        return res.status(200).json(updatePost) // Todo ok, devuelve el post

    } catch (err) {
         return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
    }
    
}

// Eliminar un post - Delete - DELETE - /:id

const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletePost = await Post.findByIdAndDelete(id)

        if (!deletePost) {
            return res.status(404).json('Post no encontrado')

        }

        return res.status(200).json('Post eliminado correctamente')

        
    } catch (err) {
        next(err)

    }
    
}


// EXPORTACIONES

module.exports  = { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}