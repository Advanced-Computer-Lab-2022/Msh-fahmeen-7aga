import React, { useState, useEffect } from 'react';

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the server
    fetch('http://localhost:4000/guest/popularcourses', { method: 'POST' })
      .then(res => res.json())
      .then(courses => {
        setCourses(courses);
      });
  }, []); // Empty array means this effect only runs once on mount

  return (
    <>
      <h1>Most popular courses</h1>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Title</th>
            <th style={{ textAlign: 'center' }}>Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => {
            return (
              <tr key={course._id}>
                <td style={{ textAlign: 'center' }}>{course.title}</td>
                <td style={{ textAlign: 'center' }}>{course.studentCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

export default PopularCourses;
