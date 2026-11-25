// Resumen: Configura el router de Express para habitaciones importando RoomController y registrando las rutas GET existentes junto con la ruta POST para crear una habitación.
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController');

router.get('/rooms', RoomController.list);
router.get('/rooms/:id', RoomController.getOne);
router.get('/inns/:innId/rooms', RoomController.getByInn);
router.post('/rooms', RoomController.create);

module.exports = router;