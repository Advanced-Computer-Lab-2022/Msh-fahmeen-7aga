import{useEffect, useState} from 'react'
import { UseCourseContext } from '../Hooks/UseCourseContext'
import {UseLoginContext} from '../Hooks/UseLoginContext'


//Components
import CourseDetails from '../Components/CourseDetails'
import CourseForm from '../Components/CourseForm'
import AdminForm from '../Components/AdminForm'
import InstForm from '../Components/InstructorForm'
import TraineeForm from '../Components/TraineeForm'
import Search from '../Components/Search'



const Student = () => {
    const {courses, dispatch} = UseCourseContext()
     const {student} = UseLoginContext()
     const[searchterm,setsearchterm] =useState("")




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
        <div className="student">
                   <label htmlFor="header-search">
                <span className='visually-hidden'>Search For Courses</span></label>
                <input type="text"
                onChange={event => {setsearchterm(event.target.value)}} 
                id="header-search"
                placeholder='search'
                name='s'/>
                <button type='submit'>Search</button>



                <div className='Courses'>
                {courses && courses.filter((course)=>{
                    if(searchterm==""){
                        return course
                       
                    }
                    else if (course.title.toLowerCase().includes(searchterm.toLowerCase())){
                        return course
                    }
                
                }).map((courses) =>(
                    <CourseDetails course={courses} key = {courses._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Student