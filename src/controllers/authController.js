const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate access token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
    try {
        const { firstName, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.conflict({}, 'Email already exists');
        }

        const user = await User.create({
            firstName,
            email,
            password,
        });

        const token = generateToken(user._id);

        res.createResource({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token,
        }, 'User registered successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.unauthorized({}, 'Invalid credentials');
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.unauthorized({}, 'Invalid credentials');
        }

        const token = generateToken(user._id);

        res.success({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token,
        }, 'Login successful');
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.success(user);
    } catch (error) {
        next(error);
    }
};
