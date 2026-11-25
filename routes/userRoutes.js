const express = require('express');
const router = express.Router();
const { signUp, signIn, checkEmail } = require('../controllers/userController');

router.post('/users/signin', signIn);
router.post('/users/signup', signUp);
router.post('/users/check-email', checkEmail);

module.exports = router;