
const httpStatus = require('http-status');

const globalErrorHandler = (err, _, res, __) => {

    const responseObj = {
        statusCode: res.statusCode || 500,
        message: httpStatus[res.statusCode || '500'],
        error: err.message,
        success: false,
    };
    console.dir(err, 'Error from global error handler :- global.js line 12');
    return res.status(responseObj.statusCode).json(responseObj);

};
module.exports = globalErrorHandler;