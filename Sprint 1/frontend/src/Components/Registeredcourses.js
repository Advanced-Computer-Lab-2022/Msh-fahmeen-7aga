import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UseLoginContext } from '../Hooks/UseLoginContext'

function StudentCourses() {
  const [courses, setCourses] = useState([])
  const { student } = UseLoginContext();

  useEffect(() => {
    
    async function fetchData() {
      const studentId = '63adb74fa2e3d13dec976a19'
      const response = await axios.post('http://localhost:4000/guest/fetch-student-courses', { studentId })
      setCourses(response.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Your courses:</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default StudentCourses
