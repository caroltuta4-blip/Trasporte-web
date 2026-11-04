const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        let usuario = await User.findOne({ email });
        if (usuario) {
            return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });
        }

        usuario = new User({ nombre, email, password });

        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = jwt.sign({ uid: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Por favor hable con el administrador' });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ ok: false, msg: 'El usuario no existe con ese correo' });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ uid: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Por favor hable con el administrador' });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};