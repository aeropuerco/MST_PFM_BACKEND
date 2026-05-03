// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()

const {auth} = require('../middlewares/authMiddleware')

const editor = require('../middlewares/editorMiddleware')
const admin = require('../middlewares/adminMiddleware')
const role = require('../middlewares/roleMiddleware')


const { 
    createComment,
    getCommentsByPost,
    deleteComment
 } = require('../controllers/commentController')


 //RUTAS PUBLICAS
router.post('/create', auth, createComment)

router.get('/post/:id', getCommentsByPost)

//router.put('/:id', updatePost)  // LOS COMENTARIOS NO SE PUEDEN EDITAR

// SOLO PUEDEN BORRAR OWNER+EDITOR+AUTOR Y ADMINS
// Esta ruta ha dado "guerra" porque añadi al final la opción de que un visitor pudiera eliminar sus propios comentarios.
// Los middlewares de editor o de admin, tienen un control que rechazaban el acceso si eran visitor.
// Si quito esos middlewares, no llegaba el rol. Por el momento creo un middleware "role" para ese caso.
// Estos 3 middlewares se podrian refactorizar...

router.delete('/delete/:id', auth, role, deleteComment)





module.exports = router;