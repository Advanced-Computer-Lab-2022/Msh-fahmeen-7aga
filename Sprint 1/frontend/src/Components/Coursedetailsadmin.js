import React, { useState, useEffect } from "react";
import {UseLoginContextTrainee} from '../Hooks/UseLoginContextTrainee' 
import YouTube from 'react-youtube';

const CourseDetails = ({ course }) => { 
    const { trainee } = UseLoginContextTrainee();
  const [rating, setRating] = useState(0);
const [avgRating, setAvgRating] = useState(0);
const [introVideoVisible, setIntroVideoVisible] = useState(false);


  useEffect(() => {
    // fetch the average rating for the course when the component mounts
    (async () => {
      const result = await fetch('http://localhost:4000/guest/avg-rating', {
        method: 'POST',
        body: JSON.stringify({
          courseId: course._id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      setAvgRating(data.avgRating);
    })();
  }, []);

  const toggleIntroVideo = () => {
    setIntroVideoVisible(!introVideoVisible);
  };



  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p><strong>Subtitle: </strong> {course.subtitle}</p>
      <p><strong>Summary: </strong> {course.summary}</p>
      <h5>Average Rating: {avgRating}</h5>
      {introVideoVisible ? (
  <>
    <YouTube videoId={course.videoId} width="640" height="390" />
    <button onClick={toggleIntroVideo}>Hide intro video</button>


  </>
) : (
  <button onClick={toggleIntroVideo}>Show intro video</button>


)

}
    </div>

    





  );
};

export default CourseDetails;
