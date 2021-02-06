const {
    Router
} = require('express');
const {
    crearUsuario,
    login,
    renewToken
} = require('../controllers/auth_controller')
const {
    check
} = require('express-validator');
const {
    validarCampos
} = require('../middlewares/validar-campos');
const {
    validarJWT
} = require('../middlewares/validar-jwt');

/**
 * PATH: api/auth
 */

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario)

router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.get('/renew-token', validarJWT, renewToken)


module.exports = router;