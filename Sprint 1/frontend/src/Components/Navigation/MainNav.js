import React from "react";
import { Link } from "react-router-dom";

import MainHeader from './MainHeader'
import NavLinks from "./NavLinks";
import './MainNav.css'

const MainNav = props =>{
return(
    <MainHeader>
    <h1 className="main-navigation__title">
        <Link to = "/"> WebName</Link> 
        </h1> 
        <nav>
            <NavLinks/>
            </nav>
         </MainHeader>
)
}

export default MainNav;