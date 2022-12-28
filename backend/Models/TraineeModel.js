const mongoose = require('mongoose')

const Schema = mongoose.Schema

const traineeschema = new Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Trainee', traineeschema)