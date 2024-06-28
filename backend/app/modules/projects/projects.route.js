const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const { projectSchema } = require('./projects.schema');
const { createProjectController, readProjectController } = require('./projects.controller');
const verifyJWT = require('../../middlewares/verifyJWT');
const projectRouter = express.Router();
//already validating the jwt on nextjs server action, so no need to validate it here
projectRouter.post('/create', validateRequest(projectSchema, 'body'), createProjectController);
projectRouter.get('/list', verifyJWT, readProjectController);
projectRouter.get('/list/:id', verifyJWT, readProjectController);

module.exports = projectRouter;