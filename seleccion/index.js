const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rutas = require('./routes/seleccionRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/seleccion', rutas);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`seleccion-ms corriendo en http://192.168.100.2:${PORT}`);
});
