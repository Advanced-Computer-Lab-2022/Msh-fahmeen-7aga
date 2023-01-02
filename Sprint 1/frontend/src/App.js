import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UseLoginContext } from "./Hooks/UseLoginContext";
import { UseLoginContextInst } from "./Hooks/UseLoginContextInst";
import { UseLoginContextTrainee } from "./Hooks/UseLoginContextTrainee";
import { UseLoginContextAdmin } from "./Hooks/UseLoginContextAdmin";

import ContractDetails from "./Components/Contractdetails";
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
import Exercise from "./Pages/Exercise";
import InstructorsPage from "./Pages/InstructorList";
import Passchange from "./Components/Password confirm";
import Forgotpassword from "./Components/Enteremailforgot";
import UploadPdfForm from "./Components/Pdfupload.js";
import RegisteredCourses from "./Components/Registeredcourses";
import LogIntrainee from "./Pages/TraineeLogin";
import SignUptrainee from "./Pages/TraineeSignup";
import Notifications from "./Components/Notifications";
import ProblemList from "./Components/Problems";
import ResolvedProblemList from "./Components/SolvedProblems";
import TermsAndConditions from "./Pages/Terms";
import StudentCourses from "./Components/Registeredcourses";
import LogInadmin from "./Pages/AdminLogin";
import SignUpadmin from "./Pages/AdminSignup";
import Report from "./Pages/Report";
import PasswordResetEmailSent from "./Components/Passreset";
import MainNav from './Components/Navigation/MainNav';
import Profile from "./Components/Profile";
function App() {
  const { student } = UseLoginContext();
  const { instructor } = UseLoginContextInst();
  const { trainee } = UseLoginContextTrainee();
  const { admin } = UseLoginContextAdmin();

  return (
    <div className="App">
      <BrowserRouter>
        <MainNav/>
        <main>
        <div className="pages">
          <Routes>
        
            <Route exact path="/" element={<HomePage />} />

            <Route
              path="/problems"
              element={admin ? <ProblemList /> : <Navigate to="/adminlogin" />}
            />
            <Route
              path="/solvedproblems"
              element={admin ? <ResolvedProblemList /> : <Navigate to="/adminlogin" />}
            />
            <Route exact path="/terms" element={<TermsAndConditions />} />
            <Route exact path="/mycourses" element={<StudentCourses />} />

            <Route
              exact
              path="/studentlogin"
              element={!student ? <LogIn /> : <Navigate to="/student" />}
            />

            <Route
              exact
              path="/contract-details"
              element={<ContractDetails />}
            />

<Route
              path="/notifications"
              element={admin ? <Notifications /> : <Navigate to="/adminlogin" />}
            />

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
              path="/adminsignup"
              element={!admin ? <SignUpadmin /> : <Navigate to="/Admin" />}
            />

            <Route
              exact
              path="/adminlogin"
              element={!admin ? <LogInadmin /> : <Navigate to="/Admin" />}
            />

            <Route
              exact
              path="/traineelogin"
              element={!trainee ? <LogIntrainee /> : <Navigate to="/trainee" />}
            />

            <Route
              exact
              path="/traineesignup"
              element={
                !trainee ? <SignUptrainee /> : <Navigate to="/trainee" />
              }
            />

            <Route
              exact
              path="/studentsignup"
              element={!student ? <SignUp /> : <Navigate to="/terms" />}
            />

            <Route
              path="/Instructor"
              element={instructor ? <Instructor /> : <Navigate to="/" />}
            />
            <Route exact path="/student/:courseId" element={<Course />} />
            <Route
              path="/student"
              element={student ? <Student /> : <Navigate to="/" />}
            />

            <Route
              path="/admin"
              element={admin ? <Admin /> : <Navigate to="/" />}
            />
            
            <Route path="/trainee" element={<Trainee />} />
            <Route path="/enrolledcourses" element={<RegisteredCourses />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route exact path="/upload" element={<UploadPdfForm />} />

            <Route path="/guest" element={<Guest />} />
            <Route
              path="/resetconfirmation"
              element={<PasswordResetEmailSent />}
            />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/allteachers" element={<InstructorsPage />} />
            <Route exact path="/Passwordchange" element={<Passchange />} />
            <Route exact path="/Report" element={<Report />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;