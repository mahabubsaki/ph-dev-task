const catchAsync = require("../../utils/catchAsync");
const { createProject, readProject } = require("./projects.services");

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

module.exports = {
    createProjectController,
    readProjectController
};