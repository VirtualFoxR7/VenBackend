const RoomModel = require('../models/roomModel');

const RoomController = {
    async list(req, res) {
        try {
            const data = await RoomModel.getAll();
            res.json({ success: true, data });
        } catch (error) {
            console.error('Error al obtener habitaciones:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    },

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await RoomModel.getById(id);

            if (!data) {
                return res.status(404).json({ success: false, message: 'Habitación no encontrada' });
            }

            res.json({ success: true, data });
        } catch (error) {
            console.error('Error al obtener la habitación:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    },

    async getByInn(req, res) {
        try {
            const { innId } = req.params;
            const data = await RoomModel.getByInnId(innId);
            res.json({ success: true, data });
        } catch (error) {
            console.error('Error al obtener habitaciones de la posada:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    },

    async create(req, res) {
        try {
            const {
                room_number,
                type,
                quality,
                image_url,
                description,
                price,
                capacity,
                inn_id,
                status,
                block,
                image_url2,
                image_url3,
                image_url4,
                image_url5
            } = req.body;

            if (!room_number || price === undefined || price === null || !inn_id) {
                return res.status(400).json({
                    success: false,
                    message: 'El número de habitación, el precio y el identificador de la posada son obligatorios'
                });
            }

            const createdRoom = await RoomModel.create({
                room_number,
                type,
                quality,
                image_url,
                description,
                price,
                capacity,
                inn_id,
                status,
                block,
                image_url2,
                image_url3,
                image_url4,
                image_url5
            });

            res.status(201).json({
                success: true,
                message: 'Habitación creada con éxito',
                data: createdRoom
            });
        } catch (error) {
            console.error('Error al crear la habitación:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    }
};

module.exports = RoomController;