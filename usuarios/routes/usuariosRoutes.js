const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/crear', usuariosController.crearUsuario);
router.post('/login', usuariosController.login);
router.get('/:id', usuariosController.obtenerUsuario);
router.put('/:id/peso', usuariosController.actualizarPeso);

module.exports = router;
