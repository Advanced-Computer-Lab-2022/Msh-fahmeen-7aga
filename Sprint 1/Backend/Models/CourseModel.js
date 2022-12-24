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
        type: Number
       
    
    },
    totalRating:[{
        score: Number,
        postedBy: String
    }],
    Promotion:{
        oldPrice: Number,
        discount: Number,
        until: Date,
    },
    hasPromo:{
        type:Boolean
    }
}, {timestamps: true})

module.exports = mongoose.model('Course', courseschema)