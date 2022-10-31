import{useEffect, useState} from 'react'



//Components
import CourseDetails from '../Components/CourseDetails'
import Search from '../Components/Search'
import InstCourseDetails from '../Components/InstCourseDetails'
import CourseForm from '../Components/CourseForm'
import AdminForm from '../Components/AdminForm'
import InstForm from '../Components/InstructorForm'
import TraineeForm from '../Components/TraineeForm'

const Instructor = () => {
    const [courses, setCourses]=useState(null)
    const [instcourses, setInstCourses]=useState(null)
    const[searchterm,setsearchterm] =useState("")

    useEffect(() => {
        const fetchCourses = async () =>{
            const response= await fetch('http://localhost:4000/instructor/viewcourses')
            const json = await response.json()
            if(response.ok){
                setCourses(json)
            }
        }
        const fetchInstCourses = async () =>{
            const response= await fetch('http://localhost:4000/instructor/yourcourses')
            const json = await response.json()
            if(response.ok){
                setInstCourses(json)
            }
        }

        fetchCourses()
        fetchInstCourses()
    }, [])
    
    return(
        <div className="instructor">

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
                    <CourseDetails course={courses} key = {courses._id}
                    />
                ))}
            </div>


            <div className='instCourses'>
            <h3>your courses</h3>
                {instcourses && instcourses.map((instcourse) =>(
                    <CourseDetails course={instcourse} key = {instcourse._id}/>
                ))}
            </div>
            <CourseForm />
        </div>

        
    )
}

export default Instructor