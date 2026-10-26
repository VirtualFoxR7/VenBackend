const express = require('express');
const cors = require('cors');

const innRoutes = require('./routes/innRoutes');
const roomRoutes = require('./routes/roomRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', innRoutes);
app.use('/api', roomRoutes);
app.use('/api', vehicleRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});