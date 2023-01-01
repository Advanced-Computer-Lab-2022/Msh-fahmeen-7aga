import React from "react";
import{useEffect, useState} from 'react'
import { UseCourseContext } from '../Hooks/UseCourseContext'
import {UseLoginContext} from '../Hooks/UseLoginContext'
import CourseDetails from "../Components/CourseDetails";
import { useSearchParams } from "react-router-dom";


const Course=()=>{
    const {courses, dispatch} = UseCourseContext()
    const {student} = UseLoginContext()
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
   // console.log(courseId);
    useEffect(() => {
        const fetchCourses = async () => {
          
         

          const response = await fetch('http://localhost:4000/student/viewcourses', {
            headers: {'Authorization': `Bearer ${student.token}`},
          })
          const json = await response.json()
          
    
          if (response.ok) {
            dispatch({type: 'SET_COURSE', payload: json})
          }
        }
    
        if (student) {
          fetchCourses()
        }
      }, [dispatch, student])
    
      return(
        


                <div className='Course'>

                {courses && courses.filter((course)=>{
                    if(course._id === courseId){
                        return course
                       
                    }
                
                }).map((courses) =>(
                    <CourseDetails course={courses} key = {courses._id}
                    />
                ))}
            </div>
        
    )
} 

export default Course;