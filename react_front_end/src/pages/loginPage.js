import React, { useState } from "react";

import {useSelector,useDispatch} from 'react-redux' 
import LoginForm from "../components/loginForm";

function LoginPage(){
    

    return (
        <div style={{margin:"auto"}}>
            <LoginForm/>
        </div>
    )
}

export default LoginPage