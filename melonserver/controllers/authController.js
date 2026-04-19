const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const { createToken } = require('../utils/createToken')


// registro

const register = async (req, res,next) => {
    try {
        const {name, email, password} = req.body;


        
        if (!name | !email | !password){
            return res.status(400).json({error: "Nombre, email y clave son obligatorios"})
        }
        
        //Buscamos por name, porque es unico en bbdd
        const prevUser = await User.findOne({ name })

        // SI ya existe, damos un error.
        if (prevUser){
            return res.status(409).json({error: "El name ya esta registrado"})
        }

        
        const role = req.targetRole || "visitor";
        
        const hashedPass = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))


        // Creamos el usuario con la contraseña hasheada, no con la que ha puesto el usuario
        const newUser = await User.create({ name, email, password: hashedPass, role})


        // el id en MONGODB se indica con _id
        const token = createToken(newUser._id)

        return res.status(201).json({
            user: {
                id: newUser._id,
                name:newUser.name,
                email: newUser.email
            }, token
        })
    } catch (err) {
        //console.log("💥ERROR:", err.message); 
        //return res.status(500).json({error: 'Error de servidor'})
        // gestion de errores con middleware
        next(err)
    }
}

const login = async (req,res,next) =>{
    try {

        const { name, password} = req.body;

        //Validación de los campos de entrada del login
        if (!name || !password) {
            return res.status(400).json({error: 'name y passwd son obligatorios'})
        }
        
        // Buscar al usuario por su email

        const user = await User.findOne({name})
        
        // No indicamos que ha fallado el email o la pass para no dar pistas
        if(!user){
            return res.status(400).json({error: 'Credenciales inválidas'})
        }

        // Comparar las contraseñas del usuario con la de req.body
        const passwordOk = await bcrypt.compare(password, user.password)

        // No indicamos que ha fallado el email o la pass para no dar pistas
        if (!passwordOk){
            return res.status(400).json({error: 'Credenciales inválidas'})
        }

        // creamos el token de la sesión si la pass estaba bien
        console.log("LOGIN OK" + name)
        
        const token = createToken(user._id)


        // responder sin exponer la contraseña
        return res.status(200).json({
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })

        

    } catch (err) {
        //console.log("💥ERROR:", err.message); 
        //return res.status(500).json({error: 'Error en el servidor, login'})
        // gestion de errores con middleware
        next(err)
    }
}

module.exports = { register, login
    
 };