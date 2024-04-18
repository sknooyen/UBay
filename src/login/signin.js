import React, { useEffect, useState } from "react";
import { auth,provider } from "./loginconfig";
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import './login.css'
import { pageTheme } from "../Front-end/util";
import { ThemeProvider, Paper, AppBar } from '@mui/material';


function SignIn(){
    const [value,setValue] = useState('')
    const [authenticate, setAuth] = useState(false)
    const navigate = useNavigate()
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            if (data.user.email.includes("umass.edu")) {
                setValue(data.user.email)
                setAuth(data.user.emailVerified)
                localStorage.setItem("email",data.user.email)
            }
            else {
                alert("Must have @umass.edu")
            }
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

return (
    <ThemeProvider theme={pageTheme}>
    <AppBar position="sticky">
    <h1>UBay</h1>
    </AppBar>
    <div class="login-container">
    {value?navigate('/home'):
        <button onClick={handleClick}>Sign In With Google</button>
        }
    <h4> UMass Email Only </h4>
    </div>
    </ThemeProvider>
);
}
export default SignIn;
