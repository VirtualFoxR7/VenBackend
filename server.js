const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ estado: "Servidor en marcha" });
});

app.get('/api/test', (req, res) => {
    console.log('¡Conexión de prueba recibida desde la app de Expo!');
    res.json({ estado: 'ok', mensaje: 'El servidor recibió el test correctamente' });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
