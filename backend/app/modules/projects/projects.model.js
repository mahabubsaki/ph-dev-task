


const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    document: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema, 'projects');
module.exports = Project;