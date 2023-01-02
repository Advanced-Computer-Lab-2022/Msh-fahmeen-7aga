import React, { useState, useEffect } from "react";
import Card from "./Card";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the server
    fetch("http://localhost:4000/guest/popularcourses", { method: "POST" })
      .then((res) => res.json())
      .then((courses) => {
        setCourses(courses);
      });
  }, []); // Empty array means this effect only runs once on mount

  return (
    <div className="container-fluid">
    <h3>Popular Courses</h3>
    {courses
    .sort((a, b) => parseFloat(b.studentCount) - parseFloat(a.studentCount))
    .map((course) => {
      return (
        <div className="course-details" key={course._id}>
          <Card>
            <h4>{course.title}</h4>
            <p>Number of students {course.studentCount}</p>
          </Card>
        </div>
      );
    })}
  </div>  
  );
};

export default PopularCourses;