const db = require('../models/db');

async function seleccionarRutina(usuario_id, rutina_id) {
  const [result] = await db.query(
    'INSERT INTO rutinas_seleccionadas (usuario_id, rutina_id) VALUES (?, ?)',
    [usuario_id, rutina_id]
  );
  return result.insertId;
}

async function obtenerPorUsuario(usuario_id) {
  const [rows] = await db.query(
    'SELECT * FROM rutinas_seleccionadas WHERE usuario_id = ?',
    [usuario_id]
  );
  return rows;
}

async function marcarCompletada(id) {
  await db.query(
    'UPDATE rutinas_seleccionadas SET estado = "completada" WHERE id = ?',
    [id]
  );
}

async function obtenerPorId(id) {
  const [rows] = await db.query(
    'SELECT * FROM rutinas_seleccionadas WHERE id = ?',
    [id]
  );
  return rows[0];
}

module.exports = {
  seleccionarRutina,
  obtenerPorUsuario,
  marcarCompletada,
  obtenerPorId
};
