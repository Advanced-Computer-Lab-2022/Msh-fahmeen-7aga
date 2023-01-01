import { useEffect, useState } from "react";
import { UseCourseContext } from "../Hooks/UseCourseContext";
import { UseLoginContextInst } from "../Hooks/UseLoginContextInst";
import { UseLogoutinst } from "../Hooks/UseLogoutInst";
import { Link } from "react-router-dom";

//Components
import CourseDetails from "../Components/CourseDetails";
import CourseForm from "../Components/CourseForm";
import PriceFilter from "../Components/PriceFilter";

const Instructor = () => {
  const { courses, dispatch } = UseCourseContext();
  const { instructor } = UseLoginContextInst();
  const [searchterm, setsearchterm] = useState("");

  const [priceMin, setpriceMin] = useState(null);
  const [priceMax, setpriceMax] = useState(null);
  const { logout } = UseLogoutinst();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(
        "http://localhost:4000/instructor/yourcourses",
        {
          headers: { Authorization: `Bearer ${instructor.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSE", payload: json });
      }
    };

    if (instructor) {
      fetchCourses();
    }
  }, [dispatch, instructor]);

  if (instructor) {
    return (
      <div className="instructor">
        <Link to="/Passwordchange">
          <button>Change my Password</button>
        </Link>

        <Link to="/contract-details">
          <button>Contract</button>
        </Link>

        <button onClick={handleClick}>Log out</button>

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

        <PriceFilter
          setMin={setpriceMin}
          setMax={setpriceMax}
          placeholder="Minimum"
        />

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
              .map((courses) => (
                <CourseDetails course={courses} key={courses._id} />
              ))}
        </div>

        <CourseForm />
      </div>
    );
  }
};

export default Instructor;
