import React, { useState } from "react";

import {useSelector,useDispatch} from 'react-redux' 
import LoginForm from "../components/loginForm";

function LoginPage(){
    const state = useSelector(state=> state)
    const dispatch = useDispatch() 

    return (
        <div style={{margin:"auto"}}>
            <LoginForm/>
        </div>
    )
}

export default LoginPage