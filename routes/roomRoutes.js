const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController');

router.get('/rooms', RoomController.list);
router.get('/rooms/:id', RoomController.getOne);
router.get('/inns/:innId/rooms', RoomController.getByInn);

module.exports = router;