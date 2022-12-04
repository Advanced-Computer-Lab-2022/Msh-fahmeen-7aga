import { UseCourseContext } from '../Hooks/UseCourseContext'
import {UseLoginContext} from '../Hooks/UseLoginContext'
import ReactStars from "react-rating-stars-component";
import React from "react";

 


 
 
  
const CourseDetails = ({ course }) => {
    const {dispatch} = UseCourseContext()
    const {student} = UseLoginContext()

       
const ratingChanged = (newRating) => {
        console.log(newRating)
        console.log(course._id)
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
    size={24}
    activeColor="#ffd700"
  />
           <button onClick={()=> window.location.href=`/student/filter?courseId=${course._id}`}>view course
           
           
           </button>
           
        </div>
        
    )

    
}
export default CourseDetails



