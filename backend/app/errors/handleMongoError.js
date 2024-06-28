const handleMongoError = (err) => {
    const response = {
        error: 'Something went wrong',
        statusCode: 500,
    };



    switch (err.code) {
        case 11000:
            const field = Object.entries(err.keyValue)[0];
            response.error = `Account with ${field[0]} - ${field[1]} already exist`;
            response.statusCode = 400;
            return response;
        case 121:
            response.error = 'Document failed validation';
            response.statusCode = 400;
            return response;

        default:
            return response;
    }
};

module.exports = handleMongoError;