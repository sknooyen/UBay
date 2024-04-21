import React, { useEffect, useState } from "react";
import { auth,provider, useAuth } from "./loginconfig";
import { signInWithPopup, signInWithRedirect, getCurrentUser } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import './login.css'
import { pageTheme } from "../Front-end/util";
import { ThemeProvider, Paper, AppBar } from '@mui/material';


function SignIn(){
    const [value,setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()
    
    const navigate = useNavigate()
    const handleClick =()=>{
        setLoading(true)
        signInWithPopup(auth,provider).then((data)=>{
            if (data.user.email.includes("umass.edu")) {
                setValue(data.user.email)
                localStorage.setItem("email",data.user.email)
            }
            else {
                alert("Must have @umass.edu")
            }
        })
        setLoading(false)
    }

return (
    <ThemeProvider theme={pageTheme}>
    <AppBar position="sticky">
    <h1>UBay</h1>
    </AppBar>
    <div className="login-container">
    {value?navigate('/home'):
        <button disabled={loading} onClick={handleClick}>Sign In With Google</button>
        }
    <h4> UMass Email Only </h4>
    </div>
    </ThemeProvider>
);
}
export default SignIn;

