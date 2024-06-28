const { z } = require("zod");

const projectSchema = z.object({
    title: z.string({
        required_error: "Title is required.",
    }),
    document: z.string({
        required_error: "Document is required.",
    }),
    user: z.string({
        required_error: "User is required."
    }),
});

module.exports = {
    projectSchema
};
