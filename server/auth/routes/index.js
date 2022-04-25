const express = require('express');
const router = express.Router();
const useAuth = require('../controllers/authController');

router.route('/').get(useAuth);

module.exports = router;
