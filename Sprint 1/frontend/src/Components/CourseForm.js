import { useState } from "react"
import { UseCourseContext } from '../Hooks/UseCourseContext'


const CourseForm = () => {
    const {dispatch} = UseCourseContext()
    const[title, setTitle] = useState('')
    const[subtitle, setSubtitle] = useState('')
    const[price, setPrice] = useState('')
    const[summary, setSummary] = useState('')
    const[Subject, setSubject] = useState('')
    const [videoId, setVideoId] = useState('');
    const[error, setError] = useState(null)
    const [lessonVideoIds, setLessonVideoIds] = useState('');

    const handleSubmit = async (e) => {
      const lessonVideoIdsArray = lessonVideoIds.split(',');
        e.preventDefault()

        const course = { title, subtitle, price, summary, Subject, videoId, lessonVideoIds: lessonVideoIdsArray };

        const response = await fetch('http://localhost:4000/admin/addcourse' , {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            } 
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setSubtitle('')
            setPrice('')
            setSummary('')
            setSubject('')
            setVideoId('');
            setError(null)
            console.log('New course added', json)
            dispatch({type: 'CREATE_COURSE', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new course</h3>

            <label>Subject title:</label>
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />


        <label>Subject subtitle:</label>
            <input
            type="text"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
            />


        <label>Course price:</label>
            <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />


       <label>Subject summary:</label>
            <input
            type="text"
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            />

       <label>Subject:</label>
            <input
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            value={Subject}
            />

       <label>Intro Video ID:</label>
            <input
            type="text"
            onChange={(e) => setVideoId(e.target.value)}
            value={videoId}
            />

<label>Lesson Video IDs:</label>
<input
  type="text"
  onChange={(e) => setLessonVideoIds(e.target.value)}
  value={lessonVideoIds}
/>

            <button>Add Course</button>
        </form>
    )
}

export default CourseForm