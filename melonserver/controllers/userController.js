// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const User = require('../models/UserModel')



// Crear un editor - SOLO ADMINS -  Create - POST - /
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

// TRAER TODOS LOS USUARIOS - Read - GET - /home
const getAllEditors = async (req,res) => {
    const allEditors = await User.find({role:'editor'}).select('-password')
    res.status(200).json(allEditors)
}



// Traer un usuario por ID - Read - GET - /:id
const getUserById = async (req,res) => {
    try {
        const { id } = req.params; //path variable con params
        const user = await User.findById(id)
        
        if(!user){
            return res.status(404).json({ error: "Usuario no encontado"}) // not found
        }

        return res.status(200).json({
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }) // 200 : OK
    } catch (error) {
        return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido

    }

}


// Actualizar un usuario - Update - PUT - /:id

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) 
        
        if (!updateUser) {
            return res.status(404).json({error: "Usuario no encontrado"})
            
        }

        return res.status(200).json(updateUser) // Todo ok, devuelve el usuario

    } catch (err) {
         return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
    }
    
}

// Eliminar un usuario - Delete - DELETE - /:id

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).json('Usuario no encontrado')

        }

        return res.status(200).json('Usuario eliminado correctamente')

        
    } catch (err) {
        next(err)

    }
    
}


// EXPORTACIONES

module.exports  = { 
    createEditor,
    getAllEditors,
    getUserById,
    updateUser,
    deleteUser
}