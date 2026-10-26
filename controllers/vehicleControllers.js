const VehicleModel = require('../models/vehicleModel');

const VehicleController = {
    async list(req, res) {
        try {
            const data = await VehicleModel.getAll();
            res.json({ success: true, data });
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    },

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await VehicleModel.getById(id);

            if (!data) {
                return res.status(404).json({ success: false, message: 'Vehículo no encontrado' });
            }

            res.json({ success: true, data });
        } catch (error) {
            console.error('Error al obtener el vehículo:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    },

    async getByInn(req, res) {
        try {
            const { innId } = req.params;
            const data = await VehicleModel.getByInnId(innId);
            res.json({ success: true, data });
        } catch (error) {
            console.error('Error al obtener vehículos de la posada:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    }
};

module.exports = VehicleController;