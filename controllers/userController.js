// Resumen: Controlador para gestionar la comprobación de correos y el registro de nuevos usuarios.
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const UserController = {
    async checkEmail(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ success: false, message: 'El correo es obligatorio' });
            }

            // Validación de formato de correo mediante Expresión Regular (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ success: false, message: 'Formato de correo electrónico inválido' });
            }

            const existingUser = await UserModel.getByEmail(email);
            if (existingUser) {
                return res.status(200).json({ success: true, available: false, message: 'El correo ya está en uso' });
            }

            res.json({ success: true, available: true, message: 'Correo disponible' });
        } catch (error) {
            console.error('Error al verificar el correo:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    },

    async signUp(req, res) {
        try {
            const { first_name, last_name, email, password, confirm_password, profile_type } = req.body;

            // Validación básica de campos requeridos
            if (!first_name || !last_name || !email || !password || !confirm_password) {
                return res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben ser completados' });
            }

            // Validar coincidencia de contraseñas
            if (password !== confirm_password) {
                return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
            }

            // Validar formato de correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ success: false, message: 'Formato de correo electrónico inválido' });
            }

            // Verificar si el correo ya fue registrado de última hora
            const existingUser = await UserModel.getByEmail(email);
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
            }

            // Hashear la contraseña de forma segura (con 10 rondas de salt)
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Guardar en la base de datos
            const newUserId = await UserModel.createUser({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                profile_type
            });

            res.status(201).json({
                success: true,
                message: 'Usuario registrado con éxito',
                data: { id: newUserId, email, first_name, last_name }
            });

        } catch (error) {
            console.error('Error en el proceso de Sign Up:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    }
};

module.exports = UserController;