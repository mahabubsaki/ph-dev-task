


const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    document: { type: String },
    changes: [{
        timestamp: { type: Date, default: Date.now },
        range: {
            startLineNumber: Number,
            startColumn: Number,
            endLineNumber: Number,
            endColumn: Number,
        },
        rangeLength: Number,
        action: String,
        text: String,
        owner: String,
        currentCode: String
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema, 'projects');
module.exports = Project;