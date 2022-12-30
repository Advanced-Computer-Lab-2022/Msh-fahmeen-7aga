import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import { UseLogout } from "../../Hooks/UseLogout";
import { UseLoginContext } from "../../Hooks/UseLoginContext";
import { UseLogoutinst } from "../../Hooks/UseLogoutInst";
import { UseLoginContextInst } from "../../Hooks/UseLoginContextInst";

import './NavLinks.css'
import { LoginContext } from "../../Context/LoginContext";
import Instructor from "../../Pages/Instuctor";

const NavLinks = props=>{
    const {student} = UseLoginContext()
    const { instructor } = UseLoginContextInst()
    const { logout } = UseLogout()
    const { logoutIns } = UseLogoutinst()
 
    const handleClick = () => {
        logout()
       
      }
    const handleInsClick = ()=>{
        logoutIns()
      }
    return( 
    <ul className="nav-links">
        {student &&
            
        <li>
            <NavLink to="/student">My Courses</NavLink>
        </li>}
    {student &&
        <li>
            <button onClick={handleClick}>LogOut</button>
        </li>
    }
        {instructor &&
        <li>
            <button onClick={handleInsClick}>LogOutI</button>
        </li>
    }
      {!student &&     
        <li>
            <NavLink to ="/studentlogin">LogIn</NavLink>
        </li>}
       {!student &&
        <li>
            <NavLink to ="/studentsignup">SignUp</NavLink>
        </li>}

        
        
    </ul>
    )
}

export default NavLinks;