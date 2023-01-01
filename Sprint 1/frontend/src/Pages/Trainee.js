import { useEffect, useState } from "react";
import { UseLoginContextTrainee } from "../Hooks/UseLoginContextTrainee";
import { UseLogouttrainee } from "../Hooks/UseLogoutTrainee";
import { Link } from "react-router-dom";

//Components
import CourseDetailsnp from "../Components/CourseDetailsNoPrice";

const Trainee = () => {
  const [courses, setCourses] = useState(null);
  const [searchterm, setsearchterm] = useState("");
  const { trainee } = UseLoginContextTrainee();
  const { logout } = UseLogouttrainee();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:4000/guest/viewcourses");
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
      }
    };
    fetchCourses();
  }, []);

  if (trainee) {
    return (
      <div className="trainee">
        <Link to="/Passwordchange">
          <button>Change my Password</button>
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

        <div className="Courses">
          <h3>All courses</h3>
          {courses &&
            courses
              .filter((course) => {
                if (searchterm === "") {
                  return course;
                } else if (
                  course.title.toLowerCase().includes(searchterm.toLowerCase())
                ) {
                  return course;
                }
              })
              .map((courses) => (
                <CourseDetailsnp course={courses} key={courses._id} />
              ))}
        </div>
      </div>
    );
  }
};

export default Trainee;
