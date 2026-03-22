// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()


const { 
    createComment,
    getCommentsByPost
 } = require('../controllers/commentController')


router.post('/createcomment', createComment)

router.get('/post/:id', getCommentsByPost)

//router.put('/:id', updatePost)  // LOS COMENTARIOS NO SE PUEDEN EDITAR

//router.delete('/:id', deleteComment) // SOLO PUEDEN BORRAR ADMINS





module.exports = router;