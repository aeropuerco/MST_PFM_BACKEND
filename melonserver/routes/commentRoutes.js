// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const {auth} = require('../middlewares/authMiddleware')

const editor = require('../middlewares/editorMiddleware')
const admin = require('../middlewares/adminMiddleware')


const { 
    createComment,
    getCommentsByPost,
    deleteComment
 } = require('../controllers/commentController')


router.post('/create', auth, createComment)

router.get('/post/:id', getCommentsByPost)

//router.put('/:id', updatePost)  // LOS COMENTARIOS NO SE PUEDEN EDITAR

// SOLO PUEDEN BORRAR EDITOR+AUTOR Y ADMINS
router.delete('/delete/:id', auth, editor, deleteComment)





module.exports = router;