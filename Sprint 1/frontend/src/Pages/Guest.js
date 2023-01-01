import{useEffect, useState} from 'react'


//Components
import CourseDetails from '../Components/CourseDetails'

const Guest = () => {
    const [courses, setCourses]=useState(null)
    const[searchterm,setsearchterm] =useState("")

    useEffect(() => {
        const fetchCourses = async () =>{
            const response= await fetch('http://localhost:4000/trainee/viewcourses')
            const json = await response.json()
            if(response.ok){
                setCourses(json)
            }
        }
        fetchCourses()
    }, [])
    
    return(
        <div className="trainee">
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
           
        </div>
        
    )
}

export default Guest