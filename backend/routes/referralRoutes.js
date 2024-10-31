const express = require('express');
const { createReferral, trackReferrals } = require('../controllers/referralController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createReferral);
router.get('/track', protect, trackReferrals);

module.exports = router;
