import React, { useRef, useState} from "react";
import { useDispatch } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox,Alert,message } from "antd";

function LoginForm() {
  const [checked, setChecked] = useState(true);
  const [errorMessage,setErrorMessage] = useState("")
  const dispatch = useDispatch()

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    const email = emailRef.current.state.value;
    const password = passwordRef.current.state.value;
    if(email && password){
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        login(email,password)
    }else{
        setErrorMessage("Invalid input!")
    }
    
    
   
    
  };
  const checkedRemember = e => {
    setChecked(e.target.checked);
  };

  const login = (email,password) => {
    let requestBody = {
        query: `
                  query{
                      login(email:"${email}",password:"${password}"){
                          userId,
                          token,
                          tokenExpiration
                      }
                  }
              
              `
      };
      
    
      fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status.toString()[0] == 5){
            setErrorMessage("Invalid Email or Password")
            throw new Error(res.status)
          }else if (res.status.toString()[0] == 4){

            setErrorMessage("Connection fail")
            throw new Error(res.status)
          }else if (res.status !== 200 && res.status !== 201) {
            setErrorMessage("ErrorCode: " +  res.status )
            throw new Error("Connection fail");
          }
          return res.json();
        })
        .then(resData => {
          setErrorMessage('')
          console.log(resData);
          message.info('Log in successfully')
          dispatch( {type:'LOGIN',payload:resData.data.login})
        })
        .catch(err => {
          console.log(err);
        });

  };
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        <Input
          ref={emailRef}
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="email"
          type="email"
        />
      </Form.Item>
      <Form.Item>
        <Input
          ref={passwordRef}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        {/* <Checkbox onChange={checkedRemember} checked={checked}>
          Remember me
        </Checkbox> */}
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
    </Form>
  );
}

export default LoginForm;
