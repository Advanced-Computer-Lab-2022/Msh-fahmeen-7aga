import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar';
import Admin from './Pages/Admin';
import Guest from './Pages/Guest';
import HomePage from './Pages/HomePage';
import Instructor from './Pages/Instuctor';
import Student from './Pages/Student';
import Trainee from './Pages/Trainee';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/StudentLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <div className='pages'>
        <Routes>
          <Route 
          exact path="/"
          element={<HomePage />}
          />

         <Route 
          exact path="/studentlogin"
          element={<LogIn />}
          />

        <Route 
          exact path="/studentsignup"
          element={<SignUp />}
          />

        <Route 
          path="/Admin"
          element={<Admin />}
          />
        <Route 
          path="/Instructor"
          element={<Instructor />}
          />

        <Route 
          path="/student"
          element={<Student />}
          /> 

<Route 
          path="/trainee"
          element={<Trainee />}
          /> 

<Route 
          path="/guest"
          element={<Guest />}
          /> 

        </Routes>
        
      </div>

      </BrowserRouter>

    </div>
  );
}

export default App;
