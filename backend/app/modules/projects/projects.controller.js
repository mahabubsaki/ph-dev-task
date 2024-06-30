const catchAsync = require("../../utils/catchAsync");
const { createProject, readProject, createFeedback, readFeedback, readSingleProject, updateProject, deleteProject } = require("./projects.services");

const createProjectController = catchAsync(async (req, res) => {
    const { title, document, user } = req.body;
    const result = await createProject({ title, document, user });

    res.send({ success: true, message: 'Project created successfully', data: result });
});

const readProjectController = catchAsync(async (_, res) => {
    const data = await readProject();
    res.send({ success: true, message: 'Projects retreived successfully', data: data });
});
const readSingleProjectController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = await readSingleProject(id);
    res.send({ success: true, message: 'Project retreived successfully', data: data });
});

const createFeedbackController = catchAsync(async (req, res) => {
    const { feedback, user, changeId, project } = req.body;
    const result = await createFeedback({ feedback, user, changeId, project });

    res.send({ success: true, message: 'Feedback sent successfully', data: result });
});
const readFeedbackController = catchAsync(async (req, res) => {
    const id = req.params.changeId;
    const data = await readFeedback(id);
    res.send({ success: true, message: 'Feedbacks retreived successfully', data: data });
});

const updateProjectController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    const data = await updateProject(id, title);
    res.send({ success: true, message: 'Project updated successfully', data: data });
});

const deleteProjectController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = await deleteProject(id);
    res.send({ success: true, message: 'Project deleted successfully', data: data });
});

module.exports = {
    createProjectController,
    readProjectController,
    readSingleProjectController,
    createFeedbackController,
    readFeedbackController,
    updateProjectController,
    deleteProjectController
};