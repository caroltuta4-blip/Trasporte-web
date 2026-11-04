const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rutas', require('./routes/rutaRoutes'));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rutapp';

// Conexión a MongoDB Atlas y arranque del servidor
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🟢 Base de datos MongoDB conectada exitosamente');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.log('❌ Error al conectar a la Base de Datos:', error);
    });