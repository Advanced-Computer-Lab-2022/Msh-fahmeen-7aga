import { UseCourseContext } from '../Hooks/UseCourseContext'
<<<<<<< Updated upstream
import {UseLoginContext} from '../Hooks/UseLoginContext'
=======
import { UseLoginContext } from '../Hooks/UseLoginContext'
>>>>>>> Stashed changes
import Rating from '@mui/material/Rating'
import React from "react";
import ReactStars from "react-rating-stars-component";

<<<<<<< Updated upstream


 


 

  
const CourseDetails = ({ course }) => {
    const {dispatch} = UseCourseContext()
    const {student} = UseLoginContext()
    
         const ratingChanged = async (newRating) => {
           const email = student.Email
            const cid = course._id
            const response = await fetch('http://localhost:4000/guest/rating', {
                method: 'PUT',
                body: JSON.stringify({newRating,cid, email}),
                headers: {
                    'Content-Type': 'application/json',
                } 
            })
            
    }  


    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Subtitle: </strong> {course.subtitle}</p>
            <p><strong>Summary: </strong> {course.summary}</p>
            <p><strong>Price: </strong> {course.price}</p>
            <strong>Rate:</strong>
            <ReactStars 
            count={5}
            onChange={ratingChanged}
            size ={24}
            activeColor="#ffd700"/>
           <button onClick={()=> window.location.href=`/student/filter?courseId=${course._id}`}>view course
           
           
           </button>
           
        </div>
        
    )

    
}
export default CourseDetails



=======
const CourseDetails = ({ course }) => {
  const { student } = UseLoginContext();

  const ratingChanged = async (newRating) => {
    const cid = course._id;
    const response = await fetch('http://localhost:4000/guest/rating', {
      method: 'PUT',
      body: JSON.stringify({ newRating, cid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const registerForCourse = async () => {
    const studentEmail = student.Email;
    const courseId = course._id;
    const result = await fetch('http://localhost:4000/guest/register-for-course', {
      method: 'POST',
      body: JSON.stringify({ studentEmail, courseId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await result.json();
    console.log(data);
  };

  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p><strong>Subtitle: </strong> {course.subtitle}</p>
      <p><strong>Summary: </strong> {course.summary}</p>
      <p><strong>Price: </strong> {course.price}</p>
      <strong>Rate:</strong>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
      <button onClick={() => window.location.href=`/student/filter?courseId=${course._id}`}>view course</button>
      <button onClick={registerForCourse}>Register</button>
    </div>
  );
};


export default CourseDetails
>>>>>>> Stashed changes
