const mongoose = require('mongoose')

const Schema = mongoose.Schema

const instcourseschema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('InstCourse', instcourseschema)