import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut(){
    const navigate = useNavigate()
    const logout =()=>{
        localStorage.clear()
        navigate("/")
    }
    return (
        <div class="login-container">
            <h1>Sign Out Page Probably move to profile xD!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default SignOut;