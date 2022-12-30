const mongoose = require('mongoose')

const Schema = mongoose.Schema

const solvedproblemschema = new Schema({
    Problem: {
        type: String,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('SolvedProblem', solvedproblemschema)