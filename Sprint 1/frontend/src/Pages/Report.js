import { Axios } from "axios";
import React, { useEffect, useState } from "react";

const Report = () => {

 const [selected, setSelected] = React.useState("");
 const changeSelectedOptionHandler = (event) => {
    setSelected(event.target.value);
 };
 const problemTypes= [
    "Account",
    "Course",
    "Quiz",
    "Payment/Refund"
 ];
 const account = [
    "--Account--",
    "forgot password",
    "change email/password"
 ]; 
 const course = [
    "--Course--",
    "missing course files ",
    "problem with registering course"

 ] 
 const quiz = [
    "--Quiz--",
    "quiz grade",
    "problem with answer submission"
 ];
 const payment = [
    "--Payment/Refund--",
    "check balance history",
    "refund course",
    "add credit card"
 ];

 let type = null;
 let options = null;
 if(selected === "Account"){
    type = account;
 }
 else if(selected === "Course"){
    type = course;
 }
 else if(selected === "Quiz"){
    type = quiz;
 }
 else if(selected === "Payment/Refund"){
    type= payment;
 }

 if(type) {
    options = type.map((el) => <option key = {el}>{el}</option>);
 }
   
 return(
    <div className="Problem">
        <form>

        
            <label className="mb-2">How can I help you?</label>
            <select onChange={changeSelectedOptionHandler}>
                <option>--Select Problem Type--</option>
                <option>Account</option>
                <option>Course</option>
                <option>Quiz</option>
                <option>Payment/Refund</option>
            </select>
            <div>
                <select>
                    {
                        options
                    }
                </select>
            </div>
            <div>
                <label>comment</label>
                <input type = "Comment"/>
            </div>
            <div>
                <label>email</label>
                <input type= "email" />
            </div>
            <button>Submit</button>
            </form>
    </div>
)
   

}
    
    
    export default Report