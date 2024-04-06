import React, { useEffect, useState } from "react";
import { auth,provider } from "./loginconfig";
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

import Login from "./login";

function SignIn(){
    const [value,setValue] = useState('')
    const navigate = useNavigate()
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

return (
    <div>
        {value?navigate('/home'):
        <button onClick={handleClick}>Sign In With Google</button>
        }
    </div>
);
}
export default SignIn;