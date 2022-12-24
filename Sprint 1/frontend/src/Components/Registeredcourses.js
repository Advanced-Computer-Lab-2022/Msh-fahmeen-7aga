import { UseCourseContext } from '../Hooks/UseCourseContext'
import { UseLoginContext } from '../Hooks/UseLoginContext'
import Rating from '@mui/material/Rating'
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const RegisteredCourses = () => {
const { student } = UseLoginContext();
const [registeredCourses, setRegisteredCourses] = useState([]);

useEffect(() => {
const fetchRegisteredCourses = async () => {
const studentId = student._id;
const result = await fetch('http://localhost:4000/guest/registered-courses?studentId=${studentId}');
const data = await result.json();
setRegisteredCourses(data);
};
fetchRegisteredCourses();
}, []);

return (
<div className="registered-courses">
{registeredCourses.map((course) => (
<div className="registered-course-details" key={course._id}>
<h4>{course.title}</h4>
<p><strong>Subtitle: </strong> {course.subtitle}</p>
<p><strong>Summary: </strong> {course.summary}</p>
<p><strong>Price: </strong> {course.price}</p>
</div>
))}
</div>
);
};

export default RegisteredCourses