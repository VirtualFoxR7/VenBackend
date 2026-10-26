const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

router.get('/vehicles', VehicleController.list);
router.get('/vehicles/:id', VehicleController.getOne);
router.get('/inns/:innId/vehicles', VehicleController.getByInn);

module.exports = router;