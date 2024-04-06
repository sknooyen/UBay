import React, { useEffect, useState } from "react";
import { auth,provider } from "./loginconfig";
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

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
