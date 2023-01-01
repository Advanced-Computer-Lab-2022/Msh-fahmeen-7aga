import{useEffect, useState} from 'react'
import { UseCourseContext } from '../Hooks/UseCourseContext'
import {Link } from "react-router-dom";


//Components
import CourseDetails from '../Components/CourseDetails'
import CourseForm from '../Components/CourseForm'
import AdminForm from '../Components/AdminForm'
import InstForm from '../Components/InstructorForm'
import TraineeForm from '../Components/TraineeForm'
import Card from '../Components/Card'
import '../index.css'
const Admin = () => {
    const {courses, dispatch} = UseCourseContext()
    const[searchterm,setsearchterm] =useState("")

    useEffect(() => {
        const fetchCourses = async () =>{
            const response= await fetch('http://localhost:4000/admin/viewcourses')
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_COURSE', payload: json})
            }
        }

        fetchCourses()
    }, [dispatch])
    
    return(
        <div className="admin2">
            <label htmlFor="header-search">
                <span className='visually-hidden'>Search For Courses</span></label>
                <input type="text"
                onChange={event => {setsearchterm(event.target.value)}} 
                id="header-search"
                placeholder='search'
                name='s'/>
                

            <div className='Courses'>
                
            <h3>All courses</h3>
        
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
            <h3>Add a new Instructor</h3>
            <Link to="/Instructorsignup"><button>
              New Instructor
            </button>
            </Link>
            <CourseForm />
            <AdminForm />
            <TraineeForm />
        </div>
    )
}

export default Admin