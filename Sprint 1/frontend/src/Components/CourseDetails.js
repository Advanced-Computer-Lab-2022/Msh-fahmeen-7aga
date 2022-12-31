import { UseCourseContext } from '../Hooks/UseCourseContext';
import { UseLoginContext } from '../Hooks/UseLoginContext';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';


const CourseDetails = ({ course }) => {
  const { student } = UseLoginContext();
  const [pdfsVisible, setPdfsVisible] = useState(false);
  const [reportProblemModalOpen, setReportProblemModalOpen] = useState(false);
  const [problemType, setProblemType] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);


  const checkpromo = async (cid) => {
    const response = await fetch('http://localhost:4000/guest/checkPromotion', {
      method: 'PUT',
      body: JSON.stringify({ cid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  if (course.hasPromo === true) {
    const cid = course._id;
    checkpromo(cid);
  }

  const registerForCourse = async () => {
    const studentEmail = student.Email;
    const courseId = course._id;
    const result = await fetch('http://localhost:4000/guest/register-for-course', {
      method: 'POST',
      body: JSON.stringify({ studentEmail, courseId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await result.json();
    console.log(data);
  };

  const openReportProblemModal = () => {
    setReportProblemModalOpen(true);
  };
  
  const closeReportProblemModal = () => {
    setReportProblemModalOpen(false);
  };
  
  const handleProblemTypeChange = (event) => {
    setProblemType(event.target.value);
  };
  
  const handleProblemDescriptionChange = (event) => {
    setProblemDescription(event.target.value);
  };
  
  const submitProblemReport = async () => {
    try {
      // send a POST request to the backend to report the problem
      const result = await fetch('http://localhost:4000/guest/report-problem', {
        method: 'POST',
        body: JSON.stringify({
          Problem: problemDescription,
          CourseName: course.title
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      closeReportProblemModal();
      // show a success message to the user
      alert('Thank you for reporting the problem. We will look into it as soon as possible.');
    } catch (error) {
      console.error(error);
      // show an error message to the user
      alert('Error reporting problem. Please try again later.');
    }
  };

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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = async () => {
    try {
      // send a request to the /rate route to update the course's ratings
      const result = await fetch('http://localhost:4000/guest/rate', {
        method: 'POST',
        body: JSON.stringify({
          courseId: course._id,
          rating,
          userId: student._id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      console.log(data);
      // reset the rating input
      setRating(0);
      // fetch the updated average rating
      const result2 = await fetch('http://localhost:4000/guest/avg-rating', {
        method: 'POST',
        body: JSON.stringify({
          courseId: course._id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data2 = await result2.json();
      setAvgRating(data2.avgRating);
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p>
        <strong>Subtitle: </strong>
        {course.subtitle}
      </p>
      <p>
        <strong>Summary: </strong>
        {course.summary}
      </p>
      <p>
        <strong>Price: </strong>
        {course.price}
      </p>
    {/* display the rating form */}
    <div>
      <h5>Rate This Course</h5>
      <label htmlFor="rating-select">
        Rating:
        <select id="rating-select" value={rating} onChange={event => setRating(event.target.value)}>
          <option value="">Select a rating</option>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
      <button onClick={handleRatingSubmit}>Submit Rating</button>
    </div>

    {/* display the average rating */}
    <div>
      <h5>Average Rating: {avgRating}</h5>
    </div>

    {course.videoId && (
        <YouTube
          videoId={course.videoId}
          opts={{
            height: '390',
            width: '640',
          }}
        />
      )}
      
      <button onClick={() => setPdfsVisible(!pdfsVisible)}>view course files</button>
      <button onClick={registerForCourse}>Register</button>
      <button onClick={openReportProblemModal}>Report Problem</button>
      {pdfsVisible && (
        <div>
          <h5>PDF Files</h5>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {course.pdfs.map((pdf) => (
                <tr key={pdf._id}>
                  <td>{pdf.name}</td>
                  <td>
                    <a href={`http://localhost:4000/guest/courses/${course._id}/pdf/${pdf._id}`}>
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  <Modal isOpen={reportProblemModalOpen} onRequestClose={closeReportProblemModal}>
    <h3>Report Problem</h3>
    <p>
      Please select the type of problem you are experiencing and provide a detailed description of the problem.
    </p>
    <form onSubmit={submitProblemReport}>
      <label htmlFor="problem-type-select">
        Problem Type:
        <select
          id="problem-type-select"
          value={problemType}
          onChange={handleProblemTypeChange}
        >
          <option value="">Select a problem type</option>
          <option value="technical">Technical</option>
          <option value="financial">Financial</option>
        </select>
      </label>
      <br />
      <label htmlFor="problem-description-input">
        Problem Description:
        <textarea
          id="problem-description-input"
          value={problemDescription}
          onChange={handleProblemDescriptionChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={closeReportProblemModal}>
        Cancel
      </button>
    </form>
  </Modal>
</div>


);
};

export default CourseDetails;

  
