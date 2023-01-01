import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
export default function PayInfo(props){
    const{openPopup,setOpenPopup} = props
    return(
        <Dialog open ={openPopup}
        >
            <DialogTitle>
                <div>Please Enter a Payment Method</div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <label>Card Number:</label>
                    <input type = "number"></input>
                    <label>Name on card</label>
                    <input type = "text"></input>
                    <label>Expiration date:</label>
                    <input type="date"></input>
                    <label>CVV</label>
                    <input type="number"></input>
                </div>
                
                <button onClick={()=>setOpenPopup(false)} className="reject">Cancel</button>
                <Link to ="/student">
                <button >Proceed</button>
                </Link>
            </DialogContent>
        </Dialog>
    )
};