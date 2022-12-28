
import ReactStars from "react-rating-stars-component";
import React from "react";

 


 
 
  
const InstructorDetails = ({ instructor }) => {
       
const ratingChanged = (newRating) => {
        console.log(newRating)
       
     }  

    return(
        <div className="instructor details">
            <h4>{instructor.FirstName}</h4>
            <strong>Rate:</strong>
            <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
           <button onClick={()=> window.location.href=`/courseId=${course._id}`}>view course
           
           
           </button>
           
        </div>
        
    )

    
}
export default InstructorDetails