const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const usuariosModel = require('../models/usuariosModel');

const secret = 'clave_secreta'; // idealmente usar variables de entorno

const crearUsuario = async (req, res) => {
  const { nombre_completo, peso, meta, username, password, rol } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const id = await usuariosModel.crearUsuario(nombre_completo, peso, meta, username, passwordHash, rol);
  res.json({ id });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const usuario = await usuariosModel.buscarPorUsername(username);

  if (!usuario || !(await bcrypt.compare(password, usuario.password_hash))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, secret, { expiresIn: '1h' });
  res.json({ token });
};

const obtenerUsuario = async (req, res) => {
  const id = req.params.id;
  const usuario = await usuariosModel.obtenerUsuarioPorId(id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

const actualizarPeso = async (req, res) => {
  const { id } = req.params;
  const { nuevoPeso, rutina_id } = req.body;

  const usuario = await usuariosModel.obtenerUsuarioPorId(id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

  await usuariosModel.actualizarPeso(id, nuevoPeso);

  try {
    await axios.post('http://192.168.100.2:3003/notificaciones', {
      usuario_id: id,
      rutina_id: rutina_id,
      nuevo_peso: nuevoPeso
    });
  } catch (error) {
    console.error('Error al enviar la notificación:', error.message);
    return res.status(500).json({ error: 'Peso actualizado, pero fallo al notificar' });
  }

  res.send('Peso actualizado y notificación enviada');
};

module.exports = {
  crearUsuario,
  login,
  obtenerUsuario,
  actualizarPeso
};
