// Resumen: Modelo de usuario actualizado con los nombres de tabla correctos ('profile') tanto para el SELECT como para el INSERT.
const pool = require('../config/db');

const UserModel = {

    async getAll() {
        const query = `SELECT 
        profile.id, 
        profile.first_name, 
        profile.last_name, 
        profile.email, 
        profile.last_access, 
        profile.registration_date, 
        profile.profile_type, 
        profile.block, 
        profile.profile_image_url, 
        profile.banner_image_url, 
        profile.membership_type, 
        profile.membership_start_date, 
        profile.membership_end_date
    FROM profile;`;
        const [rows] = await pool.query(query);
        return rows;
    },

    async getByEmail(email) {
        const query = `SELECT 
            profile.id, 
            profile.first_name, 
            profile.last_name, 
            profile.email, 
            profile.last_access, 
            profile.registration_date, 
            profile.profile_type, 
            profile.password, 
            profile.block, 
            profile.profile_image_url, 
            profile.banner_image_url, 
            profile.membership_type, 
            profile.membership_start_date, 
            profile.membership_end_date
        FROM profile
        WHERE profile.email = ?;`;
        const [rows] = await pool.query(query, [email]);
        return rows[0];
    },

    async createUser(userData) {
        const { first_name, last_name, email, password, profile_type } = userData;
        const query = `INSERT INTO profile (first_name, last_name, email, password, profile_type) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            first_name,
            last_name,
            email,
            password,
            profile_type !== undefined ? profile_type : null
        ];
        const [result] = await pool.query(query, values);
        return result.insertId;
    }
};

module.exports = UserModel;