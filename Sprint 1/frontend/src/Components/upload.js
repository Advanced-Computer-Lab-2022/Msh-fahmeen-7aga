import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    // Fetch the list of courses from the server
    axios.get('http://localhost:4000/trainee/viewcourses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleCourseChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleFileChange = (event) => {
    setPdf(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Find the course object with the selected name
    const selectedCourse = courses.find((course) => course.title === courseName);
    const courseId = selectedCourse._id;

    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('courseId', courseId);

    try {
      const response = await axios.post('http://localhost:4000/uploadPDF', formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Course:
        <select value={courseName} onChange={handleCourseChange}>
          {courses.map((course) => (
            <option key={course._id} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        PDF File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
  };
  
  export default FileUploadForm;
  