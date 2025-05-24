const db = require('./db');

async function crearNotificacion(usuario_id, rutina_id, nuevo_peso) {
  const [result] = await db.query(
    'INSERT INTO notificaciones (usuario_id, rutina_id, nuevo_peso) VALUES (?, ?, ?)',
    [usuario_id, rutina_id, nuevo_peso]
  );
  return result.insertId;
}

async function listarNotificaciones() {
  const [rows] = await db.query('SELECT * FROM notificaciones ORDER BY fecha DESC');
  return rows;
}

module.exports = {
  crearNotificacion,
  listarNotificaciones
};
