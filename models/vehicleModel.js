const pool = require('../config/db');

const VehicleModel = {
    async getAll() {
        const query = `SELECT 
            vehicles.id, 
            vehicles.inn_id, 
            vehicles.type, 
            vehicles.brand, 
            vehicles.description, 
            vehicles.price, 
            vehicles.capacity, 
            vehicles.year, 
            vehicles.model, 
            vehicles.registration_plate, 
            vehicles.image_url, 
            vehicles.created_at, 
            vehicles.updated_at, 
            vehicles.status, 
            vehicles.block, 
            vehicles.image_url2, 
            vehicles.image_url3, 
            vehicles.image_url4, 
            vehicles.image_url5
        FROM vehicles`;
        const [rows] = await pool.query(query);
        return rows;
    },

    async getById(id) {
        const query = `SELECT 
            vehicles.id, 
            vehicles.inn_id, 
            vehicles.type, 
            vehicles.brand, 
            vehicles.description, 
            vehicles.price, 
            vehicles.capacity, 
            vehicles.year, 
            vehicles.model, 
            vehicles.registration_plate, 
            vehicles.image_url, 
            vehicles.created_at, 
            vehicles.updated_at, 
            vehicles.status, 
            vehicles.block, 
            vehicles.image_url2, 
            vehicles.image_url3, 
            vehicles.image_url4, 
            vehicles.image_url5
        FROM vehicles
        WHERE vehicles.id = ?`;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    },

    async getByInnId(innId) {
        const query = `SELECT 
            vehicles.id, 
            vehicles.inn_id, 
            vehicles.type, 
            vehicles.brand, 
            vehicles.description, 
            vehicles.price, 
            vehicles.capacity, 
            vehicles.year, 
            vehicles.model, 
            vehicles.registration_plate, 
            vehicles.image_url, 
            vehicles.created_at, 
            vehicles.updated_at, 
            vehicles.status, 
            vehicles.block, 
            vehicles.image_url2, 
            vehicles.image_url3, 
            vehicles.image_url4, 
            vehicles.image_url5
        FROM vehicles
        WHERE vehicles.inn_id = ?`;
        const [rows] = await pool.query(query, [innId]);
        return rows;
    },

    async create(vehicleData) {
        const {
            inn_id,
            type = null,
            brand = null,
            description = null,
            price,
            capacity = 1,
            year = null,
            model = null,
            registration_plate = null,
            image_url = null,
            status = 'available',
            block = 0,
            image_url2 = null,
            image_url3 = null,
            image_url4 = null,
            image_url5 = null
        } = vehicleData;

        const query = `INSERT INTO vehicles (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
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
        ];

        const [result] = await pool.query(query, params);
        return {
            id: result.insertId,
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
        };
    }
};

module.exports = VehicleModel;