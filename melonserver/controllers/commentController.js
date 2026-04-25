// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const Comment = require('../models/CommentModel')
const Post = require('../models/PostModel')

// Crear un comenario - /

    const createComment = async (req,res, next)=> {
        try{
            
            const newComment = new Comment(req.body);
            const savedComment = await newComment.save();
        
            res.status(201).json(savedComment);
        }
        catch (err) {
            //manejo del error de la petición
            //res.status(400).json({error: err.message}) // 400: Bad request
            // gestion de errores con middleware
            next(err)
        }
    }

    
// Obtener los comentarios de un post - /

    const getCommentsByPost = async (req,res,next) => {
        try {
            const { id } = req.params; //path variable con params
            const comments = await Comment.find({post: id })
            
            if(!comments){
                return res.status(404).json({ error: "Post no encontado"}) // not found
            }
    
            return res.status(200).json(comments) // 200 : OK
        } catch (error) {
            //return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
            // gestion de errores con middleware
            next(err)
        }
    
    }


    

    // Eliminar un comentario - SOlo admins - Delete - DELETE - /:id
    
    const deleteComment = async (req, res, next) => {
        try {
            const {id} = req.params;

            // Comprobaciones previa para ver autor de comentario, del post, para saber si se puede eliminar

            const comment = await Comment.findById(id)

            if(!comment){
                    return res.status(404).json({ error: "Comentario no encontrado"})
            }

            const post = await Post.findById(comment.post);
            
/*             if(!post){
                return res.status(404).json('Post no encontrado')
             } */

            //COMPROBACION DE LOS 3 CASOS EN LOS QUE SE PUEDE BORRAR UN COMENTARIO (admin, autor del post o autor del comentario)
            const isAdmin = req.user.role === 'admin'
            const isCommentAuthor = comment.author.toString() === req.user.id
            const isPostAuthor = post?.author.toString() === req.user.id

            if (isAdmin || isCommentAuthor || isPostAuthor){
                const deleted = await Comment.findByIdAndDelete(id)

                if(deleted){
                    return res.status(200).json({ message: 'Comentario eliminado correctamente'})
                } else {

                }
            }


            return res.status(403).json({ error: "No tienes permisos para eliminar este comentario"})
                
            
        } catch (err) {
            next(err)
    
        }
        
    }
    


// EXPORTACIONES

module.exports  = { 
    createComment,
    getCommentsByPost,
    deleteComment
}