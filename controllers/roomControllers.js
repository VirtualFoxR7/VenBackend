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
    }
};

module.exports = RoomController;