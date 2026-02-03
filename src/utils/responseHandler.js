const responseCode = require('./responseCode');
const resMessage = require('./resMessage');

const responseHandler = (req, res, next) => {
    res.success = ({ data = {}, message = resMessage.success } = {}) => {
        return res.status(responseCode.success).json({
            status: responseCode.success,
            message,
            data,
        });
    };

    res.createResource = ({ data = {}, message = resMessage.created } = {}) => {
        return res.status(responseCode.created).json({
            status: responseCode.created,
            message,
            data,
        });
    };

    res.badRequest = ({ data = {}, message = resMessage.badRequest } = {}) => {
        return res.status(responseCode.badRequest).json({
            status: responseCode.badRequest,
            message,
            data,
        });
    };

    res.unauthorized = ({ data = {}, message = resMessage.unauthorized } = {}) => {
        return res.status(responseCode.unauthorized).json({
            status: responseCode.unauthorized,
            message,
            data,
        });
    };

    res.forbidden = ({ data = {}, message = resMessage.forbidden } = {}) => {
        return res.status(responseCode.forbidden).json({
            status: responseCode.forbidden,
            message,
            data,
        });
    };

    res.notFound = ({ data = {}, message = resMessage.notFound } = {}) => {
        return res.status(responseCode.notFound).json({
            status: responseCode.notFound,
            message,
            data,
        });
    };

    res.conflict = ({ data = {}, message = resMessage.conflict } = {}) => {
        return res.status(responseCode.conflict).json({
            status: responseCode.conflict,
            message,
            data,
        });
    };

    res.tooManyRequests = ({ data = {}, message = resMessage.tooManyRequests } = {}) => {
        return res.status(responseCode.tooManyRequests).json({
            status: responseCode.tooManyRequests,
            message,
            data,
        });
    };

    res.tokenExpired = ({ data = {}, message = resMessage.tokenExpired } = {}) => {
        return res.status(responseCode.unauthorized).json({
            status: responseCode.unauthorized,
            message,
            data,
        });
    };

    res.internalServerError = ({ data = {}, message = resMessage.internalServerError } = {}) => {
        return res.status(responseCode.internalServerError).json({
            status: responseCode.internalServerError,
            message,
            data,
        });
    };

    next();
};

module.exports = responseHandler;
