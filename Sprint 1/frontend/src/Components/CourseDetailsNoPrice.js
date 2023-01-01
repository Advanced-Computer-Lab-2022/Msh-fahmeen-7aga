import React, { useState, useEffect } from "react";
import { UseLoginContextTrainee } from "../Hooks/UseLoginContextTrainee";
import { UseCourseContext } from "../Hooks/UseCourseContext";
import { UseLoginContext } from "../Hooks/UseLoginContext";
import Modal from "react-modal";
import YouTube from "react-youtube";
import jsPDF from "jspdf";

const CourseDetails = ({ course }) => {
  const { trainee } = UseLoginContextTrainee();
  const [requestStatus, setRequestStatus] = useState(null);
  const [reportProblemModalOpen, setReportProblemModalOpen] = useState(false);
  const [problemType, setProblemType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [introVideoVisible, setIntroVideoVisible] = useState(false);
  const [lessonVideosVisible, setLessonVideosVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleRequestAccess = () => {
    const traineeEmail = trainee.Email;

    fetch(`http://localhost:4000/guest/request-access/${course._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        traineeEmail,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setRequestStatus("success");
        } else {
          setRequestStatus("error");
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus("error");
      });
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
      const result = await fetch("http://localhost:4000/guest/report-problem", {
        method: "POST",
        body: JSON.stringify({
          Problem: problemDescription,
          CourseName: course.title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      closeReportProblemModal();
      // show a success message to the user
      alert(
        "Thank you for reporting the problem. We will look into it as soon as possible."
      );
    } catch (error) {
      console.error(error);
      // show an error message to the user
      alert("Error reporting problem. Please try again later.");
    }
  };

  useEffect(() => {
    // fetch the average rating for the course when the component mounts
    (async () => {
      const result = await fetch("http://localhost:4000/guest/avg-rating", {
        method: "POST",
        body: JSON.stringify({
          courseId: course._id,
        }),
        headers: {
          "Content-Type": "application/json",
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
      const result = await fetch("http://localhost:4000/guest/rate", {
        method: "POST",
        body: JSON.stringify({
          courseId: course._id,
          rating,
          userId: trainee._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
      // reset the rating input
      setRating(0);
      // fetch the updated average rating
      const result2 = await fetch("http://localhost:4000/guest/avg-rating", {
        method: "POST",
        body: JSON.stringify({
          courseId: course._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await result2.json();
      setAvgRating(data2.avgRating);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleIntroVideo = () => {
    setIntroVideoVisible(!introVideoVisible);
  };

  const toggleLessonVideos = () => {
    setLessonVideosVisible(!lessonVideosVisible);
  };

  const updateNotes = (index, newNotes) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = newNotes;
    setNotes(updatedNotes);
  };

  const downloadNotes = () => {
    // create a new PDF document
    const doc = new jsPDF();
    // add the notes to the document
    course.lessonVideoIds.forEach((videoId, index) => {
      doc.text(`Lesson ${index + 1}`, 10, 10 + index * 10);
      doc.text(notes[index] || "", 10, 20 + index * 10);
    });
    // save the PDF to the user's device
    doc.save("notes.pdf");
  };

  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p>
        <strong>Subtitle: </strong> {course.subtitle}
      </p>
      <p>
        <strong>Summary: </strong> {course.summary}
      </p>

      {requestStatus === "success" && <p>Request sent successfully!</p>}
      {requestStatus === "error" && <p>Error sending request</p>}
      <button onClick={handleRequestAccess}>Request access</button>

      {introVideoVisible ? (
        <>
          <YouTube videoId={course.videoId} width="640" height="390" />
          <button onClick={toggleIntroVideo}>Hide intro video</button>
        </>
      ) : (
        <button onClick={toggleIntroVideo}>Show intro video</button>
      )}

      {course.lessonVideoIds.map((lessonVideoId, index) => (
        <div key={lessonVideoId}>
          <h4>Lesson {index + 1}</h4>
          <YouTube videoId={lessonVideoId} />
          <form>
            <textarea
              value={notes[index]}
              onChange={(e) =>
                setNotes(
                  notes.map((note, i) => (i === index ? e.target.value : note))
                )
              }
            />
            <button type="button" onClick={() => downloadNotes(index)}>
              Download notes
            </button>
          </form>
        </div>
      ))}

      <div>
        <h5>Rate This Course</h5>
        <label htmlFor="rating-select">
          Rating:
          <select
            id="rating-select"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="">Select a rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleRatingSubmit}>Submit Rating</button>
      </div>
      <div>
        <h5>Average Rating: {avgRating}</h5>
      </div>

      <button onClick={openReportProblemModal}>Report Problem</button>
      <Modal
        isOpen={reportProblemModalOpen}
        onRequestClose={closeReportProblemModal}
      >
        <h3>Report Problem</h3>
        <p>
          Please select the type of problem you are experiencing and provide a
          detailed description of the problem.
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

      {requestStatus === "success" && <p>Request sent successfully!</p>}
      {requestStatus === "error" && <p>Error sending request</p>}
      <button onClick={handleRequestAccess}>Request access</button>
    </div>
  );
};

export default CourseDetails;
