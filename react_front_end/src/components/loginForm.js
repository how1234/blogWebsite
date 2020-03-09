import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Icon, Input, Button, Checkbox, Alert, message } from "antd";
import { loginAsAdmin } from "../helper/requestMethodsToServer";

function LoginForm() {
  const [checked, setChecked] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    const email = emailRef.current.state.value;
    const password = passwordRef.current.state.value;
    if (email && password) {
      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }
      login(email, password);
    } else {
      setErrorMessage("Invalid input!");
    }
  };
  const checkedRemember = e => {
    setChecked(e.target.checked);
  };

  const login = async (email, password) => {
    try {
      const data = await loginAsAdmin(email, password);
      if (data instanceof Error) {
        message.error(data.message);
      } else {
        message.success("Login successful")
        dispatch({
          type: "LOGIN",
          payload: { ...data.data.login, checked }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Form style={{marginTop:"10%"}}onSubmit={handleSubmit} className="login-form">
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
        <Checkbox onChange={checkedRemember} checked={checked}>
          Remember me
        </Checkbox>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
    </Form>
    </div>
  );
}

export default LoginForm;
