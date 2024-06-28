const jwt = require('jsonwebtoken');
const envConfigs = require('../configs/env');

const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.session;

    if (!token) {
        console.log('token not found');
        res.statusCode = 401;
        return next({ message: 'Authorization token missing' });
    }
    try {
        const decoded = await new Promise((res, rej) => {
            jwt.verify(token, envConfigs.jwtSecret, (err, decoded) => {
                if (err) {
                    rej(err);
                }
                res(decoded);
            });
        });
        if (req.query.id !== decoded.id) {
            res.statusCode = 401;
            return next({ message: 'You are not allowed to access this resource' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err, 'in verifyJWT');
        res.statusCode = 401;
        return next({ message: 'Something went wrong,please log in again' });
    }
};
module.exports = verifyJWT;