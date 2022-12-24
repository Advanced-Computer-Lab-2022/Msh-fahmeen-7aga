const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseschema = new Schema({
<<<<<<< Updated upstream
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
    }]
}, {timestamps: true})
=======
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
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
  },
  totalRating: {
    type: String,
    default: 0
  },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  exercises: [
    {
      filename: { type: String, required: true },
      path: { type: String, required: true },
      uploadDate: { type: Date, required: true }
    }
  ]
}, { timestamps: true })
>>>>>>> Stashed changes

module.exports = mongoose.model('Course', courseschema)
