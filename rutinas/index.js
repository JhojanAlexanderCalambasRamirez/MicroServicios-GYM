const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rutas = require('./routes/rutinasRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/rutinas', rutas);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`rutinas-ms corriendo en http://192.168.100.2:${PORT}`);
});
