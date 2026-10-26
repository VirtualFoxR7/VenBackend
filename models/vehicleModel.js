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
    }
};

module.exports = VehicleModel;