import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "./loginconfig";

function SignOut(){
    const navigate = useNavigate()
    const logout =()=>{
        localStorage.clear()
        logOut()
        navigate("/")
    }
    return (
        <div className="login-container">
            <h1>Sign Out Page Probably move to profile xD!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default SignOut;