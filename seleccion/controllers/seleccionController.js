const axios = require('axios');
const model = require('../models/seleccionModel');

const seleccionarRutina = async (req, res) => {
  const { usuario_id, rutina_id } = req.body;

  try {
    const usuarioResp = await axios.get(`http://192.168.100.2:3000/usuarios/${usuario_id}`);
    const usuario = usuarioResp.data;

    await axios.get(`http://192.168.100.2:3001/rutinas/${rutina_id}`);

    const id = await model.seleccionarRutina(usuario_id, rutina_id);
    res.json({ id, mensaje: 'Rutina seleccionada con éxito' });
  } catch (error) {
    console.error('Error en selección:', error.message);
    console.error(error.response?.data);
    res.status(400).json({ error: 'Usuario o rutina inválida' });
  }
};

const obtenerRutinasSeleccionadas = async (req, res) => {
  const { usuario_id } = req.params;
  const resultado = await model.obtenerPorUsuario(usuario_id);
  res.json(resultado);
};

const completarRutina = async (req, res) => {
  const { id } = req.params;

  try {
    const seleccion = await model.obtenerPorId(id);
    if (!seleccion || seleccion.estado === 'completada') {
      return res.status(404).json({ error: 'Rutina ya completada o no encontrada' });
    }

    const usuario = await axios.get(`http://192.168.100.2:3000/usuarios/${seleccion.usuario_id}`);
    const nuevoPeso = usuario.data.peso;

    await model.marcarCompletada(id);

    await axios.post('http://192.168.100.2:3003/notificaciones', {
      usuario_id: seleccion.usuario_id,
      rutina_id: seleccion.rutina_id,
      nuevo_peso: nuevoPeso
    });

    res.send('Rutina completada y notificación enviada');
  } catch (error) {
    console.error('Error al completar rutina:', error.message);
    res.status(500).json({ error: 'Error interno al finalizar rutina' });
  }
};

module.exports = {
  seleccionarRutina,
  obtenerRutinasSeleccionadas,
  completarRutina
};
