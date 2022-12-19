const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseschema = new Schema({
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
    TA: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        postedBy:{type: mongoose.Schema.Types.ObjectId, ref:"Student"},
        default : 0
    },
    totalRating:{
        type: String,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Course', courseschema)