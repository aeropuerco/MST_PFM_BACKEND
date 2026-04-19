// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const { auth, setTargetRole } = require('../middlewares/authMiddleware')
/* const editor = require('../middlewares/editorMiddleware') */
const admin = require('../middlewares/adminMiddleware')
const { register } = require('../controllers/authController')


const { 

    createEditor,
    getAllEditors,
    getUserById,
    updateUser,
    deleteUser
 } = require('../controllers/userController')

 console.log("Auth:", auth);
 console.log("Admin:", admin);
 console.log("SetTargetRole:", setTargetRole);
 console.log("Register:", register);
 
//router.post('/createeditor', auth, admin, createEditor)
router.post('/createeditor', auth, admin, setTargetRole('editor'), register)

// Deja pedir lista de editores a todo el mundo. No devuelve pass. Comprobado
router.get('/editors', getAllEditors)

// Pide un usuario por id, a todos. No devuelve pass. Comprobado
router.get('/:id', getUserById)

// Solo deja modificar si: tiene token de login. Comprobado
router.put('/update/:id', auth, updateUser)

// Solo deja eliminar si: tiene token de login y si es admin. Comprobado
router.delete('/:id', auth, admin,  deleteUser)





module.exports = router;