import express from 'express';
import pool from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Resumen: Endpoint Express para obtener el listado completo de todas las posadas unidas con sus ubicaciones y categorías.
app.get('/api/inns', async (req, res) => {
    try {
        const querySQL = `SELECT 
            inns.id, 
            inns.name, 
            inns.description, 
            inns.image_url, 
            inns.status, 
            inns.email, 
            inns.phone, 
            inns.user_id, 
            inns.block, 
            inns.quality, 
            states.name AS state, 
            municipalities.name AS municipality, 
            parishes.name AS parish, 
            categories.name AS category 
        FROM inns
        LEFT JOIN states ON inns.state_id = states.id
        LEFT JOIN municipalities ON inns.municipality_id = municipalities.id
        LEFT JOIN parishes ON inns.parish_id = parishes.id
        LEFT JOIN categories ON inns.category_id = categories.id`;
        
        const [rows] = await pool.query(querySQL);

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error al obtener el listado de posadas:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno de consulta SQL'
        });
    }
});

// Resumen: Endpoint Express que consulta una posada por su ID usando promesas con pool de MySQL y devuelve el resultado o un error 404/500.
app.get('/api/inns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id recibido: ', id);
    
    const querySQL = `SELECT 
    inns.id, 
    inns.name, 
    inns.description, 
    inns.image_url, 
    inns.status, 
    inns.email, 
    inns.phone, 
    inns.user_id, 
    inns.block, 
    inns.quality, 
    states.name AS state, 
    municipalities.name AS municipality, 
    parishes.name AS parish, 
    categories.name AS category 
  FROM inns
  LEFT JOIN states ON inns.state_id = states.id
  LEFT JOIN municipalities ON inns.municipality_id = municipalities.id
  LEFT JOIN parishes ON inns.parish_id = parishes.id
  LEFT JOIN categories ON inns.category_id = categories.id
  WHERE inns.id = ?`;
    
    const [rows] = await pool.query(querySQL, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "registro no encontrado"
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  }
  catch (error) {
    console.error('error al obtener los datos: ', error);
    res.status(500).json({
      success: false,
      error: 'Error interno de consulta SQL'
    });
  }
});


app.get('/api/ping', (req, res) => {
  res.json({ status: 'connected' });
  console.log('request arrived');
});

app.listen(PORT, () => {
  console.log(`Servidor de VenBooking corriendo en el puerto ${PORT}`);
});