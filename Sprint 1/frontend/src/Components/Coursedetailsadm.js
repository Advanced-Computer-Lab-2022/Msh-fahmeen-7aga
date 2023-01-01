import React, { useState, useEffect } from "react";
import { UseLoginContextTrainee } from "../Hooks/UseLoginContextTrainee";
import YouTube from "react-youtube";

import Card from "./Card";

const CourseDetails = ({ course }) => {
  const { trainee } = UseLoginContextTrainee();
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [introVideoVisible, setIntroVideoVisible] = useState(false);
  const [promotion, setPromotion] = useState("");
  const [date, setDate] = useState("");

  const promHandler = async () => {
    const cid = course._id;
    console.log(cid);
    const until = date;
    const discount = promotion;
    const oldPrice = course.price;
    const response = await fetch("http://localhost:4000/admin/promotion", {
      method: "PUT",
      body: JSON.stringify({ cid, until, discount, oldPrice }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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

  const toggleIntroVideo = () => {
    setIntroVideoVisible(!introVideoVisible);
  };

  return (
    <div className="course-details">
      <Card className="card">
        <h4>{course.title}</h4>
        <p>
          <strong>Subtitle: </strong> {course.subtitle}
        </p>
        <p>
          <strong>Summary: </strong> {course.summary}
        </p>
        <h5>Average Rating: {avgRating}</h5>
        <label>Set a promotion % for this course</label>
        <input
          type="number"
          onChange={(e) => setPromotion(e.target.value)}
          value={promotion}
        ></input>
        <label>until</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        ></input>

        <button onClick={promHandler}>set</button>
        {introVideoVisible ? (
          <>
            <YouTube videoId={course.videoId} width="640" height="390" />
            <button onClick={toggleIntroVideo}>Hide intro video</button>
          </>
        ) : (
          <button onClick={toggleIntroVideo}>Show intro video</button>
        )}
      </Card>
    </div>
  );
};

export default CourseDetails;
