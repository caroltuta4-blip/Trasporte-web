const { Router } = require('express');
const { getRutas, crearRuta, actualizarRuta, eliminarRuta } = require('../controllers/rutaController');

const router = Router();

// Endpoints del CRUD de Rutas
router.get('/', getRutas);          // GET: Listar rutas
router.post('/', crearRuta);        // POST: Crear ruta
router.put('/:id', actualizarRuta); // PUT: Editar ruta por ID
router.delete('/:id', eliminarRuta);// DELETE: Borrar ruta por ID

module.exports = router;