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
    },

    async create(roomData) {
        const {
            room_number,
            type = null,
            quality = null,
            image_url = null,
            description = null,
            price,
            capacity = 1,
            inn_id,
            status = 'available',
            block = 0,
            image_url2 = null,
            image_url3 = null,
            image_url4 = null,
            image_url5 = null
        } = roomData;

        const query = `INSERT INTO rooms (
            room_number,
            type,
            quality,
            image_url,
            description,
            price,
            capacity,
            inn_id,
            status,
            block,
            image_url2,
            image_url3,
            image_url4,
            image_url5
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            room_number,
            type,
            quality,
            image_url,
            description,
            price,
            capacity,
            inn_id,
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
            room_number,
            type,
            quality,
            image_url,
            description,
            price,
            capacity,
            inn_id,
            status,
            block,
            image_url2,
            image_url3,
            image_url4,
            image_url5
        };
    }
};

module.exports = RoomModel;