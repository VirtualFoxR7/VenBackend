const express = require('express');
const router = express.Router();
const InnController = require('../controllers/innControllers');

router.get('/inns', InnController.list);
router.get('/inns/:id', InnController.getOne);

module.exports = router;