// Resumen: Configura el router de Express para posadas importando InnController y registrando las rutas GET de listado y detalle junto con la ruta POST para crear una nueva posada.
const express = require('express');
const router = express.Router();
const InnController = require('../controllers/innControllers');

router.get('/inns', InnController.list);
router.get('/inns/:id', InnController.getOne);
router.post('/inns', InnController.create);

module.exports = router;