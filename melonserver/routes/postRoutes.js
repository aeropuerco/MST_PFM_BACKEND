// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const {auth} = require('../middlewares/authMiddleware')
const editor = require('../middlewares/editorMiddleware')
const admin = require('../middlewares/adminMiddleware')

const { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
 } = require('../controllers/postController')

 // Solamente permite crear post a los editores. El nombre del autor lo coge del id del login que llega del mw:auth. No deja indicar un author diferente en la petición.  Comprobado
router.post('/createpost', auth, editor, createPost)

// Recibe los id de los autores, y con populate recibe el string del nombre. Comprobado
router.get('/', getAllPosts)
router.get('/:id', getPostById)

// Comprueba login hecho + rol de editor + que el post sea propio! No deja a un editor editar post ajenos. Comprobado edita si propio, error si ajeno!
router.put('/update/:id', auth, editor, updatePost)

// Comprueba login hecho + rol de editor + que el post sea propio! No deja a un editor borrar post ajenos. Comprobado elimina si propio, error si ajeno :) !
router.delete('/delete/:id', auth, editor, deletePost)





module.exports = router;