const express = require('express');
const useAuth = require('../controllers/authController');
const useSignup = require('../controllers/signupController');
const useLogin = require('../controllers/loginController');

const router = express.Router();

router.route('/').get(useAuth);
router.route('/signup').post(useSignup);
router.route('/login').post(useLogin);

module.exports = router;
