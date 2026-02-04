const jwt = require('jsonwebtoken');
const responseCode = require('../utils/responseCode');
const resMessage = require('../utils/resMessage');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.unauthorized({}, resMessage.unauthorized);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.unauthorized({}, 'User no longer exists');
        }

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.tokenExpired({}, resMessage.tokenExpired);
        }
        return res.unauthorized({}, resMessage.invalidToken);
    }
};

module.exports = { protect };
