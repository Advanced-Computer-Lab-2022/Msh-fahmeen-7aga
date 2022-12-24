import { UseCourseContext } from '../Hooks/UseCourseContext'
import {UseLoginContext} from '../Hooks/UseLoginContext'
import React from "react";
import ReactStars from "react-rating-stars-component";






 


 

  
const CourseDetails = ({ course }) => {
    const {dispatch} = UseCourseContext()
    const {student} = UseLoginContext()
const checkpromo = async (cid)=>{
    const response = await fetch('http://localhost:4000/guest/checkPromotion', {
        method: 'PUT',
        body: JSON.stringify({cid}),
        headers: {
            'Content-Type': 'application/json',
        } 
    })
}
     if(course.hasPromo===true){
        const cid = course._id
        checkpromo(cid)
        
     }
   
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



