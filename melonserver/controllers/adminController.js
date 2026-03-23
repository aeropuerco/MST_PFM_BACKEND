// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const User = require('../models/UserModel')
const Comment = require('../models/CommentModel')


// Crear un usuario - SOLO ADMINS -  Create - POST - /
const createEditor = async (req,res, next)=> {
    try{
        
        const newEditor = new User(
            {...req.body,
                role: 'editor'
            }
        );
        const savedEditor = await newEditor.save();
     
        res.status(201).json(savedEditor);
    }
    catch (err) {
        //manejo del error de la petición
        res.status(400).json({error: err.message}) // 400: Bad request

    }
}

// Eliminar un comentario - SOlo admins - Delete - DELETE - /:id

const deleteComment = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteComment = await Comment.findByIdAndDelete(id)

        if (!deleteComment) {
            return res.status(404).json('Comentario no encontrado')

        }

        return res.status(200).json('Comentario eliminado correctamente')

        
    } catch (err) {
        next(err)

    }
    
}


// EXPORTACIONES

module.exports  = { 
    createEditor,
    deleteComment
}