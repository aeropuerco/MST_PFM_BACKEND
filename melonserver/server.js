// Carga de variables de .env
require('dotenv').config()

// Carga de dependencias
const express = require('express')
const mongoose = require('mongoose')

// Crea App de express
const app = express();

// Middleware para parsear JSONs
app.use(express.json())

// Conexión a mongoDB con mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {{console.log('OK - Conectado')}})
    .catch(() => {console.error('ERROR',err)})

// Rutas
app.get('/', (req, res) => {
    res.send('Servidor OK')
})

// Tomamos el puerto de la variable de entorno o default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})


