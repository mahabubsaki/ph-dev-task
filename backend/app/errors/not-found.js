


const notFoundErrorHandler = (_, res) => {

    if (!res.headersSent) {
        res.status(404).json({
            statusCode: 404,
            message: "This route does not exist!",
            error: "Not Found",
            success: false,
        });
    }
};
module.exports = notFoundErrorHandler;