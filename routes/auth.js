const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth');
//localhost/auth/login GET POST PUT DELETE
//localhost/auth/register GET POST PUT DELETE

/**
 * Crear un registro
 */
router.post('/register', validatorRegister, registerCtrl);
router.post('/login', validatorLogin, loginCtrl);

module.exports = router;
