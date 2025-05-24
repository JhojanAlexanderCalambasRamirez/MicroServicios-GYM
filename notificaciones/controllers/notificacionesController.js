const modelo = require('../models/notificacionesModel');

const crear = async (req, res) => {
  const { usuario_id, rutina_id, nuevo_peso } = req.body;

  if (!usuario_id || !rutina_id || !nuevo_peso) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const id = await modelo.crearNotificacion(usuario_id, rutina_id, nuevo_peso);
    res.json({ id, mensaje: 'Notificación creada' });
  } catch (error) {
    console.error('Error al crear la notificación:', error.message);
    res.status(500).json({ error: 'Error interno al crear notificación' });
  }
};

const listar = async (_req, res) => {
  try {
    const notificaciones = await modelo.listarNotificaciones();
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar notificaciones' });
  }
};

module.exports = {
  crear,
  listar
};
