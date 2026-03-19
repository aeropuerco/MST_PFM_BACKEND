// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()


const { 
    getAllEditors,
    getUserById,
    createUser,
    updateUser,
    deleteUser
 } = require('../controllers/userController')

router.get('/', getAllEditors)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router;