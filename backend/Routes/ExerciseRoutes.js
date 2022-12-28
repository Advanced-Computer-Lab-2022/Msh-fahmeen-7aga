const express = require('express');
const router = express.Router();

const {
    viewExercises,
    viewSingleExercise,
    viewInstructorExercise,
    createExercise,
    updateExercise,
    deleteExercise
} = require('../Controllers/ExerciseController');

//main route is /exercises

//view all Exercises
router.get('/',viewExercises);
//view single Exercise
router.get('/:id', viewSingleExercise);
//view single Exercise of instructor
router.get('/instexercises/:instid', viewInstructorExercise);
//create Exercise
router.post('/createExercise', createExercise);
//update Exercise
router.patch('/:id', updateExercise)
//delete Exercise
router.delete('/:id', deleteExercise)

module.exports = router;