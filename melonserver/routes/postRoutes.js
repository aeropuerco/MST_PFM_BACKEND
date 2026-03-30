// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')
const editor = require('../middlewares/editorMiddleware')
const admin = require('../middlewares/adminMiddleware')

const { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
 } = require('../controllers/postController')

 // Solamente permite crear post a los editores.
router.post('/createpost', auth, editor, createPost)

router.get('/', getAllPosts)
router.get('/:id', getPostById)

router.put('/update/:id', auth, editor, updatePost)

router.delete('/delete/:id', auth, editor, deletePost)





module.exports = router;