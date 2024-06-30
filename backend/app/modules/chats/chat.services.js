const { default: mongoose } = require("mongoose");
const Chat = require("./chats.model");
const redisClient = require("../../configs/redis");

const sendChat = async ({ message, user, room }) => {
    const previousChat = await redisClient.get(room);
    if (previousChat) {
        console.log('cache delete');
        await redisClient.del(room);
    }
    const chat = await Chat.create({ message, user, room });
    return chat;
};
const getChat = async (id) => {
    const previousChat = await redisClient.get(id);
    if (previousChat) {
        console.log('cache hit');
        return JSON.parse(previousChat);
    }
    const chat = await Chat.find({
        room: new mongoose.Types.ObjectId(id)
    }).populate('user');

    await redisClient.set(id, JSON.stringify(chat));

    return chat;
};

module.exports = {
    sendChat,
    getChat
};