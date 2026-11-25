// Resumen: Configura el router de Express para vehículos importando VehicleController y registrando las rutas GET existentes junto con la ruta POST para crear un vehículo.
const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

router.get('/vehicles', VehicleController.list);
router.get('/vehicles/:id', VehicleController.getOne);
router.get('/inns/:innId/vehicles', VehicleController.getByInn);
router.post('/vehicles', VehicleController.create);

module.exports = router;