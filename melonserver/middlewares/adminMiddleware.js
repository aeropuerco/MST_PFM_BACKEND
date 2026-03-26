const User = require('../models/UserModel')


const admin = async (req, res, next) => {
    try {
        // necesitamos req.user.id del middleware anterior

        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({error: "Acceso denegado"})
        }


        req.user.role = user.role;

        next();

    } catch (err) {
        return res.status(401).json({error:"Error al verificar permiso de administrador."})

    }
}

module.exports = admin;