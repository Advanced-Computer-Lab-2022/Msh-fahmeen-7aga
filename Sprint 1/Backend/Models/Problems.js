const mongoose = require('mongoose')

const Schema = mongoose.Schema

const problemschema = new Schema({
    Problem: {
        type: String,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Problem', problemschema)