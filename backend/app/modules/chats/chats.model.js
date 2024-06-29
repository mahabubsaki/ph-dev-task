const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema, 'chats');
module.exports = Chat;