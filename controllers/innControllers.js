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
    },

    async create(req, res) {
        try {
            const {
                name,
                description,
                image_url,
                status,
                email,
                phone,
                user_id,
                block,
                quality,
                state_id,
                municipality_id,
                parish_id,
                category_id
            } = req.body;

            const ownerId = req.user?.id || user_id;

            if (!name || !ownerId) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre de la posada y el identificador del usuario son obligatorios'
                });
            }

            const createdInn = await InnModel.create({
                name,
                description,
                image_url,
                status,
                email,
                phone,
                user_id: ownerId,
                block,
                quality,
                state_id,
                municipality_id,
                parish_id,
                category_id
            });

            res.status(201).json({
                success: true,
                message: 'Posada creada con éxito',
                data: createdInn
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error al crear la posada' });
        }
    }
};

module.exports = InnController;