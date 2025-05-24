const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rutas = require('./routes/notificacionesRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/notificaciones', rutas);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`notificaciones-ms corriendo en http://192.168.100.2:${PORT}`);
});
