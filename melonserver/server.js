// cargar variables de entorno
require('dotenv').config()

// importar dependencias

const express = require('express')
const mongoose = require('mongoose')
//const cors = require('cors')

//crear app de express
const app = express()

// CORS - MIDDLEWARE
    const corsOptions = {
        origin: "http://localhost:3000",
        methods: ["GET", "POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }

    //app.use(cors(corsOptions));
 //   app.use(cors())


// middleware para leer JSON cuando hagamos una petición a la BBDD
app.use(express.json())


// conexión a mongoDB con mongoose
mongoose.connect(process.env.MONGO_URI)
.then( () => console.log('👌 Estas conectado a la bbdd'))
.catch(err => console.error('❌ Error al conectar ',err));

// ? ////////////////////////////////////////////////////////////////


// Rutas de User
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)


// Rutas de Post
const postRoutes = require('./routes/postRoutes')
app.use('/api/posts', postRoutes)

// Rutas de Comment
const commentRoutes = require('./routes/commentRoutes')
app.use('/api/comments', commentRoutes)

// Rutas de Admin
const adminRoutes = require('./routes/adminRoutes')
app.use('/admin', adminRoutes)



// Rutas de Auth
/* const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
 */


// ? ////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send("¡Servidor ON!");
});

// Manejo de rutas no encontradas
app.use((req,res)=> {
    res.status(404).json({error: "Ruta no encontrada"})
})

//Middleware de Errores
/* const errors = require('./middlewares/errors')
app.use(errors)
 */

// arrancar el servidor

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
})