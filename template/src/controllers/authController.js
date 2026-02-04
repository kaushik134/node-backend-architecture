const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validateWithJoi = require('../utils/joiValidate');
const { register: registerSchema, login: loginSchema } = require('../validations/auth.validation');


const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });

    return { accessToken, refreshToken };
};


exports.register = async (req, res, next) => {
    try {
        const { isValid, value, errors } = validateWithJoi(req.body, registerSchema.body);

        if (!isValid) {
            return res.badRequest({
                message: errors.length > 1 ? errors : "Validation error occurred.",
            });
        }

        const { firstName, email, password } = value;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.conflict({ message: 'Email already exists' });
        }

        const user = await User.create({
            firstName,
            email,
            password,
        });

        const { accessToken, refreshToken } = generateTokens(user._id);

        res.createResource({
            data: {
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
                accessToken,
                refreshToken,
            },
            message: 'User registered successfully'
        });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { isValid, value, errors } = validateWithJoi(req.body, loginSchema.body);

        if (!isValid) {
            return res.badRequest({
                message: errors.length > 1 ? errors : "Validation error occurred.",
            });
        }

        const { email, password } = value;


        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.unauthorized({ message: 'Invalid credentials' });
        }


        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.unauthorized({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

        res.success({
            data: {
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
                accessToken,
                refreshToken,
            },
            message: 'Login successful'
        });
    } catch (error) {
        next(error);
    }
};


exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.success({ data: user });
    } catch (error) {
        next(error);
    }
};
