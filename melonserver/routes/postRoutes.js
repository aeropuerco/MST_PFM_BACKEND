// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()


const { 
    createPost
 } = require('../controllers/postController')


router.post('/createpost', createPost)

//router.get('/posts', getAllPosts)
//router.get('/:id', getUserById)

//router.put('/:id', updatePost)

//router.delete('/:id', deletePost)





module.exports = router;