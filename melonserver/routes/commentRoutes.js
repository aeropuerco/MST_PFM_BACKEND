// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')
const admin = require('../middlewares/adminMiddleware')


const { 
    createComment,
    getCommentsByPost,
    deleteComment
 } = require('../controllers/commentController')


router.post('/createcomment', auth, createComment)

router.get('/post/:id', getCommentsByPost)

//router.put('/:id', updatePost)  // LOS COMENTARIOS NO SE PUEDEN EDITAR

// SOLO PUEDEN BORRAR ADMINS
router.delete('/deletecomment/:id', auth, admin, deleteComment)





module.exports = router;