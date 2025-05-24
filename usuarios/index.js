const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/usuarios', usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`usuarios-ms ejecutándose en http://192.168.100.2:${PORT}`);
});
