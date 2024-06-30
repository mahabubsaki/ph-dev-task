const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const { projectSchema, feedbackSchema, editProjectSchema } = require('./projects.schema');
const { createProjectController, readProjectController, createFeedbackController, readFeedbackController, readSingleProjectController, updateProjectController, deleteProjectController } = require('./projects.controller');
const verifyJWT = require('../../middlewares/verifyJWT');
const projectRouter = express.Router();
//already validating the jwt on nextjs server action, so no need to validate on mutations here
projectRouter.post('/create', validateRequest(projectSchema, 'body'), createProjectController);
projectRouter.post('/feedback', validateRequest(feedbackSchema, 'body'), createFeedbackController);
projectRouter.get('/feedbacks/:changeId', verifyJWT, readFeedbackController);
projectRouter.get('/list', verifyJWT, readProjectController);
projectRouter.get('/list/:id', verifyJWT, readSingleProjectController);
projectRouter.put('/edit/:id', validateRequest(editProjectSchema, 'body'), updateProjectController);
projectRouter.delete('/delete/:id', deleteProjectController);

module.exports = projectRouter;