const { Project, Feedback } = require("./projects.model");


const createProject = async (project) => {

    const newProject = (await Project.create(project)).toObject();
    return newProject;
};
const readProject = async () => {
    const data = await Project.find().populate('user').lean();
    return data;
};
const createFeedback = async (feedback) => {
    const newFeedback = (await Feedback.create(feedback)).toObject();
    return newFeedback;
};

const readFeedback = async (id) => {
    const data = await Feedback.find({ changeId: id }).populate('user').lean();
    return data;
};
const readSingleProject = async (id) => {
    const data = await Project.findById(id).select({ title: 1 });
    return data;
};

const updateProject = async (id, title) => {
    const data = await Project.findByIdAndUpdate(id, { title: title });
    return data;
};

const deleteProject = async (id) => {
    const data = await Project.findByIdAndDelete(id);
    return data;
};

module.exports = {
    createProject,
    readProject,
    createFeedback,
    readFeedback,
    readSingleProject,
    updateProject,
    deleteProject
};