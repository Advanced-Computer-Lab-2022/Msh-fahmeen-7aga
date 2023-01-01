import React, { useEffect, useState } from "react";
import { UseCourseContext } from "../Hooks/UseCourseContext";
import { Link } from "react-router-dom";
import { UseLogoutadmin } from "../Hooks/UseLogoutAdmin";

//Components

import CourseDetails from "../Components/Coursedetailsadm";
import AdminForm from "../Components/AdminForm";
import InstForm from "../Components/InstructorForm";
import TraineeForm from "../Components/TraineeForm";
import { UseLoginContextAdmin } from "../Hooks/UseLoginContextAdmin";

const Admin = () => {
  const { courses, dispatch } = UseCourseContext();
  const [searchterm, setsearchterm] = useState("");
  const { logout } = UseLogoutadmin();
  const[val,setval] = useState(true)
  const[promotion, setPromotion]= useState('')
  const[date, setDate] = useState('')
  const hideCourse = (e) =>{
    console.log(val)
         if(val===true){
             
             setval(false)
         }
         else setval(true)
         }


  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:4000/admin/viewcourses");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_COURSE", payload: json });
      }
    };

    fetchCourses();
  }, [dispatch]);
  const promHandler =async()=>{
    const until = date
   const discount = promotion
   console.log(until,discount)
     const response = await fetch('http://localhost:4000/admin/globalpromotion', {
              method: 'PUT',
              body: JSON.stringify({discount,until}),
                  headers: {
                      'Content-Type': 'application/json',
                  } 
              })
     }    
  return (
      <React.Fragment>
       <div className='search'>
            <label htmlFor="header-search">
                <span className='search'>Search For Courses</span></label>
                <input type="text"
                onChange={event => {setsearchterm(event.target.value)}} 
                id="header-search"
                placeholder='search'
                name='s'/>
                </div>
                <div className="prom">
                <label>Set Global Promotion</label>
                <input type = "number"
            onChange={(e)=>setPromotion(e.target.value)}
            value = {promotion}></input>
            <label>until</label>
            <input type = "date"
            onChange={(e)=>setDate(e.target.value)}
            value ={date}></input>

            <button onClick={promHandler}>set</button>
            </div>
            <div className='Courses'>
            <button onClick={hideCourse}>Hide Courses</button>
            {courses && courses.filter((course)=>{
                    if(searchterm=="" && val){
                        return course
                       
                    }
                    else if (course.title.toLowerCase().includes(searchterm.toLowerCase())&& val){
                        return course
                    }
                
                }).map((courses) =>(
                    <CourseDetails course={courses} key = {courses._id}
                    />
            ))}

      </div>
      <div className='admin3'>
            <h3>What would you like to do?</h3>
      <Link to="/Instructorsignup">
        <button>Add Instructor</button>
      </Link>

      <Link to="/adminsignup">
        <button>Add Admin</button>
      </Link>

      <Link to="/Problems">
        <button>View Problems</button>

        <Link to="/solvedproblems">
          <button>Resolved Problems</button>
        </Link>
      </Link>
      <Link to="/traineesignup">
        <button>New Trainee</button>
      </Link>
      <Link to="/notifications">
        <button>View Course requests</button>
      </Link>
      </div>
      <AdminForm />
      </React.Fragment>
    
  );
};

export default Admin;
