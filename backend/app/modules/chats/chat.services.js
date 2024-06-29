const { default: mongoose } = require("mongoose");
const Chat = require("./chats.model");

const sendChat = async ({ message, user, room }) => {
    const chat = await Chat.create({ message, user, room });
    return chat;
};
const getChat = async (id) => {
    const chat = await Chat.find({
        room: new mongoose.Types.ObjectId(id)
    }).populate('user');
    console.log(id);
    console.log(chat, 'chat');
    return chat;
};

module.exports = {
    sendChat,
    getChat
};