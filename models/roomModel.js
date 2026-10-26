const pool = require('../config/db');

const RoomModel = {
    async getAll() {
        const query = `SELECT 
            rooms.id, 
            rooms.room_number, 
            rooms.type, 
            rooms.quality, 
            rooms.image_url, 
            rooms.description, 
            rooms.price, 
            rooms.capacity, 
            rooms.inn_id, 
            rooms.status, 
            rooms.block, 
            rooms.image_url2, 
            rooms.image_url3, 
            rooms.image_url4, 
            rooms.image_url5
        FROM rooms;`;
        const [rows] = await pool.query(query);
        return rows;
    },

    async getById(id) {
        const query = `SELECT 
            rooms.id, 
            rooms.room_number, 
            rooms.type, 
            rooms.quality, 
            rooms.image_url, 
            rooms.description, 
            rooms.price, 
            rooms.capacity, 
            rooms.inn_id, 
            rooms.status, 
            rooms.block, 
            rooms.image_url2, 
            rooms.image_url3, 
            rooms.image_url4, 
            rooms.image_url5
        FROM rooms
        WHERE rooms.id = ?;`;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    },

    async getByInnId(innId) {
        const query = `SELECT 
            rooms.id, 
            rooms.room_number, 
            rooms.type, 
            rooms.quality, 
            rooms.image_url, 
            rooms.description, 
            rooms.price, 
            rooms.capacity, 
            rooms.inn_id, 
            rooms.status, 
            rooms.block, 
            rooms.image_url2, 
            rooms.image_url3, 
            rooms.image_url4, 
            rooms.image_url5
        FROM rooms
        WHERE rooms.inn_id = ?;`;
        const [rows] = await pool.query(query, [innId]);
        return rows;
    }
};

module.exports = RoomModel;