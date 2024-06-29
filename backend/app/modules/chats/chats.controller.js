const catchAsync = require("../../utils/catchAsync");
const { sendChat, getChat } = require("./chat.services");


const sendChatController = catchAsync(async (req, res) => {
    const { message, user, room } = req.body;
    const result = await sendChat({ message, user, room });

    res.send({ success: true, message: 'Chat sent successfully', data: result });
});

const getChatController = catchAsync(async (req, res) => {
    const id = req.params.room;
    const data = await getChat(id);
    res.send({ success: true, message: 'Chats retreived successfully', data: data });
});

module.exports = {
    sendChatController,
    getChatController
};