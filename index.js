// Resumen: Servidor Express actualizado para importar y registrar las rutas de usuarios bajo el prefijo /api.
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const innRoutes = require('./routes/innRoutes');
const roomRoutes = require('./routes/roomRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de que la ruta del archivo sea correcta

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', innRoutes);
app.use('/api', roomRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', userRoutes);

app.get('/api/test-db', async (req, res) => {
  console.log('[Servidor] Petición de prueba de base de datos recibida.');
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('[Servidor] Respuesta exitosa obtenida de la base de datos:', rows);
    res.status(200).json({
      success: true,
      message: 'Conexión con la base de datos establecida correctamente',
      solution: rows[0].solution
    });
  } catch (error) {
    console.error('[Servidor] Error al consultar la base de datos:', error);
    res.status(500).json({
      success: false,
      message: 'Fallo en la conexión con la base de datos',
      error: error.message
    });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en el puerto 3000');
});