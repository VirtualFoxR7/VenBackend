// Resumen: Incorpora jsonwebtoken en el controlador, firma un JWT con id y profile_type al validar la contraseña en signIn devolviéndolo en la respuesta, y exporta el controlador actualizado.
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'El correo es obligatorio' });
        }
        console.log('Validación positiva: correo presente en checkEmail');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Formato de correo electrónico inválido' });
        }
        console.log('Validación positiva: formato de correo válido en checkEmail');

        const existingUser = await UserModel.getByEmail(email);
        if (existingUser) {
            return res.status(200).json({ success: true, available: false, message: 'El correo ya está en uso' });
        }
        console.log('Validación positiva: correo disponible en checkEmail');

        res.json({ success: true, available: true, message: 'Correo disponible' });
    } catch (error) {
        console.error('Error al verificar el correo:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

const signUp = async (req, res) => {
    try {
        const { first_name, last_name, email, password, confirm_password, profile_type } = req.body;

        if (!first_name || !last_name || !email || !password || !confirm_password) {
            return res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben ser completados' });
        }
        console.log('Validación positiva: campos obligatorios completos en signUp');

        if (password !== confirm_password) {
            return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
        }
        console.log('Validación positiva: contraseñas coincidentes en signUp');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Formato de correo electrónico inválido' });
        }
        console.log('Validación positiva: formato de correo válido en signUp');

        const existingUser = await UserModel.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
        }
        console.log('Validación positiva: correo no registrado previamente en signUp');

        const validProfileTypes = ['turista', 'posadero', 'administrador'];
        const finalProfileType = validProfileTypes.includes(profile_type) ? profile_type : null;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUserId = await UserModel.createUser({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            profile_type: finalProfileType
        });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado con éxito',
            data: { id: newUserId, email, first_name, last_name, profile_type: finalProfileType }
        });

    } catch (error) {
        console.error('Error en el proceso de Sign Up:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Correo y contraseña obligatorios' });
        }
        console.log('Validación positiva: credenciales presentes en signIn');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Formato de correo electrónico inválido' });
        }
        console.log('Validación positiva: formato de correo válido en signIn');

        const user = await UserModel.getByEmail(email);
        if (!user || !user.password) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
        console.log('Validación positiva: usuario encontrado en signIn');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
        console.log('Validación positiva: contraseña verificada en signIn');

        const token = jwt.sign(
            { id: user.id, profile_type: user.profile_type },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        console.log('Validación positiva: token JWT generado en signIn');

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            data: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_type: user.profile_type
            }
        });
    } catch (error) {
        console.error('Error en el proceso de Sign In:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

module.exports = {
    signUp,
    signIn,
    checkEmail
};