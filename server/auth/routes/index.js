const express = require('express');
const useAuth = require('../controllers/authController');
const useSignup = require('../controllers/signupController');

const router = express.Router();

router.route('/').get(useAuth);
router.route('/signup').post(useSignup);

module.exports = router;
