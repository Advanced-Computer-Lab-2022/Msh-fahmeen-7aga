import React, {useEffect, useState} from 'react'
import { UseCourseContext } from '../Hooks/UseCourseContext'
import {Link } from "react-router-dom";


//Components
import CourseDetails from '../Components/CourseDetails'
import CourseForm from '../Components/CourseForm'
import AdminForm from '../Components/AdminForm'
import InstForm from '../Components/InstructorForm'
import TraineeForm from '../Components/TraineeForm'
import AdmCourse from '../Components/AdmCourse'
import '../index.css'
import Card from '../Components/Card';
const Admin = () => {
    const {courses, dispatch} = UseCourseContext()
    const[searchterm,setsearchterm] =useState("")
    const[val,setval] = useState(true)
    const hideCourse = (e) =>{
           if(val===true){
               
               setval(false)
           }
           else setval(true)
           }
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
        <React.Fragment>
        <div className='search'>
            <label htmlFor="header-search">
                <span className='search'>Search For Courses</span></label>
                <input type="text"
                onChange={event => {setsearchterm(event.target.value)}} 
                id="header-search"
                placeholder='search'
                name='s'/>
                </div>
        <div className="admin2">
            
            <div className='Courses'>
            <button onClick={hideCourse}>Hide Courses</button>
            {courses && courses.filter((course)=>{
                    if(searchterm=="" && val){
                        return course
                       
                    }
                    else if (course.title.toLowerCase().includes(searchterm.toLowerCase())&& val){
                        return course
                    }
                
                }).map((courses) =>(
                    <AdmCourse course={courses} key = {courses._id}
                    />
                ))}

                
            </div>
            </div>
            <div className='admin3'>
            <h3>What would you like to do?</h3>
            <Link to="/Instructorsignup"><button>
             Add a new Instructor
            </button></Link>
            <Link to="/Problems"><button>
              View Problems
            </button>

            <Link to="/solvedproblems"><button>
             View Resolved Problems
            </button>
            </Link>
            </Link>
            <Link to="/traineesignup"><button>
            Add a New Trainee
            </button>
            </Link>
            </div>
            <CourseForm />
            <AdminForm />
        </React.Fragment>
    )
}

export default Admin