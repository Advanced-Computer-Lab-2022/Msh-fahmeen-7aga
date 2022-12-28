const mongoose = require("mongoose");
const exercise = require("../Models/ExerciseModel");
const Instructor = require("../Models/InstructorModel");


const viewExercises = async (req, res) => {
  try {
    const Exercises = await exercise.find().sort({ createdAt: -1 });
    res.status(200).json(Exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewSingleExercise = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Something went wrong" });
  }
  const Exercise = await exercise.findById(id);
  if (!Exercise) {
    return res.status(404).json({ error: "Exercise does not exist" });
  }
  res.status(200).json(Exercise);
};

const viewInstructorExercise = async (req, res) => {
  const { instid } = req.params;
  let Exercises;
  try {
    Exercises = await exercise.find({ creator: instid });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
  if (!Exercises || Exercises.length === 0) {
    return res.status(404).json({ error: "Exercise does not exist" });
  }
  res.status(200).json(Exercises);
};

const createExercise = async (req, res) => {
  const {
    creator,
    title,
    question1Text,answer1Options,
    question2Text,answer2Options,
    question3Text,answer3Options,
    question4Text,answer4Options,
  } = req.body;
  if (answer1Options.length !== 4 ||answer2Options.length !== 4 ||answer3Options.length !== 4 ||answer4Options.length !== 4) 
  {
   return res.status(400).json({ error: "Should have 4 answers for every question" });
  }
  const newExercise = new exercise(
    {
      creator,
      title,
      question1Text,answer1Options,
      question2Text,answer2Options,
      question3Text,answer3Options,
      question4Text,answer4Options,
    }
  );
  let instructor;
  try {
    instructor = await Instructor.findById(creator);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }

  if (!instructor) {
    return res.status(404).json({ error: "Instructor does not exist" });
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newExercise.save({ session: session });

    instructor.Exercises.push(newExercise);
    await instructor.save({ session: session });
    await session.commitTransaction();
    res.status(200).json(newExercise);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateExercise = async (req, res) => {
  const {
    title,
    question1Text,answer1Options,
    question2Text,answer2Options,
    question3Text,answer3Options,
    question4Text,answer4Options,
  } = req.body;
  if (answer1Options?.length !== 4 ||answer2Options?.length !== 4 ||answer3Options?.length !== 4 ||answer4Options?.length !== 4) 
  {
    return res.status(400).json({ error: "Should have 4 answers for every question" });
  }
  const ExerciseID = req.params.id;

  let updatedExercise;
  try {
    updatedExercise = await exercise.findById(ExerciseID);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ error: "Something went wrong" });
  }
  if (title) {
    updatedExercise.title = title;
  }
  if (question1Text) {
    updatedExercise.question1Text = question1Text;
  }
  if (question2Text) {
    updatedExercise.question2Text = question2Text;
  }
  if (question3Text) {
    updatedExercise.question3Text = question3Text;
  }
  if (question4Text) {
    updatedExercise.question4Text = question4Text;
  }
  if (answer1Options) {
    updatedExercise.answer1Options = answer1Options;
  }
  if (answer2Options) {
    updatedExercise.answer2Options = answer2Options;
  }
  if (answer3Options) {
    updatedExercise.answer3Options = answer3Options;
  }
  if (answer4Options) {
    updatedExercise.answer4Options = answer4Options;
  }
  try {
   
    await updatedExercise.save();
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ error: "could not save Exercise" });
  }
  res
    .status(200)
    .json({ message: "Exercise updated", exercise: updatedExercise });
};

const deleteExercise = async (req, res) => {
  const ExerciseID = req.params.id;
  let Exercise;
  try {
    Exercise = await exercise.findById(ExerciseID).populate("creator");
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  if(!Exercise){
    return res.status(404).json({ error: "Exercise does not exist" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Exercise.remove({ session: session });
    Exercise.creator.Exercises.pull(Exercise);
    await Exercise.creator.save({ session: session });
    await session.commitTransaction();

  } catch (error) {
    return res.status(400).json({ error: "couldnt delete exercise" });
  }
  res.status(200).json({ message: "Exercise deleted" });
};

module.exports = {
  viewExercises,
  viewSingleExercise,
  viewInstructorExercise,
  createExercise,
  updateExercise,
  deleteExercise,
};
