import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UseLoginContext } from "./Hooks/UseLoginContext";
import { UseLoginContextInst } from "./Hooks/UseLoginContextInst";

import NavBar from "./Components/NavBar";
import ContractDetails from './Components/Contractdetails';
import Admin from "./Pages/Admin";
import Guest from "./Pages/Guest";
import HomePage from "./Pages/HomePage";
import Instructor from "./Pages/Instuctor";
import Student from "./Pages/Student";
import Trainee from "./Pages/Trainee";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/StudentLogin";
import LogIninst from "./Pages/InstructorLogin";
import SignUpinst from "./Pages/InstructorSignup";
import Course from "./Pages/Course";
import Quiz from "./Pages/Quiz";
import InstructorsPage from "./Pages/InstructorList";
import Passchange from "./Components/Password confirm";
import Forgotpassword from "./Components/Enteremailforgot";
import UploadPage from "./Pages/pdfupload";
import PasswordResetEmailSent from "./Components/Passreset";
import EnrolledCourses from "./Pages/Enrolled";

function App() {
  const { student } = UseLoginContext();
  const { instructor } = UseLoginContextInst();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<HomePage />} />

            <Route
              exact
              path="/studentlogin"
              element={!student ? <LogIn /> : <Navigate to="/student" />}
            />

            <Route exact path="/contract-details" element={<ContractDetails />} />

            <Route
              exact
              path="/instructorlogin"
              element={
                !instructor ? <LogIninst /> : <Navigate to="/instructor" />
              }
            />

            <Route
              exact
              path="/instructorsignup"
              element={
                !instructor ? <SignUpinst /> : <Navigate to="/instructor" />
              }
            />

            <Route
              exact
              path="/studentsignup"
              element={!student ? <SignUp /> : <Navigate to="/student" />}
            />

            <Route path="/Admin" element={<Admin />} />
            <Route
              path="/Instructor"
              element={instructor ? <Instructor /> : <Navigate to="/" />}
            />
            <Route exact path="/student/:courseId" element={<Course />} />
            <Route
              path="/student"
              element={student ? <Student /> : <Navigate to="/" />}
            />

            <Route path="/trainee" element={<Trainee />} />
            <Route path="/enrolledcourses" element={<EnrolledCourses />} />
            <Route path="/forgotpassword" element={< Forgotpassword/>} />

            <Route path="/guest" element={<Guest />} />
            <Route path="/resetconfirmation" element={<PasswordResetEmailSent />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/allteachers" element={<InstructorsPage />} />
            <Route exact path="/Passwordchange" element={<Passchange />} />
            <Route exact path="/uploadpdf" element={< UploadPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
