const express = require('express');
const { signup, login, getUserDashboard } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/dashboard', authenticate, getUserDashboard); 


module.exports = router;


