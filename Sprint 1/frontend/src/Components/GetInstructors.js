
import ReactStars from "react-rating-stars-component";
import React from "react";

 


 
 
  
const InstructorDetails = ({ instructor }) => {
       


    return(
        <div className="instructor details">
            <h4>{instructor.FirstName}</h4>
            <strong>Rate:</strong>
           <button onClick={()=> window.location.href=`/courseId=${course._id}`}>view course
           
           
           </button>
           
        </div>
        
    )

    
}
export default InstructorDetails