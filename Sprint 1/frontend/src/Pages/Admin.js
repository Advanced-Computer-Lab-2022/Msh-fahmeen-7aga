import{useEffect, useState} from 'react'
import { UseCourseContext } from '../Hooks/UseCourseContext'
import {Link } from "react-router-dom";


//Components
import CourseDetails from '../Components/CourseDetails'
import CourseForm from '../Components/CourseForm'
import AdminForm from '../Components/AdminForm'
import InstForm from '../Components/InstructorForm'
import TraineeForm from '../Components/TraineeForm'
import AdmCourse from '../Components/AdmCourse'
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
        <div className="admin">
            <label htmlFor="header-search">
                <span className='visually-hidden'>Search For Courses</span></label>
                <input type="text"
                onChange={event => {setsearchterm(event.target.value)}} 
                id="header-search"
                placeholder='search'
                name='s'/>
                <button type='submit'>Search</button>

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
                    <AdmCourse course={courses} key = {courses._id}
                    />
                ))}

                
            </div>
            <Link to="/Instructorsignup"><button>
              New Instructor
            </button>
            </Link>

            <Link to="/Problems"><button>
              View Problems
            </button>

            <Link to="/solvedproblems"><button>
              Resolved Problems
            </button>
            </Link>
            </Link>
            <Link to="/traineesignup"><button>
              New Trainee
            </button>
            </Link>
            <CourseForm />
            <AdminForm />
        </div>
    )
}

export default Admin