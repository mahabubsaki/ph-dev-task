const handleZodError = (error) => {
    const response = {
        error: 'Something went wrong',
        statusCode: 500,
    };
    for (const err of error.errors) {
        if (err.message) {
            response.error = `${err.message} expected ${err.expected} but recieved ${err.received}`;
            response.statusCode = 400;
            break;
        }
    }
    return response;

};
module.exports = handleZodError;