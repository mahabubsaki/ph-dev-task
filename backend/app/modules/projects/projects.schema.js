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

const feedbackSchema = z.object({
    project: z.string({
        required_error: "Project is required.",
    }),
    feedback: z.string({
        required_error: "Feedback is required.",
    }),
    changeId: z.string({
        required_error: "Change ID is required.",
    }),
    user: z.string({
        required_error: "User is required."
    }),
});

const editProjectSchema = z.object({
    title: z.string({
        required_error: "Title is required.",
    }),
});

module.exports = {
    projectSchema,
    feedbackSchema,
    editProjectSchema
};
