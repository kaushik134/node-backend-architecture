const responseCode = require('../utils/responseCode');
const resMessage = require('../utils/resMessage');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let error = { ...err };
    error.message = err.message;


    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        return res.status(responseCode.notFound).json({
            status: responseCode.notFound,
            message,
            data: {},
        });
    }


    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        return res.status(responseCode.conflict).json({
            status: responseCode.conflict,
            message,
            data: {},
        });
    }


    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        return res.status(responseCode.badRequest).json({
            status: responseCode.badRequest,
            message,
            data: {},
        });
    }


    if (err.isJoi) {
        const message = err.details.map((detail) => detail.message).join(', ');
        return res.status(responseCode.badRequest).json({
            status: responseCode.badRequest,
            message,
            data: {}
        });
    }


    if (err.name === 'JsonWebTokenError') {
        return res.status(responseCode.invalidToken).json({
            status: responseCode.invalidToken,
            message: resMessage.invalidToken,
            data: {},
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(responseCode.unauthorized).json({
            status: responseCode.unauthorized,
            message: resMessage.tokenExpired,
            data: {},
        });
    }


    res.status(err.statusCode || responseCode.internalServerError).json({
        status: err.statusCode || responseCode.internalServerError,
        message: error.message || resMessage.internalServerError,
        data: {},
    });
};

module.exports = errorHandler;
