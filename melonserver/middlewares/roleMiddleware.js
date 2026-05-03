const User = require('../models/UserModel')

// MIDDLEWARE PARA AÑADIR EL ROLE A LA REQUEST. (Me hace falta el rol aunque no sean admin o editores, por ejemplo al borrar un comentario propio)
const role = async (req, res, next) => {
    try {
        // necesitamos req.user.id del middleware anterior

        const userId = req.user.id;
        const user = await User.findById(userId);

        //Aqui le paso el rol a la request, para las rutas que solamente necesiten eso (para casos de visitors por ejemplo)
        req.user.role = user.role;

        next();

    } catch (err) {
        return res.status(401).json({error:"Error al verificar permiso de editor."})

    }
}

module.exports = role;