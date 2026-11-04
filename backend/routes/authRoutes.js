const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

const router = Router();

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio y debe ser válido').isEmail(),
    check('password', 'El password debe ser de 6 caracteres mínimo').isLength({ min: 6 }),
    validarCampos
], registrarUsuario);

router.post('/login', [
    check('email', 'El email es obligatorio y debe ser válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], loginUsuario);

module.exports = router;