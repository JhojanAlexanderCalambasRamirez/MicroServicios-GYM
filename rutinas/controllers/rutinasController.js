const axios = require('axios');
const model = require('../models/rutinasModel');

const crearRutina = async (req, res) => {
  const { descripcion, tipo, gramos, usuario_id } = req.body;

  if (!descripcion || !tipo || !gramos || !usuario_id) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Verificar que el usuario exista y sea entrenador
    const respuesta = await axios.get(`http://192.168.100.2:3000/usuarios/${usuario_id}`);
    const usuario = respuesta.data;

    if (usuario.rol !== 'entrenador') {
      return res.status(403).json({ error: 'Solo entrenadores pueden crear rutinas' });
    }

    const id = await model.crearRutina(descripcion, tipo, gramos);
    res.json({ id, mensaje: 'Rutina creada correctamente' });
  } catch (error) {
    console.error('Error al crear la rutina:', error.message);
    res.status(400).json({ error: 'Usuario no válido o error en el servicio de usuarios' });
  }
};

const listarRutinas = async (_req, res) => {
  const rutinas = await model.listarRutinas();
  res.json(rutinas);
};

const obtenerRutina = async (req, res) => {
  const { id } = req.params;
  const rutina = await model.obtenerRutinaPorId(id);

  if (!rutina) return res.status(404).json({ error: 'Rutina no encontrada' });

  res.json(rutina);
};

module.exports = {
  crearRutina,
  listarRutinas,
  obtenerRutina
};
