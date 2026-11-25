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
    },

    async create(innData) {
        const {
            name,
            description = null,
            image_url = null,
            status = 'active',
            email = null,
            phone = null,
            user_id,
            block = 0,
            quality = null,
            state_id = null,
            municipality_id = null,
            parish_id = null,
            category_id = null
        } = innData;

        const query = `INSERT INTO inns (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
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
        ];

        const [result] = await pool.query(query, params);
        return {
            id: result.insertId,
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
        };
    }
};

module.exports = InnModel;