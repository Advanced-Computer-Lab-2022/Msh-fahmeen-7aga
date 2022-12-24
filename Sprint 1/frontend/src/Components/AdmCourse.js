import { UseCourseContext } from '../Hooks/UseCourseContext'
import {UseLoginContext} from '../Hooks/UseLoginContext'
import React, { useState } from "react";




 


 


const CourseDetails = ({ course }) => {
    const {dispatch} = UseCourseContext()
    const {student} = UseLoginContext()
    const[promotion, setPromotion]= useState('')
    const[date, setDate] = useState('')
    
    
const promHandler =async()=>{
       const cid = course._id
       console.log(cid)
       const until = date
       const discount = promotion
       const oldPrice = course.price
       const response = await fetch('http://localhost:4000/admin/promotion', {
                method: 'PUT',
                body: JSON.stringify({cid,until, discount,oldPrice}),
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
            <p><strong>Rating:</strong> {course.Rating}</p>
            <label>Set a promotion % for this course</label>
            <input type = "number"
            onChange={(e)=>setPromotion(e.target.value)}
            value = {promotion}></input>
            <label>until</label>
            <input type = "date"
            onChange={(e)=>setDate(e.target.value)}
            value ={date}></input>

            <button onClick={promHandler}>set</button>
            
           
        
           
        </div>
        
    )

    
}
export default CourseDetails


