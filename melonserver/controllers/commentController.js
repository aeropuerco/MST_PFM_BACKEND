// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const Comment = require('../models/CommentModel')


// Crear un comenario - /

    const createComment = async (req,res, next)=> {
        try{
            
            const newComment = new Comment(req.body);
            const savedComment = await newComment.save();
        
            res.status(201).json(savedComment);
        }
        catch (err) {
            //manejo del error de la petición
            res.status(400).json({error: err.message}) // 400: Bad request

        }
    }

    
// Obtener los comentarios de un post - /

    const getCommentsByPost = async (req,res) => {
        try {
            const { id } = req.params; //path variable con params
            const comments = await Comment.find({post: id })
            
            if(!comments){
                return res.status(404).json({ error: "Post no encontado"}) // not found
            }
    
            return res.status(200).json(comments) // 200 : OK
        } catch (error) {
            return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
    
        }
    
    }





// EXPORTACIONES

module.exports  = { 
    createComment,
    getCommentsByPost
}