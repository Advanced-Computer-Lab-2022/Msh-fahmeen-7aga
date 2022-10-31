import{useEffect, useState} from 'react'


//Components
import CourseDetails from '../Components/CourseDetails'
import CourseForm from '../Components/CourseForm'
import AdminForm from '../Components/AdminForm'
import InstForm from '../Components/InstructorForm'
import TraineeForm from '../Components/TraineeForm'

const Guest = () => {
    const [courses, setCourses]=useState(null)

    useEffect(() => {
        const fetchCourses = async () =>{
            const response= await fetch('http://localhost:4000/student/viewcourses')
            const json = await response.json()
            if(response.ok){
                setCourses(json)
            }
        }

        fetchCourses()
    }, [])
    
    return(
        <div className="guest">
            <div className='Courses'>
                {courses && courses.map((course) =>(
                    <CourseDetails course={course} key = {course._id}/>
                ))}
            </div>
        </div>
    )
}

export default Guest