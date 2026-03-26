// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')
/* const editor = require('../middlewares/editorMiddleware') */
const admin = require('../middlewares/adminMiddleware')


const { 

    createEditor,
    getAllEditors,
    getUserById,
    updateUser,
    deleteUser
 } = require('../controllers/userController')


router.post('/createeditor', auth, admin, createEditor)

// Deja pedir lista de editores a todo el mundo. No devuelve pass. Comprobado
router.get('/editors', getAllEditors)

// Pide un usuario por id, a todos. No devuelve pass. Comprobado
router.get('/:id', getUserById)

// Solo deja modificar si: tiene token de login. Comprobado
router.put('/update/:id', auth, updateUser)

// Solo deja eliminar si: tiene token de login y si es admin. Comprobado
router.delete('/:id', auth, admin,  deleteUser)





module.exports = router;