const express = require('express');
const router = express.Router();
const controller = require('../controllers/seleccionController');

router.post('/seleccionar', controller.seleccionarRutina);
router.get('/:usuario_id', controller.obtenerRutinasSeleccionadas);
router.put('/:id/completar', controller.completarRutina);

module.exports = router;
