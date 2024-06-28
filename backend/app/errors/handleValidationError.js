const handleValidationError = (err) => {
    const response = {
        error: 'Something went wrong',
        statusCode: 500,
    };



    for (const error of Object.values(err?.errors || {})) {
        if (error?.path && error?.kind) {
            response.error = `Property ${error?.path} is ${error?.kind}`;
            response.statusCode = 400;
            break;
        }
    }
    return response;
};

module.exports = handleValidationError;