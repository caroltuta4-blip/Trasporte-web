const { Schema, model } = require('mongoose');

const RutaSchema = Schema({
    numeroRuta: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    frecuencia: {
        type: String,
        required: true
    },
    paraderos: {
        type: Number,
        required: true
    },
    badgeColor: {
        type: String,
        default: 'azul' // Para adaptar tus estilos (azul, verde, amarillo)
    }
});

module.exports = model('Ruta', RutaSchema);