const express = require('express');
const router = express.Router();
const controller = require('../controllers/rutinasController');

router.post('/', controller.crearRutina);
router.get('/', controller.listarRutinas);
router.get('/:id', controller.obtenerRutina);

module.exports = router;
