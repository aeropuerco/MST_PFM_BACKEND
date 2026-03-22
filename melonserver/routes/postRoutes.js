// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()


const { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
 } = require('../controllers/postController')


router.post('/createpost', createPost)

router.get('/', getAllPosts)
router.get('/:id', getPostById)

router.put('/update/:id', updatePost)

router.delete('/delete/:id', deletePost)





module.exports = router;