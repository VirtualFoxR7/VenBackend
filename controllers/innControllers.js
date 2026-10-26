const InnModel = require('../models/innModel')

const InnController = {
    async list(req, res) {
        try {
            const data = await InnModel.getAll();
            res.json({ success: true, data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error al obtener posadas' });
        }
    },

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await InnModel.getById(id);

            if (!data) {
                return res.status(404).json({ success: false, message: 'No encontrado' });
            }

            res.json({ success: true, data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error al obtener la posada' });
        }
    }
};

module.exports = InnController;