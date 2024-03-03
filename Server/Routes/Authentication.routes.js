const express = require('express');

const router = express.Router();

const { register, login, updatePassword, getUserProfile } = require('../Controller/Authentication.controller');
const validate = require('../Middlewares/Validate.middleware')
const registerValidatorSchema = require('../Validator/Registration.validator');
const loginValidatorSchema = require('../Validator/Login.validator');
const verifyToken = require('../Middlewares/VerifyToken.middleware');

// Register Route
router.post('/register', validate(registerValidatorSchema), register)

// Login Route
router.post('/login', validate(loginValidatorSchema), login)
router.get('/userProfile', verifyToken, getUserProfile);
module.exports = router;