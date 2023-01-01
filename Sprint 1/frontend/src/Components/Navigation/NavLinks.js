import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import { UseLogout } from "../../Hooks/UseLogout";
import { UseLoginContext } from "../../Hooks/UseLoginContext";
import { UseLogoutinst } from "../../Hooks/UseLogoutInst";
import { UseLoginContextInst } from "../../Hooks/UseLoginContextInst";

import './NavLinks.css'
import { LoginContext } from "../../Context/LoginContext";
import Instructor from "../../Pages/Instuctor";
import { UseLogoutadmin } from "../../Hooks/UseLogoutAdmin";
import { UseLoginContextAdmin } from "../../Hooks/UseLoginContextAdmin";

const NavLinks = props=>{
    const {student} = UseLoginContext()
    const { instructor } = UseLoginContextInst()
    const { admin } = UseLoginContextAdmin()
    const { logout } = UseLogout()
    const { logoutIns } = UseLogoutinst()
    const { logoutAdm } = UseLogoutadmin()
 
    const handleClick = () => {
        logout()
       
      }
    const handleInsClick = ()=>{
        logoutIns()
      }
      const handleClickAdm = ()=>{
        logoutAdm()
      }
    return( 
    <ul className="nav-links">
        {student &&
            
        <li>
            <NavLink to={`/${props.id}/student`}>My Courses</NavLink>
        </li>}
    {student &&
        <li>
            <button onClick={handleClick}>LogOut</button>
        </li>
    }
     {admin &&
        <li>
            <button onClick={handleClickAdm}>LogOut</button>
        </li>
    }
        {instructor &&
        <li>
            <button onClick={handleInsClick}>LogOut</button>
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