import React, { useState } from 'react';
import {UseLoginContextTrainee} from '../Hooks/UseLoginContextTrainee' 

const CourseDetails = ({ course }) => {
    const { trainee } = UseLoginContextTrainee();
  const [requestStatus, setRequestStatus] = useState(null);

  const handleRequestAccess = () => {
    const traineeEmail = trainee.Email;

    fetch(`http://localhost:4000/guest/request-access/${course._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        traineeEmail
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setRequestStatus('success');
        } else {
          setRequestStatus('error');
        }
      })
      .catch(error => {
        console.error(error);
        setRequestStatus('error');
      });
  };

  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p><strong>Subtitle: </strong> {course.subtitle}</p>
      <p><strong>Summary: </strong> {course.summary}</p>
      <p>{course.createdAt}</p>
      {requestStatus === 'success' && <p>Request sent successfully!</p>}
      {requestStatus === 'error' && <p>Error sending request</p>}
      <button onClick={handleRequestAccess}>Request access</button>
    </div>
  );
};

export default CourseDetails;
