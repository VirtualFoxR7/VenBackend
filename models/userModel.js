const pool = require('../config/db');

const UserModel = {
    async getByEmail(email) {
        const query = `SELECT 
            users.id, 
            users.first_name, 
            users.last_name, 
            users.email, 
            users.last_access, 
            users.registration_date, 
            users.profile_type, 
            users.password, 
            users.block, 
            users.profile_image_url, 
            users.banner_image_url, 
            users.membership_type, 
            users.membership_start_date, 
            users.membership_end_date
        FROM users
        WHERE users.email = ?;`;
        const [rows] = await pool.query(query, [email]);
        return rows[0];
    }
};

module.exports = UserModel;