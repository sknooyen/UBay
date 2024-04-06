import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut(){
    const navigate = useNavigate()
    const logout =()=>{
        localStorage.clear()
        navigate("/")
    }
    return (
        <div>
            <h1>Sign Out Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default SignOut;