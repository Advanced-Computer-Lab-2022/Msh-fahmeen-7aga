import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import PayInfo from "../Components/PayInfo";
function TermsAndConditions() {
  const[openPopup,setOpenPopup] = useState(false)
  const[checked,setChecked] =useState(false)
  const checkHandler=(e)=>{
  if(e.target.checked){
    setChecked(true)
    console.log(e.target.checked)
  }
  else{
    setChecked(false)
  }
  }
  return (
    <div>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to our online learning platform! By signing up, you agree to the
        following terms and conditions:
      </p>
      <ul>
        <li>
          You are entitled to a refund on a course you have registered for if
          you have completed less than 50% of the course.
        </li>
      </ul>
      <p>Please read and accept the terms and conditions before proceeding:</p>
      
       <FormControlLabel
       control={ <Checkbox checked={checked} id="accept-terms" required
       
       onChange={e=>checkHandler(e)}></Checkbox>}
       
      label=" I have read and accept the terms and conditions"
       /> 
      
       <PayInfo
       openPopup={openPopup}
       setOpenPopup={setOpenPopup}>
       </PayInfo>
        <br />
        <button disabled={!checked} onClick={()=>setOpenPopup(true)}>Accept</button>  
      
    </div>
  );
}

export default TermsAndConditions;
