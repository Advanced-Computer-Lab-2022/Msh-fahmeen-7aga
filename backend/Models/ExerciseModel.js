const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
  student view grades
  StudentExercise
  {
    studentId: Ref Student,
    ExerciseTitle: String,
    score: Number,
  }
 StudentExercise.find({studentId: <input-studentId>})



  Title: []

  Exercise1Text: []
  Exercise1AnswerOption1Text: []
  Exercise1AnswerOption2Text: []
  Exercise1AnswerOption3Text: []
  Exercise1AnswerOption4Text: []

  Exercise1Text: []
  Exercise1AnswerOption1Text: []
  Exercise1AnswerOption2Text: []
  Exercise1AnswerOption3Text: []
  Exercise1AnswerOption4Text: []
  
  Exercise1Text: []
  Exercise1AnswerOption1Text: []
  Exercise1AnswerOption2Text: []
  Exercise1AnswerOption3Text: []
  Exercise1AnswerOption4Text: []
  
  Exercise1Text: []
  Exercise1AnswerOption1Text: []
  Exercise1AnswerOption2Text: []
  Exercise1AnswerOption3Text: []
  Exercise1AnswerOption4Text: []

  const ExArrays = Exercise.find({title: <input-title>})

*/

const ExerciseSchema = new Schema({
  creator: { type: mongoose.Types.ObjectId, required: true , ref: "Instructor"},
  title: { type: String, required: true },
  question1Text: {
    type: String,
    required: true,
  },
  answer1Options: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  question2Text: {
    type: String,
    required: true,
  },
  answer2Options: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  question3Text: {
    type: String,
    required: true,
  },
  answer3Options: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  question4Text: {
    type: String,
    required: true,
  },
  answer4Options: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ]
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
