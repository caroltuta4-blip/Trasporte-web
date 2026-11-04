const Ruta = require('../models/Ruta');

// Obtener todas las rutas
const getRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find();
        res.json({
            ok: true,
            rutas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las rutas, hable con el administrador'
        });
    }
};

// Crear una nueva ruta
const crearRuta = async (req, res) => {
    try {
        const nuevaRuta = new Ruta(req.body);
        const rutaGuardada = await nuevaRuta.save();

        res.status(201).json({
            ok: true,
            ruta: rutaGuardada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la ruta, verifique los datos'
        });
    }
};

// Actualizar una ruta existente
const actualizarRuta = async (req, res) => {
    const rutaId = req.params.id;
    try {
        const rutaActualizada = await Ruta.findByIdAndUpdate(rutaId, req.body, { new: true });
        
        if (!rutaActualizada) {
            return res.status(404).json({ ok: false, msg: 'No se encontró una ruta con ese ID' });
        }

        res.json({
            ok: true,
            ruta: rutaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la ruta'
        });
    }
};

// Eliminar una ruta
const eliminarRuta = async (req, res) => {
    const rutaId = req.params.id;
    try {
        const rutaEliminada = await Ruta.findByIdAndDelete(rutaId);
        
        if (!rutaEliminada) {
            return res.status(404).json({ ok: false, msg: 'No se encontró una ruta con ese ID' });
        }

        res.json({
            ok: true,
            msg: 'Ruta eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la ruta'
        });
    }
};

module.exports = {
    getRutas,
    crearRuta,
    actualizarRuta,
    eliminarRuta
};