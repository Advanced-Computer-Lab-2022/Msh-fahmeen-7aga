import { Link } from "react-router-dom";
import PopularCourses from "../Components/Mostpopular";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Link to="/Instructorlogin">
        <button>Instructor</button>
      </Link>
      <Link to="/adminlogin">
        <button>Adminstrator</button>
      </Link>

      <Link to="/guest">
        <button>Guest</button>
      </Link>
      <Link to="/studentlogin">
        <button>Student</button>
      </Link>
      <Link to="/trainee">
        <button>Trainee</button>
      </Link>
      <Link to="/studentsignup">
        <button>Sign up</button>
      </Link>
      <Link to="/exercise">
        <button>take Exercise</button>
      </Link>
      <Link to="/Report">
        <button>Report</button>
      </Link>

      <PopularCourses />
    </div>
  );
};

export default HomePage;
