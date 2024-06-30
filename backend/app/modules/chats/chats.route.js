const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const { chatSchema } = require('./chats.schema');
const { sendChatController, getChatController } = require('./chats.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const chatsRouter = express.Router();

chatsRouter.post('/send', validateRequest(chatSchema, 'body'), sendChatController);
chatsRouter.get('/:room', getChatController);

module.exports = chatsRouter;
