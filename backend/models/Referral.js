const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'Successful'], default: 'Pending' },
});

module.exports = mongoose.model('Referral', ReferralSchema);
