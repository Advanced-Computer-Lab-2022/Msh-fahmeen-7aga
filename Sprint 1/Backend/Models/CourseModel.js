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
  Subject: {
    type: String,
    required: true
  },
Promotion:{
    oldPrice: Number,
    discount: Number,
    until: Date,
},
hasPromo:{
    type:Boolean
},
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  requestedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' }],
  pdfs: [{ 
    name: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer,
      required: true,
    },
  }],
  ratings: [{
    rating: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  avgRating: {
    type: Number,
    default: 0
  },
}, { timestamps: true })

module.exports = mongoose.model('Course', courseschema)
