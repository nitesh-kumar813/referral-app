const Referral = require('../models/Referral');
const User = require('../models/User');

exports.createReferral = async (req, res) => {
    const { referralCode } = req.body;

    try {
        const referrer = await User.findOne({ referralCode });
        if (!referrer) return res.status(404).json({ message: 'Invalid referral code' });

        const referee = await User.findById(req.user.id);
        if (!referee) return res.status(404).json({ message: 'User not found' });

        referrer.referrals.push(referee._id);
        await referrer.save();

        res.status(201).json({ message: 'Referral created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.trackReferrals = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('referrals', 'email referralCode');
        res.json({ referrals: user.referrals });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
