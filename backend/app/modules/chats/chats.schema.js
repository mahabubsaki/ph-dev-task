const { z } = require("zod");



const chatSchema = z.object({
    message: z.string({
        required_error: "Message is required.",
    }),
    user: z.string({
        required_error: "User is required."
    }),
    room: z.string({
        required_error: "Room is required."
    }),
});

module.exports = {
    chatSchema
};