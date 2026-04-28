// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const Post = require('../models/PostModel')


// Crear un post - Create - POST - /
const createPost = async (req,res, next)=> {
    try{
        
        const newPost = new Post({
            ...req.body,
            author: req.user.id
        });
        const savedPost = await newPost.save();
     
        res.status(201).json(savedPost);
    }
    catch (err) {
        //manejo del error de la petición
        //res.status(400).json({error: err.message}) // 400: Bad request
        // gestion de errores con middleware
        next(err)
    }
}


// TRAER TODOS LOS POSTS A MODO DE RESUMEN (PREVIA EN HOME) - Read - GET - /home
const getAllPosts = async (req,res) => {
    const allPosts = await Post.find({},{title:1, author:1, date:1, content_blocks:{ $slice:2} }).sort({date: -1 }).populate('author', 'name')
    // * esto filtra unicamente los campos title, author y date; y solamente los X primeros bloques del contenido.
    // * Post.find().select('title author date') tambien funciona pero no funcionaba lo de cortar parte de los bloques


    res.status(200).json(allPosts)
}

// Abrir un post completo - Read - GET - /:id
const getPostById = async (req,res,next) => {
    try {
        const { id } = req.params; //path variable con params
        const post = await Post.findById(id).populate('author', 'name'); // Esto reemplaza el ID por el nombre en la otra col. Buen truco!
        
        if(!post){
            return res.status(404).json({ error: "Post no encontado"}) // not found
        }

        return res.status(200).json(post) // 200 : OK
    } catch (error) {
        //return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
        // gestion de errores con middleware
        next(err)
    }

}


// Actualizar un post - Update - PUT - /:id

const updatePost = async (req, res, next) => {
    try {
        const {id} = req.params;

        const checkPost = await Post.findById(id);

        if (!checkPost) {
            return res.status(404).json({ error : "Post no encontrado"})

        }

        if (checkPost.author.toString() !== req.user.id) {
            // Ojo, comprobamos que quien hizo login es el autor, para evitar estropearle el post a otros editores
            return res.status(403).json({ error: "No puedes editar posts de otros editores"})
        }


        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) 
        
        if (!updatedPost) {
            return res.status(404).json({error: "ERror al actualizar, post no encontrado"})
            
        }

        return res.status(200).json(updatedPost) // Todo ok, devuelve el post

    } catch (err) {
         //return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
         // gestion de errores con middleware
         next(err)
    }
    
}

// Eliminar un post - Delete - DELETE - /:id

const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params;

        const checkPost = await Post.findById(id);

        if (!checkPost) {
            return res.status(404).json({ error : "Post no encontrado"})

        }

        if (checkPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
            // Ojo, comprobamos que quien hizo login es el autor, para evitar estropearle el post a otros editores jeje
            return res.status(403).json({ error: "No puedes eliminar posts de otros editores"})
        }


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