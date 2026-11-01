// Resumen: Enrutador para la autenticación de usuarios (Sign In, Sign Up y verificación de email).
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users/signin', UserController.signIn);
router.post('/users/signup', UserController.signUp);
router.post('/users/check-email', UserController.checkEmail);

module.exports = router;