// VISTA

// RUTAS _ DEFINEN LAS URL (ENDPOINTS) Y el METODO HTTP (GET, POST, PATCH, PUT, DELETE) (CRUD) y ejecuta un controlador en cada ruta

const express = require('express')
const router = express.Router()


const { 
    createEditor,
    deleteComment
 } = require('../controllers/adminController')


router.post('/createeditor', createEditor)

router.delete('/deletecomment/:id', deleteComment)

 



module.exports = router;