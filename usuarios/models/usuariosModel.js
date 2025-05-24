const db = require('./db');

async function crearUsuario(nombre_completo, peso, meta, username, passwordHash, rol) {
  const [result] = await db.query(
    'INSERT INTO usuarios (nombre_completo, peso, meta, username, password_hash, rol) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre_completo, peso, meta, username, passwordHash, rol]
  );
  return result.insertId;
}

async function buscarPorUsername(username) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
  return rows[0];
}

async function actualizarPeso(id, nuevoPeso) {
  await db.query('UPDATE usuarios SET peso = ? WHERE id = ?', [nuevoPeso, id]);
}

async function obtenerUsuarioPorId(id) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  crearUsuario,
  buscarPorUsername,
  actualizarPeso,
  obtenerUsuarioPorId
};
