// models/innModel.js
const pool = require('../config/db');

const InnModel = {
    async getAll() {
        const query = `SELECT 
            inns.id, 
            inns.name, 
            inns.description, 
            inns.image_url, 
            inns.status, 
            inns.email, 
            inns.phone, 
            inns.user_id, 
            inns.block, 
            inns.quality, 
            states.name AS state, 
            municipalities.name AS municipality, 
            parishes.name AS parish, 
            categories.name AS category 
        FROM inns
        LEFT JOIN states ON inns.state_id = states.id
        LEFT JOIN municipalities ON inns.municipality_id = municipalities.id
        LEFT JOIN parishes ON inns.parish_id = parishes.id
        LEFT JOIN categories ON inns.category_id = categories.id`;
        const [rows] = await pool.query(query);
        return rows;
    },

    async getById(id) {
        const query = `SELECT 
            inns.id, 
            inns.name, 
            inns.description, 
            inns.image_url, 
            inns.status, 
            inns.email, 
            inns.phone, 
            inns.user_id, 
            inns.block, 
            inns.quality, 
            states.name AS state, 
            municipalities.name AS municipality, 
            parishes.name AS parish, 
            categories.name AS category 
        FROM inns
        LEFT JOIN states ON inns.state_id = states.id
        LEFT JOIN municipalities ON inns.municipality_id = municipalities.id
        LEFT JOIN parishes ON inns.parish_id = parishes.id
        LEFT JOIN categories ON inns.category_id = categories.id
        WHERE inns.id = ?`;
        const [rows] = await pool.query(query, [id]);
        return rows[0]; 
    }
};

module.exports = InnModel;