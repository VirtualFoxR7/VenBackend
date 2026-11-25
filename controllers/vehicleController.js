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
    },

    // Resumen: Agrega el método create en VehicleController para validar datos obligatorios del vehículo, invocar VehicleModel.create y devolver el registro creado con código 201.
    async create(req, res) {
        try {
            const {
                inn_id,
                type,
                brand,
                description,
                price,
                capacity,
                year,
                model,
                registration_plate,
                image_url,
                status,
                block,
                image_url2,
                image_url3,
                image_url4,
                image_url5
            } = req.body;

            if (!inn_id || price === undefined || price === null) {
                return res.status(400).json({
                    success: false,
                    message: 'El identificador de la posada y el precio son obligatorios'
                });
            }

            const createdVehicle = await VehicleModel.create({
                inn_id,
                type,
                brand,
                description,
                price,
                capacity,
                year,
                model,
                registration_plate,
                image_url,
                status,
                block,
                image_url2,
                image_url3,
                image_url4,
                image_url5
            });

            res.status(201).json({
                success: true,
                message: 'Vehículo creado con éxito',
                data: createdVehicle
            });
        } catch (error) {
            console.error('Error al crear el vehículo:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    }
};

module.exports = VehicleController;