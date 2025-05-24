const db = require('./db');

async function crearRutina(descripcion, tipo, gramos) {
  const [result] = await db.query(
    'INSERT INTO rutinas (descripcion, tipo, gramos) VALUES (?, ?, ?)',
    [descripcion, tipo, gramos]
  );
  return result.insertId;
}

async function listarRutinas() {
  const [rows] = await db.query('SELECT * FROM rutinas ORDER BY fecha_creacion DESC');
  return rows;
}

async function obtenerRutinaPorId(id) {
  const [rows] = await db.query('SELECT * FROM rutinas WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  crearRutina,
  listarRutinas,
  obtenerRutinaPorId
};
