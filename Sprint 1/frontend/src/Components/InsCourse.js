import { UseCourseContext } from '../Hooks/UseCourseContext'
import {UseLoginContext} from '../Hooks/UseLoginContext'
import React from "react";
import ReactStars from "react-rating-stars-component";



 


 

  
const CourseDetails = ({ course }) => {
    const {dispatch} = UseCourseContext()
    const {student} = UseLoginContext()
    console.log(course)
         


    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Subtitle: </strong> {course.subtitle}</p>
            <p><strong>Summary: </strong> {course.summary}</p>
            <p><strong>Price: </strong> {course.price}</p>
            <p><strong>Rating:</strong> {course.Rating}</p>
           
           <button onClick={()=> window.location.href=`/student/filter?courseId=${course._id}`}>view course
           
           
           </button>
           
        </div>
        
    )

    
}
export default CourseDetails



