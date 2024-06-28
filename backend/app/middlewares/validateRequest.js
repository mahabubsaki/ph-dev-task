

const validateRequest = (schema, type) => {
    return async (req, res, next) => {

        try {
            await schema.parseAsync(type === 'cookies' ? req.cookies : req.body);

            next();
        } catch (err) {
            res.statusCode = 400;
            next(err);
        }
    };
};
module.exports = validateRequest;