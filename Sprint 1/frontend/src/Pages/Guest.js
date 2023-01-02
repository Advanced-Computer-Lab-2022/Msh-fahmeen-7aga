import { useEffect, useState } from "react";

//Components
import CourseDetails from "../Components/Coursedetailsadmin";
import Card from "../Components/Card";
import PriceFilter from "../Components/PriceFilter";
import RatingFilter from "../Components/RatingFilter";

const Guest = () => {
  const [courses, setCourses] = useState(null);
  const [searchterm, setsearchterm] = useState("");
  const [rating, setrating] = useState(null);
  const [priceMin, setpriceMin] = useState(null);
  const [priceMax, setpriceMax] = useState(null);



  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:4000/trainee/viewcourses");
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="trainee">
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
              <Card>
                <CourseDetails course={courses} key={courses._id} />
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Guest;
