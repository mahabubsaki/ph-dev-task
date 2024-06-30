const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const userRouter = express.Router();
const { signUpSchema, loginSchema, meSchema } = require('./users.schema');
const { signUpController, loginController, meController } = require('./users.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

userRouter.post('/register', validateRequest(signUpSchema, 'body'), signUpController);
userRouter.post('/login', validateRequest(loginSchema, 'body'), loginController);
userRouter.get('/me', verifyJWT, meController);
// validateRequest(meSchema, 'cookies') 

module.exports = userRouter;    