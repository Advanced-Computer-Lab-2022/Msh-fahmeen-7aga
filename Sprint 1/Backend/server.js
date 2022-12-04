const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const STUROUTES = require('./Routes/StudentCourses')
const INSTROUTES = require('./Routes/InstCourse')
const ADMINROUTES = require('./Routes/AdminCourse')
const TRAINEEROUTES = require('./Routes/TraineeCourse')
const GUESTROUTES = require('./Routes/GuestCourse')
const USERROUTES = require('./Routes/Student')
const USERROUTESINS = require('./Routes/Instructor')

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

// connect to db

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port:', process.env.PORT);
      });
  })
  .catch((error) => {
    console.log(error)
  })


//Routes

app.use('/student', STUROUTES)
app.use('/instructor', INSTROUTES)
app.use('/admin', ADMINROUTES)
app.use('/trainee', TRAINEEROUTES)
app.use('/guest', GUESTROUTES)
app.use('/user', USERROUTES)
app.use('/userinstructor', USERROUTESINS)
