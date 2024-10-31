const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateReferralCode = () => {
    return Math.random().toString(36).substr(2, 8);
};


exports.signup = async (req, res) => {
    const { name, email, password, referralCode } = req.body;

    try {
        // Check if user already exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email is already registered. Please log in.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            referralCode: generateReferralCode(),
        });

        // Referral code handling
        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                newUser.referrer = referrer._id;
                referrer.referrals.push(newUser._id);
                await referrer.save();
            }
        }

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and referral code
        res.status(201).json({ token, referralCode: newUser.referralCode });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup. Please try again later.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please check your email or sign up.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password. Please try again.' });
        }

        // Generate JWT token if login is successful
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// User Dashboard Controller
exports.getUserDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('referrals', 'email referralCode');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            referralCode: user.referralCode,
            referrals: user.referrals,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


