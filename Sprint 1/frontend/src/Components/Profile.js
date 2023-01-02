import { Button } from '@mui/material';
import React from 'react'
import { UseLoginContext } from "../Hooks/UseLoginContext";


const Profile = () => {

    const { student } = UseLoginContext();



  return (
    <div>
        <h1> Profile </h1>
        <h2> Name: </h2>
        <h2> Username: </h2>
        <h2> Email: </h2>
        <h2> Balance: </h2>
        <h2> Refunded amount: </h2>
    </div>
  )
}

export default Profile