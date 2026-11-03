const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rutapp';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🟢 Base de datos MongoDB conectada exitosamente');
  })
  .catch((error) => {
    console.error('🔴 Error al conectar a la base de datos:', error);
  });

app.get('/', (req, res) => {
  res.json({ 
    estado: 'API activa', 
    proyecto: 'RutApp - MEAN Stack Backend' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto: ${PORT}`);
});