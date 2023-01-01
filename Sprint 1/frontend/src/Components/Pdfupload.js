import React, { useState, useEffect } from 'react';

const UploadPdfForm = () => {
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch the list of courses from the server
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:4000/trainee/viewcourses');
      const courses = await res.json();
      setCourses(courses);
    })();
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Check that a file and a course were selected
    if (!file || !selectedCourse) {
      return alert('Please select a file and a course');
    }
  
    // Get the name of the PDF file from the form
    const pdfName = e.target.elements.pdfName.value;
  
    // Create a new FormData object to send the file to the server
    const data = new FormData();
    data.append('pdf', file);
    data.append('courseId', selectedCourse);
    data.append('name', pdfName);
  
    const res = await fetch('http://localhost:4000/guest/upload-pdf', {
      method: 'POST',
      body: data,
    });
  
    if (res.ok) {
      alert('PDF uploaded successfully');
    } else {
      alert('Error uploading PDF');
    }
  };
  

  return (
<form onSubmit={onSubmit}>
  <input type="file" onChange={onFileChange} />
  <input type="text" name="pdfName" placeholder="PDF name" />
  <select onChange={onCourseChange}>
    <option value="">Select a course</option>
    {courses.map((course) => (
      <option key={course._id} value={course._id}>
        {course.title}
      </option>
    ))}
  </select>
  <button type="submit">Upload PDF</button>
</form>

  );
};

export default UploadPdfForm;
