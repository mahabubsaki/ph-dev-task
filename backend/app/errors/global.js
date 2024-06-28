
const httpStatus = require('http-status');
const handleMongoError = require('./handleMongoError');
const handleCustomError = require('./handleCustomError');
const handleZodError = require('./handleZodError');
const handleValidationError = require('./handleValidationError');


const globalErrorHandler = (err, _, res, __) => {

    const responseObj = {
        statusCode: res.statusCode || 500,
        message: httpStatus[res.statusCode || '500'],
        error: err.message,
        success: false,
    };
    console.log(err, 'in global error handler');
    console.log(err?.name, 'name of error');
    if (err?.name === 'MongoServerError') {
        const { error, statusCode } = handleMongoError(err);
        responseObj.error = error;
        responseObj.statusCode = statusCode;
        responseObj.message = httpStatus[statusCode];

    } else if (err?.name === 'CustomError') {
        const { error, statusCode } = handleCustomError(err);
        responseObj.error = error;
        responseObj.statusCode = statusCode;
        responseObj.message = httpStatus[statusCode];
    } else if (err?.name == 'ZodError') {
        const { error, statusCode } = handleZodError(err);
        responseObj.error = error;
        responseObj.statusCode = statusCode;
        responseObj.message = httpStatus[statusCode];
    } else if (err?.name === 'ValidationError') {
        const { error, statusCode } = handleValidationError(err);
        responseObj.error = error;
        responseObj.statusCode = statusCode;
        responseObj.message = httpStatus[statusCode];
    }
    return res.status(responseObj.statusCode).json(responseObj);

};
module.exports = globalErrorHandler;