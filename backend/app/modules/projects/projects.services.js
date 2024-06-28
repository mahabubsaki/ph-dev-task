const Project = require("./projects.model");

const createProject = async (project) => {

    const newProject = (await Project.create(project)).toObject();
    return newProject;
};
const readProject = async () => {
    const data = await Project.find().populate('user').lean();
    return data;
};

module.exports = {
    createProject,
    readProject
};