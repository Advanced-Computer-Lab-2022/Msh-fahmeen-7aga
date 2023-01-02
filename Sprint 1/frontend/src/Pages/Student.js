import React, { useState, useEffect } from "react";
import { UseCourseContext } from "../Hooks/UseCourseContext";
import { UseLoginContext } from "../Hooks/UseLoginContext";
import { Link } from "react-router-dom";

//Components
import CourseDetails from "../Components/CourseDetails";
import PriceFilter from "../Components/PriceFilter";
import RatingFilter from "../Components/RatingFilter";

const Student = () => {
  const { courses, dispatch } = UseCourseContext();
  const { student } = UseLoginContext();
  const [searchterm, setsearchterm] = useState("");
  const [rating, setrating] = useState(null);
  const [priceMin, setpriceMin] = useState(null);
  const [priceMax, setpriceMax] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [localPrices, setLocalPrices] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(
        "http://localhost:4000/student/viewcourses",
        {
          headers: { Authorization: `Bearer ${student.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSE", payload: json });
      }
    };

    if (student) {
      fetchCourses();
    }
  }, [dispatch, student]);

  return (
    <div className="student">
     
      <label htmlFor="header-search">
        <span className="visually-hidden">Search For Courses</span>
      </label>
      <input
        type="text"
        onChange={(event) => {
          setsearchterm(event.target.value);
        }}
        id="header-search"
        placeholder="search"
        name="s"
      />
      <button type="submit">Search</button>
      <Link to="/enrolledcourses">
        <button>My Courses</button>
      </Link>
      <PriceFilter
        setMin={setpriceMin}
        setMax={setpriceMax}
        placeholder="Minimum"
      />
      <RatingFilter setRating={setrating} />

      <div className="Courses">
        <h3>Your courses</h3>
        {courses &&
          courses
            .filter((course) => {
              if (searchterm == "") {
                return course;
              } else if (
                course.title.toLowerCase().includes(searchterm.toLowerCase())
              ) {
                return course;
              }
            })
            .filter((course) => {
              if (priceMin == null && priceMax == null) {
                return course;
              } else if (priceMin != null && priceMax == null) {
                if (course.price >= priceMin) {
                  return course;
                }
              } else if (priceMin == null && priceMax != null) {
                if (course.price <= priceMax) {
                  return course;
                }
              } else {
                if (course.price >= priceMin && course.price <= priceMax) {
                  return course;
                }
              }
            })
            .filter((course) => {
              if (rating == null) {
                return course;
              } else if (course.avgRating >= rating) {
                return course;
              }
            })
            .map((courses) => (
              <CourseDetails course={courses} key={courses._id} />
            ))}
      </div>
    </div>
  );
};

export default Student;
